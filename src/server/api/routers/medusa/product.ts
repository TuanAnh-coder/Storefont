import { z } from "zod";
import { publicProcedure } from "../../trpc";
import { medusaAdmin, medusaClient } from "@/lib/medusaClient";

export const productRouter = {
  getProducts: publicProcedure.input(z.object({ regionID: z.string().optional() })).query(async ({ input: { regionID } }) => {
  try {
    const  {products}  = await medusaClient.store.product.list({
      limit: 20,
      fields: "*variants.calculated_price",
      region_id: regionID,   
});
    return products;
  } catch (err) {
    console.error("Medusa fetch error:", err);
    throw new Error("Failed to fetch products from Medusa");
  }
}),
  getProduct: publicProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ input }) => {
    const {product} = await medusaClient.store.product.retrieve(input.id);
    return product;
  }),
  getProductRecent: publicProcedure
  .input(
    z.object({
      ids: z.array(z.string()), // nhận mảng id
      regionID: z.string().optional(),
    })
  )
  .query(async ({ input }) => {
    try {
      // Lấy products theo mảng id
      const { products } = await medusaClient.store.product.list({
        id: input.ids, // Medusa cho phép truyền mảng
        limit: 20,
      fields: "*variants.calculated_price",
      region_id: input.regionID,  
      });

      return products;
    } catch (err) {
      console.error("Medusa fetch error:", err);
      throw new Error("Failed to fetch products from Medusa");
    }
  }),
};