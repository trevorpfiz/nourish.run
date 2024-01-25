import { NutrientItem } from "~/components/dashboard/nutrient-item";

const MacrosProgress = () => (
  <div className="flex w-full flex-col gap-2 px-4 py-4">
    {/* Energy */}
    <NutrientItem
      name={"Energy"}
      currentValue={2000.0}
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

export { MacrosProgress };
