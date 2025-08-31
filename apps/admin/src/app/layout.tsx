import { checkIntegrations } from "@promptrepo/shared";
import { ChakraProviders } from "@promptrepo/ui";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - PromptRepo",
  description: "Painel administrativo do PromptRepo",
};

// Log integration status during development (client-side only)
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  try {
    const integrations = checkIntegrations();
    console.log("🔧 Admin Integration Status:", {
      supabase: integrations.supabase ? "✅ Configured" : "❌ Missing env vars",
      redis: integrations.redis ? "✅ Configured" : "❌ Missing env vars",
      stripe: integrations.stripe ? "✅ Configured" : "❌ Missing env vars",
    });
  } catch (error) {
    console.log("🔧 Admin Integration Status: Unable to check (build time)");
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <ChakraProviders>{children}</ChakraProviders>
      </body>
    </html>
  );
}
