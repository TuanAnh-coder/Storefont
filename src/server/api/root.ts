import { createTRPCRouter } from './trpc';
import { medusaRouter } from './routers/medusa';
import { strapiRouter } from './routers/blog';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  medusa: medusaRouter,
  blog: strapiRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
