import { z } from 'zod';
export { ClientEnv, Env, checkIntegrations, clientEnvSchema, getEnv, validateClientEnv, validateEnv } from './env.js';
import { SupabaseClient } from '@supabase/supabase-js';
import { Redis } from '@upstash/redis';
import Stripe from 'stripe';

declare const ProfileSchema: z.ZodObject<{
    id: z.ZodString;
    email: z.ZodString;
    name: z.ZodString;
    avatar_url: z.ZodOptional<z.ZodString>;
    role: z.ZodDefault<z.ZodEnum<["user", "admin"]>>;
    theme_preference: z.ZodDefault<z.ZodEnum<["light", "dark", "system"]>>;
    created_at: z.ZodDate;
    updated_at: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    email: string;
    name: string;
    role: "user" | "admin";
    theme_preference: "light" | "dark" | "system";
    created_at: Date;
    updated_at: Date;
    avatar_url?: string | undefined;
}, {
    id: string;
    email: string;
    name: string;
    created_at: Date;
    updated_at: Date;
    avatar_url?: string | undefined;
    role?: "user" | "admin" | undefined;
    theme_preference?: "light" | "dark" | "system" | undefined;
}>;
declare const ProjectSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    user_id: z.ZodString;
    is_public: z.ZodDefault<z.ZodBoolean>;
    created_at: z.ZodDate;
    updated_at: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
    user_id: string;
    is_public: boolean;
    description?: string | undefined;
}, {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
    user_id: string;
    description?: string | undefined;
    is_public?: boolean | undefined;
}>;
declare const SegmentSchema: z.ZodObject<{
    id: z.ZodString;
    project_id: z.ZodString;
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    order: z.ZodNumber;
    created_at: z.ZodDate;
    updated_at: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
    project_id: string;
    order: number;
    description?: string | undefined;
}, {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
    project_id: string;
    order: number;
    description?: string | undefined;
}>;
declare const PromptSchema: z.ZodObject<{
    id: z.ZodString;
    segment_id: z.ZodString;
    content: z.ZodString;
    variables: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    order: z.ZodNumber;
    is_active: z.ZodDefault<z.ZodBoolean>;
    created_at: z.ZodDate;
    updated_at: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    created_at: Date;
    updated_at: Date;
    order: number;
    segment_id: string;
    content: string;
    is_active: boolean;
    variables?: Record<string, any> | undefined;
}, {
    id: string;
    created_at: Date;
    updated_at: Date;
    order: number;
    segment_id: string;
    content: string;
    variables?: Record<string, any> | undefined;
    is_active?: boolean | undefined;
}>;
declare const ValidatorSchema: z.ZodObject<{
    id: z.ZodString;
    prompt_id: z.ZodString;
    name: z.ZodString;
    type: z.ZodEnum<["regex", "length", "contains", "custom"]>;
    config: z.ZodRecord<z.ZodString, z.ZodAny>;
    is_active: z.ZodDefault<z.ZodBoolean>;
    created_at: z.ZodDate;
    updated_at: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
    type: "length" | "custom" | "regex" | "contains";
    is_active: boolean;
    prompt_id: string;
    config: Record<string, any>;
}, {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
    type: "length" | "custom" | "regex" | "contains";
    prompt_id: string;
    config: Record<string, any>;
    is_active?: boolean | undefined;
}>;
declare const VersionSchema: z.ZodObject<{
    id: z.ZodString;
    prompt_id: z.ZodString;
    version: z.ZodString;
    content: z.ZodString;
    variables: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    changelog: z.ZodOptional<z.ZodString>;
    is_published: z.ZodDefault<z.ZodBoolean>;
    created_at: z.ZodDate;
    updated_at: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    created_at: Date;
    updated_at: Date;
    content: string;
    prompt_id: string;
    version: string;
    is_published: boolean;
    variables?: Record<string, any> | undefined;
    changelog?: string | undefined;
}, {
    id: string;
    created_at: Date;
    updated_at: Date;
    content: string;
    prompt_id: string;
    version: string;
    variables?: Record<string, any> | undefined;
    changelog?: string | undefined;
    is_published?: boolean | undefined;
}>;
declare const BillingSchema: z.ZodObject<{
    id: z.ZodString;
    user_id: z.ZodString;
    stripe_customer_id: z.ZodOptional<z.ZodString>;
    stripe_subscription_id: z.ZodOptional<z.ZodString>;
    plan: z.ZodDefault<z.ZodEnum<["free", "pro", "enterprise"]>>;
    status: z.ZodDefault<z.ZodEnum<["active", "inactive", "cancelled", "past_due"]>>;
    current_period_start: z.ZodOptional<z.ZodDate>;
    current_period_end: z.ZodOptional<z.ZodDate>;
    created_at: z.ZodDate;
    updated_at: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    created_at: Date;
    updated_at: Date;
    status: "active" | "inactive" | "cancelled" | "past_due";
    user_id: string;
    plan: "free" | "pro" | "enterprise";
    stripe_customer_id?: string | undefined;
    stripe_subscription_id?: string | undefined;
    current_period_start?: Date | undefined;
    current_period_end?: Date | undefined;
}, {
    id: string;
    created_at: Date;
    updated_at: Date;
    user_id: string;
    status?: "active" | "inactive" | "cancelled" | "past_due" | undefined;
    stripe_customer_id?: string | undefined;
    stripe_subscription_id?: string | undefined;
    plan?: "free" | "pro" | "enterprise" | undefined;
    current_period_start?: Date | undefined;
    current_period_end?: Date | undefined;
}>;
type Profile = z.infer<typeof ProfileSchema>;
type Project = z.infer<typeof ProjectSchema>;
type Segment = z.infer<typeof SegmentSchema>;
type Prompt = z.infer<typeof PromptSchema>;
type Validator = z.infer<typeof ValidatorSchema>;
type Version = z.infer<typeof VersionSchema>;
type Billing = z.infer<typeof BillingSchema>;

/**
 * Result type for better error handling
 */
type Result<T, E = Error> = {
    ok: true;
    data: T;
} | {
    ok: false;
    error: E;
};
/**
 * Create a successful result
 */
declare const Ok: <T>(data: T) => Result<T>;
/**
 * Create an error result
 */
declare const Err: <E = Error>(error: E) => Result<never, E>;
/**
 * Type guard to check if result is successful
 */
declare const isOk: <T, E>(result: Result<T, E>) => result is {
    ok: true;
    data: T;
};
/**
 * Type guard to check if result is an error
 */
declare const isErr: <T, E>(result: Result<T, E>) => result is {
    ok: false;
    error: E;
};

type ThemeMode = "light" | "dark" | "system";
/**
 * Gets the initial theme from localStorage or defaults to 'light'
 * Note: Database theme preference will be implemented in P5.0
 */
declare function getInitialTheme(): ThemeMode;
/**
 * Sets theme preference in localStorage
 * @param theme - The theme to set
 */
declare function setThemePreference(theme: ThemeMode): void;
/**
 * Gets the resolved theme (converts 'system' to actual preference)
 */
declare function getResolvedTheme(theme: ThemeMode): "light" | "dark";

/**
 * Create Supabase client with anonymous key (for client-side usage)
 * Safe to use in browsers and client components
 */
declare function createClientAnon(): SupabaseClient;
/**
 * Create Supabase client with service role key (for server-side usage)
 * Has elevated permissions - use only on server
 */
declare function createClientService(): SupabaseClient;
/**
 * Type definitions for database tables
 * TODO: Generate these from actual database schema
 */
interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string;
                    email: string;
                    name: string;
                    role: "user" | "admin";
                    theme_preference: "light" | "dark" | "system";
                    created_at: string;
                    updated_at: string;
                };
                Insert: Omit<Database["public"]["Tables"]["profiles"]["Row"], "id" | "created_at" | "updated_at">;
                Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
            };
            projects: {
                Row: {
                    id: string;
                    name: string;
                    user_id: string;
                    is_public: boolean;
                    created_at: string;
                    updated_at: string;
                };
                Insert: Omit<Database["public"]["Tables"]["projects"]["Row"], "id" | "created_at" | "updated_at">;
                Update: Partial<Database["public"]["Tables"]["projects"]["Insert"]>;
            };
        };
    };
}

/**
 * Get or create Upstash Redis client
 * Uses REST API for serverless compatibility
 */
declare function getRedisClient(): Redis;
/**
 * Simple rate limiting helper
 * TODO: Implement actual sliding window rate limiting logic
 *
 * @param key - Unique identifier for rate limit (e.g., user ID, IP)
 * @param limit - Maximum number of requests allowed
 * @param window - Time window in seconds
 * @returns Promise<boolean> - true if request is allowed, false if rate limited
 */
declare function rateLimit(key: string, limit: number, window: number): Promise<boolean>;
/**
 * Cache helper functions
 * TODO: Implement caching utilities
 */
interface CacheOptions {
    ttl?: number;
}
/**
 * Get value from cache
 */
declare function cacheGet<T>(key: string): Promise<T | null>;
/**
 * Set value in cache
 */
declare function cacheSet<T>(key: string, value: T, options?: CacheOptions): Promise<void>;
/**
 * Delete value from cache
 */
declare function cacheDel(key: string): Promise<void>;

/**
 * Get or create Stripe client instance
 * Configured with API version and secret key
 */
declare function getStripeClient(): Stripe;
/**
 * Validate Stripe webhook signature
 *
 * @param body - Raw request body as string
 * @param signature - Stripe signature header
 * @param secret - Webhook secret from Stripe dashboard
 * @returns Parsed Stripe event or throws error
 */
declare function validateWebhookSignature(body: string, signature: string, secret: string): Stripe.Event;
/**
 * Subscription management helpers
 * TODO: Implement subscription creation, updates, cancellation
 */
interface SubscriptionPlan {
    id: string;
    name: string;
    price: number;
    currency: string;
    interval: "month" | "year";
    features: string[];
}
/**
 * Create customer portal session
 * Allows customers to manage their subscriptions
 */
declare function createPortalSession(customerId: string, returnUrl: string): Promise<string>;
/**
 * Create checkout session for subscription
 * TODO: Implement full checkout flow
 */
declare function createCheckoutSession(priceId: string, customerId?: string, successUrl?: string, cancelUrl?: string): Promise<string>;
/**
 * Get customer by email
 */
declare function getCustomerByEmail(email: string): Promise<Stripe.Customer | null>;
/**
 * Create new customer
 */
declare function createCustomer(email: string, name?: string): Promise<Stripe.Customer>;

export { type Billing, BillingSchema, type CacheOptions, type Database, Err, Ok, type Profile, ProfileSchema, type Project, ProjectSchema, type Prompt, PromptSchema, type Result, type Segment, SegmentSchema, type SubscriptionPlan, type ThemeMode, type Validator, ValidatorSchema, type Version, VersionSchema, cacheDel, cacheGet, cacheSet, createCheckoutSession, createClientAnon, createClientService, createCustomer, createPortalSession, getCustomerByEmail, getInitialTheme, getRedisClient, getResolvedTheme, getStripeClient, isErr, isOk, rateLimit, setThemePreference, validateWebhookSignature };
