"use client";

import { useAtom } from "jotai";
import { Search } from "lucide-react";

import { Input } from "@nourish/ui/input";

import { searchResultsAtom } from "~/components/track/search-results";

export interface FoodItem {
  foodId: string;
  name: string;
  description: string;
}

export const foodItems: FoodItem[] = [
  {
    foodId: "1",
    name: "Apple",
    description:
      "A sweet, crisp fruit that grows on trees. tttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt tttttttt",
  },
  {
    foodId: "2",
    name: "Banana",
    description:
      "A sweet fruit that grows on trees. tttttttttttttttttttt ttttttttttttttttt tttttttttttttttttttttt tttttttttttttttttt ttttttttttttttttt",
  },
  {
    foodId: "3",
    name: "Orange",
    description: "A sweet, citrus fruit that grows on trees.",
  },
  {
    foodId: "4",
    name: "Pineapple",
    description: "A sweet, tropical fruit that grows on trees.",
  },
  {
    foodId: "5",
    name: "Grape",
    description: "A sweet fruit that grows on vines.",
  },
  {
    foodId: "6",
    name: "Strawberry",
    description: "A sweet fruit that grows on vines.",
  },
  {
    foodId: "7",
    name: "Blueberry",
    description: "A sweet fruit that grows on vines.",
  },
  {
    foodId: "8",
    name: "Raspberry",
    description: "A sweet fruit that grows on vines.",
  },
  {
    foodId: "9",
    name: "Blackberry",
    description: "A sweet fruit that grows on vines.",
  },
  {
    foodId: "10",
    name: "Mango",
    description: "A sweet, tropical fruit that grows on trees.",
  },
  {
    foodId: "11",
    name: "Papaya",
    description: "A sweet, tropical fruit that grows on trees.",
  },
  {
    foodId: "12",
    name: "Kiwi",
    description: "A sweet, tropical fruit that grows on trees.",
  },
  {
    foodId: "13",
    name: "Watermelon",
    description: "A sweet, tropical fruit that grows on trees.",
  },
  {
    foodId: "14",
    name: "Cantaloupe",
    description: "A sweet, tropical fruit that grows on trees.",
  },
  {
    foodId: "15",
    name: "Honeydew",
    description: "A sweet, tropical fruit that grows on trees.",
  },
  {
    foodId: "16",
    name: "Lemon",
    description: "A sour, citrus fruit that grows on trees.",
  },
];

export default function SearchFoods() {
  const [, setSearchResults] = useAtom(searchResultsAtom);

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    const matchedItems = foodItems.filter((item) =>
      item.name.toLowerCase().includes(query),
    );
    setSearchResults(matchedItems);
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
