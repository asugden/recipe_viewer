import { Icon } from "@chakra-ui/react";

export function BackIcon() {
  return (
    <Icon fontSize="40px">
      <svg
        viewBox="0 0 60 60"
        fill="none"
        strokeWidth="3"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
      >
        <polygon points="59.2 30 59.2 41.3 41.6 52.6 1.6 30 41.6 7.4 59.2 18.7 59.2 30" />
        <line x1="1.6" y1="30" x2="52.9" y2="14.6" />
        <line x1="1.6" y1="30" x2="52.9" y2="45.4" />
      </svg>
    </Icon>
  );
}
