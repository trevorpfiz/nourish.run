"use client";

import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Menu, Notebook, Plus, UsersRound } from "lucide-react";

import { cn } from "@nourish/ui";
import { Button } from "@nourish/ui/button";

interface Tab {
  name: string;
  href: string;
  icon: LucideIcon;
}

const tabs: Tab[] = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Plan", href: "/dashboard/plan", icon: Notebook },
  { name: "Group", href: "/dashboard/group", icon: UsersRound },
  { name: "More", href: "/dashboard/more", icon: Menu },
];

const Tabs = () => {
  const pathname = usePathname();

  return (
    <div className="relative z-10 w-full max-w-2xl bg-white px-8 py-4">
      {/* Floating "+" button */}
      <div className="absolute bottom-0 right-4 flex items-center justify-center pb-24">
        <Button className="h-12 w-12 rounded-full p-2" asChild>
          <Link href="/dashboard/track">
            <Plus color="white" strokeWidth={3} />
          </Link>
        </Button>
      </div>
      {/* Tabs */}
      <div className="flex flex-row items-center justify-between bg-transparent">
        {tabs.map((tab) => (
          <Link
            key={tab.name}
            href={tab.href}
            className={cn(
              "flex flex-col items-center justify-center text-sm text-gray-400 hover:text-black",
              {
                "text-black": pathname === tab.href,
              },
            )}
          >
            <tab.icon
              size={24}
              className={cn({
                "text-black": pathname === tab.href,
                "transition-colors duration-200": true,
              })}
            />
            <span className="pt-1">{tab.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export { Tabs };
