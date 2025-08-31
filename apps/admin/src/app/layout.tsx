import type { Metadata } from "next";
import { ChakraProviders } from "@promptrepo/ui";

export const metadata: Metadata = {
  title: "Admin - PromptRepo",
  description: "Painel administrativo do PromptRepo",
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
