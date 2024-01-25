"use client";

import { Check } from "lucide-react";

import type { FoodItem } from "@nourish/db/src/schema";
import type { ReviewFoodsForm } from "@nourish/validators";
import { cn } from "@nourish/ui";
import { Badge } from "@nourish/ui/badge";
import { Card, CardContent } from "@nourish/ui/card";
import { useFieldArrayFormContext } from "@nourish/ui/form";

import { iconColorMap } from "~/lib/constants";

type CardProps = React.ComponentProps<typeof Card>;

interface FoodItemProps extends CardProps {
  foodItem: FoodItem;
}

function getFirstServingSize(servingSizes: string) {
  // Match the pattern of serving size followed by weight in parentheses
  const match = servingSizes.match(/[^,]*\([^)]+\)/g);

  // If there's a match, return the first one, otherwise return the entire string
  return match ? match[0] : servingSizes;
}

export function FoodItemCard({ foodItem, className, ...props }: FoodItemProps) {
  const { id, name, serving_sizes, calories_per_100g, icon_color } = foodItem;

  const form = useFieldArrayFormContext<ReviewFoodsForm>();

  const isSelected = form.fields.some((field) => field.id === id);

  const toggleSelection = () => {
    if (isSelected) {
      // Find the index of the item with the same id and remove it
      const selectedIndex = form.fields.findIndex((field) => field.id === id);
      form.remove(selectedIndex);
    } else {
      // appends the new item to the form state
      form.append({
        id,
        size: serving_sizes ?? "",
        quantity: 1,
      });
    }
  };

  const firstServingSize = getFirstServingSize(serving_sizes ?? "");
  const dotStyle = iconColorMap[icon_color ?? 0] ?? "bg-gray-400";

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
            <span
              className={cn(
                "flex h-2 w-2 flex-shrink-0 translate-y-1 rounded-full",
                dotStyle,
              )}
            />
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
