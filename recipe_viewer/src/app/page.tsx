import { fetchRecipes } from '@/utils/recipes';
import { Box, Heading, Link, List } from '@chakra-ui/react';

const HomePage = async() => {
  const recipes = await fetchRecipes();


  return (
    <Box p={4}>
      <Heading as='h1' mb={4}>
        Recipe Index
      </Heading>
      <List.Root spacing={3}>
        {recipes && recipes.map((recipe) => (
          <List.Item key={recipe.title}>
            <Link href={`/recipe/${encodeURIComponent(recipe.title)}`} color='teal.500'>
              {recipe.title}
            </Link>
          </List.Item>
        ))}
      </List.Root>
    </Box>
  );
};

export default HomePage;