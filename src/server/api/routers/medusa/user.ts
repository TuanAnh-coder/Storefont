// src/server/routers/userRouter.ts
import { medusaClient } from "@/lib/medusaClient";
import { publicProcedure } from "../../trpc";
import z from "zod";
import Medusa from "@medusajs/js-sdk";

const MEDUSA_BASE = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000';
const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || '';

export const userRouter = {
  registerUser: publicProcedure
    .input(
      z.object({
        firstName: z.string().min(1, "First name is required"),
        lastName: z.string().min(1, "Last name is required"),
        email: z.string().email("Invalid email"),
        password: z.string().min(6, "Password must be at least 6 characters"),
      })
    )
    .mutation(async ({ input }) => {
      const { firstName, lastName, email, password } = input;

      let authToken: string;

      // Tạo Medusa client riêng cho request này
      const requestClient = new Medusa({
        baseUrl: MEDUSA_BASE,
        publishableKey: PUBLISHABLE_KEY,
        auth: {
          type: "jwt",
        }
      });

      // BƯỚC 1: Đăng ký auth identity và lấy token
      try {
        const registerResponse = await requestClient.auth.register("customer", "emailpass", {
          email,
          password,
        });
        
        authToken = typeof registerResponse === 'string' ? registerResponse : (registerResponse as any)?.token;
        console.log("✅ Register success, token received:", !!authToken);
        
        if (!authToken) {
          throw new Error("No token received from registration");
        }
      } catch (error: any) {
        console.log("⚠️ Register failed:", error.message);
        
        // Nếu email đã tồn tại, login để lấy token
        if (error.statusText === "Unauthorized" || error.message?.includes("already exists")) {
          try {
            const loginResponse = await requestClient.auth.login("customer", "emailpass", {
              email,
              password,
            });

            authToken = typeof loginResponse === 'string' ? loginResponse : (loginResponse as any)?.token;
            console.log("✅ Login success, token received:", !!authToken);
            
            if (!authToken) {
              throw new Error("No token received from login");
            }
          } catch (loginError: any) {
            console.error("🔴 Login failed:", loginError);
            throw new Error(`Failed to authenticate: ${loginError.message}`);
          }
        } else {
          console.error("🔴 Registration error:", error);
          throw new Error(`Registration failed: ${error.message}`);
        }
      }

      // BƯỚC 2: Tạo customer profile bằng fetch với token
      try {
        console.log("📤 Creating customer profile with token...");
        
        const response = await fetch(`${MEDUSA_BASE}/store/customers`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
            'x-publishable-api-key': PUBLISHABLE_KEY,
          },
          body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            email: email,
          }),
        });

        console.log("📥 Response status:", response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error("🔴 API error:", errorText);
          
          // Nếu customer đã tồn tại, coi như success
          if (response.status === 409) {
            console.log("⚠️ Customer already exists");
            return { success: true, existed: true };
          }
          
          throw new Error(`API returned ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        console.log("✅ Customer created:", data.customer?.id);

        return { 
          success: true, 
          customer: data.customer
        };
      } catch (error: any) {
        console.error("🔴 Customer creation error:", error);
        throw new Error(`Error creating customer profile: ${error.message}`);
      }
    }),

  loginUser: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const token = await medusaClient.auth.login("customer", "emailpass", input);
        // Medusa v2: `login` trả về string (JWT)
        return token;
      } catch (err: any) {
        const msg = err?.response?.data?.message || err.message;
        if (msg?.includes("Invalid credentials")) {
          throw new Error("Invalid email or password");
        }
        throw new Error("Login failed");
      }
    }),

  userDetail: publicProcedure
    .input(z.object({ accessToken: z.string().optional() }))
    .query(async ({ input }) => {
      if (!input.accessToken) {
        throw new Error("Unauthorized: missing token");
      }

      try {
        console.log("📤 Fetching customer details with token...");
        
        const response = await fetch(`${MEDUSA_BASE}/store/customers/me`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${input.accessToken}`,
            'x-publishable-api-key': PUBLISHABLE_KEY,
          },
        });

        console.log("📥 Customer detail response status:", response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error("🔴 Fetch customer failed:", errorText);
          throw new Error(`Failed to fetch customer: ${response.status}`);
        }

        const data = await response.json();
        console.log("✅ Customer fetched:", data.customer?.id);

        return data.customer;
      } catch (err: any) {
        console.error("🔴 User detail error:", err);
        throw new Error("Unable to fetch user details");
      }
    }),
};