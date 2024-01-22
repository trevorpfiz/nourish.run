"use client";

import type { ReviewFoodsForm } from "@nourish/validators";
import { Badge } from "@nourish/ui/badge";
import { Button } from "@nourish/ui/button";
import {
  FormField,
  FormItem,
  FormMessage,
  useFieldArrayFormContext,
} from "@nourish/ui/form";

import { ReviewFoodItemCard } from "~/components/track/review-food-item-card";

function ReviewItemsForm() {
  const form = useFieldArrayFormContext<ReviewFoodsForm>();

  function onSubmit(data: ReviewFoodsForm) {
    // Handle form submission
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 px-4">
      <FormField
        control={form.control}
        name="foods"
        render={({ field }) => (
          <FormItem>
            {form.fields.map((field, index) => (
              <ReviewFoodItemCard key={field.id} index={index} />
            ))}
            <FormMessage />
          </FormItem>
        )}
      />

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full rounded-full"
      >
        Review{" "}
        <Badge variant="secondary" className="ml-2">
          {form.fields.length}
        </Badge>
      </Button>
    </form>
  );
}

export { ReviewItemsForm };
