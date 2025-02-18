import { RecipeBlock } from "@/components/recipeBlock";
import { fetchRecipes } from "@/utils/recipes";

export default async function RecipePage({
  params,
}: {
  params: Promise<{ recipe: string }>;
}) {
  const recipeName = decodeURIComponent((await params).recipe);
  const recipes = await fetchRecipes();

  if (!recipes) return <></>;
  const recipe = recipes.filter((item) => item.title === recipeName)[0];
  if (!recipe) return <></>;

  return (
    <>
      <RecipeBlock recipe={recipe} />
    </>
  );
}
