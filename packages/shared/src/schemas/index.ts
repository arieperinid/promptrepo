import { z } from "zod";

// Profile Schema
export const ProfileSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(1).max(100),
  avatar_url: z.string().url().optional(),
  role: z.enum(["user", "admin"]).default("user"),
  theme_preference: z.enum(["light", "dark", "system"]).default("light"),
  created_at: z.date(),
  updated_at: z.date(),
});

// Project Schema  
export const ProjectSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  user_id: z.string().uuid(),
  is_public: z.boolean().default(false),
  created_at: z.date(),
  updated_at: z.date(),
});

// Segment Schema
export const SegmentSchema = z.object({
  id: z.string().uuid(),
  project_id: z.string().uuid(),
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  order: z.number().int().min(0),
  created_at: z.date(),
  updated_at: z.date(),
});

// Prompt Schema
export const PromptSchema = z.object({
  id: z.string().uuid(),
  segment_id: z.string().uuid(),
  content: z.string().min(1),
  variables: z.record(z.string(), z.any()).optional(),
  order: z.number().int().min(0),
  is_active: z.boolean().default(true),
  created_at: z.date(),
  updated_at: z.date(),
});

// Validator Schema
export const ValidatorSchema = z.object({
  id: z.string().uuid(),
  prompt_id: z.string().uuid(),
  name: z.string().min(1).max(100),
  type: z.enum(["regex", "length", "contains", "custom"]),
  config: z.record(z.string(), z.any()),
  is_active: z.boolean().default(true),
  created_at: z.date(),
  updated_at: z.date(),
});

// Version Schema
export const VersionSchema = z.object({
  id: z.string().uuid(),
  prompt_id: z.string().uuid(),
  version: z.string().min(1),
  content: z.string().min(1),
  variables: z.record(z.string(), z.any()).optional(),
  changelog: z.string().max(1000).optional(),
  is_published: z.boolean().default(false),
  created_at: z.date(),
  updated_at: z.date(),
});

// Billing Schema
export const BillingSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  stripe_customer_id: z.string().optional(),
  stripe_subscription_id: z.string().optional(),
  plan: z.enum(["free", "pro", "enterprise"]).default("free"),
  status: z.enum(["active", "inactive", "cancelled", "past_due"]).default("active"),
  current_period_start: z.date().optional(),
  current_period_end: z.date().optional(),
  created_at: z.date(),
  updated_at: z.date(),
});

// Export types
export type Profile = z.infer<typeof ProfileSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type Segment = z.infer<typeof SegmentSchema>;
export type Prompt = z.infer<typeof PromptSchema>;
export type Validator = z.infer<typeof ValidatorSchema>;
export type Version = z.infer<typeof VersionSchema>;
export type Billing = z.infer<typeof BillingSchema>;
