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

const valueFormatter: ValueFormatter = (number) =>
  `${new Intl.NumberFormat("us").format(number)} kcal`;

const MacrosDonut = () => (
  <div className="w-full">
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
