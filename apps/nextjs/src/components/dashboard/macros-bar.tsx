"use client";

import { BarChart, Card, Subtitle, Title } from "@tremor/react";
import {
  addMinutes,
  closestIndexTo,
  format,
  parseISO,
  startOfDay,
} from "date-fns";

// Define a type for meal data
interface MealData {
  time: string; // ISO string for meal time
  Fat: number;
  Carbs: number;
  Protein: number;
}

// Meal data with specific ISO times
const sampleMeals: MealData[] = [
  { time: "2023-11-09T07:01:00Z", Fat: 300, Carbs: 200, Protein: 300 }, // Breakfast
  { time: "2023-11-09T011:31:00Z", Fat: 100, Carbs: 500, Protein: 200 }, // Lunch
  { time: "2023-11-09T14:01:00Z", Fat: 20, Carbs: 35, Protein: 25 }, // Snack
  { time: "2023-11-09T18:01:00Z", Fat: 400, Carbs: 300, Protein: 500 }, // Dinner
  // ... other meals
];

// Generate fixed times for every 30 minutes in a day
const generateFixedTimes = (baseDate: Date): Date[] => {
  const startTime: Date = startOfDay(baseDate); // Start at midnight of the current day
  const fixedTimes: Date[] = [];
  for (let i = 0; i < 48; i++) {
    // 24 hours * 2 slots per hour
    fixedTimes.push(addMinutes(startTime, i * 30));
  }
  return fixedTimes;
};

// Function to round time to the nearest 30-minute window
const getNearestHalfHour = (date: Date): string => {
  const minutes = date.getMinutes();
  const roundedMinutes = minutes >= 30 ? 30 : 0;
  const roundedDate = new Date(date);
  roundedDate.setMinutes(roundedMinutes, 0, 0); // Set seconds and milliseconds to 0 for consistency

  return format(roundedDate, "HH:mm");
};

const date: Date = new Date(); // Your sample date
const fixedHalfHours: Date[] = generateFixedTimes(date);

// Convert fixed half-hours to strings for chartData
const fixedTimeStrings: string[] = fixedHalfHours.map((time) =>
  format(time, "HH:mm"),
);

// Initialize chart data with times as strings and zeroed macronutrients
const chartData: MealData[] = fixedTimeStrings.map((time) => ({
  time: time, // Use the string representation of time
  Fat: 0,
  Carbs: 0,
  Protein: 0,
}));

sampleMeals.forEach((meal) => {
  const mealTime: Date = parseISO(meal.time);
  const roundedTime: string = getNearestHalfHour(mealTime, fixedHalfHours); // Pass the array of fixed Date objects
  const dataIndex: number = chartData.findIndex(
    (data) => data.time === roundedTime,
  );

  if (dataIndex !== -1) {
    chartData[dataIndex].Fat += meal.Fat;
    chartData[dataIndex].Carbs += meal.Carbs;
    chartData[dataIndex].Protein += meal.Protein;
  } else {
    // If there is no matching time slot, log an error or handle appropriately
    console.error(
      `Meal time ${roundedTime} does not match any fixed time slot.`,
    );
  }
});

const valueFormatter = (value) => `${value}`;

const MacrosBar = () => (
  <Card className="px-1">
    <Title>Macronutrient Ratio per Meal</Title>
    <Subtitle>Daily intake ratios for fat, carbs, and protein.</Subtitle>
    <BarChart
      className="mt-6"
      data={chartData}
      index="time"
      categories={["Fat", "Carbs", "Protein"]}
      colors={["amber", "violet", "lime"]} // Gold for Fat, Turquoise for Carbs, YellowGreen for Protein
      stack={true}
      valueFormatter={valueFormatter}
      yAxisWidth={48}
      intervalType={"preserveStartEnd"} // This ensures that the first and last ticks are shown
      showXAxis={true}
      showYAxis={true}
      showAnimation={true}
      // Additional properties like animationDuration, showTooltip, etc., can be set as required.
    />
  </Card>
);

export { MacrosBar };
