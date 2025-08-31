import { z } from "zod";

const envSchema = z.object({
  // Supabase
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE: z.string().min(1),

  // Upstash Redis
  UPSTASH_REDIS_REST_URL: z.string().url(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1),

  // Stripe
  STRIPE_SECRET_KEY: z.string().min(1),
  STRIPE_WEBHOOK_SECRET: z.string().min(1),

  // Node Environment
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

/**
 * Validates and parses environment variables
 * Throws an error if any required variable is missing or invalid
 */
export function validateEnv(env: Record<string, string | undefined> = process.env) {
  const result = envSchema.safeParse(env);

  if (!result.success) {
    console.error("❌ Invalid environment variables:");
    console.error(result.error.format());
    throw new Error("Invalid environment variables");
  }

  return result.data;
}

/**
 * Type-safe access to validated environment variables
 */
export type Env = z.infer<typeof envSchema>;

/**
 * Client-safe environment variables (only NEXT_PUBLIC_* vars)
 */
export const clientEnvSchema = envSchema.pick({
  NEXT_PUBLIC_SUPABASE_URL: true,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: true,
});

export type ClientEnv = z.infer<typeof clientEnvSchema>;

/**
 * Validates client-side environment variables
 */
export function validateClientEnv(env: Record<string, string | undefined> = process.env) {
  const result = clientEnvSchema.safeParse(env);

  if (!result.success) {
    console.error("❌ Invalid client environment variables:");
    console.error(result.error.format());
    throw new Error("Invalid client environment variables");
  }

  return result.data;
}
