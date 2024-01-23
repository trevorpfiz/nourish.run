"use client";

import { X } from "lucide-react";

import type { ReviewFoodsForm } from "@nourish/validators";
import { cn } from "@nourish/ui";
import { Button } from "@nourish/ui/button";
import { Card, CardContent, CardFooter } from "@nourish/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  useFieldArrayFormContext,
} from "@nourish/ui/form";
import { Input } from "@nourish/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@nourish/ui/select";

type CardProps = React.ComponentProps<typeof Card>;

interface ReviewFoodItemProps extends CardProps {
  index: number;
}

function ReviewFoodItemCard({
  index,
  className,
  ...props
}: ReviewFoodItemProps) {
  const form = useFieldArrayFormContext<ReviewFoodsForm>();

  const foodItem = form.fields[index];

  if (!foodItem) return null;

  const removeItem = () => form.remove(index);

  return (
    <Card
      className={cn(
        "flex w-full flex-col items-center justify-between",
        className,
      )}
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
            <Button type="button" variant="primary" onClick={removeItem}>
              <X size={16} />
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex w-full flex-row items-center gap-2">
        <FormField
          name={`foods.${index}.size`}
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-[2] flex-row items-center gap-2 space-y-0">
              <FormLabel className="flex-shrink-0">Size</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Size" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1 cup">{`1 cup (147g)`}</SelectItem>
                  <SelectItem value="2 cup">{`2 cup (294g)`}</SelectItem>
                  <SelectItem value="3 cup">{`3 cup (441g)`}</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          name={`foods.${index}.quantity`}
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-1 flex-row items-center gap-2 space-y-0">
              <FormLabel className="flex-shrink-0">#</FormLabel>
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
