"use client";

import type { ValueFormatter } from "@tremor/react";
import { BarChart } from "@tremor/react";
import { addMinutes, format, parseISO, startOfDay } from "date-fns";

// Define a type for meal data
interface MealData {
  time: string; // ISO string for meal time
  Fat: number | null;
  Carbs: number | null;
  Protein: number | null;
}

// Meal data with specific ISO times
const sampleMeals: MealData[] = [
  { time: "2023-11-09T07:01:00Z", Fat: 300, Carbs: 200, Protein: 300 }, // Breakfast
  { time: "2023-11-09T11:31:00Z", Fat: 100, Carbs: 500, Protein: 200 }, // Lunch
  { time: "2023-11-09T14:01:00Z", Fat: 20, Carbs: 35, Protein: 25 }, // Snack
  { time: "2023-11-09T18:01:00Z", Fat: 400, Carbs: 300, Protein: 500 }, // Dinner
  // ... other meals
];

// Function to round time to the nearest 30-minute window and format in 12-hour cycle
const roundToNearestHalfHour = (date: Date): string => {
  const minutes = date.getMinutes();
  const roundedMinutes = minutes >= 30 ? 30 : 0;
  date.setHours(
    date.getHours() + (minutes >= 30 && roundedMinutes === 0 ? 1 : 0),
    roundedMinutes,
    0,
    0,
  );
  return formatTime(date);
};

// Formatting function for time slots
const formatTime = (date: Date): string => {
  let formatted = format(date, "h:mma").toLowerCase();
  if (formatted.endsWith("00am") || formatted.endsWith("00pm")) {
    formatted = format(date, "ha").toLowerCase();
  }
  return formatted;
};

// Find the earliest meal time in local time and determine the start range for chart
const findStartRangeForChart = (meals: MealData[]): number => {
  let earliestHour = 24;
  meals.forEach((meal) => {
    const mealTime = parseISO(meal.time);
    earliestHour = Math.min(earliestHour, mealTime.getHours());
  });

  if (earliestHour < 3) {
    return 0; // Full day
  } else if (earliestHour < 6) {
    return 6; // 3:00am - 12am
  } else {
    return 12; // 6:00am - 12am
  }
};

const prepareChartData = (): MealData[] => {
  const date = new Date();
  const startRangeIndex = findStartRangeForChart(sampleMeals);
  const chartData: MealData[] = [];

  for (let i = startRangeIndex; i <= 48; i++) {
    const timeSlot = addMinutes(startOfDay(date), i * 30);
    const formattedTime = formatTime(timeSlot);

    chartData.push({
      time: formattedTime,
      Fat: null,
      Carbs: null,
      Protein: null,
    });
  }

  // Populate chart data with meal information
  sampleMeals.forEach((meal) => {
    const mealTime = parseISO(meal.time);
    const roundedMealTime = roundToNearestHalfHour(mealTime);
    const dataIndex = chartData.findIndex(
      (data) => data.time === roundedMealTime,
    );

    if (dataIndex !== -1) {
      chartData[dataIndex].Fat = (chartData[dataIndex].Fat ?? 0) + meal.Fat;
      chartData[dataIndex].Carbs =
        (chartData[dataIndex].Carbs ?? 0) + meal.Carbs;
      chartData[dataIndex].Protein =
        (chartData[dataIndex].Protein ?? 0) + meal.Protein;
    } else {
      console.error(
        `Meal time ${roundedMealTime} does not match any fixed time slot.`,
      );
    }
  });

  return chartData;
};

const valueFormatter: ValueFormatter = (value) => `${value}`;

const MacrosBar = () => {
  const chartData = prepareChartData();

  return (
    <div className="w-full">
      <BarChart
        className="h-40"
        data={chartData}
        index="time"
        categories={["Fat", "Carbs", "Protein"]}
        colors={["amber", "violet", "lime"]}
        stack={true}
        valueFormatter={valueFormatter}
        yAxisWidth={42}
        intervalType="preserveStartEnd" // ensures first and last ticks are shown
        showXAxis={true}
        showYAxis={true}
        showLegend={false}
        minValue={0}
        maxValue={2500}
        showAnimation={true}
        tickGap={10}
      />
    </div>
  );
};

export { MacrosBar };
