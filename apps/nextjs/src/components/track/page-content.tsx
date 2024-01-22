"use client";

import { FieldArrayForm, Form, useFieldArray, useForm } from "@nourish/ui/form";
import { ReviewFoodsFormSchema } from "@nourish/validators";

import { ReviewDrawerDialog } from "~/components/track/review-drawer";
import SearchResults from "~/components/track/search-results";

function PageContent() {
  const form = useForm({
    schema: ReviewFoodsFormSchema,
    defaultValues: {
      foods: [],
    },
  });

  const fieldArray = useFieldArray({
    name: "foods",
    control: form.control,
  });

  return (
    <Form {...form}>
      <FieldArrayForm {...form} {...fieldArray}>
        {/* Content */}
        <main className="flex h-full w-full flex-col items-center gap-2 overflow-y-auto overflow-x-hidden px-4 pb-12 pt-4">
          {/* Search results */}
          <SearchResults />
        </main>

        {/* Review button */}
        {/* <ReviewButton /> */}

        {/* Review button and drawer / dialog */}
        {/* <ReviewDrawerDialog /> */}

        <div className="flex-shrink-0 px-4">
          <ReviewDrawerDialog />
        </div>
      </FieldArrayForm>
    </Form>
  );
}

export { PageContent };
