export function getFirstServingSize(servingSizes: string) {
  // Match the pattern of serving size followed by weight in parentheses
  const match = servingSizes.match(/[^,]*\([^)]+\)/g);

  // If there's a match, return the first one, otherwise return the entire string
  return match ? match[0] : servingSizes;
}

export function parseServingSizes(servingSizes: string) {
  if (!servingSizes) return [];

  const servingSizeRegex = /[^,]*\([^)]+\)/g;
  return servingSizes.match(servingSizeRegex) ?? [];
}
