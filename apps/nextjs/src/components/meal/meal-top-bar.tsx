"use client";

import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Clock, MoreHorizontal, Trash, X } from "lucide-react";

import type { RouterOutputs } from "@nourish/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@nourish/ui/dropdown-menu";
import { toast } from "@nourish/ui/toast";

import { api } from "~/trpc/react";

interface MealTopBarProps {
  meal: Promise<RouterOutputs["meal"]["byId"]>;
}

const MealTopBar = (props: MealTopBarProps) => {
  const meal = use(props.meal);
  const router = useRouter();
  const utils = api.useUtils();

  if (!meal) {
    return null;
  }

  const deleteMealMutation = api.meal.delete.useMutation({
    onSuccess: async () => {
      await utils.meal.invalidate();

      toast.success("Food entry deleted");

      // Redirect to the dashboard
      router.push("/dashboard");
    },
    onError: (err) => {
      toast.error(
        err?.data?.code === "UNAUTHORIZED"
          ? "You must be logged in to delete a food entry"
          : "Failed to delete food entry",
      );
    },
  });

  const handleDelete = () => {
    deleteMealMutation.mutate(meal.id);
  };

  const formattedDate = format(new Date(meal.startTime!), "p");

  return (
    <nav className="sticky top-0 z-10 flex min-h-10 w-full max-w-2xl flex-row items-center justify-center bg-white p-4">
      <Link href="/dashboard">
        <X size={24} className="hover:opacity:60 cursor-pointer" />
      </Link>
      <div className="flex-1"></div> {/* Spacer div */}
      <div className="flex flex-row items-center gap-1">
        <Clock size={16} className="text-muted-foreground" />
        <p className="text-sm font-bold uppercase">{formattedDate ?? "Meal"}</p>
      </div>
      <div className="flex-1"></div> {/* Spacer div */}
      {/* edit meal options */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <MoreHorizontal
            size={24}
            className="hover:opacity:60 cursor-pointer"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Edit meal</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={handleDelete}>
              <Trash className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export { MealTopBar };
