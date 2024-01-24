import Link from "next/link";
import { MoreHorizontal, Trash, X } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@nourish/ui/dropdown-menu";

const MealTopBar = () => {
  return (
    <nav className="sticky top-0 z-10 flex min-h-10 w-full max-w-2xl flex-row items-center justify-center bg-white p-4">
      <Link href="/dashboard">
        <X size={24} className="hover:opacity:60 cursor-pointer" />
      </Link>
      <div className="flex-1"></div> {/* Spacer div */}
      <span className="text-sm font-bold uppercase">Time</span>
      <div className="flex-1"></div> {/* Spacer div */}
      <div className="h-10 w-10 rounded-full">
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
              <DropdownMenuItem>
                <Trash className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export { MealTopBar };
