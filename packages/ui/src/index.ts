// Providers
export { ChakraProviders } from "./providers/chakra";

// Theme
export { default as theme } from "./theme";

// Components
export { ThemeToggle } from "./components/theme-toggle";
export { Accordion } from "./components/accordion";
export { TableCompact } from "./components/table-compact";
export { RowActions } from "./components/row-actions";
export { CodeViewer } from "./components/code-viewer";

// Re-export commonly used Chakra components
export {
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
  useColorMode,
  useColorModeValue,
  useToast,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
