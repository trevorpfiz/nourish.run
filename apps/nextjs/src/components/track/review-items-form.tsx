"use client";

import { useAtom } from "jotai";

import type { ReviewFoodItem, ReviewFoodsForm } from "@nourish/validators";
import { Badge } from "@nourish/ui/badge";
import { Button } from "@nourish/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  useFieldArray,
  useForm,
} from "@nourish/ui/form";
import {
  ReviewFoodItemSchema,
  ReviewFoodsFormSchema,
} from "@nourish/validators";

import { selectedFoodItemsAtom } from "~/components/track/food-item-card";
import { ReviewFoodItemCard } from "~/components/track/review-food-item-card";

function ReviewItemsForm() {
  const [selectedFoodItems, setSelectedFoodItems] = useAtom(
    selectedFoodItemsAtom,
  );

  const form = useForm({
    schema: ReviewFoodsFormSchema,
    defaultValues: {
      foods: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "foods",
    control: form.control,
  });

  function onSubmit(data: ReviewFoodsForm) {
    // Handle form submission
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 px-4">
        <FormField
          control={form.control}
          name="foods"
          render={({ field }) => (
            <FormItem>
              {selectedFoodItems.map((foodItem, index) => (
                <ReviewFoodItemCard
                  key={index}
                  form={form}
                  foodItem={foodItem}
                  index={index}
                />
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
            {selectedFoodItems.length}
          </Badge>
        </Button>
      </form>
    </Form>
  );
}

export { ReviewItemsForm };
