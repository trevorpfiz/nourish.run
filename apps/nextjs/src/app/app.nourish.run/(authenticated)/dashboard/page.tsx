import { MacrosBar } from "~/components/dashboard/macros-bar";
import { MacrosDonut } from "~/components/dashboard/macros-donut";
import { MacrosProgress } from "~/components/dashboard/macros-progress";
import { MealCards } from "~/components/dashboard/meal-cards";
import { NutrientsProgress } from "~/components/dashboard/nutrients-progress";
import { Tabs } from "~/components/dashboard/tabs";
import { TopNavbar } from "~/components/dashboard/top-navbar";

export const runtime = "edge";

export default async function DashboardPage() {
  return (
    <div className="relative z-0 flex h-full w-full overflow-hidden bg-white">
      <div className="relative flex h-full w-full max-w-2xl flex-col overflow-hidden bg-white">
        {/* TopNavbar */}
        <TopNavbar />

        {/* Content */}
        <main className="flex h-full w-full flex-col items-center gap-2 overflow-y-auto overflow-x-hidden pb-32">
          {/* Macros donut chart */}
          <MacrosDonut />
          {/* Macros progress charts  */}
          <MacrosProgress />
          {/* Macros bar chart */}
          <MacrosBar />
          {/* Meal and snack cards */}
          <MealCards />
          {/* Nutrient progress charts */}
          <NutrientsProgress />
        </main>

        {/* Tabs */}
        <Tabs />
      </div>
    </div>
  );
}
