import Link from "next/link";
import { format } from "date-fns";
import { Clock } from "lucide-react";

import type { RouterOutputs } from "@nourish/api";
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
  meal: RouterOutputs["meal"]["byDay"][number];
}

export function MealCard({ meal, className, ...props }: MealProps) {
  const { id, startTime, nutrition } = meal;

  // Format the time to a more readable format, e.g., "3:17 AM"
  const formattedTime = format(new Date(startTime!), "p");
  // Determine the number of food items to display as a badge
  const additionalItemsCount = nutrition.length > 2 ? nutrition.length - 2 : 0;

  return (
    <Link href={`/dashboard/meal/${id}`}>
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
            {nutrition.slice(0, 2).map(
              (
                nutritionItem,
                index, // Only take the first two items
              ) => (
                <li
                  key={index}
                  className="grid grid-cols-[25px_1fr] items-start pb-2"
                >
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                  <p className="truncate text-sm font-medium leading-none">
                    {nutritionItem.foodItem.name}
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
