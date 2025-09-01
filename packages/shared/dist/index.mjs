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
  handle: z.string().min(1).max(50),
  // Unique username/handle
  name: z.string().min(1).max(100).optional(),
  role: z.enum(["user", "pro", "admin"]).default("user"),
  stripe_customer_id: z.string().optional(),
  theme_pref: z.enum(["light", "dark"]).default("light"),
  // Updated field name
  created_at: z.date(),
  updated_at: z.date()
});
var ProjectSchema = z.object({
  id: z.string().uuid(),
  owner_id: z.string().uuid(),
  // Changed from user_id
  name: z.string().min(1).max(100),
  description: z.string().max(1e3).optional(),
  visibility: z.enum(["private", "public"]).default("private"),
  // Changed from is_public
  created_at: z.date(),
  updated_at: z.date()
});
var SegmentSchema = z.object({
  id: z.string().uuid(),
  project_id: z.string().uuid(),
  name: z.string().min(1).max(100),
  position: z.number().int().min(0).default(0),
  // Changed from order
  created_at: z.date(),
  updated_at: z.date()
});
var PromptSchema = z.object({
  id: z.string().uuid(),
  segment_id: z.string().uuid(),
  title: z.string().min(1).max(200),
  // Changed from content to title
  body: z.string().min(1),
  // Main content field
  language: z.string().default("pt-BR"),
  kind: z.enum(["prompt", "system", "tool"]).default("prompt"),
  position: z.number().int().min(0).default(0),
  // Changed from order
  created_at: z.date(),
  updated_at: z.date()
});
var ValidatorSchema = z.object({
  id: z.string().uuid(),
  prompt_id: z.string().uuid(),
  title: z.string().min(1).max(200),
  // Changed from name
  body: z.string().min(1),
  // Validation rules/description
  created_at: z.date(),
  updated_at: z.date()
});
var VersionSchema = z.object({
  id: z.string().uuid(),
  entity_type: z.enum(["project", "segment", "prompt", "validator"]),
  entity_id: z.string().uuid(),
  // Changed from prompt_id to be more generic
  snapshot: z.record(z.string(), z.any()),
  // JSON snapshot of entity
  author_id: z.string().uuid().optional(),
  created_at: z.date()
});
var BillingSchema = z.object({
  profile_id: z.string().uuid(),
  // Primary key, references profiles
  plan: z.enum(["free", "pro"]).default("free"),
  // Simplified plans
  current_period_end: z.date().optional(),
  status: z.enum(["active", "past_due", "canceled", "incomplete"]).optional(),
  updated_at: z.date()
});
var CreateProfileSchema = ProfileSchema.omit({
  id: true,
  created_at: true,
  updated_at: true
});
var UpdateProfileSchema = ProfileSchema.partial().omit({
  id: true,
  created_at: true,
  updated_at: true
});
var CreateProjectSchema = ProjectSchema.omit({
  id: true,
  owner_id: true,
  // Set from auth context
  created_at: true,
  updated_at: true
});
var UpdateProjectSchema = ProjectSchema.partial().omit({
  id: true,
  owner_id: true,
  created_at: true,
  updated_at: true
});
var CreateSegmentSchema = SegmentSchema.omit({
  id: true,
  created_at: true,
  updated_at: true
});
var UpdateSegmentSchema = SegmentSchema.partial().omit({
  id: true,
  project_id: true,
  // Cannot change parent project
  created_at: true,
  updated_at: true
});
var CreatePromptSchema = PromptSchema.omit({
  id: true,
  created_at: true,
  updated_at: true
});
var UpdatePromptSchema = PromptSchema.partial().omit({
  id: true,
  segment_id: true,
  // Cannot change parent segment
  created_at: true,
  updated_at: true
});
var CreateValidatorSchema = ValidatorSchema.omit({
  id: true,
  created_at: true,
  updated_at: true
});
var UpdateValidatorSchema = ValidatorSchema.partial().omit({
  id: true,
  prompt_id: true,
  // Cannot change parent prompt
  created_at: true,
  updated_at: true
});
var PaginationSchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0)
});
var SearchSchema = z.object({
  query: z.string().min(1).max(100),
  ...PaginationSchema.shape
});
var ProjectFiltersSchema = z.object({
  visibility: z.enum(["private", "public"]).optional(),
  owner_handle: z.string().min(1).max(50).optional(),
  ...PaginationSchema.shape
});
var ApiResponseSchema = (dataSchema) => z.object({
  success: z.boolean(),
  data: dataSchema.optional(),
  error: z.string().optional(),
  message: z.string().optional()
});
var PaginatedResponseSchema = (itemSchema) => z.object({
  success: z.boolean(),
  data: z.array(itemSchema),
  pagination: z.object({
    total: z.number().int().min(0),
    limit: z.number().int().min(1),
    offset: z.number().int().min(0),
    hasMore: z.boolean()
  }),
  error: z.string().optional()
});
var ProjectWithStatsSchema = ProjectSchema.extend({
  segments_count: z.number().int().min(0),
  prompts_count: z.number().int().min(0),
  validators_count: z.number().int().min(0),
  last_updated: z.date(),
  owner_handle: z.string().optional(),
  owner_name: z.string().optional()
});
var ProjectHierarchySchema = z.object({
  project: ProjectSchema,
  segments: z.array(
    SegmentSchema.extend({
      prompts: z.array(
        PromptSchema.extend({
          validators: z.array(ValidatorSchema)
        })
      )
    })
  )
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
  ApiResponseSchema,
  BillingSchema,
  CreateProfileSchema,
  CreateProjectSchema,
  CreatePromptSchema,
  CreateSegmentSchema,
  CreateValidatorSchema,
  Err,
  Ok,
  PaginatedResponseSchema,
  PaginationSchema,
  ProfileSchema,
  ProjectFiltersSchema,
  ProjectHierarchySchema,
  ProjectSchema,
  ProjectWithStatsSchema,
  PromptSchema,
  SearchSchema,
  SegmentSchema,
  UpdateProfileSchema,
  UpdateProjectSchema,
  UpdatePromptSchema,
  UpdateSegmentSchema,
  UpdateValidatorSchema,
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
