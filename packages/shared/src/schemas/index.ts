import { z } from "zod";

// Profile Schema - Updated to match database schema
export const ProfileSchema = z.object({
  id: z.string().uuid(),
  handle: z.string().min(1).max(50), // Unique username/handle
  name: z.string().min(1).max(100).optional(),
  role: z.enum(["user", "pro", "admin"]).default("user"),
  stripe_customer_id: z.string().optional(),
  theme_pref: z.enum(["light", "dark"]).default("light"), // Updated field name
  created_at: z.date(),
  updated_at: z.date(),
});

// Project Schema - Updated to match database schema
export const ProjectSchema = z.object({
  id: z.string().uuid(),
  owner_id: z.string().uuid(), // Changed from user_id
  name: z.string().min(1).max(100),
  description: z.string().max(1000).optional(),
  visibility: z.enum(["private", "public"]).default("private"), // Changed from is_public
  created_at: z.date(),
  updated_at: z.date(),
});

// Segment Schema - Updated to match database schema
export const SegmentSchema = z.object({
  id: z.string().uuid(),
  project_id: z.string().uuid(),
  name: z.string().min(1).max(100),
  position: z.number().int().min(0).default(0), // Changed from order
  created_at: z.date(),
  updated_at: z.date(),
});

// Prompt Schema - Updated to match database schema
export const PromptSchema = z.object({
  id: z.string().uuid(),
  segment_id: z.string().uuid(),
  title: z.string().min(1).max(200), // Changed from content to title
  body: z.string().min(1), // Main content field
  language: z.string().default("pt-BR"),
  kind: z.enum(["prompt", "system", "tool"]).default("prompt"),
  position: z.number().int().min(0).default(0), // Changed from order
  created_at: z.date(),
  updated_at: z.date(),
});

// Validator Schema - Updated to match database schema
export const ValidatorSchema = z.object({
  id: z.string().uuid(),
  prompt_id: z.string().uuid(),
  title: z.string().min(1).max(200), // Changed from name
  body: z.string().min(1), // Validation rules/description
  created_at: z.date(),
  updated_at: z.date(),
});

// Version Schema - Updated to match database schema
export const VersionSchema = z.object({
  id: z.string().uuid(),
  entity_type: z.enum(["project", "segment", "prompt", "validator"]),
  entity_id: z.string().uuid(), // Changed from prompt_id to be more generic
  snapshot: z.record(z.string(), z.any()), // JSON snapshot of entity
  author_id: z.string().uuid().optional(),
  created_at: z.date(),
});

// Billing Schema - Updated to match database schema
export const BillingSchema = z.object({
  profile_id: z.string().uuid(), // Primary key, references profiles
  plan: z.enum(["free", "pro"]).default("free"), // Simplified plans
  current_period_end: z.date().optional(),
  status: z.enum(["active", "past_due", "canceled", "incomplete"]).optional(),
  updated_at: z.date(),
});

// ============================================================================
// INPUT SCHEMAS FOR API OPERATIONS
// ============================================================================

// Create/Update Profile Input
export const CreateProfileSchema = ProfileSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export const UpdateProfileSchema = ProfileSchema.partial().omit({
  id: true,
  created_at: true,
  updated_at: true,
});

// Create/Update Project Input
export const CreateProjectSchema = ProjectSchema.omit({
  id: true,
  owner_id: true, // Set from auth context
  created_at: true,
  updated_at: true,
});

export const UpdateProjectSchema = ProjectSchema.partial().omit({
  id: true,
  owner_id: true,
  created_at: true,
  updated_at: true,
});

// Create/Update Segment Input
export const CreateSegmentSchema = SegmentSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export const UpdateSegmentSchema = SegmentSchema.partial().omit({
  id: true,
  project_id: true, // Cannot change parent project
  created_at: true,
  updated_at: true,
});

// Create/Update Prompt Input
export const CreatePromptSchema = PromptSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export const UpdatePromptSchema = PromptSchema.partial().omit({
  id: true,
  segment_id: true, // Cannot change parent segment
  created_at: true,
  updated_at: true,
});

// Create/Update Validator Input
export const CreateValidatorSchema = ValidatorSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export const UpdateValidatorSchema = ValidatorSchema.partial().omit({
  id: true,
  prompt_id: true, // Cannot change parent prompt
  created_at: true,
  updated_at: true,
});

// ============================================================================
// QUERY SCHEMAS FOR API PARAMETERS
// ============================================================================

// Pagination schema
export const PaginationSchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0),
});

// Search schema
export const SearchSchema = z.object({
  query: z.string().min(1).max(100),
  ...PaginationSchema.shape,
});

// Project filters
export const ProjectFiltersSchema = z.object({
  visibility: z.enum(["private", "public"]).optional(),
  owner_handle: z.string().min(1).max(50).optional(),
  ...PaginationSchema.shape,
});

// ============================================================================
// RESPONSE SCHEMAS
// ============================================================================

// API Response wrapper
export const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    data: dataSchema.optional(),
    error: z.string().optional(),
    message: z.string().optional(),
  });

// Paginated response
export const PaginatedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    success: z.boolean(),
    data: z.array(itemSchema),
    pagination: z.object({
      total: z.number().int().min(0),
      limit: z.number().int().min(1),
      offset: z.number().int().min(0),
      hasMore: z.boolean(),
    }),
    error: z.string().optional(),
  });

// Project with stats
export const ProjectWithStatsSchema = ProjectSchema.extend({
  segments_count: z.number().int().min(0),
  prompts_count: z.number().int().min(0),
  validators_count: z.number().int().min(0),
  last_updated: z.date(),
  owner_handle: z.string().optional(),
  owner_name: z.string().optional(),
});

// Project hierarchy (for public API)
export const ProjectHierarchySchema = z.object({
  project: ProjectSchema,
  segments: z.array(
    SegmentSchema.extend({
      prompts: z.array(
        PromptSchema.extend({
          validators: z.array(ValidatorSchema),
        })
      ),
    })
  ),
});

// ============================================================================
// EXPORT TYPES
// ============================================================================

export type Profile = z.infer<typeof ProfileSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type Segment = z.infer<typeof SegmentSchema>;
export type Prompt = z.infer<typeof PromptSchema>;
export type Validator = z.infer<typeof ValidatorSchema>;
export type Version = z.infer<typeof VersionSchema>;
export type Billing = z.infer<typeof BillingSchema>;

// Input types
export type CreateProfile = z.infer<typeof CreateProfileSchema>;
export type UpdateProfile = z.infer<typeof UpdateProfileSchema>;
export type CreateProject = z.infer<typeof CreateProjectSchema>;
export type UpdateProject = z.infer<typeof UpdateProjectSchema>;
export type CreateSegment = z.infer<typeof CreateSegmentSchema>;
export type UpdateSegment = z.infer<typeof UpdateSegmentSchema>;
export type CreatePrompt = z.infer<typeof CreatePromptSchema>;
export type UpdatePrompt = z.infer<typeof UpdatePromptSchema>;
export type CreateValidator = z.infer<typeof CreateValidatorSchema>;
export type UpdateValidator = z.infer<typeof UpdateValidatorSchema>;

// Query types
export type Pagination = z.infer<typeof PaginationSchema>;
export type Search = z.infer<typeof SearchSchema>;
export type ProjectFilters = z.infer<typeof ProjectFiltersSchema>;

// Response types
export type ProjectWithStats = z.infer<typeof ProjectWithStatsSchema>;
export type ProjectHierarchy = z.infer<typeof ProjectHierarchySchema>;
