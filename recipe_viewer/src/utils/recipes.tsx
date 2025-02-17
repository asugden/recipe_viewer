import fs from 'fs';
import path from 'path';

// Types for our cocktail recipe
export interface Recipe {
  title: string;
  category?: string;
  description?: string;
  source?: string;
  garnish?: string;
  ingredients: Ingredient[];
}

interface Ingredient {
  name: string;
  ounces: number | null;
  numerator: number | null;
  denominator: number | null;
}

// Function to parse the CSV content
function parseCocktailCSV(csvContent: string): Recipe[] {
  const lines = csvContent.split('\n').map(line => line.trim());
  const recipes = [];
  let recipe = {title: '', ingredients: []} as Recipe;

  let currentField: keyof Recipe | null = null;
  for (const line of lines) {
    if (!line) continue;
    
    const columns = line.split(',').map(col => col.trim());

    if (columns[0].trim().toLowerCase() === 'title') {
      if (recipe.title && recipe.ingredients && recipe.ingredients.length > 0) {
        recipes.push(recipe);
        recipe = {title: '', ingredients: []};
      }
    }
    
    // Check if this is a header row
    if (columns[0] && !columns[0].startsWith(' ')) {
      currentField = columns[0] as keyof Recipe;
      
      if (currentField !== 'ingredients') {
        recipe[currentField] = columns[1];
      }
    } 

    // If it's an ingredient row
    else if (columns.length >= 4 && currentField === 'ingredients') {
      recipe.ingredients!.push({
        name: columns[4],
        ounces: columns[1].trim().length > 0 ? Number(columns[1]) : null,
        numerator: columns[2].trim().length > 0 ? Number(columns[2]) : null,
        denominator: columns[3].trim().length > 0 ? Number(columns[3]) : null,
      });
    }
  }

  if (recipe.title && recipe.ingredients && recipe.ingredients.length > 0) {
    recipes.push(recipe);
  }

  return recipes;
}

// Example of how to use the parsed data
export async function fetchRecipes() {
  try {
    // Node.js usage
    const filePath = path.join(process.cwd(), 'public', 'source.csv');
    const text = fs.readFileSync(filePath, 'utf8');
    return parseCocktailCSV(text);
  } catch (error) {
    console.error('Error loading recipe:', error);
  }
}