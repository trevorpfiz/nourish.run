"use client";

import { ScrollArea, ScrollBar } from "@nourish/ui/scroll-area";

import { MealCard } from "~/components/dashboard/meal-card";
import { api } from "~/trpc/react";

export function MealCards() {
  const currentDate = new Date().toISOString().split("T")[0]; // yyyy-mm-dd format
  const { isPending, isError, data, error } = api.meal.byDay.useQuery({
    date: currentDate!,
  });

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="relative flex w-full flex-col">
      <h2 className="px-4 pb-1 text-xl font-semibold">Meals and Snacks</h2>
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
