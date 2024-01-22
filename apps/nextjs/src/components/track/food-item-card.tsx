"use client";

import { Check } from "lucide-react";

import type { ReviewFoodsForm } from "@nourish/validators";
import { cn } from "@nourish/ui";
import { Badge } from "@nourish/ui/badge";
import { Card, CardContent } from "@nourish/ui/card";
import { useFieldArrayFormContext } from "@nourish/ui/form";

import type { FoodItem } from "~/components/track/search-foods";

type CardProps = React.ComponentProps<typeof Card>;

interface FoodItemProps extends CardProps {
  foodItem: FoodItem;
}

export function FoodItemCard({ foodItem, className, ...props }: FoodItemProps) {
  const { foodId, name, description } = foodItem;

  const form = useFieldArrayFormContext<ReviewFoodsForm>();

  const isSelected = form.fields.some((field) => field.foodId === foodId);

  const toggleSelection = () => {
    if (isSelected) {
      // Find the index of the item with the same id and remove it
      const selectedIndex = form.fields.findIndex(
        (field) => field.foodId === foodId,
      );
      form.remove(selectedIndex);
    } else {
      // appends the new item to the form state
      form.append({
        foodId,
        name: foodItem.name,
        description: foodItem.description,
        size: "",
        quantity: 1,
      });
    }
  };

  return (
    <Card
      className={cn(
        "flex w-full cursor-pointer items-center justify-between hover:opacity-75",
        className,
      )}
      onClick={toggleSelection}
      {...props}
    >
      <CardContent className="flex-grow p-4">
        <div className="flex flex-row items-center justify-between gap-1">
          <div className="flex flex-row items-center gap-2">
            <span className="flex h-2 w-2 flex-shrink-0 translate-y-1 rounded-full bg-sky-500" />
            <div className="flex flex-col gap-1">
              <h3 className="truncate text-sm font-bold leading-none">
                {name}
              </h3>
              <p className="truncate text-sm font-medium leading-none text-muted-foreground">
                {description}
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
