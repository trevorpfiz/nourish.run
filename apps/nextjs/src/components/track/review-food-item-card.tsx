"use client";

import type { UseFormReturn } from "react-hook-form";
import { useAtom } from "jotai";
import { X } from "lucide-react";

import type { ReviewFoodsForm } from "@nourish/validators";
import { cn } from "@nourish/ui";
import { Button } from "@nourish/ui/button";
import { Card, CardContent, CardFooter } from "@nourish/ui/card";
import { FormControl, FormField, FormItem, FormLabel } from "@nourish/ui/form";
import { Input } from "@nourish/ui/input";

import type { FoodItem } from "~/components/track/search-foods";
import { selectedFoodItemsAtom } from "~/components/track/food-item-card";

type CardProps = React.ComponentProps<typeof Card>;

interface ReviewFoodItemProps extends CardProps {
  form: UseFormReturn<ReviewFoodsForm>;
  foodItem: FoodItem;
  index: number;
}

function ReviewFoodItemCard({
  form,
  foodItem,
  index,
  className,
  ...props
}: ReviewFoodItemProps) {
  const { id, name, description } = foodItem;
  const { control, setValue } = form;

  const [selectedFoodItems, setSelectedFoodItems] = useAtom(
    selectedFoodItemsAtom,
  );

  const removeItem = () => {
    // Remove from the selected items atom
    setSelectedFoodItems(
      selectedFoodItems.filter((item) => item.id !== foodItem.id),
    );
    // Remove from the form state
    setValue(
      "foods",
      selectedFoodItems.filter((item) => item.id !== foodItem.id),
    );
  };

  return (
    <Card
      className={cn("flex w-full items-center justify-between", className)}
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
            <Button type="button" variant="primary" onClick={removeItem}>
              <X size={16} />
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <FormField
          name={`foods.${index}.size`}
          control={control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Size</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Size" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name={`foods.${index}.quantity`}
          control={control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>#</FormLabel>
              <FormControl>
                <Input {...field} type="number" placeholder="Quantity" />
              </FormControl>
            </FormItem>
          )}
        />
      </CardFooter>
    </Card>
  );
}

export { ReviewFoodItemCard };
