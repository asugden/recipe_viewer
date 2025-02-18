import {
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

export default function FilterPopover({
  title,
  options,
  filter,
  fn,
}: {
  title: string;
  options: string[];
  filter: string[];
  fn: Dispatch<SetStateAction<string[]>>;
}) {
  return (
    <PopoverRoot>
      <PopoverTrigger
        fontFamily="var(--font-gotham)"
        fontSize={{ base: "14px", sm: "18px" }}
        fontWeight="book"
        bg="none"
        // w="200px"
        color="black"
        textTransform="uppercase"
        letterSpacing={2}
        _hover={{ fontWeight: "bold" }}
        zIndex={11}
      >
        <Flex>
          <Image src="button-left.svg" h={{ base: "54px", sm: "60px" }} />
          <Text
            as="span"
            borderTop="1px solid black"
            borderBottom="1px solid black"
            p={1.5}
            mt="10px"
            h={{ base: "34px", sm: "40px" }}
            bg={filter.length > 0 ? "black" : "none"}
            color={filter.length > 0 ? "white" : "black"}
          >
            {title}
          </Text>
          <Image src="button-right.svg" h={{ base: "54px", sm: "60px" }} />
        </Flex>
      </PopoverTrigger>
      <PopoverContent
        bg="white"
        border="1px solid black"
        borderRadius={0}
        boxShadow="color(srgb 0.0941176 0.0941176 0.105882 / 0.1) 0px 8px 16px 0px"
        w="150px"
      >
        <PopoverBody>
          {options.map((option) => (
            <Button
              key={option}
              w="100%"
              h="30px"
              fontFamily="var(--font-archer)"
              fontWeight="700"
              bg={filter.includes(option) ? "#CCCCCC" : "white"}
              _hover={{ bg: "black", color: "white" }}
              borderRadius={0}
              onClick={() =>
                fn((cur) => {
                  return cur.includes(option)
                    ? [...cur.filter((v) => v !== option)]
                    : [...cur, option];
                })
              }
            >
              {option}
            </Button>
          ))}
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  );
}
