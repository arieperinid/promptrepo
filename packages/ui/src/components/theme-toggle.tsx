"use client";

import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react";

export function ThemeToggle() {
  const { toggleColorMode } = useColorMode();
  const icon = useColorModeValue(<MoonIcon />, <SunIcon />);
  const label = useColorModeValue("Switch to dark mode", "Switch to light mode");

  return (
    <IconButton
      aria-label={label}
      icon={icon}
      onClick={toggleColorMode}
      variant="ghost"
      size="sm"
      _hover={{
        bg: useColorModeValue("gray.100", "gray.700"),
      }}
    />
  );
}
