"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/env.ts
var env_exports = {};
__export(env_exports, {
  checkIntegrations: () => checkIntegrations,
  clientEnvSchema: () => clientEnvSchema,
  getEnv: () => getEnv,
  validateClientEnv: () => validateClientEnv,
  validateEnv: () => validateEnv
});
module.exports = __toCommonJS(env_exports);
var import_zod = require("zod");
var envSchema = import_zod.z.object({
  // Supabase
  NEXT_PUBLIC_SUPABASE_URL: import_zod.z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: import_zod.z.string().min(1),
  SUPABASE_SERVICE_ROLE: import_zod.z.string().min(1),
  // Upstash Redis
  UPSTASH_REDIS_REST_URL: import_zod.z.string().url(),
  UPSTASH_REDIS_REST_TOKEN: import_zod.z.string().min(1),
  // Stripe
  STRIPE_SECRET_KEY: import_zod.z.string().min(1),
  STRIPE_WEBHOOK_SECRET: import_zod.z.string().min(1),
  // Node Environment
  NODE_ENV: import_zod.z.enum(["development", "test", "production"]).default("development")
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  checkIntegrations,
  clientEnvSchema,
  getEnv,
  validateClientEnv,
  validateEnv
});
