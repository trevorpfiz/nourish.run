"use client";

import { use } from "react";
import Link from "next/link";
import { atom, useAtom } from "jotai";
import { Plus, Trash } from "lucide-react";

import type { RouterOutputs } from "@nourish/api";
import { Button } from "@nourish/ui/button";
import { toast } from "@nourish/ui/toast";

import { NutritionCard } from "~/components/meal/nutrition-card";
import { api } from "~/trpc/react";

export const selectedNutritionIdsAtom = atom<number[]>([]);

interface FoodsProps {
  mealId: number;
  meal: Promise<RouterOutputs["meal"]["byId"]>;
}

export default function Foods(props: FoodsProps) {
  const initialData = use(props.meal);
  const [selectedNutritionIds, setSelectedNutritionIds] = useAtom(
    selectedNutritionIdsAtom,
  );

  const utils = api.useUtils();
  const { data: meal } = api.meal.byId.useQuery(
    { id: props.mealId },
    {
      initialData,
    },
  );

  const { isPending, submittedAt, variables, mutate, isError } =
    api.nutrition.deleteMany.useMutation({
      onError: (err) => {
        toast.error(
          err?.data?.code === "UNAUTHORIZED"
            ? "You must be logged in to delete a post"
            : "Failed to delete post",
        );
      },
      onSettled: async () => {
        await utils.meal.invalidate();
      },
    });

  const handleDelete = () => {
    if (selectedNutritionIds.length > 0) {
      mutate(selectedNutritionIds);
    } else {
      toast.error("No items selected");
    }
  };

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
        <Button onClick={() => handleDelete()}>
          <Trash size={24} />
        </Button>
      </div>
      {/* Nutrition cards */}
      <div>
        {meal?.nutrition.map((item, index) => (
          <NutritionCard key={item.id} nutritionItem={item} />
        ))}
      </div>
    </div>
  );
}
