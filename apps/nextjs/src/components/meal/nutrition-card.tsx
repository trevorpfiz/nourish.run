"use client";

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

import { selectedNutritionIdsAtom } from "~/components/meal/foods";
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
  const variables = useMutationState<string>({
    filters: { mutationKey: deleteManyNutritionKey, status: "pending" },
    select: (mutation) => mutation.state.variables,
  });

  const foodItem = nutritionItem.foodItem;
  const isSelected = selectedNutritionIds.includes(foodItem.id);

  const toggleSelection = () => {
    setSelectedNutritionIds((currentSelected) => {
      if (isSelected) {
        return currentSelected.filter((id) => id !== foodItem.id);
      } else {
        return [...currentSelected, foodItem.id];
      }
    });
  };

  // Function to handle size change
  const handleSizeChange = (size) => {
    const updatedItems = selectedNutritionIds.map((item) =>
      item.id === foodItem.id ? { ...item, size: size } : item,
    );
    setSelectedNutritionIds(updatedItems);
  };

  // Function to handle quantity change
  const handleQuantityChange = (e) => {
    const updatedItems = selectedNutritionIds.map((item) =>
      item.id === foodItem.id ? { ...item, quantity: e.target.value } : item,
    );
    setSelectedNutritionIds(updatedItems);
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
                {foodItem.description}
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
            defaultValue={nutritionItem.serving_size}
          >
            <SelectTrigger id="size">
              <SelectValue placeholder="Size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1 cup">{`1 cup (147g)`}</SelectItem>
              <SelectItem value="2 cup">{`2 cup (294g)`}</SelectItem>
              <SelectItem value="3 cup">{`3 cup (441g)`}</SelectItem>
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
            value={nutritionItem.servings}
            onChange={handleQuantityChange}
          />
        </div>
      </CardFooter>
    </Card>
  );
}

export { NutritionCard };
