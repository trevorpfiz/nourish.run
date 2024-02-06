export function getFirstServingSize(servingSizes: string) {
  // Split the string on "),", and take the first element
  const splitSizes = servingSizes.split(/(?<=\)),\s?/);

  // Return the first serving size or the entire string if no split was done
  return splitSizes[0] ?? servingSizes;
}

export function parseServingSizes(servingSizes: string) {
  if (!servingSizes) return [];

  // Split the string on "),"
  return servingSizes.split(/(?<=\)),\s?/);
}

export function calculateTotalCalories(
  servingSize: string,
  caloriesPer100g: number,
  quantity: number,
) {
  // Extract the weight in grams from the serving size string
  const gramsMatch = servingSize.match(/(\d+\.?\d*)g\)/);
  let grams = 0;

  if (gramsMatch?.[1]) {
    // Parse the grams value
    grams = parseFloat(gramsMatch[1]);
  } else {
    // Handle the error case where grams are not found
    console.error("Invalid serving size format. Grams not found.");
    return 0;
  }

  // Calculate the total grams consumed
  const totalGrams = grams * quantity;

  // Calculate the total calories
  return (caloriesPer100g / 100) * totalGrams;
}
