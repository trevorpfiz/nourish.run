"use client";

import { use, useEffect } from "react";
import { atom, useAtom } from "jotai";
import { Search } from "lucide-react";
import { matchSorter } from "match-sorter";

import type { RouterOutputs } from "@nourish/api";
import type { FoodItem } from "@nourish/db/src/schema";
import { Input } from "@nourish/ui/input";

interface SearchFoodsProps {
  foodItems: Promise<RouterOutputs["foodItem"]["all"]>;
}

export const searchResultsAtom = atom<FoodItem[]>([]);

export default function SearchFoods(props: SearchFoodsProps) {
  const { foodItems } = props;
  const initialData = use(foodItems);
  const [, setSearchResults] = useAtom(searchResultsAtom);

  useEffect(() => {
    setSearchResults(initialData ?? []);
  }, [initialData, setSearchResults]);

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    const matchedItems = matchSorter(initialData, query, {
      keys: ["name"],
    });
    console.log({ matchedItems });
    setSearchResults(matchedItems ?? []);
  };

  return (
    <div className="w-full px-4 pt-1">
      <div className="relative w-full">
        <Search
          size={16}
          className="absolute bottom-0 left-3 top-0 my-auto text-blue-500"
        />
        <Input
          type="text"
          placeholder="Search for a food"
          className="rounded-full border-none bg-gray-100 pl-9 pr-4 shadow-none"
          onChange={onSearchChange}
        />
      </div>
    </div>
  );
}
