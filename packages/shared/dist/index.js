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
  getInitialTheme: () => getInitialTheme,
  getResolvedTheme: () => getResolvedTheme,
  isErr: () => isErr,
  isOk: () => isOk,
  setThemePreference: () => setThemePreference
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
  getInitialTheme,
  getResolvedTheme,
  isErr,
  isOk,
  setThemePreference
});
