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
  getInitialTheme,
  getResolvedTheme,
  isErr,
  isOk,
  setThemePreference
};
