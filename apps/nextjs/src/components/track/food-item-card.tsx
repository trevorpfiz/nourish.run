"use client";

import { Check } from "lucide-react";

import type { FoodItem } from "@nourish/db/src/schema";
import type { ReviewFoodsForm } from "@nourish/validators";
import { cn } from "@nourish/ui";
import { Badge } from "@nourish/ui/badge";
import { Card, CardContent } from "@nourish/ui/card";
import { useFieldArrayFormContext } from "@nourish/ui/form";

import { Dot } from "~/components/ui/dot";
import { getFirstServingSize } from "~/lib/utils";

type CardProps = React.ComponentProps<typeof Card>;

interface FoodItemProps extends CardProps {
  foodItem: FoodItem;
}

export function FoodItemCard({ foodItem, className, ...props }: FoodItemProps) {
  const { id, name, serving_sizes, calories_per_100g, icon_color } = foodItem;

  const form = useFieldArrayFormContext<ReviewFoodsForm>();

  const isSelected = form.fields.some((field) => field.foodId === id);

  const toggleSelection = () => {
    console.log(isSelected, form.fields, id, "toggleSelection");
    if (isSelected) {
      console.log({ isSelected }, "remove");
      // Find the index of the item with the same id and remove it
      const selectedIndex = form.fields.findIndex(
        (field) => field.foodId === id,
      );
      form.remove(selectedIndex);
    } else {
      console.log({ isSelected, id }, "append");
      // appends the new item to the form state
      form.append({
        foodId: id,
        size: serving_sizes ?? "",
        quantity: 1,
        name: name ?? "",
        calories: `${calories_per_100g} cal`,
        iconColor: icon_color ?? 0,
      });
    }
  };

  const firstServingSize = getFirstServingSize(serving_sizes ?? "");

  return (
    <Card
      className={cn(
        "flex w-full cursor-pointer items-center justify-between hover:opacity-60",
        className,
      )}
      onClick={toggleSelection}
      {...props}
    >
      <CardContent className="flex-grow p-4">
        <div className="flex flex-row items-center justify-between gap-1">
          <div className="flex flex-row items-center gap-2">
            <Dot colorIndex={icon_color} />
            <div className="flex flex-col gap-1">
              <h3 className="truncate text-sm font-bold leading-none">
                {name}
              </h3>
              <p className="truncate text-sm font-medium leading-none text-muted-foreground">
                {calories_per_100g} cal, {firstServingSize}
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
    </Card>
  );
}
