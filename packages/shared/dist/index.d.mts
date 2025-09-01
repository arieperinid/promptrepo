import { z } from 'zod';
export { ClientEnv, Env, checkIntegrations, clientEnvSchema, getEnv, validateClientEnv, validateEnv } from './env.mjs';
import { SupabaseClient } from '@supabase/supabase-js';
import { Redis } from '@upstash/redis';
import Stripe from 'stripe';

declare const ProfileSchema: z.ZodObject<{
    id: z.ZodString;
    handle: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
    role: z.ZodDefault<z.ZodEnum<["user", "pro", "admin"]>>;
    stripe_customer_id: z.ZodOptional<z.ZodString>;
    theme_pref: z.ZodDefault<z.ZodEnum<["light", "dark"]>>;
    created_at: z.ZodDate;
    updated_at: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    handle: string;
    role: "user" | "pro" | "admin";
    theme_pref: "light" | "dark";
    created_at: Date;
    updated_at: Date;
    name?: string | undefined;
    stripe_customer_id?: string | undefined;
}, {
    id: string;
    handle: string;
    created_at: Date;
    updated_at: Date;
    name?: string | undefined;
    role?: "user" | "pro" | "admin" | undefined;
    stripe_customer_id?: string | undefined;
    theme_pref?: "light" | "dark" | undefined;
}>;
declare const ProjectSchema: z.ZodObject<{
    id: z.ZodString;
    owner_id: z.ZodString;
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    visibility: z.ZodDefault<z.ZodEnum<["private", "public"]>>;
    created_at: z.ZodDate;
    updated_at: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
    owner_id: string;
    visibility: "private" | "public";
    description?: string | undefined;
}, {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
    owner_id: string;
    description?: string | undefined;
    visibility?: "private" | "public" | undefined;
}>;
declare const SegmentSchema: z.ZodObject<{
    id: z.ZodString;
    project_id: z.ZodString;
    name: z.ZodString;
    position: z.ZodDefault<z.ZodNumber>;
    created_at: z.ZodDate;
    updated_at: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
    project_id: string;
    position: number;
}, {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
    project_id: string;
    position?: number | undefined;
}>;
declare const PromptSchema: z.ZodObject<{
    id: z.ZodString;
    segment_id: z.ZodString;
    title: z.ZodString;
    body: z.ZodString;
    language: z.ZodDefault<z.ZodString>;
    kind: z.ZodDefault<z.ZodEnum<["prompt", "system", "tool"]>>;
    position: z.ZodDefault<z.ZodNumber>;
    created_at: z.ZodDate;
    updated_at: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    created_at: Date;
    updated_at: Date;
    position: number;
    segment_id: string;
    title: string;
    body: string;
    language: string;
    kind: "prompt" | "system" | "tool";
}, {
    id: string;
    created_at: Date;
    updated_at: Date;
    segment_id: string;
    title: string;
    body: string;
    position?: number | undefined;
    language?: string | undefined;
    kind?: "prompt" | "system" | "tool" | undefined;
}>;
declare const ValidatorSchema: z.ZodObject<{
    id: z.ZodString;
    prompt_id: z.ZodString;
    title: z.ZodString;
    body: z.ZodString;
    created_at: z.ZodDate;
    updated_at: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    created_at: Date;
    updated_at: Date;
    title: string;
    body: string;
    prompt_id: string;
}, {
    id: string;
    created_at: Date;
    updated_at: Date;
    title: string;
    body: string;
    prompt_id: string;
}>;
declare const VersionSchema: z.ZodObject<{
    id: z.ZodString;
    entity_type: z.ZodEnum<["project", "segment", "prompt", "validator"]>;
    entity_id: z.ZodString;
    snapshot: z.ZodRecord<z.ZodString, z.ZodAny>;
    author_id: z.ZodOptional<z.ZodString>;
    created_at: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    created_at: Date;
    entity_type: "prompt" | "project" | "segment" | "validator";
    entity_id: string;
    snapshot: Record<string, any>;
    author_id?: string | undefined;
}, {
    id: string;
    created_at: Date;
    entity_type: "prompt" | "project" | "segment" | "validator";
    entity_id: string;
    snapshot: Record<string, any>;
    author_id?: string | undefined;
}>;
declare const BillingSchema: z.ZodObject<{
    profile_id: z.ZodString;
    plan: z.ZodDefault<z.ZodEnum<["free", "pro"]>>;
    current_period_end: z.ZodOptional<z.ZodDate>;
    status: z.ZodOptional<z.ZodEnum<["active", "past_due", "canceled", "incomplete"]>>;
    updated_at: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    updated_at: Date;
    profile_id: string;
    plan: "pro" | "free";
    status?: "active" | "past_due" | "canceled" | "incomplete" | undefined;
    current_period_end?: Date | undefined;
}, {
    updated_at: Date;
    profile_id: string;
    status?: "active" | "past_due" | "canceled" | "incomplete" | undefined;
    plan?: "pro" | "free" | undefined;
    current_period_end?: Date | undefined;
}>;
declare const CreateProfileSchema: z.ZodObject<Omit<{
    id: z.ZodString;
    handle: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
    role: z.ZodDefault<z.ZodEnum<["user", "pro", "admin"]>>;
    stripe_customer_id: z.ZodOptional<z.ZodString>;
    theme_pref: z.ZodDefault<z.ZodEnum<["light", "dark"]>>;
    created_at: z.ZodDate;
    updated_at: z.ZodDate;
}, "id" | "created_at" | "updated_at">, "strip", z.ZodTypeAny, {
    handle: string;
    role: "user" | "pro" | "admin";
    theme_pref: "light" | "dark";
    name?: string | undefined;
    stripe_customer_id?: string | undefined;
}, {
    handle: string;
    name?: string | undefined;
    role?: "user" | "pro" | "admin" | undefined;
    stripe_customer_id?: string | undefined;
    theme_pref?: "light" | "dark" | undefined;
}>;
declare const UpdateProfileSchema: z.ZodObject<Omit<{
    id: z.ZodOptional<z.ZodString>;
    handle: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    role: z.ZodOptional<z.ZodDefault<z.ZodEnum<["user", "pro", "admin"]>>>;
    stripe_customer_id: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    theme_pref: z.ZodOptional<z.ZodDefault<z.ZodEnum<["light", "dark"]>>>;
    created_at: z.ZodOptional<z.ZodDate>;
    updated_at: z.ZodOptional<z.ZodDate>;
}, "id" | "created_at" | "updated_at">, "strip", z.ZodTypeAny, {
    handle?: string | undefined;
    name?: string | undefined;
    role?: "user" | "pro" | "admin" | undefined;
    stripe_customer_id?: string | undefined;
    theme_pref?: "light" | "dark" | undefined;
}, {
    handle?: string | undefined;
    name?: string | undefined;
    role?: "user" | "pro" | "admin" | undefined;
    stripe_customer_id?: string | undefined;
    theme_pref?: "light" | "dark" | undefined;
}>;
declare const CreateProjectSchema: z.ZodObject<Omit<{
    id: z.ZodString;
    owner_id: z.ZodString;
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    visibility: z.ZodDefault<z.ZodEnum<["private", "public"]>>;
    created_at: z.ZodDate;
    updated_at: z.ZodDate;
}, "id" | "created_at" | "updated_at" | "owner_id">, "strip", z.ZodTypeAny, {
    name: string;
    visibility: "private" | "public";
    description?: string | undefined;
}, {
    name: string;
    description?: string | undefined;
    visibility?: "private" | "public" | undefined;
}>;
declare const UpdateProjectSchema: z.ZodObject<Omit<{
    id: z.ZodOptional<z.ZodString>;
    owner_id: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    visibility: z.ZodOptional<z.ZodDefault<z.ZodEnum<["private", "public"]>>>;
    created_at: z.ZodOptional<z.ZodDate>;
    updated_at: z.ZodOptional<z.ZodDate>;
}, "id" | "created_at" | "updated_at" | "owner_id">, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    description?: string | undefined;
    visibility?: "private" | "public" | undefined;
}, {
    name?: string | undefined;
    description?: string | undefined;
    visibility?: "private" | "public" | undefined;
}>;
declare const CreateSegmentSchema: z.ZodObject<Omit<{
    id: z.ZodString;
    project_id: z.ZodString;
    name: z.ZodString;
    position: z.ZodDefault<z.ZodNumber>;
    created_at: z.ZodDate;
    updated_at: z.ZodDate;
}, "id" | "created_at" | "updated_at">, "strip", z.ZodTypeAny, {
    name: string;
    project_id: string;
    position: number;
}, {
    name: string;
    project_id: string;
    position?: number | undefined;
}>;
declare const UpdateSegmentSchema: z.ZodObject<Omit<{
    id: z.ZodOptional<z.ZodString>;
    project_id: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    position: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    created_at: z.ZodOptional<z.ZodDate>;
    updated_at: z.ZodOptional<z.ZodDate>;
}, "id" | "created_at" | "updated_at" | "project_id">, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    position?: number | undefined;
}, {
    name?: string | undefined;
    position?: number | undefined;
}>;
declare const CreatePromptSchema: z.ZodObject<Omit<{
    id: z.ZodString;
    segment_id: z.ZodString;
    title: z.ZodString;
    body: z.ZodString;
    language: z.ZodDefault<z.ZodString>;
    kind: z.ZodDefault<z.ZodEnum<["prompt", "system", "tool"]>>;
    position: z.ZodDefault<z.ZodNumber>;
    created_at: z.ZodDate;
    updated_at: z.ZodDate;
}, "id" | "created_at" | "updated_at">, "strip", z.ZodTypeAny, {
    position: number;
    segment_id: string;
    title: string;
    body: string;
    language: string;
    kind: "prompt" | "system" | "tool";
}, {
    segment_id: string;
    title: string;
    body: string;
    position?: number | undefined;
    language?: string | undefined;
    kind?: "prompt" | "system" | "tool" | undefined;
}>;
declare const UpdatePromptSchema: z.ZodObject<Omit<{
    id: z.ZodOptional<z.ZodString>;
    segment_id: z.ZodOptional<z.ZodString>;
    title: z.ZodOptional<z.ZodString>;
    body: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    kind: z.ZodOptional<z.ZodDefault<z.ZodEnum<["prompt", "system", "tool"]>>>;
    position: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    created_at: z.ZodOptional<z.ZodDate>;
    updated_at: z.ZodOptional<z.ZodDate>;
}, "id" | "created_at" | "updated_at" | "segment_id">, "strip", z.ZodTypeAny, {
    position?: number | undefined;
    title?: string | undefined;
    body?: string | undefined;
    language?: string | undefined;
    kind?: "prompt" | "system" | "tool" | undefined;
}, {
    position?: number | undefined;
    title?: string | undefined;
    body?: string | undefined;
    language?: string | undefined;
    kind?: "prompt" | "system" | "tool" | undefined;
}>;
declare const CreateValidatorSchema: z.ZodObject<Omit<{
    id: z.ZodString;
    prompt_id: z.ZodString;
    title: z.ZodString;
    body: z.ZodString;
    created_at: z.ZodDate;
    updated_at: z.ZodDate;
}, "id" | "created_at" | "updated_at">, "strip", z.ZodTypeAny, {
    title: string;
    body: string;
    prompt_id: string;
}, {
    title: string;
    body: string;
    prompt_id: string;
}>;
declare const UpdateValidatorSchema: z.ZodObject<Omit<{
    id: z.ZodOptional<z.ZodString>;
    prompt_id: z.ZodOptional<z.ZodString>;
    title: z.ZodOptional<z.ZodString>;
    body: z.ZodOptional<z.ZodString>;
    created_at: z.ZodOptional<z.ZodDate>;
    updated_at: z.ZodOptional<z.ZodDate>;
}, "id" | "created_at" | "updated_at" | "prompt_id">, "strip", z.ZodTypeAny, {
    title?: string | undefined;
    body?: string | undefined;
}, {
    title?: string | undefined;
    body?: string | undefined;
}>;
declare const PaginationSchema: z.ZodObject<{
    limit: z.ZodDefault<z.ZodNumber>;
    offset: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    offset: number;
}, {
    limit?: number | undefined;
    offset?: number | undefined;
}>;
declare const SearchSchema: z.ZodObject<{
    limit: z.ZodDefault<z.ZodNumber>;
    offset: z.ZodDefault<z.ZodNumber>;
    query: z.ZodString;
}, "strip", z.ZodTypeAny, {
    limit: number;
    offset: number;
    query: string;
}, {
    query: string;
    limit?: number | undefined;
    offset?: number | undefined;
}>;
declare const ProjectFiltersSchema: z.ZodObject<{
    limit: z.ZodDefault<z.ZodNumber>;
    offset: z.ZodDefault<z.ZodNumber>;
    visibility: z.ZodOptional<z.ZodEnum<["private", "public"]>>;
    owner_handle: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    offset: number;
    visibility?: "private" | "public" | undefined;
    owner_handle?: string | undefined;
}, {
    visibility?: "private" | "public" | undefined;
    limit?: number | undefined;
    offset?: number | undefined;
    owner_handle?: string | undefined;
}>;
declare const ApiResponseSchema: <T extends z.ZodTypeAny>(dataSchema: T) => z.ZodObject<{
    success: z.ZodBoolean;
    data: z.ZodOptional<T>;
    error: z.ZodOptional<z.ZodString>;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
    success: z.ZodBoolean;
    data: z.ZodOptional<T>;
    error: z.ZodOptional<z.ZodString>;
    message: z.ZodOptional<z.ZodString>;
}>, any> extends infer T_1 ? { [k in keyof T_1]: T_1[k]; } : never, z.baseObjectInputType<{
    success: z.ZodBoolean;
    data: z.ZodOptional<T>;
    error: z.ZodOptional<z.ZodString>;
    message: z.ZodOptional<z.ZodString>;
}> extends infer T_2 ? { [k_1 in keyof T_2]: T_2[k_1]; } : never>;
declare const PaginatedResponseSchema: <T extends z.ZodTypeAny>(itemSchema: T) => z.ZodObject<{
    success: z.ZodBoolean;
    data: z.ZodArray<T, "many">;
    pagination: z.ZodObject<{
        total: z.ZodNumber;
        limit: z.ZodNumber;
        offset: z.ZodNumber;
        hasMore: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        limit: number;
        offset: number;
        total: number;
        hasMore: boolean;
    }, {
        limit: number;
        offset: number;
        total: number;
        hasMore: boolean;
    }>;
    error: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    data: T["_output"][];
    pagination: {
        limit: number;
        offset: number;
        total: number;
        hasMore: boolean;
    };
    error?: string | undefined;
}, {
    success: boolean;
    data: T["_input"][];
    pagination: {
        limit: number;
        offset: number;
        total: number;
        hasMore: boolean;
    };
    error?: string | undefined;
}>;
declare const ProjectWithStatsSchema: z.ZodObject<{
    id: z.ZodString;
    owner_id: z.ZodString;
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    visibility: z.ZodDefault<z.ZodEnum<["private", "public"]>>;
    created_at: z.ZodDate;
    updated_at: z.ZodDate;
} & {
    segments_count: z.ZodNumber;
    prompts_count: z.ZodNumber;
    validators_count: z.ZodNumber;
    last_updated: z.ZodDate;
    owner_handle: z.ZodOptional<z.ZodString>;
    owner_name: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
    owner_id: string;
    visibility: "private" | "public";
    segments_count: number;
    prompts_count: number;
    validators_count: number;
    last_updated: Date;
    description?: string | undefined;
    owner_handle?: string | undefined;
    owner_name?: string | undefined;
}, {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
    owner_id: string;
    segments_count: number;
    prompts_count: number;
    validators_count: number;
    last_updated: Date;
    description?: string | undefined;
    visibility?: "private" | "public" | undefined;
    owner_handle?: string | undefined;
    owner_name?: string | undefined;
}>;
declare const ProjectHierarchySchema: z.ZodObject<{
    project: z.ZodObject<{
        id: z.ZodString;
        owner_id: z.ZodString;
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        visibility: z.ZodDefault<z.ZodEnum<["private", "public"]>>;
        created_at: z.ZodDate;
        updated_at: z.ZodDate;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
        created_at: Date;
        updated_at: Date;
        owner_id: string;
        visibility: "private" | "public";
        description?: string | undefined;
    }, {
        id: string;
        name: string;
        created_at: Date;
        updated_at: Date;
        owner_id: string;
        description?: string | undefined;
        visibility?: "private" | "public" | undefined;
    }>;
    segments: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        project_id: z.ZodString;
        name: z.ZodString;
        position: z.ZodDefault<z.ZodNumber>;
        created_at: z.ZodDate;
        updated_at: z.ZodDate;
    } & {
        prompts: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            segment_id: z.ZodString;
            title: z.ZodString;
            body: z.ZodString;
            language: z.ZodDefault<z.ZodString>;
            kind: z.ZodDefault<z.ZodEnum<["prompt", "system", "tool"]>>;
            position: z.ZodDefault<z.ZodNumber>;
            created_at: z.ZodDate;
            updated_at: z.ZodDate;
        } & {
            validators: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                prompt_id: z.ZodString;
                title: z.ZodString;
                body: z.ZodString;
                created_at: z.ZodDate;
                updated_at: z.ZodDate;
            }, "strip", z.ZodTypeAny, {
                id: string;
                created_at: Date;
                updated_at: Date;
                title: string;
                body: string;
                prompt_id: string;
            }, {
                id: string;
                created_at: Date;
                updated_at: Date;
                title: string;
                body: string;
                prompt_id: string;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            created_at: Date;
            updated_at: Date;
            position: number;
            segment_id: string;
            title: string;
            body: string;
            language: string;
            kind: "prompt" | "system" | "tool";
            validators: {
                id: string;
                created_at: Date;
                updated_at: Date;
                title: string;
                body: string;
                prompt_id: string;
            }[];
        }, {
            id: string;
            created_at: Date;
            updated_at: Date;
            segment_id: string;
            title: string;
            body: string;
            validators: {
                id: string;
                created_at: Date;
                updated_at: Date;
                title: string;
                body: string;
                prompt_id: string;
            }[];
            position?: number | undefined;
            language?: string | undefined;
            kind?: "prompt" | "system" | "tool" | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
        created_at: Date;
        updated_at: Date;
        project_id: string;
        position: number;
        prompts: {
            id: string;
            created_at: Date;
            updated_at: Date;
            position: number;
            segment_id: string;
            title: string;
            body: string;
            language: string;
            kind: "prompt" | "system" | "tool";
            validators: {
                id: string;
                created_at: Date;
                updated_at: Date;
                title: string;
                body: string;
                prompt_id: string;
            }[];
        }[];
    }, {
        id: string;
        name: string;
        created_at: Date;
        updated_at: Date;
        project_id: string;
        prompts: {
            id: string;
            created_at: Date;
            updated_at: Date;
            segment_id: string;
            title: string;
            body: string;
            validators: {
                id: string;
                created_at: Date;
                updated_at: Date;
                title: string;
                body: string;
                prompt_id: string;
            }[];
            position?: number | undefined;
            language?: string | undefined;
            kind?: "prompt" | "system" | "tool" | undefined;
        }[];
        position?: number | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    project: {
        id: string;
        name: string;
        created_at: Date;
        updated_at: Date;
        owner_id: string;
        visibility: "private" | "public";
        description?: string | undefined;
    };
    segments: {
        id: string;
        name: string;
        created_at: Date;
        updated_at: Date;
        project_id: string;
        position: number;
        prompts: {
            id: string;
            created_at: Date;
            updated_at: Date;
            position: number;
            segment_id: string;
            title: string;
            body: string;
            language: string;
            kind: "prompt" | "system" | "tool";
            validators: {
                id: string;
                created_at: Date;
                updated_at: Date;
                title: string;
                body: string;
                prompt_id: string;
            }[];
        }[];
    }[];
}, {
    project: {
        id: string;
        name: string;
        created_at: Date;
        updated_at: Date;
        owner_id: string;
        description?: string | undefined;
        visibility?: "private" | "public" | undefined;
    };
    segments: {
        id: string;
        name: string;
        created_at: Date;
        updated_at: Date;
        project_id: string;
        prompts: {
            id: string;
            created_at: Date;
            updated_at: Date;
            segment_id: string;
            title: string;
            body: string;
            validators: {
                id: string;
                created_at: Date;
                updated_at: Date;
                title: string;
                body: string;
                prompt_id: string;
            }[];
            position?: number | undefined;
            language?: string | undefined;
            kind?: "prompt" | "system" | "tool" | undefined;
        }[];
        position?: number | undefined;
    }[];
}>;
type Profile = z.infer<typeof ProfileSchema>;
type Project = z.infer<typeof ProjectSchema>;
type Segment = z.infer<typeof SegmentSchema>;
type Prompt = z.infer<typeof PromptSchema>;
type Validator = z.infer<typeof ValidatorSchema>;
type Version = z.infer<typeof VersionSchema>;
type Billing = z.infer<typeof BillingSchema>;
type CreateProfile = z.infer<typeof CreateProfileSchema>;
type UpdateProfile = z.infer<typeof UpdateProfileSchema>;
type CreateProject = z.infer<typeof CreateProjectSchema>;
type UpdateProject = z.infer<typeof UpdateProjectSchema>;
type CreateSegment = z.infer<typeof CreateSegmentSchema>;
type UpdateSegment = z.infer<typeof UpdateSegmentSchema>;
type CreatePrompt = z.infer<typeof CreatePromptSchema>;
type UpdatePrompt = z.infer<typeof UpdatePromptSchema>;
type CreateValidator = z.infer<typeof CreateValidatorSchema>;
type UpdateValidator = z.infer<typeof UpdateValidatorSchema>;
type Pagination = z.infer<typeof PaginationSchema>;
type Search = z.infer<typeof SearchSchema>;
type ProjectFilters = z.infer<typeof ProjectFiltersSchema>;
type ProjectWithStats = z.infer<typeof ProjectWithStatsSchema>;
type ProjectHierarchy = z.infer<typeof ProjectHierarchySchema>;

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

export { ApiResponseSchema, type Billing, BillingSchema, type CacheOptions, type CreateProfile, CreateProfileSchema, type CreateProject, CreateProjectSchema, type CreatePrompt, CreatePromptSchema, type CreateSegment, CreateSegmentSchema, type CreateValidator, CreateValidatorSchema, type Database, Err, Ok, PaginatedResponseSchema, type Pagination, PaginationSchema, type Profile, ProfileSchema, type Project, type ProjectFilters, ProjectFiltersSchema, type ProjectHierarchy, ProjectHierarchySchema, ProjectSchema, type ProjectWithStats, ProjectWithStatsSchema, type Prompt, PromptSchema, type Result, type Search, SearchSchema, type Segment, SegmentSchema, type SubscriptionPlan, type ThemeMode, type UpdateProfile, UpdateProfileSchema, type UpdateProject, UpdateProjectSchema, type UpdatePrompt, UpdatePromptSchema, type UpdateSegment, UpdateSegmentSchema, type UpdateValidator, UpdateValidatorSchema, type Validator, ValidatorSchema, type Version, VersionSchema, cacheDel, cacheGet, cacheSet, createCheckoutSession, createClientAnon, createClientService, createCustomer, createPortalSession, getCustomerByEmail, getInitialTheme, getRedisClient, getResolvedTheme, getStripeClient, isErr, isOk, rateLimit, setThemePreference, validateWebhookSignature };
