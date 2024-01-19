"use client";

import { atom, useAtom } from "jotai";

import type { FoodItem } from "~/components/track/search-foods";
import { FoodItemCard } from "~/components/track/food-item-card";

// This atom will hold the array of food items that match the search query
export const searchResultsAtom = atom<FoodItem[]>([]);

export default function SearchResults() {
  const [searchResults] = useAtom(searchResultsAtom);

  return (
    <div className="w-full">
      <h3 className="pb-2 text-sm font-medium text-muted-foreground">
        Results
      </h3>
      <ul>
        {searchResults.map((foodItem) => (
          <li key={foodItem.id} className="pb-2">
            <FoodItemCard foodItem={foodItem} />
          </li>
        ))}
      </ul>
    </div>
  );
}
