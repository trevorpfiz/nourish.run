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
