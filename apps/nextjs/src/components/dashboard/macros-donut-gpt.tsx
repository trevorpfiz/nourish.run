"use client";

import { Doughnut } from "react-chartjs-2";

import "chart.js/auto";

const CaloricIntakeChart = ({
  fatCalories,
  carbCalories,
  proteinCalories,
  totalTargetCalories,
}) => {
  // Calculate the actual percentages
  const fatPercentage = (fatCalories / totalTargetCalories) * 100;
  const carbPercentage = (carbCalories / totalTargetCalories) * 100;
  const proteinPercentage = (proteinCalories / totalTargetCalories) * 100;

  // Calculate the unfilled portion
  const unfilledPercentage =
    100 - (fatPercentage + carbPercentage + proteinPercentage);

  const data = {
    labels: ["Fat", "Carbs", "Protein", "Unfilled"],
    datasets: [
      {
        label: "Caloric Intake",
        data: [
          fatPercentage,
          carbPercentage,
          proteinPercentage,
          unfilledPercentage,
        ],
        backgroundColor: ["#F59E0B", "#A855F7", "#10B981", "#f3f4f6"], // The last color is the light gray for the unfilled portion
        hoverOffset: 0,
        borderWidth: 0, // Set border width to 0 to remove gaps
        cutout: "75%",
        circumference: 360,
        rotation: -90, // Adjust the rotation if needed to align starting positions
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false, // Disable tooltips if you do not want to show them
      },
    },
    maintainAspectRatio: false,
    cutoutPercentage: 80,
    rotation: 1 * Math.PI,
    circumference: 2 * Math.PI,
    animation: {
      animateRotate: true,
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default CaloricIntakeChart;
