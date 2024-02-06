import type { RouterOutputs } from "@nourish/api";

import { NutrientItem } from "~/components/dashboard/nutrient-item";
import { calculateTotalCalories } from "~/lib/utils";

interface MacrosProgressProps {
  meal: Promise<RouterOutputs["meal"]["byId"]>;
}

const MacrosProgress = async (props: MacrosProgressProps) => {
  const meal = await props.meal;

  if (!meal) {
    return null;
  }

  // Calculate total calories for the meal
  let totalCalories = 0;
  meal.nutrition.forEach((nutritionItem) => {
    const caloriesPer100g = parseFloat(
      nutritionItem.foodItem.calories_per_100g ?? "0",
    );
    const servingSize = nutritionItem.serving_size ?? "";
    const quantity = parseFloat(nutritionItem.servings ?? "1");
    totalCalories += calculateTotalCalories(
      servingSize,
      caloriesPer100g,
      quantity,
    );
  });

  return (
    <div className="flex w-full flex-col gap-2 px-4 py-4">
      {/* Energy */}
      <NutrientItem
        name={"Energy"}
        currentValue={totalCalories}
        dailyValue={"2500.0"}
        unit={"kcal"}
      />
      {/* Protein */}
      <NutrientItem
        name={"Protein"}
        currentValue={4.8}
        dailyValue={"119.7"}
        unit={"g"}
        color="lime"
      />
      {/* Carbs */}
      <NutrientItem
        name={"Carbs"}
        currentValue={69.2}
        dailyValue={"215.4"}
        unit={"g"}
        color="violet"
      />
      {/* Fat */}
      <NutrientItem
        name={"Fat"}
        currentValue={13.3}
        dailyValue={"63.8"}
        unit={"g"}
        color="amber"
      />
    </div>
  );
};

export { MacrosProgress };
