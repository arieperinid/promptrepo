// src/providers/chakra.tsx
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

// src/theme/index.ts
import { extendTheme } from "@chakra-ui/react";

// src/theme/tokens.ts
var spacing = {
  px: "1px",
  0.5: "0.125rem",
  1: "0.25rem",
  1.5: "0.375rem",
  2: "0.5rem",
  2.5: "0.625rem",
  3: "0.75rem",
  3.5: "0.875rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  7: "1.75rem",
  8: "2rem",
  9: "2.25rem",
  10: "2.5rem",
  12: "3rem",
  14: "3.5rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  28: "7rem",
  32: "8rem",
  36: "9rem",
  40: "10rem",
  44: "11rem",
  48: "12rem",
  52: "13rem",
  56: "14rem",
  60: "15rem",
  64: "16rem",
  72: "18rem",
  80: "20rem",
  96: "24rem"
};
var radii = {
  none: "0",
  sm: "0.125rem",
  base: "0.25rem",
  md: "0.375rem",
  lg: "0.5rem",
  xl: "0.75rem",
  "2xl": "1rem",
  "3xl": "1.5rem",
  full: "9999px"
};
var sizes = {
  ...spacing,
  max: "max-content",
  min: "min-content",
  full: "100%",
  "3xs": "14rem",
  "2xs": "16rem",
  xs: "20rem",
  sm: "24rem",
  md: "28rem",
  lg: "32rem",
  xl: "36rem",
  "2xl": "42rem",
  "3xl": "48rem",
  "4xl": "56rem",
  "5xl": "64rem",
  "6xl": "72rem",
  "7xl": "80rem",
  "8xl": "90rem",
  container: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px"
  }
};
var fonts = {
  heading: `'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
  body: `'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
  mono: `'JetBrains Mono', 'Fira Code', 'Monaco', 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace`
};
var fontSizes = {
  xs: "0.75rem",
  sm: "0.875rem",
  md: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  "3xl": "1.875rem",
  "4xl": "2.25rem",
  "5xl": "3rem",
  "6xl": "3.75rem",
  "7xl": "4.5rem",
  "8xl": "6rem",
  "9xl": "8rem"
};
var shadows = {
  xs: "0 1px 2px rgba(0,0,0,0.05)",
  sm: "0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)",
  md: "0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)",
  lg: "0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)",
  outline: "0 0 0 2px rgba(14,165,233,0.5)",
  focus: "0 0 0 2px rgba(14,165,233,0.6)"
};

// src/theme/index.ts
var config = {
  initialColorMode: "light",
  useSystemColorMode: false
};
var theme = extendTheme({
  config,
  fonts,
  fontSizes,
  space: spacing,
  sizes,
  radii,
  shadows,
  colors: {
    brand: {
      50: "#f0f9ff",
      100: "#e0f2fe",
      200: "#bae6fd",
      300: "#7dd3fc",
      400: "#38bdf8",
      500: "#0ea5e9",
      600: "#0284c7",
      700: "#0369a1",
      800: "#075985",
      900: "#0c4a6e",
      950: "#082f49"
    },
    gray: {
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      300: "#d1d5db",
      400: "#9ca3af",
      500: "#6b7280",
      600: "#4b5563",
      700: "#374151",
      800: "#1f2937",
      900: "#111827",
      950: "#030712"
    }
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: "brand",
        size: "sm"
      }
    },
    Input: {
      defaultProps: {
        focusBorderColor: "brand.500",
        size: "sm"
      }
    },
    Textarea: {
      defaultProps: {
        focusBorderColor: "brand.500",
        size: "sm"
      }
    },
    Select: {
      defaultProps: {
        focusBorderColor: "brand.500",
        size: "sm"
      }
    },
    IconButton: {
      defaultProps: {
        size: "sm"
      }
    }
  },
  styles: {
    global: {
      body: {
        fontFamily: "body",
        color: "gray.900",
        bg: "white",
        lineHeight: "base",
        _dark: {
          color: "gray.100",
          bg: "gray.900"
        }
      }
    }
  }
});
var theme_default = theme;

// src/providers/chakra.tsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
function ChakraProviders({ children }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ColorModeScript, { initialColorMode: theme_default.config.initialColorMode }),
    /* @__PURE__ */ jsx(ChakraProvider, { theme: theme_default, children })
  ] });
}

// src/components/theme-toggle.tsx
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { jsx as jsx2 } from "react/jsx-runtime";
function ThemeToggle() {
  const { toggleColorMode } = useColorMode();
  const icon = useColorModeValue(/* @__PURE__ */ jsx2(MoonIcon, {}), /* @__PURE__ */ jsx2(SunIcon, {}));
  const label = useColorModeValue("Switch to dark mode", "Switch to light mode");
  return /* @__PURE__ */ jsx2(
    IconButton,
    {
      "aria-label": label,
      icon,
      onClick: toggleColorMode,
      variant: "ghost",
      size: "sm",
      _hover: {
        bg: useColorModeValue("gray.100", "gray.700")
      }
    }
  );
}

// src/components/accordion.tsx
function Accordion() {
  return null;
}

// src/components/table-compact.tsx
function TableCompact() {
  return null;
}

// src/components/row-actions.tsx
function RowActions() {
  return null;
}

// src/components/code-viewer.tsx
function CodeViewer() {
  return null;
}

// src/index.ts
import {
  Box,
  Button,
  Input,
  Text,
  Heading,
  Flex,
  Stack,
  HStack,
  VStack,
  Container,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Badge,
  useColorMode as useColorMode2,
  useColorModeValue as useColorModeValue2,
  useToast,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription
} from "@chakra-ui/react";
export {
  Accordion,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  ChakraProviders,
  CodeViewer,
  Container,
  Flex,
  HStack,
  Heading,
  Input,
  RowActions,
  Spinner,
  Stack,
  TableCompact,
  Text,
  ThemeToggle,
  VStack,
  theme_default as theme,
  useColorMode2 as useColorMode,
  useColorModeValue2 as useColorModeValue,
  useToast
};
