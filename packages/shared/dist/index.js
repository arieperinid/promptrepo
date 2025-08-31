"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  BillingSchema: () => BillingSchema,
  Err: () => Err,
  Ok: () => Ok,
  ProfileSchema: () => ProfileSchema,
  ProjectSchema: () => ProjectSchema,
  PromptSchema: () => PromptSchema,
  SegmentSchema: () => SegmentSchema,
  ValidatorSchema: () => ValidatorSchema,
  VersionSchema: () => VersionSchema,
  cacheDel: () => cacheDel,
  cacheGet: () => cacheGet,
  cacheSet: () => cacheSet,
  checkIntegrations: () => checkIntegrations,
  clientEnvSchema: () => clientEnvSchema,
  createCheckoutSession: () => createCheckoutSession,
  createClientAnon: () => createClientAnon,
  createClientService: () => createClientService,
  createCustomer: () => createCustomer,
  createPortalSession: () => createPortalSession,
  getCustomerByEmail: () => getCustomerByEmail,
  getEnv: () => getEnv,
  getInitialTheme: () => getInitialTheme,
  getRedisClient: () => getRedisClient,
  getResolvedTheme: () => getResolvedTheme,
  getStripeClient: () => getStripeClient,
  isErr: () => isErr,
  isOk: () => isOk,
  rateLimit: () => rateLimit,
  setThemePreference: () => setThemePreference,
  validateClientEnv: () => validateClientEnv,
  validateEnv: () => validateEnv,
  validateWebhookSignature: () => validateWebhookSignature
});
module.exports = __toCommonJS(index_exports);

// src/schemas/index.ts
var import_zod = require("zod");
var ProfileSchema = import_zod.z.object({
  id: import_zod.z.string().uuid(),
  email: import_zod.z.string().email(),
  name: import_zod.z.string().min(1).max(100),
  avatar_url: import_zod.z.string().url().optional(),
  role: import_zod.z.enum(["user", "admin"]).default("user"),
  theme_preference: import_zod.z.enum(["light", "dark", "system"]).default("light"),
  created_at: import_zod.z.date(),
  updated_at: import_zod.z.date()
});
var ProjectSchema = import_zod.z.object({
  id: import_zod.z.string().uuid(),
  name: import_zod.z.string().min(1).max(100),
  description: import_zod.z.string().max(500).optional(),
  user_id: import_zod.z.string().uuid(),
  is_public: import_zod.z.boolean().default(false),
  created_at: import_zod.z.date(),
  updated_at: import_zod.z.date()
});
var SegmentSchema = import_zod.z.object({
  id: import_zod.z.string().uuid(),
  project_id: import_zod.z.string().uuid(),
  name: import_zod.z.string().min(1).max(100),
  description: import_zod.z.string().max(500).optional(),
  order: import_zod.z.number().int().min(0),
  created_at: import_zod.z.date(),
  updated_at: import_zod.z.date()
});
var PromptSchema = import_zod.z.object({
  id: import_zod.z.string().uuid(),
  segment_id: import_zod.z.string().uuid(),
  content: import_zod.z.string().min(1),
  variables: import_zod.z.record(import_zod.z.string(), import_zod.z.any()).optional(),
  order: import_zod.z.number().int().min(0),
  is_active: import_zod.z.boolean().default(true),
  created_at: import_zod.z.date(),
  updated_at: import_zod.z.date()
});
var ValidatorSchema = import_zod.z.object({
  id: import_zod.z.string().uuid(),
  prompt_id: import_zod.z.string().uuid(),
  name: import_zod.z.string().min(1).max(100),
  type: import_zod.z.enum(["regex", "length", "contains", "custom"]),
  config: import_zod.z.record(import_zod.z.string(), import_zod.z.any()),
  is_active: import_zod.z.boolean().default(true),
  created_at: import_zod.z.date(),
  updated_at: import_zod.z.date()
});
var VersionSchema = import_zod.z.object({
  id: import_zod.z.string().uuid(),
  prompt_id: import_zod.z.string().uuid(),
  version: import_zod.z.string().min(1),
  content: import_zod.z.string().min(1),
  variables: import_zod.z.record(import_zod.z.string(), import_zod.z.any()).optional(),
  changelog: import_zod.z.string().max(1e3).optional(),
  is_published: import_zod.z.boolean().default(false),
  created_at: import_zod.z.date(),
  updated_at: import_zod.z.date()
});
var BillingSchema = import_zod.z.object({
  id: import_zod.z.string().uuid(),
  user_id: import_zod.z.string().uuid(),
  stripe_customer_id: import_zod.z.string().optional(),
  stripe_subscription_id: import_zod.z.string().optional(),
  plan: import_zod.z.enum(["free", "pro", "enterprise"]).default("free"),
  status: import_zod.z.enum(["active", "inactive", "cancelled", "past_due"]).default("active"),
  current_period_start: import_zod.z.date().optional(),
  current_period_end: import_zod.z.date().optional(),
  created_at: import_zod.z.date(),
  updated_at: import_zod.z.date()
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

// src/env.ts
var import_zod2 = require("zod");
var envSchema = import_zod2.z.object({
  // Supabase
  NEXT_PUBLIC_SUPABASE_URL: import_zod2.z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: import_zod2.z.string().min(1),
  SUPABASE_SERVICE_ROLE: import_zod2.z.string().min(1),
  // Upstash Redis
  UPSTASH_REDIS_REST_URL: import_zod2.z.string().url(),
  UPSTASH_REDIS_REST_TOKEN: import_zod2.z.string().min(1),
  // Stripe
  STRIPE_SECRET_KEY: import_zod2.z.string().min(1),
  STRIPE_WEBHOOK_SECRET: import_zod2.z.string().min(1),
  // Node Environment
  NODE_ENV: import_zod2.z.enum(["development", "test", "production"]).default("development")
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

// src/supabase.ts
var import_supabase_js = require("@supabase/supabase-js");
function createClientAnon() {
  const env = getEnv();
  return (0, import_supabase_js.createClient)(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    auth: {
      autoRefreshToken: true,
      persistSession: true
    }
  });
}
function createClientService() {
  const env = getEnv();
  return (0, import_supabase_js.createClient)(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}

// src/redis.ts
var import_redis = require("@upstash/redis");
var _redisClient = null;
function getRedisClient() {
  if (!_redisClient) {
    const env = getEnv();
    _redisClient = new import_redis.Redis({
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
var import_stripe = __toESM(require("stripe"));
var _stripe = null;
function getStripeClient() {
  if (!_stripe) {
    const env = getEnv();
    _stripe = new import_stripe.default(env.STRIPE_SECRET_KEY, {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
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
});
