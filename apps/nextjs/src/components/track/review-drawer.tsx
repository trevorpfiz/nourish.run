"use client";

import * as React from "react";
import { atom, useAtom } from "jotai";

import { cn } from "@nourish/ui";
import { Badge } from "@nourish/ui/badge";
import { Button } from "@nourish/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@nourish/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@nourish/ui/drawer";
import { Input } from "@nourish/ui/input";
import { Label } from "@nourish/ui/label";

import { selectedFoodItemsAtom } from "~/components/track/food-item-card";
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
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm />
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
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function ProfileForm({ className }: React.ComponentProps<"form">) {
  return (
    <form className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" defaultValue="shadcn@example.com" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="username">Username</Label>
        <Input id="username" defaultValue="@shadcn" />
      </div>
      <Button type="submit">Save changes</Button>
    </form>
  );
}
