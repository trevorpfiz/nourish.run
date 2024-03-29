"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { useAtom } from "jotai";
import { Loader2 } from "lucide-react";

import type { ReviewFoodsForm } from "@nourish/validators";
import { Badge } from "@nourish/ui/badge";
import { Button } from "@nourish/ui/button";
import {
  FormField,
  FormItem,
  FormMessage,
  useFieldArrayFormContext,
} from "@nourish/ui/form";
import { Input } from "@nourish/ui/input";
import { toast } from "@nourish/ui/toast";

import { reviewDrawerOpenAtom } from "~/components/track/review-drawer";
import { ReviewFoodItemCard } from "~/components/track/review-food-item-card";
import { api } from "~/trpc/react";

function ReviewItemsForm() {
  const form = useFieldArrayFormContext<ReviewFoodsForm>();
  const [, setReviewDrawerOpen] = useAtom(reviewDrawerOpenAtom);
  const [internalTime, setInternalTime] = useState(format(new Date(), "HH:mm"));
  const [displayTime, setDisplayTime] = useState(format(new Date(), "h:mm aa"));
  const timeInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const utils = api.useUtils();
  const createNutrition = api.nutrition.createMany.useMutation({
    onSuccess: async () => {
      await utils.meal.invalidate();
      setReviewDrawerOpen(false);
      form.reset();
      router.push("/dashboard");
    },
    onError: (err) => {
      toast.error(
        err?.data?.code === "UNAUTHORIZED"
          ? "You must be logged in to track meals"
          : "Failed to log meal",
      );
    },
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setInternalTime(format(now, "HH:mm"));
      setDisplayTime(format(now, "h:mm aa"));
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  function onSubmit(data: ReviewFoodsForm) {
    const submissionData = {
      foods: data.foods,
      time: new Date(
        `${format(new Date(), "yyyy-MM-dd")}T${internalTime}`,
      ).toISOString(),
    };

    createNutrition.mutate(submissionData);
  }

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInternalTime(event.target.value);
    const timeInDate = new Date(`1970-01-01T${event.target.value}`);
    setDisplayTime(format(timeInDate, "h:mm aa"));
  };

  const focusTimeInput = () => {
    if (!timeInputRef.current) return;
    // Check if showPicker is available
    if (timeInputRef.current?.showPicker) {
      timeInputRef.current.showPicker();
    } else {
      timeInputRef.current?.focus();
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="max-h-[65dvh] overflow-y-auto px-4 pb-12">
        <FormField
          control={form.control}
          name="foods"
          render={({ field }) => (
            <FormItem>
              {form.fields.map((field, index) => (
                <ReviewFoodItemCard key={field.foodId} index={index} />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="flex w-full flex-col gap-2 px-4">
        <div className="relative w-full">
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="relative z-10 w-full rounded-full opacity-100"
            onClick={focusTimeInput}
          >
            Today at {displayTime}
          </Button>
          <Input
            type="time"
            ref={timeInputRef}
            className="absolute inset-0 z-0 h-full w-full cursor-pointer opacity-0"
            onChange={handleTimeChange}
            value={internalTime}
          />
        </div>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full rounded-full uppercase"
          disabled={form.fields.length === 0 || createNutrition.isPending}
        >
          {createNutrition.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Adding foods...
            </>
          ) : (
            <>
              Add{" "}
              <Badge variant="secondary" className="ml-2">
                {form.fields.length}
              </Badge>
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

export { ReviewItemsForm };
