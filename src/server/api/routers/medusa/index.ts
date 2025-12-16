import { createTRPCRouter } from "../../trpc";
import { campaignRouter } from "./campaign";
import { categoriesRouter } from "./categories";
import { collectionRouter } from "./collection";
import { productRouter } from "./product";
import { cartRouter } from "./cart";
import { regionRouter } from "./region";
import { userRouter } from "./user";
import { shippingRoute } from "./shipping";

export const medusaRouter = createTRPCRouter({
    ...productRouter,
    ...collectionRouter,
    ...campaignRouter,
    ...categoriesRouter,
    ...cartRouter,
    ...regionRouter,
    ...userRouter,
    ...shippingRoute,
})