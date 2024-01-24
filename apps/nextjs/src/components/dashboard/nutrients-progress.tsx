import React from "react";

import { cn } from "@nourish/ui";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@nourish/ui/accordion";

import { NutrientItem } from "~/components/dashboard/nutrient-item";
import { categoryOrder, idToOrderHierarchyMap } from "~/lib/constants";
import { api } from "~/trpc/server";

// Function to add left padding based on the nutrient class
const getPaddingClass = (hierarchyString: string) => {
  const depth = hierarchyString.split(".").length - 1;
  switch (depth) {
    case 0:
      return "pl-0";
    case 1:
      return "pl-4";
    case 2:
      return "pl-8";
    case 3:
      return "pl-12";
    // Add more cases if needed
    default:
      return "";
  }
};

const parseHierarchy = (hierarchyString: string) => {
  return hierarchyString.split(".").map(Number);
};

const compareHierarchy = (a, b) => {
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const levelA = i < a.length ? a[i] : 0; // Treat missing levels as 0
    const levelB = i < b.length ? b[i] : 0;

    if (levelA !== levelB) {
      return levelA - levelB;
    }
  }
  return 0;
};

const excludedIds = [6, 4, 5];
const excludedSubheadings = [
  "Polyunsaturated",
  "Medium-Chain Triglycerides (MCTs)",
];
const aggregationIds = [1262, 1261, 1260];

const NutrientsProgress = async () => {
  const nutrientsData = await api.nutrient.all();

  // Filter out specific IDs and subheadings
  const filteredNutrients = nutrientsData.filter(
    (nutrient) => !excludedIds.includes(nutrient.id),
  );

  // Create a type for the nutrient categories map
  type NutrientCategoryMap = Record<string, typeof nutrientsData>;

  // Sort nutrients based on the hierarchy in idToOrderHierarchyMap
  const sortedNutrients = filteredNutrients.sort((a, b) => {
    const hierarchyA = parseHierarchy(idToOrderHierarchyMap[a.id] || "999");
    const hierarchyB = parseHierarchy(idToOrderHierarchyMap[b.id] || "999");
    const hierarchyComparison = compareHierarchy(hierarchyA, hierarchyB);

    if (hierarchyComparison !== 0) return hierarchyComparison;

    // If hierarchies are the same, fall back to comparing group names
    return (a.group_name || "").localeCompare(b.group_name || "");
  });

  // Group nutrients by category
  const nutrientsByCategory: NutrientCategoryMap = sortedNutrients.reduce(
    (acc, nutrient) => {
      const { category } = nutrient;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(nutrient);
      return acc;
    },
    {} as NutrientCategoryMap,
  );

  // Create the accordion items dynamically
  const accordionItems = categoryOrder.map((category) => {
    const items = nutrientsByCategory[category] || [];
    let lastSubcategory = "";

    return (
      <AccordionItem key={category} value={category.toLowerCase()}>
        <AccordionTrigger>{category}</AccordionTrigger>
        <AccordionContent className="flex w-full flex-col gap-2">
          {items.map((nutrient, index) => {
            const hierarchyString = idToOrderHierarchyMap[nutrient.id] || "";
            const paddingClass = getPaddingClass(hierarchyString);

            // Determine if a subheader should be rendered
            const renderSubheader =
              nutrient.class && nutrient.class !== lastSubcategory;
            if (renderSubheader) {
              lastSubcategory = nutrient.class;
            }

            return (
              <React.Fragment key={nutrient.id}>
                {renderSubheader && (
                  <div className={cn("font-bold", paddingClass)}>
                    {nutrient.class}
                  </div>
                )}
                <NutrientItem
                  name={nutrient.name ?? "Unnamed"}
                  currentValue={20} // Example current value
                  dailyValue={nutrient.daily_value ?? "0"}
                  unit={nutrient.unit ?? "g"}
                  className={paddingClass}
                />
              </React.Fragment>
            );
          })}
        </AccordionContent>
      </AccordionItem>
    );
  });

  return (
    <Accordion
      type="multiple"
      defaultValue={categoryOrder.map((c) => c.toLowerCase())}
      className="w-full px-4"
    >
      {accordionItems}
    </Accordion>
  );
};

export { NutrientsProgress };
