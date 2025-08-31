import { z } from 'zod';

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

export { type Billing, BillingSchema, Err, Ok, type Profile, ProfileSchema, type Project, ProjectSchema, type Prompt, PromptSchema, type Result, type Segment, SegmentSchema, type ThemeMode, type Validator, ValidatorSchema, type Version, VersionSchema, getInitialTheme, getResolvedTheme, isErr, isOk, setThemePreference };
