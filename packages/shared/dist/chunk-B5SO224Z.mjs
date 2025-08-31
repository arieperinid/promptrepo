// src/env.ts
import { z } from "zod";
var envSchema = z.object({
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
  NODE_ENV: z.enum(["development", "test", "production"]).default("development")
});
function validateEnv(env = process.env) {
  const result = envSchema.safeParse(env);
  if (!result.success) {
    console.error("\u274C Invalid environment variables:");
    console.error(result.error.format());
    throw new Error("Invalid environment variables");
  }
  return result.data;
}
var _env = null;
function getEnv() {
  if (!_env) {
    _env = validateEnv();
  }
  return _env;
}
function checkIntegrations(env = process.env) {
  const supabase = !!(env.NEXT_PUBLIC_SUPABASE_URL && env.NEXT_PUBLIC_SUPABASE_ANON_KEY && env.SUPABASE_SERVICE_ROLE);
  const redis = !!(env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN);
  const stripe = !!(env.STRIPE_SECRET_KEY && env.STRIPE_WEBHOOK_SECRET);
  return { supabase, redis, stripe };
}
var clientEnvSchema = envSchema.pick({
  NEXT_PUBLIC_SUPABASE_URL: true,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: true
});
function validateClientEnv(env = process.env) {
  const result = clientEnvSchema.safeParse(env);
  if (!result.success) {
    console.error("\u274C Invalid client environment variables:");
    console.error(result.error.format());
    throw new Error("Invalid client environment variables");
  }
  return result.data;
}

export {
  validateEnv,
  getEnv,
  checkIntegrations,
  clientEnvSchema,
  validateClientEnv
};
