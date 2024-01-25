import type { ProgressBarProps } from "@tremor/react";
import { Flex, ProgressBar, Text } from "@tremor/react";

import { cn } from "@nourish/ui";

interface NutrientItemProps {
  name: string;
  currentValue?: number;
  dailyValue?: string;
  unit: string;
  color?: ProgressBarProps["color"];
  className?: string;
}

const NutrientItem = (props: NutrientItemProps) => {
  const { name, currentValue = 10, dailyValue, unit, color } = props;
  // Calculate the percentage of the daily value consumed
  const percentage = dailyValue
    ? (currentValue / parseFloat(dailyValue)) * 100
    : 0;

  // Determine the progress bar color
  const progressBarColor = color ?? (percentage >= 100 ? "emerald" : "gray");

  return (
    <div className="flex w-full flex-col items-center gap-2">
      <Flex className={cn("w-full justify-between", props.className)}>
        <Text>{`${name} - ${currentValue} / ${
          dailyValue ?? "No Target"
        } ${unit}`}</Text>
        <Text>{`${percentage.toFixed(2)}%`}</Text>
      </Flex>
      <ProgressBar
        value={percentage}
        color={progressBarColor}
        className={cn("w-full", props.className)}
      />
    </div>
  );
};

export { NutrientItem };
