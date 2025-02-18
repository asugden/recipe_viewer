import FilteredRecipeList from "@/components/filteredRecipeList";
import { fetchRecipes } from "@/utils/recipes";
import {
  AbsoluteCenter,
  Box,
  Image,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import NextLink from "next/link";

const HomePage = async () => {
  const recipes = await fetchRecipes();

  return (
    <Box>
      <LinkBox>
        <Box w="100%" h="100vh" bg="black" position="relative" zIndex={1}>
          <Box position="absolute" top="0" left="0" w="40vmin" h="40vmin">
            <Image src="/tl-on-b.svg" />
          </Box>
          <Box position="absolute" top="0" right="0" w="40vmin" h="40vmin">
            <Image src="/tr-on-b.svg" />
          </Box>
          <Box position="absolute" bottom="0" left="0" w="40vmin" h="40vmin">
            <Image src="/bl-on-b.svg" />
          </Box>
          <Box position="absolute" bottom="0" right="0" w="40vmin" h="40vmin">
            <Image src="/br-on-b.svg" />
          </Box>
          <LinkOverlay asChild>
            <NextLink href="#filters" />
          </LinkOverlay>
          <AbsoluteCenter axis="both">
            <Box w="max(50vw, 50vh)" h="max(50vw, 50vh)">
              <NextLink href="#filters">
                <Image src="/902.svg" />
              </NextLink>
            </Box>
          </AbsoluteCenter>
        </Box>
      </LinkBox>
      {/* <Box position="absolute" top="100vh" left="0" h="100%"> */}
      {/* <Box position="sticky" top="0" left="0" w="40vmin" h="40vmin">
          <Image src="/tl-on-w.svg" />
        </Box> */}
      {/* </Box> */}
      {/* <Box position="absolute" top="100vh" right="0" w="40vmin" h="40vmin"> */}
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
        {/* </Box> */}

        {/* <Box
          p={4}
          bg="#FFFFFF"
          borderBottom="1px solid #CCCCCC"
          w="100%"
          h="120px"
        >
          <Text
            fontFamily="Archer"
            fontWeight="800"
            fontSize={{ base: "3rem", lg: "5rem", xl: "6rem" }}
          >
            COCKTAILS
          </Text>
        </Box> */}
        <a href="#" id="filters" />
        <Box zIndex={2} position="relative">
          {recipes && <FilteredRecipeList recipes={recipes} />}
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
