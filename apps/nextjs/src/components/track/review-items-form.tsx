"use client";

import type { UseFormReturn } from "@nourish/ui/form";
import type { ReviewFoodsForm } from "@nourish/validators";
import { Badge } from "@nourish/ui/badge";
import { Button } from "@nourish/ui/button";
import {
  FormField,
  FormItem,
  FormMessage,
  useFieldArray,
  useFormContext,
} from "@nourish/ui/form";

import { ReviewFoodItemCard } from "~/components/track/review-food-item-card";

function ReviewItemsForm() {
  const form: UseFormReturn<ReviewFoodsForm> = useFormContext();

  const { fields } = useFieldArray({
    name: "foods",
    control: form.control,
  });

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
            {fields.map((field, index) => (
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
          {fields.length}
        </Badge>
      </Button>
    </form>
  );
}

export { ReviewItemsForm };
