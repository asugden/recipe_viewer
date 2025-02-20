import { RecipeBlock } from "@/components/recipeBlock";
import RecipeButtons from "@/components/recipeButtons";
import { fetchRecipes } from "@/utils/recipes";
import { Box, Center, Image } from "@chakra-ui/react";

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
    <Box position="relative" minH="100vh">
      <Box position="relative" zIndex={0}>
        <Image
          src="/tr-on-w.svg"
          position="fixed"
          top="0"
          right="0"
          w="40vmin"
          h="40vmin"
          zIndex={-1}
        />
        <Image
          src="/tl-on-w.svg"
          position="fixed"
          top="0"
          left="0"
          w="40vmin"
          h="40vmin"
          zIndex={-1}
        />
        <Image
          src="/bl-on-w.svg"
          position="fixed"
          bottom="0"
          left="0"
          w="40vmin"
          h="40vmin"
          zIndex={-1}
        />
        <Image
          src="/br-on-w.svg"
          position="fixed"
          bottom="0"
          right="0"
          w="40vmin"
          h="40vmin"
          zIndex={-1}
        />
      </Box>

      <Box position="relative" zIndex={10}>
        <RecipeButtons recipes={recipes} />

        <Box zIndex={2} position="relative" mt="30px">
          <Center>
            <RecipeBlock recipe={recipe} single />
          </Center>
        </Box>
      </Box>
    </Box>
  );
}
