"use client";

import * as React from "react";
import { addDays, format, isToday, subDays } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@nourish/ui";
import { Calendar } from "@nourish/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@nourish/ui/popover";

const DaySelector = () => {
  const [date, setDate] = React.useState<Date>(new Date());

  const handlePrevDay = () => setDate((currentDate) => subDays(currentDate, 1));
  const handleNextDay = () => setDate((currentDate) => addDays(currentDate, 1));

  const handleSelect = (newDate: Date | undefined) => {
    if (newDate) setDate(newDate);
  };

  const formatDateDisplay = (date: Date) => {
    return isToday(date) ? "Today" : format(date, "EEE, MMM dd");
  };

  return (
    <div className="flex flex-row items-center">
      <ChevronLeft
        className="mr-2 cursor-pointer"
        strokeWidth={3}
        onClick={handlePrevDay}
      />

      <Popover>
        <PopoverTrigger asChild>
          <span className="text-sm font-bold uppercase">
            {formatDateDisplay(date)}
          </span>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <ChevronRight
        className={cn("ml-2 cursor-pointer", {
          "text-muted-foreground": isToday(date),
        })}
        strokeWidth={3}
        onClick={isToday(date) ? undefined : handleNextDay}
      />
    </div>
  );
};

export { DaySelector };
