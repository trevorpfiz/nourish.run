"use client";

import * as React from "react";
import { atom, useAtom } from "jotai";

import type { ReviewFoodsForm } from "@nourish/validators";
import { Badge } from "@nourish/ui/badge";
import { Button } from "@nourish/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@nourish/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@nourish/ui/drawer";
import { useFieldArrayFormContext } from "@nourish/ui/form";

import { ReviewItemsForm } from "~/components/track/review-items-form";
import { useMediaQuery } from "~/hooks/use-media-query";

export const reviewDrawerOpenAtom = atom(false);

export function ReviewDrawerDialog() {
  const [reviewDrawerOpen, setReviewDrawerOpen] = useAtom(reviewDrawerOpenAtom);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const form = useFieldArrayFormContext<ReviewFoodsForm>();

  if (isDesktop) {
    return (
      <Dialog open={reviewDrawerOpen} onOpenChange={setReviewDrawerOpen}>
        <DialogTrigger asChild>
          <Button
            variant="primary"
            size="lg"
            disabled={form.fields.length <= 0}
            className="w-full rounded-full"
            onClick={() => setReviewDrawerOpen(true)}
          >
            Review{" "}
            <Badge variant="secondary" className="ml-2">
              {form.fields.length}
            </Badge>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Review selected items</DialogTitle>
          </DialogHeader>
          <ReviewItemsForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer
      shouldScaleBackground={true}
      open={reviewDrawerOpen}
      onOpenChange={setReviewDrawerOpen}
      onClose={() => (document.body.style.background = "")}
    >
      <DrawerTrigger asChild>
        <Button
          variant="primary"
          size="lg"
          disabled={form.fields.length <= 0}
          className="w-full rounded-full"
          onClick={() => setReviewDrawerOpen(true)}
        >
          Review{" "}
          <Badge variant="secondary" className="ml-2">
            {form.fields.length}
          </Badge>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Review selected items</DrawerTitle>
        </DrawerHeader>
        <ReviewItemsForm />
        <DrawerFooter className="pt-0">
          {/* <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose> */}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
