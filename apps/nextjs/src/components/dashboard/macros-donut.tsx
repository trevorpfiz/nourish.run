"use client";

import type { ValueFormatter } from "@tremor/react";
import { DonutChart } from "@tremor/react";

const macros = [
  {
    name: "Fat",
    calories: 500,
  },
  {
    name: "Carbs",
    calories: 500,
  },
  {
    name: "Protein",
    calories: 1000,
  },
  {
    name: "Remaining",
    calories: 500,
  },
];

// Find the remaining calories
const remainingCalories =
  macros.find((macro) => macro.name === "Remaining")?.calories ?? 0;

const valueFormatter: ValueFormatter = (number) => {
  const consumedCalories = number - remainingCalories;
  return `${new Intl.NumberFormat("us").format(consumedCalories)} kcal`;
};

const MacrosDonut = () => (
  <div className="w-full px-4">
    <DonutChart
      data={macros}
      category="calories"
      index="name"
      valueFormatter={valueFormatter}
      colors={["amber", "violet", "lime", "gray-100"]}
      showAnimation={true}
    />
  </div>
);

export { MacrosDonut };
