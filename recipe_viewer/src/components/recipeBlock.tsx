import { Recipe } from "@/utils/recipes";
import { Box, Flex, Tag, Text } from "@chakra-ui/react";
import { decode } from "html-entities";
import React from "react";

function fractionCharacter(
  name: string,
  full: number | null,
  numerator: number | null,
  denominator: number | null
) {
  if (
    name.toLowerCase().includes("angostura") ||
    name.toLowerCase().includes("woodford") ||
    name.toLowerCase().includes("peychaud") ||
    name.toLowerCase().includes("bitters") ||
    name.toLowerCase().includes("dash")
  )
    return (
      <>
        {`${full ? full : 1} `}
        <Text as="span" fontSize="10px" fontWeight="300">
          {full && full > 1 ? "dashes" : "dash"}
        </Text>
      </>
    );
  if (name.toLowerCase().includes("saline"))
    return (
      <>
        {`${full ? full : 1} `}
        <Text as="span" fontSize="10px" fontWeight="300">
          {full && full > 1 ? "drops" : "drop"}
        </Text>
      </>
    );
  if (
    name.toLowerCase().includes("tincture") ||
    name.toLowerCase() === "cinnamon"
  )
    return (
      <>
        {`${full ? full : 1} `}
        <Text as="span" fontSize="10px" fontWeight="300">
          drop
        </Text>
      </>
    );

  if (full && full > 4)
    return (
      <>
        {`${full} `}
        <Text as="span" fontSize="10px" fontWeight="300">
          g
        </Text>
      </>
    );

  let out = "";
  if (full) out = `${full}`;
  if (numerator && denominator) {
    if (denominator === 2 || denominator === 4) {
      out += `&frac${numerator}${denominator};`;
    } else {
      if (numerator === 2 && denominator === 3) out += "&#8532;";
      else if (numerator === 1 && denominator === 3) out += "&#8531;";
      else if (numerator === 1 && denominator === 5) out += "&#8533;";
      else if (numerator === 2 && denominator === 5) out += "&#8534;";
      else if (numerator === 3 && denominator === 5) out += "&#8535;";
      else if (numerator === 4 && denominator === 5) out += "&#8536;";
      else if (numerator === 1 && denominator === 6) out += "&#8537;";
      else if (numerator === 5 && denominator === 6) out += "&#8538;";
      else if (numerator === 1 && denominator === 8) out += "&#8539;";
      else if (numerator === 3 && denominator === 8) out += "&#8540;";
      else if (numerator === 5 && denominator === 8) out += "&#8541;";
      else if (numerator === 7 && denominator === 8) out += "&#8542;";
    }
  }
  return (
    <>
      {decode(out)}{" "}
      <Text as="span" fontSize="10px" fontWeight="300">
        oz
      </Text>
    </>
  );
}

interface Props {
  recipe: Recipe;
  single?: boolean;
}

function RecipeBlockValue({ recipe, single = false }: Props) {
  return (
    <Box
      bg="rgba(248,248,248,0.8)"
      p={2}
      w={{
        base: "90%",
        sm: "400px",
        md: "540px",
        lg: "410px",
        xl: single ? "540px" : "max(540px, 80%)",
      }}
    >
      <div>
        <Flex direction="column" align="flex-start" width="fit-content">
          <Text
            fontFamily="var(--font-parisish)"
            fontSize="40px"
            mb="-15px"
            borderTop="1px solid black"
            borderBottom="1px solid black"
          >
            {recipe.title.toUpperCase()}
          </Text>
          <Tag.Root
            ml="auto"
            mt={1}
            fontFamily="var(--font-gotham)"
            letterSpacing={1}
            fontSize="12px"
            p="2px 8px"
            borderRadius="20px"
            bg="#888888"
            border="none"
          >
            <Tag.Label border="none">
              {recipe.category?.toUpperCase()}
            </Tag.Label>
          </Tag.Root>
        </Flex>
      </div>
      {recipe.description && (
        <Text fontFamily="var(--font-lato)" fontWeight="300" p={3}>
          {recipe.description}
        </Text>
      )}
      {recipe.ingredients.map((ingredient, idx) => (
        <Box key={`${ingredient.name}-${idx}`}>
          <Flex>
            <Box w="60px" fontWeight="bold" fontSize="16" fontFamily="Gotham">
              <Text>
                {fractionCharacter(
                  ingredient.name,
                  ingredient.ounces,
                  ingredient.numerator,
                  ingredient.denominator
                )}
              </Text>
            </Box>
            <Box>
              <Text
                fontFamily="var(--font-archer)"
                fontWeight="600"
                fontSize="16"
              >
                {ingredient.name}
              </Text>
            </Box>
          </Flex>
        </Box>
      ))}
      {recipe.garnish && (
        <Box>
          <Flex>
            <Box w="60px">&nbsp;</Box>
            <Box>
              <Text
                fontFamily="var(--font-archer)"
                fontWeight="600"
                fontSize="16"
              >
                <Text
                  as="span"
                  fontFamily="var(--font-gotham)"
                  fontSize="10px"
                  fontWeight="400"
                >
                  Garnish with
                </Text>{" "}
                {recipe.garnish}
              </Text>
            </Box>
          </Flex>
        </Box>
      )}
    </Box>
  );
}

function areEqual(prevProps: Props, curProps: Props) {
  return prevProps.recipe.title === curProps.recipe.title;
}

export const RecipeBlock = React.memo(RecipeBlockValue, areEqual);
