export function getSpirits() {
  // const out = new Set(
  //   recipes.reduce(
  //     (prev, recipe) => [
  //       ...prev,
  //       ...recipe.ingredients
  //         .filter((ing) => ing.ounces && ing.ounces >= 1)
  //         .map((ing) => ing.name),
  //     ],
  //     [] as string[]
  //   )
  // );
  return [
    "Batavia Arrack",
    "Rye",
    "Bourbon",
    "Mezcal",
    "Whiskey",
    "Brandy",
    "Aquavit",
    "Rum",
    "Pisco",
    "Gin",
    "Tequila",
    "Cachaca",
    "Vodka",
  ].sort();
  // return out ? Array.from(out).filter((v) => v.trim().length > 0) : [];
}
