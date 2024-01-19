"use client";

import { atom, useAtom } from "jotai";
import { Check } from "lucide-react";

import { cn } from "@nourish/ui";
import { Badge } from "@nourish/ui/badge";
import { Card, CardContent } from "@nourish/ui/card";

import type { FoodItem } from "~/components/track/search-foods";

type CardProps = React.ComponentProps<typeof Card>;

interface FoodItemProps extends CardProps {
  foodItem: FoodItem;
}

export const selectedFoodItemsAtom = atom<FoodItem[]>([]);

export function FoodItemCard({ foodItem, className, ...props }: FoodItemProps) {
  const { id, name, description } = foodItem;
  const [selectedFoodItems, setSelectedFoodItems] = useAtom(
    selectedFoodItemsAtom,
  );

  const toggleSelection = () => {
    if (selectedFoodItems.some((item) => item.id === id)) {
      setSelectedFoodItems(selectedFoodItems.filter((item) => item.id !== id));
    } else {
      setSelectedFoodItems([...selectedFoodItems, foodItem]);
    }
  };

  const isSelected = selectedFoodItems.some((item) => item.id === id);

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
