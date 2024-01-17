"use client";

import React, { useEffect, useRef } from "react";

const CircularProgressBar = ({ macros }) => {
  const svgRef = useRef(null);
  const totalCalories = macros.reduce((acc, macro) => acc + macro.calories, 0);

  useEffect(() => {
    const progressElements = svgRef.current.querySelectorAll(".progress");
    let cumulativePercent = 0;

    progressElements.forEach((progress, index) => {
      const percentage = (macros[index].calories / totalCalories) * 100;
      const radius = progress.r.baseVal.value;
      const circumference = 2 * Math.PI * radius;

      // Calculate the stroke dash offset for this segment
      const offset = circumference - (circumference * percentage) / 100;

      // The starting point for the next segment
      cumulativePercent += percentage;

      // Set the initial styles for the stroke dash array and offset
      progress.style.strokeDasharray = `${circumference}`;
      progress.style.strokeDashoffset = `${circumference}`;

      // Set the transition property
      progress.style.transition = `stroke-dashoffset ${macros[index].animateTime}s ease-in forwards`;

      // Set the timeout to trigger the animation
      setTimeout(() => {
        progress.style.strokeDashoffset = `${offset}`;
      }, 0);
    });
  }, [macros, totalCalories]);

  return (
    <div className="relative">
      <svg
        ref={svgRef}
        className="h-80 w-80"
        viewBox="0 0 200 200"
        style={{ transform: "rotate(-90deg)" }}
      >
        {macros.map((macro, index) => (
          <circle
            key={macro.name}
            className="progress"
            cx="100"
            cy="100"
            r="70"
            fill="none"
            stroke={macro.color}
            strokeWidth="15"
            // Inline styles are set in the useEffect hook
          />
        ))}
      </svg>
    </div>
  );
};

const MacrosComponent = () => {
  const macros = [
    {
      name: "Fat",
      calories: 500,
      color: "#F59E0B", // amber
      animateTime: 1, // Animation time in seconds
    },
    {
      name: "Carbs",
      calories: 500,
      color: "#7C3AED", // violet
      animateTime: 1,
    },
    {
      name: "Protein",
      calories: 1000,
      color: "#10B981", // lime
      animateTime: 1,
    },
    // You can add "Remaining" if you want to show it as well
  ];

  return <CircularProgressBar macros={macros} />;
};

export { MacrosComponent };
