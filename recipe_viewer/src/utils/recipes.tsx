import { getSpirits } from "@/utils/spirits";
import fs from "fs";
import path from "path";

// Types for our cocktail recipe
export interface Recipe {
  title: string;
  category?: string;
  description?: string;
  source?: string;
  garnish?: string;
  ingredients: Ingredient[];
  spirits: string[];
}

interface Ingredient {
  name: string;
  ounces: number | null;
  numerator: number | null;
  denominator: number | null;
}

function splitCsvLine(line: string): string[] {
  const result: string[] = [];
  let currentField = "";
  let isInQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') isInQuotes = !isInQuotes;
    else if (char === "," && !isInQuotes) {
      // End of field
      result.push(currentField.trim());
      currentField = "";
    } else {
      currentField += char;
    }
  }
  result.push(currentField.trim());
  return result;
}

// Function to parse the CSV content
function parseCocktailCSV(csvContent: string): Recipe[] {
  const spirits = new Set(getSpirits());
  const lines = csvContent.split("\n").map((line) => line.trim());
  const recipes = [];
  let recipe = { title: "", ingredients: [], spirits: [] } as Recipe;

  let currentField: keyof Recipe | null = null;
  for (const line of lines) {
    if (!line) continue;

    const columns = splitCsvLine(line);

    if (columns[0].trim().toLowerCase() === "title") {
      if (recipe.title && recipe.ingredients && recipe.ingredients.length > 0) {
        recipes.push(recipe);
        recipe = { title: "", ingredients: [], spirits: [] };
      }
    }

    // Check if this is a header row
    if (columns[0] && columns[0].length > 0 && !columns[0].startsWith(" ")) {
      currentField = columns[0] as keyof Recipe;

      if (currentField !== "ingredients" && currentField !== "spirits") {
        recipe[currentField] = columns[1];
      }
    }

    if (
      columns.length >= 4 &&
      currentField === "ingredients" &&
      columns[4].trim().length > 0
    ) {
      const ounces = columns[1].trim().length > 0 ? Number(columns[1]) : null;
      recipe.ingredients!.push({
        name: columns[4],
        ounces: ounces,
        numerator: columns[2].trim().length > 0 ? Number(columns[2]) : null,
        denominator: columns[3].trim().length > 0 ? Number(columns[3]) : null,
      });
      if (ounces && ounces >= 1) {
        const intersect = Array.from(
          new Set(columns[4].split(" ")).intersection(spirits)
        );
        if (columns[4] === "Batavia Arrack")
          recipe.spirits.push("Batavia Arrack");
        else if (intersect.length > 0) recipe.spirits.push(intersect[0]);
      }
    }
  }

  if (recipe.title && recipe.ingredients && recipe.ingredients.length > 0) {
    recipes.push(recipe);
  }

  return recipes
    .filter((recipe) => recipe.category !== "Skip")
    .sort((a, b) => (a.title > b.title ? 1 : -1));
}

// Example of how to use the parsed data
export async function fetchRecipes() {
  try {
    // Node.js usage
    const filePath = path.join(process.cwd(), "public", "source.csv");
    const text = fs.readFileSync(filePath, "utf8");
    return parseCocktailCSV(text);
  } catch (error) {
    console.error("Error loading recipe:", error);
  }
}

export function getCategories(recipes: Recipe[]) {
  const out = new Set(
    recipes.filter((recipe) => recipe.category).map((recipe) => recipe.category)
  );
  return Array.from(out);
}

export function getIngredients(recipes: Recipe[]) {
  const out = new Set(
    recipes.reduce(
      (prev, recipe) => [...prev, ...recipe.ingredients.map((ing) => ing.name)],
      [] as string[]
    )
  );
  return Array.from(out);
}
