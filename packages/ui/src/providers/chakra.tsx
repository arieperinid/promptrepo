"use client";

import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import type { ReactNode } from "react";
import theme from "../theme";

interface ChakraProvidersProps {
  children: ReactNode;
}

export function ChakraProviders({ children }: ChakraProvidersProps) {
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </>
  );
}
