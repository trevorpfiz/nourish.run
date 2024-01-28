import Link from "next/link";
import { format } from "date-fns";
import { Clock } from "lucide-react";

import { cn } from "@nourish/ui";
import { Badge } from "@nourish/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@nourish/ui/card";

type CardProps = React.ComponentProps<typeof Card>;

interface MealProps extends CardProps {
  meal: {
    time: string;
    foodItems: string[];
  };
}

export function MealCard({ meal, className, ...props }: MealProps) {
  const { time, foodItems } = meal;
  const mealId = 1;

  // Format the time to a more readable format, e.g., "3:17 AM"
  const formattedTime = format(new Date(time), "p");
  // Determine the number of food items to display as a badge
  const additionalItemsCount = foodItems.length > 2 ? foodItems.length - 2 : 0;

  return (
    <Link href={`/dashboard/meal/${mealId}`}>
      <Card
        className={cn("h-full w-36 hover:opacity-60", className)}
        {...props}
      >
        <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 p-2">
          <CardDescription>Meal</CardDescription>
          <div className="flex flex-row items-center gap-1">
            <Clock size={16} className="text-muted-foreground" />
            <p className="text-sm text-muted-foreground">{formattedTime}</p>
          </div>
        </CardHeader>
        <CardContent className="p-2">
          <ul>
            {foodItems.slice(0, 2).map(
              (
                foodItem,
                index, // Only take the first two items
              ) => (
                <li
                  key={index}
                  className="grid grid-cols-[25px_1fr] items-start pb-2"
                >
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                  <p className="truncate text-sm font-medium leading-none">
                    {foodItem}
                  </p>
                </li>
              ),
            )}
            {additionalItemsCount > 0 && ( // Only show this if there are more than two items
              <li className="pt-2">
                <Badge variant="default">+{additionalItemsCount} more</Badge>
              </li>
            )}
          </ul>
        </CardContent>
      </Card>
    </Link>
  );
}
