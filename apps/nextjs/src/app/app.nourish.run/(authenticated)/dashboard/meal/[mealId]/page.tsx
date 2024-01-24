import { MacrosDonut } from "~/components/dashboard/macros-donut";
import { MacrosProgress } from "~/components/dashboard/macros-progress";
import { NutrientsProgress } from "~/components/dashboard/nutrients-progress";
import Foods from "~/components/meal/foods";
import { MealTopBar } from "~/components/meal/meal-top-bar";

export const runtime = "edge";

export default async function MealPage({
  params,
}: {
  params: { mealId: string };
}) {
  return (
    <div className="relative z-0 flex h-full w-full overflow-hidden bg-white">
      <div className="relative flex h-full max-w-2xl flex-1 flex-col overflow-hidden bg-white">
        {/* TopNavbar */}
        <MealTopBar />

        {/* Content */}
        <main className="relative flex h-full w-full flex-1 flex-col items-center gap-2 overflow-y-auto overflow-x-hidden">
          {/* Macros donut chart */}
          <MacrosDonut />
          {/* Macros progress charts  */}
          <MacrosProgress />
          {/* TODO: Meal Images */}
          {/* Foods */}
          <Foods />
          {/* Nutrient progress charts */}
          <NutrientsProgress />
        </main>
      </div>
    </div>
  );
}
