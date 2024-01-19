import * as React from "react";

import { ScrollArea, ScrollBar } from "@nourish/ui/scroll-area";

import { MealCard } from "~/components/dashboard/meal-card";

export interface Meal {
  time: string;
  foodItems: string[];
}

export const meals: Meal[] = [
  {
    time: "2023-11-09T07:01:00Z",
    foodItems: ["Chicken Breast", "Strawberries"],
  }, // Breakfast
  {
    time: "2023-11-09T11:31:00Z",
    foodItems: ["Cheddar Cheese", "Turkey", "Mayo", "Bread"],
  }, // Lunch
  { time: "2023-11-09T14:01:00Z", foodItems: ["Chocolate Cake"] }, // Snack
  { time: "2023-11-09T18:01:00Z", foodItems: ["Honey"] }, // Dinner
];

export function MealCards() {
  return (
    <div className="relative w-full">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex w-max space-x-4 px-4 py-2">
          {meals.map((meal, index) => (
            <MealCard key={index} meal={meal} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
