import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';
export { Alert, AlertDescription, AlertIcon, AlertTitle, Badge, Box, Button, Card, CardBody, CardFooter, CardHeader, Container, Flex, HStack, Heading, Input, Spinner, Stack, Text, VStack, useColorMode, useColorModeValue, useToast } from '@chakra-ui/react';

interface ChakraProvidersProps {
    children: ReactNode;
}
declare function ChakraProviders({ children }: ChakraProvidersProps): react_jsx_runtime.JSX.Element;

declare const theme: Record<string, any>;

declare function ThemeToggle(): react_jsx_runtime.JSX.Element;

declare function Accordion(): null;

declare function TableCompact(): null;

declare function RowActions(): null;

declare function CodeViewer(): null;

export { Accordion, ChakraProviders, CodeViewer, RowActions, TableCompact, ThemeToggle, theme };
