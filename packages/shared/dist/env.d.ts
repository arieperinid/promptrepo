import { z } from 'zod';

declare const envSchema: z.ZodObject<{
    NEXT_PUBLIC_SUPABASE_URL: z.ZodString;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.ZodString;
    SUPABASE_SERVICE_ROLE: z.ZodString;
    UPSTASH_REDIS_REST_URL: z.ZodString;
    UPSTASH_REDIS_REST_TOKEN: z.ZodString;
    STRIPE_SECRET_KEY: z.ZodString;
    STRIPE_WEBHOOK_SECRET: z.ZodString;
    NODE_ENV: z.ZodDefault<z.ZodEnum<["development", "test", "production"]>>;
}, "strip", z.ZodTypeAny, {
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
    SUPABASE_SERVICE_ROLE: string;
    UPSTASH_REDIS_REST_URL: string;
    UPSTASH_REDIS_REST_TOKEN: string;
    STRIPE_SECRET_KEY: string;
    STRIPE_WEBHOOK_SECRET: string;
    NODE_ENV: "development" | "test" | "production";
}, {
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
    SUPABASE_SERVICE_ROLE: string;
    UPSTASH_REDIS_REST_URL: string;
    UPSTASH_REDIS_REST_TOKEN: string;
    STRIPE_SECRET_KEY: string;
    STRIPE_WEBHOOK_SECRET: string;
    NODE_ENV?: "development" | "test" | "production" | undefined;
}>;
/**
 * Validates and parses environment variables
 * Throws an error if any required variable is missing or invalid
 */
declare function validateEnv(env?: Record<string, string | undefined>): {
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
    SUPABASE_SERVICE_ROLE: string;
    UPSTASH_REDIS_REST_URL: string;
    UPSTASH_REDIS_REST_TOKEN: string;
    STRIPE_SECRET_KEY: string;
    STRIPE_WEBHOOK_SECRET: string;
    NODE_ENV: "development" | "test" | "production";
};
/**
 * Type-safe access to validated environment variables
 */
type Env = z.infer<typeof envSchema>;
declare function getEnv(): Env;
/**
 * Check if specific integration environment variables are configured
 */
declare function checkIntegrations(env?: Record<string, string | undefined>): {
    supabase: boolean;
    redis: boolean;
    stripe: boolean;
};
/**
 * Client-safe environment variables (only NEXT_PUBLIC_* vars)
 */
declare const clientEnvSchema: z.ZodObject<Pick<{
    NEXT_PUBLIC_SUPABASE_URL: z.ZodString;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.ZodString;
    SUPABASE_SERVICE_ROLE: z.ZodString;
    UPSTASH_REDIS_REST_URL: z.ZodString;
    UPSTASH_REDIS_REST_TOKEN: z.ZodString;
    STRIPE_SECRET_KEY: z.ZodString;
    STRIPE_WEBHOOK_SECRET: z.ZodString;
    NODE_ENV: z.ZodDefault<z.ZodEnum<["development", "test", "production"]>>;
}, "NEXT_PUBLIC_SUPABASE_URL" | "NEXT_PUBLIC_SUPABASE_ANON_KEY">, "strip", z.ZodTypeAny, {
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
}, {
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
}>;
type ClientEnv = z.infer<typeof clientEnvSchema>;
/**
 * Validates client-side environment variables
 */
declare function validateClientEnv(env?: Record<string, string | undefined>): {
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
};

export { type ClientEnv, type Env, checkIntegrations, clientEnvSchema, getEnv, validateClientEnv, validateEnv };
