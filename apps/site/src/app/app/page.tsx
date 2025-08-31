import { Container, Heading, Text, Alert, AlertIcon, VStack, Box } from "@promptrepo/ui";

export default function AppPage() {
  return (
    <Container maxW="container.lg" py={20}>
      <VStack spacing={8} align="center">
        <Box textAlign="center">
          <Heading as="h1" size="2xl" mb={6}>
            Dashboard - PromptRepo
          </Heading>
          
          <Alert status="info" mb={6}>
            <AlertIcon />
            Dashboard placeholder – UI no P1.3 [GPT-5]
          </Alert>
          
          <Text fontSize="lg" color="gray.600" mb={4}>
            Esta será a página principal do dashboard onde os usuários gerenciarão seus projetos e prompts.
          </Text>
          
          <Text fontSize="md" color="gray.500">
            Interface completa será implementada com GPT-5 na iteração P1.3.
          </Text>
        </Box>
      </VStack>
    </Container>
  );
}
