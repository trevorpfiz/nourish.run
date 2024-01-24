import { Flex, ProgressBar, Text } from "@tremor/react";

import { cn } from "@nourish/ui";

interface NutrientItemProps {
  name: string;
  currentValue?: number;
  dailyValue?: string;
  unit: string;
  className?: string;
}

const NutrientItem = (props: NutrientItemProps) => {
  const { name, currentValue = 10, dailyValue, unit } = props;
  // Calculate the percentage of the daily value consumed
  const percentage = dailyValue
    ? (currentValue / parseFloat(dailyValue)) * 100
    : 0;

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
        color={percentage > 100 ? "red" : "gray"}
        className={cn("w-full", props.className)}
      />
    </div>
  );
};

export { NutrientItem };
