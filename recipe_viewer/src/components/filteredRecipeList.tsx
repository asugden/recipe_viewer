"use client";

import FilterPopover from "@/components/filterPopover";
import { RecipeBlock } from "@/components/recipeBlock";
import { Recipe } from "@/utils/recipes";
import { getSpirits } from "@/utils/spirits";
import { Box, Button, Center, SimpleGrid } from "@chakra-ui/react";
import { useMemo, useState } from "react";

function getCategories(recipes: Recipe[]) {
  const out = new Set(
    recipes
      .map((recipe) => recipe.category)
      .filter((item) => item !== undefined)
  );
  return out ? Array.from(out).filter((v) => v.trim().length > 0) : [];
}

function getIngredients(recipes: Recipe[]) {
  const out = new Set(
    recipes.reduce(
      (prev, recipe) => [...prev, ...recipe.ingredients.map((ing) => ing.name)],
      [] as string[]
    )
  );
  return out ? Array.from(out).filter((v) => v.trim().length > 0) : [];
}

export default function FilteredRecipeList({ recipes }: { recipes: Recipe[] }) {
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [ingredientFilter, setIngredientFilter] = useState<string[]>([]);
  const [spiritFilter, setSpiritFilter] = useState<string[]>([]);
  const categories = useMemo(() => getCategories(recipes).sort(), [recipes]);
  const ingredients = useMemo(() => getIngredients(recipes).sort(), [recipes]);
  const spirits = useMemo(() => getSpirits().sort(), []);

  return (
    <Box position="relative" zIndex={10}>
      <Center position="relative" pt="25px" zIndex={10}>
        <Button
          fontSize="20px"
          bg="none"
          borderTop="1px solid black"
          borderBottom="1px solid black"
          onClick={() => {
            setCategoryFilter([]);
            setIngredientFilter([]);
            setSpiritFilter([]);
          }}
          _hover={{ fontWeight: "bold" }}
          size={{ base: "sm", sm: "md" }}
        >
          &times;
        </Button>
        <FilterPopover
          title="Category"
          options={categories}
          filter={categoryFilter}
          fn={setCategoryFilter}
        />
        <FilterPopover
          title="Spirit"
          options={spirits}
          filter={spiritFilter}
          fn={setSpiritFilter}
        />
        {/* <FilterPopover
          title="Ingredient"
          options={ingredients}
          filter={ingredientFilter}
          fn={setIngredientFilter}
        /> */}
      </Center>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        p={{ base: 8, md: 20 }}
        gap="20px"
      >
        {recipes &&
          recipes
            .filter(
              (recipe) =>
                (categoryFilter.length === 0 ||
                  (recipe.category &&
                    categoryFilter.includes(recipe.category))) &&
                (spiritFilter.length === 0 ||
                  recipe.spirits.reduce(
                    (prev, ing) => (prev ? prev : spiritFilter.includes(ing)),
                    false
                  ))
            )
            .map((recipe, idx) => (
              <Box
                key={`${recipe.title}-${idx}`}
                justifyItems="center"
                zIndex="1"
              >
                <RecipeBlock recipe={recipe} />
              </Box>
            ))}
      </SimpleGrid>
    </Box>
  );
}
