"use client";

import { useAtom } from "jotai";
import { Check, X } from "lucide-react";

import type { ReviewFoodsForm } from "@nourish/validators";
import { cn } from "@nourish/ui";
import { Badge } from "@nourish/ui/badge";
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
import { Label } from "@nourish/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@nourish/ui/select";

import { selectedMealItemsAtom } from "~/components/meal/foods";

type CardProps = React.ComponentProps<typeof Card>;

interface NutritionCardProps extends CardProps {
  index: number;
}

function NutritionCard({ index, className, ...props }: NutritionCardProps) {
  const [selectedMealItems, setSelectedMealItems] = useAtom(
    selectedMealItemsAtom,
  );
  const foodItem = /* retrieve food item details based on index or some identifier */;
  const isSelected = selectedMealItems.some(item => item.id === foodItem.id);

  const toggleSelection = () => {
    if (isSelected) {
      const newSelection = selectedMealItems.filter(item => item.id !== foodItem.id);
      setSelectedMealItems(newSelection);
    } else {
      setSelectedMealItems([...selectedMealItems, {
        id: foodItem.id,
        name: foodItem.name,
        description: foodItem.description,
        size: "", // default size
        quantity: 1, // default quantity
      }]);
    }
  };

  // Function to handle size change
  const handleSizeChange = (size) => {
    const updatedItems = selectedMealItems.map(item => 
      item.id === foodItem.id ? { ...item, size: size } : item
    );
    setSelectedMealItems(updatedItems);
  };

  // Function to handle quantity change
  const handleQuantityChange = (e) => {
    const updatedItems = selectedMealItems.map(item => 
      item.id === foodItem.id ? { ...item, quantity: e.target.value } : item
    );
    setSelectedMealItems(updatedItems);
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
          <Select onValueChange={handleSizeChange} defaultValue={/* get default size from selectedMealItems */}>
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
            value={/* get quantity from selectedMealItems */}
        onChange={handleQuantityChange}
          />
        </div>
      </CardFooter>
    </Card>
  );
}

export { NutritionCard };
