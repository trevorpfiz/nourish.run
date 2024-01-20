"use client";

import * as React from "react";
import { atom, useAtom } from "jotai";

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

import { selectedFoodItemsAtom } from "~/components/track/food-item-card";
import { ReviewItemsForm } from "~/components/track/review-items-form";
import { useMediaQuery } from "~/hooks/use-media-query";

export const reviewDrawerOpenAtom = atom(false);

export function ReviewDrawerDialog() {
  const [reviewDrawerOpen, setReviewDrawerOpen] = useAtom(reviewDrawerOpenAtom);
  const [selectedFoodItems] = useAtom(selectedFoodItemsAtom);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={reviewDrawerOpen} onOpenChange={setReviewDrawerOpen}>
        <DialogTrigger asChild>
          <Button
            variant="primary"
            size="lg"
            disabled={selectedFoodItems.length <= 0}
            className="w-full rounded-full"
            onClick={() => setReviewDrawerOpen(true)}
          >
            Review{" "}
            <Badge variant="secondary" className="ml-2">
              {selectedFoodItems.length}
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
          disabled={selectedFoodItems.length <= 0}
          className="w-full rounded-full"
          onClick={() => setReviewDrawerOpen(true)}
        >
          Review{" "}
          <Badge variant="secondary" className="ml-2">
            {selectedFoodItems.length}
          </Badge>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Review selected items</DrawerTitle>
        </DrawerHeader>
        <ReviewItemsForm />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
