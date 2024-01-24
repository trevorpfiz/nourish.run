import { authRouter } from "./router/auth";
import { nutrientRouter } from "./router/nutrient";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  nutrient: nutrientRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
