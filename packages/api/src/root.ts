import { authRouter } from "./router/auth";
import { foodItemRouter } from "./router/food-item";
import { mealRouter } from "./router/meal";
import { nutrientRouter } from "./router/nutrient";
import { nutritionRouter } from "./router/nutrition";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  foodItem: foodItemRouter,
  meal: mealRouter,
  nutrient: nutrientRouter,
  nutrition: nutritionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
