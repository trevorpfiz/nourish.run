"use client";

import { ScrollArea, ScrollBar } from "@nourish/ui/scroll-area";

import { MealCard } from "~/components/dashboard/meal-card";
import { api } from "~/trpc/react";

export interface Meal {
  time: string;
  foodItems: string[];
}

export const mealsData: Meal[] = [
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
  const currentDate = new Date().toISOString().split("T")[0]; // yyyy-mm-dd format
  const { isPending, isError, data, error } = api.meal.byDay.useQuery({
    date: currentDate!,
  });

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="relative w-full">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex w-max space-x-4 px-4 py-2">
          {isPending ? (
            <>
              <div>Loading...</div>
              <div>Loading...</div>
              <div>Loading...</div>
            </>
          ) : data?.length === 0 ? (
            <div>No meals found</div>
          ) : (
            data?.map((meal, index) => <MealCard key={index} meal={meal} />)
          )}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
