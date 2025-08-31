import { Container, Heading, Text, Alert, AlertIcon, VStack, Box } from "@promptrepo/ui";
import { validateClientEnv } from "@promptrepo/shared/env";

function checkEnvironment() {
  try {
    const env = validateClientEnv(process.env);
    return { ok: true, env };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Environment validation failed" };
  }
}

export default function HomePage() {
  const envCheck = checkEnvironment();

  return (
    <Container maxW="container.lg" py={20}>
      <VStack spacing={8} align="center">
        <Box textAlign="center">
          <Heading as="h1" size="2xl" mb={4}>
            Olá! PromptRepo está funcionando 🚀
          </Heading>
          
          {envCheck.ok ? (
            <Alert status="success" mb={6}>
              <AlertIcon />
              Ambiente configurado corretamente! Todas as variáveis de ambiente obrigatórias estão presentes.
            </Alert>
          ) : (
            <Alert status="warning" mb={6}>
              <AlertIcon />
              Aviso: {envCheck.error}
            </Alert>
          )}

          <Text fontSize="lg" color="gray.600" mb={8}>
            Shell Supabase-like será feito no P1.3 – UI → rodar com GPT-5
          </Text>
          
          <Text fontSize="md" color="gray.500">
            Esta é a página inicial do PromptRepo. A interface completa será implementada nas próximas iterações.
          </Text>
        </Box>
      </VStack>
    </Container>
  );
}
