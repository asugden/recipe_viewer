"use client";

import { BackIcon } from "@/components/backIcon";
import { LuckIcon } from "@/components/luckIcon";
import { Recipe } from "@/utils/recipes";
import { Center, IconButton } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function RecipeButtons({ recipes }: { recipes: Recipe[] }) {
  const router = useRouter();

  return (
    <Center position="relative" pt="25px" zIndex={10}>
      <IconButton
        fontSize="20px"
        bg="none"
        borderTop="1px solid black"
        borderBottom="1px solid black"
        onClick={() => {
          router.push("/");
        }}
        _hover={{ fontWeight: "bold" }}
        size={{ base: "sm", sm: "md" }}
        mr="20px"
      >
        <BackIcon />
      </IconButton>
      <IconButton
        ml="20px"
        fontSize="20px"
        bg="none"
        borderTop="1px solid black"
        borderBottom="1px solid black"
        onClick={() => {
          const num = Math.floor(Math.random() * recipes.length);
          router.push(`/recipe/${recipes[num].title}`);
        }}
        _hover={{ fontWeight: "bold" }}
        size={{ base: "sm", sm: "md" }}
      >
        <LuckIcon />
      </IconButton>
    </Center>
  );
}
