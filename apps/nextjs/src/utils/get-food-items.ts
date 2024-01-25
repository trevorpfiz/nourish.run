import { cache } from "react";

import "server-only";

import { api } from "~/trpc/server";

export const preload = () => {
  void getFoodItems();
};

export const getFoodItems = cache(async () => {
  const foodItems = await api.foodItem.all();
  return foodItems;
});
