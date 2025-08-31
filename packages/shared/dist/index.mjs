import {
  checkIntegrations,
  clientEnvSchema,
  getEnv,
  validateClientEnv,
  validateEnv
} from "./chunk-B5SO224Z.mjs";

// src/schemas/index.ts
import { z } from "zod";
var ProfileSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(1).max(100),
  avatar_url: z.string().url().optional(),
  role: z.enum(["user", "admin"]).default("user"),
  theme_preference: z.enum(["light", "dark", "system"]).default("light"),
  created_at: z.date(),
  updated_at: z.date()
});
var ProjectSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  user_id: z.string().uuid(),
  is_public: z.boolean().default(false),
  created_at: z.date(),
  updated_at: z.date()
});
var SegmentSchema = z.object({
  id: z.string().uuid(),
  project_id: z.string().uuid(),
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  order: z.number().int().min(0),
  created_at: z.date(),
  updated_at: z.date()
});
var PromptSchema = z.object({
  id: z.string().uuid(),
  segment_id: z.string().uuid(),
  content: z.string().min(1),
  variables: z.record(z.string(), z.any()).optional(),
  order: z.number().int().min(0),
  is_active: z.boolean().default(true),
  created_at: z.date(),
  updated_at: z.date()
});
var ValidatorSchema = z.object({
  id: z.string().uuid(),
  prompt_id: z.string().uuid(),
  name: z.string().min(1).max(100),
  type: z.enum(["regex", "length", "contains", "custom"]),
  config: z.record(z.string(), z.any()),
  is_active: z.boolean().default(true),
  created_at: z.date(),
  updated_at: z.date()
});
var VersionSchema = z.object({
  id: z.string().uuid(),
  prompt_id: z.string().uuid(),
  version: z.string().min(1),
  content: z.string().min(1),
  variables: z.record(z.string(), z.any()).optional(),
  changelog: z.string().max(1e3).optional(),
  is_published: z.boolean().default(false),
  created_at: z.date(),
  updated_at: z.date()
});
var BillingSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  stripe_customer_id: z.string().optional(),
  stripe_subscription_id: z.string().optional(),
  plan: z.enum(["free", "pro", "enterprise"]).default("free"),
  status: z.enum(["active", "inactive", "cancelled", "past_due"]).default("active"),
  current_period_start: z.date().optional(),
  current_period_end: z.date().optional(),
  created_at: z.date(),
  updated_at: z.date()
});

// src/types/result.ts
var Ok = (data) => ({
  ok: true,
  data
});
var Err = (error) => ({
  ok: false,
  error
});
var isOk = (result) => {
  return result.ok;
};
var isErr = (result) => {
  return !result.ok;
};

// src/utils/theme-preference.ts
function getInitialTheme() {
  if (typeof window === "undefined") {
    return "light";
  }
  try {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark" || stored === "system") {
      return stored;
    }
  } catch (error) {
    console.warn("Failed to read theme from localStorage:", error);
  }
  return "light";
}
function setThemePreference(theme) {
  if (typeof window === "undefined") {
    return;
  }
  try {
    localStorage.setItem("theme", theme);
  } catch (error) {
    console.warn("Failed to save theme to localStorage:", error);
  }
}
function getResolvedTheme(theme) {
  if (theme === "system") {
    if (typeof window === "undefined") {
      return "light";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return theme;
}

// src/supabase.ts
import { createClient } from "@supabase/supabase-js";
function createClientAnon() {
  const env = getEnv();
  return createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    auth: {
      autoRefreshToken: true,
      persistSession: true
    }
  });
}
function createClientService() {
  const env = getEnv();
  return createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}

// src/redis.ts
import { Redis } from "@upstash/redis";
var _redisClient = null;
function getRedisClient() {
  if (!_redisClient) {
    const env = getEnv();
    _redisClient = new Redis({
      url: env.UPSTASH_REDIS_REST_URL,
      token: env.UPSTASH_REDIS_REST_TOKEN
    });
  }
  return _redisClient;
}
async function rateLimit(key, limit, window2) {
  console.log(`Rate limit check: ${key}, limit: ${limit}, window: ${window2}s`);
  return true;
}
async function cacheGet(key) {
  try {
    const redis = getRedisClient();
    const value = await redis.get(key);
    return value;
  } catch (error) {
    console.error("Cache get error:", error);
    return null;
  }
}
async function cacheSet(key, value, options = {}) {
  try {
    const redis = getRedisClient();
    if (options.ttl) {
      await redis.setex(key, options.ttl, JSON.stringify(value));
    } else {
      await redis.set(key, JSON.stringify(value));
    }
  } catch (error) {
    console.error("Cache set error:", error);
  }
}
async function cacheDel(key) {
  try {
    const redis = getRedisClient();
    await redis.del(key);
  } catch (error) {
    console.error("Cache delete error:", error);
  }
}

// src/stripe.ts
import Stripe from "stripe";
var _stripe = null;
function getStripeClient() {
  if (!_stripe) {
    const env = getEnv();
    _stripe = new Stripe(env.STRIPE_SECRET_KEY, {
      apiVersion: "2023-10-16",
      typescript: true
    });
  }
  return _stripe;
}
function validateWebhookSignature(body, signature, secret) {
  const stripe = getStripeClient();
  try {
    return stripe.webhooks.constructEvent(body, signature, secret);
  } catch (error) {
    console.error("Stripe webhook signature validation failed:", error);
    throw new Error("Invalid webhook signature");
  }
}
async function createPortalSession(customerId, returnUrl) {
  const stripe = getStripeClient();
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl
  });
  return session.url;
}
async function createCheckoutSession(priceId, customerId, successUrl, cancelUrl) {
  const stripe = getStripeClient();
  const sessionParams = {
    mode: "subscription",
    line_items: [
      {
        price: priceId,
        quantity: 1
      }
    ],
    success_url: successUrl || "https://example.com/success",
    cancel_url: cancelUrl || "https://example.com/cancel"
  };
  if (customerId) {
    sessionParams.customer = customerId;
  }
  const session = await stripe.checkout.sessions.create(sessionParams);
  return session.url || "";
}
async function getCustomerByEmail(email) {
  const stripe = getStripeClient();
  const customers = await stripe.customers.list({
    email,
    limit: 1
  });
  return customers.data[0] || null;
}
async function createCustomer(email, name) {
  const stripe = getStripeClient();
  const customerParams = {
    email
  };
  if (name) {
    customerParams.name = name;
  }
  return stripe.customers.create(customerParams);
}
export {
  BillingSchema,
  Err,
  Ok,
  ProfileSchema,
  ProjectSchema,
  PromptSchema,
  SegmentSchema,
  ValidatorSchema,
  VersionSchema,
  cacheDel,
  cacheGet,
  cacheSet,
  checkIntegrations,
  clientEnvSchema,
  createCheckoutSession,
  createClientAnon,
  createClientService,
  createCustomer,
  createPortalSession,
  getCustomerByEmail,
  getEnv,
  getInitialTheme,
  getRedisClient,
  getResolvedTheme,
  getStripeClient,
  isErr,
  isOk,
  rateLimit,
  setThemePreference,
  validateClientEnv,
  validateEnv,
  validateWebhookSignature
};
