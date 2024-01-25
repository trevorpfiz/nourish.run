import { authRouter } from "./router/auth";
import { foodItemRouter } from "./router/food-item";
import { nutrientRouter } from "./router/nutrient";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  foodItem: foodItemRouter,
  nutrient: nutrientRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
