import type { Metadata } from "next";
import { ChakraProviders } from "@promptrepo/ui";

export const metadata: Metadata = {
  title: "PromptRepo - Seu repositório de prompts",
  description: "Organize e gerencie seus prompts de IA de forma eficiente",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <ChakraProviders>
          {children}
        </ChakraProviders>
      </body>
    </html>
  );
}
