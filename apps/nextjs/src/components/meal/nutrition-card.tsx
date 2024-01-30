"use client";

import React from "react";
import { useMutationState } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { useAtom } from "jotai";
import { Check } from "lucide-react";

import type { NutritionWithFoodItem } from "@nourish/db/src/schema";
import { cn } from "@nourish/ui";
import { Badge } from "@nourish/ui/badge";
import { Card, CardContent, CardFooter } from "@nourish/ui/card";
import { Input } from "@nourish/ui/input";
import { Label } from "@nourish/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@nourish/ui/select";
import { toast } from "@nourish/ui/toast";

import { selectedNutritionIdsAtom } from "~/components/meal/foods";
import { parseServingSizes } from "~/lib/utils";
import { api } from "~/trpc/react";

type CardProps = React.ComponentProps<typeof Card>;

interface NutritionCardProps extends CardProps {
  nutritionItem: NutritionWithFoodItem;
}

function NutritionCard({
  nutritionItem,
  className,
  ...props
}: NutritionCardProps) {
  const [selectedNutritionIds, setSelectedNutritionIds] = useAtom(
    selectedNutritionIdsAtom,
  );
  const utils = api.useUtils();
  const deleteManyNutritionKey = getQueryKey(api.nutrition.deleteMany);
  const variables = useMutationState({
    filters: { mutationKey: deleteManyNutritionKey, status: "pending" },
    select: (mutation) => mutation.state.variables,
  });

  const updateNutrition = api.nutrition.update.useMutation({
    onError: (err) => {
      toast.error(
        err?.data?.code === "UNAUTHORIZED"
          ? "You must be logged in to delete a food entry"
          : "Failed to delete food entry",
      );
    },
    onSettled: async () => {
      await utils.meal.invalidate();
    },
  });

  const foodItem = nutritionItem.foodItem;
  const isSelected = selectedNutritionIds.includes(foodItem.id);
  const servingSizeOptions = parseServingSizes(foodItem.serving_sizes ?? "");

  const toggleSelection = () => {
    setSelectedNutritionIds((currentSelected) => {
      if (isSelected) {
        return currentSelected.filter((id) => id !== foodItem.id);
      } else {
        return [...currentSelected, foodItem.id];
      }
    });
  };

  const handleSizeChange = (size: string) => {
    if (!size.trim()) {
      // If the size is empty or just whitespace, do nothing
      return;
    }

    const updatedItem = {
      id: nutritionItem.id,
      serving_size: size,
    };

    updateNutrition.mutate(updatedItem);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = e.target.value;

    if (!quantity.trim() || isNaN(Number(quantity))) {
      // If the quantity is empty, just whitespace, or not a valid number, do nothing
      return;
    }

    const updatedItem = {
      id: nutritionItem.id,
      servings: quantity,
    };

    updateNutrition.mutate(updatedItem);
  };

  return (
    <Card
      className={cn(
        "flex w-full flex-col items-center justify-between",
        className,
      )}
      onClick={toggleSelection}
      {...props}
    >
      <CardContent className="w-full p-4">
        <div className="flex flex-row items-center justify-between gap-2">
          <div className="flex flex-row items-center gap-2">
            <span className="flex h-2 w-2 flex-shrink-0 translate-y-1 rounded-full bg-sky-500" />
            <div className="flex flex-col gap-1">
              <h3 className="truncate text-sm font-bold leading-none">
                {foodItem.name}
              </h3>
              <p className="truncate text-sm font-medium leading-none text-muted-foreground">
                {`${foodItem.calories_per_100g} cal`}
              </p>
            </div>
          </div>
          <div className="flex min-w-12 flex-shrink-0 justify-end">
            {isSelected && (
              <Badge variant="default">
                <Check size={16} />
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex w-full flex-row items-center gap-2">
        {/* Size */}
        <div className="flex flex-[2] flex-row items-center gap-2 space-y-0">
          <Label htmlFor="size">Size</Label>
          <Select
            onValueChange={handleSizeChange}
            defaultValue={nutritionItem.serving_size ?? ""}
          >
            <SelectTrigger id="size">
              <SelectValue placeholder="Size" />
            </SelectTrigger>
            <SelectContent>
              {servingSizeOptions.map((option, idx) => (
                <SelectItem key={idx} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Quantity */}
        <div className="flex flex-1 flex-row items-center gap-2 space-y-0">
          <Label htmlFor="quantity" className="flex-shrink-0">
            #
          </Label>
          <Input
            id="quantity"
            type="number"
            placeholder="Quantity"
            value={nutritionItem.servings ?? 1}
            onChange={handleQuantityChange}
          />
        </div>
      </CardFooter>
    </Card>
  );
}

export { NutritionCard };
