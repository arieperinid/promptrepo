import { Container, Heading, Text, Alert, AlertIcon, VStack, Box, Badge } from "@promptrepo/ui";

export default function AdminPage() {
  return (
    <Container maxW="container.lg" py={20}>
      <VStack spacing={8} align="center">
        <Box textAlign="center">
          <Badge colorScheme="purple" fontSize="sm" mb={4}>
            ADMINISTRADOR
          </Badge>
          
          <Heading as="h1" size="2xl" mb={6}>
            Painel Administrativo
          </Heading>
          
          <Alert status="info" mb={6}>
            <AlertIcon />
            Admin placeholder – UI no P4.1 [GPT-5]
          </Alert>
          
          <Text fontSize="lg" color="gray.600" mb={4}>
            Este é o painel administrativo do PromptRepo onde admins gerenciarão usuários, projetos e configurações do sistema.
          </Text>
          
          <Text fontSize="md" color="gray.500">
            Interface administrativa completa será implementada com GPT-5 na iteração P4.1.
          </Text>
        </Box>
      </VStack>
    </Container>
  );
}
