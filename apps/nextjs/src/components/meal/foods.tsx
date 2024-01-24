import Link from "next/link";
import { atom } from "jotai";
import { Plus, Trash } from "lucide-react";

import { Button } from "@nourish/ui/button";

import { NutritionCard } from "~/components/meal/nutrition-card";

export const selectedMealItemsAtom = atom<string[]>([]);

export default function Foods() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <h3>Foods</h3>
          <Button className="h-6 w-6 rounded-md p-2" asChild>
            <Link href="/dashboard/track">
              <Plus color="white" strokeWidth={3} />
            </Link>
          </Button>
        </div>
        <Trash size={24} />
      </div>
      {/* Nutrition cards */}
      <div>
        {data.map((item, index) => (
          <NutritionCard key={index} index={index} />
        ))}
      </div>
    </div>
  );
}
