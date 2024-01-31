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
      // When mutate is called:
      onMutate: async (ids) => {
        // Clear selected items
        setSelectedNutritionIds([]);

        // Cancel any outgoing refetches
        // (so they don't overwrite our optimistic update)
        await utils.meal.all.cancel();

        // Snapshot the previous value
        const previousMealData = utils.meal.byId.getData({ id: props.mealId });

        // Optimistically update to the new value
        utils.meal.byId.setData({ id: props.mealId }, (old) => {
          if (!old) {
            return undefined;
          }

          return {
            ...old,
            nutrition: old.nutrition.filter((item) => !ids.includes(item.id)),
          };
        });

        // Return a context object with the snapshotted value
        return { previousMealData };
      },
      // If the mutation fails,
      // use the context returned from onMutate to roll back
      onError: (err, ids, context) => {
        if (!context) {
          return;
        }

        utils.meal.byId.setData({ id: props.mealId }, context.previousMealData);

        toast.error(
          err?.data?.code === "UNAUTHORIZED"
            ? "You must be logged in to delete a food entry"
            : "Failed to delete food entry",
        );
      },
      onSettled: async () => {
        // Sync with server once mutation has settled
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
