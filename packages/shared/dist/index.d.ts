import { z } from 'zod';
export { ClientEnv, Env, checkIntegrations, clientEnvSchema, getEnv, validateClientEnv, validateEnv } from './env.js';
import { SupabaseClient } from '@supabase/supabase-js';
import { Redis } from '@upstash/redis';
import Stripe from 'stripe';

/**
 * User role enumeration
 */
declare const ROLE: {
    readonly user: "user";
    readonly pro: "pro";
    readonly admin: "admin";
};
type Role = typeof ROLE[keyof typeof ROLE];
declare const ROLES: ("user" | "pro" | "admin")[];

/**
 * Project visibility enumeration
 */
declare const VISIBILITY: {
    readonly private: "private";
    readonly public: "public";
};
type Visibility = typeof VISIBILITY[keyof typeof VISIBILITY];
declare const VISIBILITIES: ("private" | "public")[];

/**
 * Prompt kind enumeration
 */
declare const KIND: {
    readonly prompt: "prompt";
    readonly system: "system";
    readonly tool: "tool";
};
type Kind = typeof KIND[keyof typeof KIND];
declare const KINDS: ("prompt" | "system" | "tool")[];

/**
 * Billing plan enumeration
 */
declare const PLAN: {
    readonly free: "free";
    readonly pro: "pro";
};
type Plan = typeof PLAN[keyof typeof PLAN];
declare const PLANS: ("pro" | "free")[];

/**
 * Billing status enumeration
 */
declare const BILLING_STATUS: {
    readonly active: "active";
    readonly past_due: "past_due";
    readonly canceled: "canceled";
    readonly incomplete: "incomplete";
};
type BillingStatus = typeof BILLING_STATUS[keyof typeof BILLING_STATUS];
declare const BILLING_STATUSES: ("active" | "past_due" | "canceled" | "incomplete")[];

/**
 * Theme preference enumeration
 */
declare const THEME_PREF: {
    readonly light: "light";
    readonly dark: "dark";
};
type ThemePref = typeof THEME_PREF[keyof typeof THEME_PREF];
declare const THEME_PREFS: ("light" | "dark")[];

/**
 * Language enumeration
 */
declare const LANGUAGE: {
    readonly en: "en";
    readonly 'pt-BR': "pt-BR";
};
type Language = typeof LANGUAGE[keyof typeof LANGUAGE];
declare const LANGUAGES: ("en" | "pt-BR")[];
declare const DEFAULT_LANGUAGE: Language;

/**
 * Profile schema matching the database structure
 */
declare const ProfileSchema: z.ZodObject<{
    id: z.ZodString;
    handle: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
    role: z.ZodDefault<z.ZodEnum<["user", "pro", "admin"]>>;
    stripe_customer_id: z.ZodOptional<z.ZodString>;
    theme_pref: z.ZodDefault<z.ZodEnum<["light", "dark"]>>;
    created_at: z.ZodDate;
    updated_at: z.ZodDate;
}, "strict", z.ZodTypeAny, {
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
type Profile = z.infer<typeof ProfileSchema>;
type ProfileWithRole<T extends Role> = Profile & {
    role: T;
};
type UserProfile = ProfileWithRole<typeof ROLE.user>;
type ProProfile = ProfileWithRole<typeof ROLE.pro>;
type AdminProfile = ProfileWithRole<typeof ROLE.admin>;

/**
 * Project schema matching the database structure
 */
declare const ProjectSchema: z.ZodObject<{
    id: z.ZodString;
    owner_id: z.ZodString;
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    visibility: z.ZodDefault<z.ZodEnum<["private", "public"]>>;
    created_at: z.ZodDate;
    updated_at: z.ZodDate;
}, "strict", z.ZodTypeAny, {
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
type Project = z.infer<typeof ProjectSchema>;
type ProjectWithVisibility<T extends Visibility> = Project & {
    visibility: T;
};
type PrivateProject = ProjectWithVisibility<typeof VISIBILITY.private>;
type PublicProject = ProjectWithVisibility<typeof VISIBILITY.public>;

/**
 * Segment schema matching the database structure
 */
declare const SegmentSchema: z.ZodObject<{
    id: z.ZodString;
    project_id: z.ZodString;
    name: z.ZodString;
    position: z.ZodDefault<z.ZodNumber>;
    created_at: z.ZodDate;
    updated_at: z.ZodDate;
}, "strict", z.ZodTypeAny, {
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
type Segment = z.infer<typeof SegmentSchema>;

/**
 * Prompt schema matching the database structure
 */
declare const PromptSchema: z.ZodObject<{
    id: z.ZodString;
    segment_id: z.ZodString;
    title: z.ZodString;
    body: z.ZodString;
    language: z.ZodDefault<z.ZodEnum<["en", "pt-BR"]>>;
    kind: z.ZodDefault<z.ZodEnum<["prompt", "system", "tool"]>>;
    position: z.ZodDefault<z.ZodNumber>;
    created_at: z.ZodDate;
    updated_at: z.ZodDate;
}, "strict", z.ZodTypeAny, {
    id: string;
    created_at: Date;
    updated_at: Date;
    position: number;
    segment_id: string;
    title: string;
    body: string;
    language: "en" | "pt-BR";
    kind: "prompt" | "system" | "tool";
}, {
    id: string;
    created_at: Date;
    updated_at: Date;
    segment_id: string;
    title: string;
    body: string;
    position?: number | undefined;
    language?: "en" | "pt-BR" | undefined;
    kind?: "prompt" | "system" | "tool" | undefined;
}>;
type Prompt = z.infer<typeof PromptSchema>;
type PromptWithKind<T extends Kind> = Prompt & {
    kind: T;
};
type UserPrompt = PromptWithKind<typeof KIND.prompt>;
type SystemPrompt = PromptWithKind<typeof KIND.system>;
type ToolPrompt = PromptWithKind<typeof KIND.tool>;
type PromptWithLanguage<T extends Language> = Prompt & {
    language: T;
};
type EnglishPrompt = PromptWithLanguage<typeof LANGUAGE.en>;
type PortuguesePrompt = PromptWithLanguage<typeof LANGUAGE['pt-BR']>;

/**
 * Validator schema matching the database structure
 */
declare const ValidatorSchema: z.ZodObject<{
    id: z.ZodString;
    prompt_id: z.ZodString;
    title: z.ZodString;
    body: z.ZodString;
    created_at: z.ZodDate;
    updated_at: z.ZodDate;
}, "strict", z.ZodTypeAny, {
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
type Validator = z.infer<typeof ValidatorSchema>;

/**
 * Entity types that can be versioned
 */
declare const ENTITY_TYPE: {
    readonly project: "project";
    readonly segment: "segment";
    readonly prompt: "prompt";
    readonly validator: "validator";
};
type EntityType = typeof ENTITY_TYPE[keyof typeof ENTITY_TYPE];
/**
 * Version schema matching the database structure
 */
declare const VersionSchema: z.ZodObject<{
    id: z.ZodString;
    entity_type: z.ZodEnum<["project", "segment", "prompt", "validator"]>;
    entity_id: z.ZodString;
    snapshot: z.ZodAny;
    author_id: z.ZodNullable<z.ZodString>;
    created_at: z.ZodDate;
}, "strict", z.ZodTypeAny, {
    id: string;
    created_at: Date;
    entity_type: "prompt" | "project" | "segment" | "validator";
    entity_id: string;
    author_id: string | null;
    snapshot?: any;
}, {
    id: string;
    created_at: Date;
    entity_type: "prompt" | "project" | "segment" | "validator";
    entity_id: string;
    author_id: string | null;
    snapshot?: any;
}>;
type Version = z.infer<typeof VersionSchema>;
type VersionWithEntityType<T extends EntityType> = Version & {
    entity_type: T;
};
type ProjectVersion = VersionWithEntityType<typeof ENTITY_TYPE.project>;
type SegmentVersion = VersionWithEntityType<typeof ENTITY_TYPE.segment>;
type PromptVersion = VersionWithEntityType<typeof ENTITY_TYPE.prompt>;
type ValidatorVersion = VersionWithEntityType<typeof ENTITY_TYPE.validator>;

/**
 * Billing schema matching the database structure
 */
declare const BillingSchema: z.ZodObject<{
    profile_id: z.ZodString;
    plan: z.ZodDefault<z.ZodEnum<["free", "pro"]>>;
    current_period_end: z.ZodNullable<z.ZodDate>;
    status: z.ZodOptional<z.ZodEnum<["active", "past_due", "canceled", "incomplete"]>>;
    updated_at: z.ZodDate;
}, "strict", z.ZodTypeAny, {
    updated_at: Date;
    profile_id: string;
    plan: "pro" | "free";
    current_period_end: Date | null;
    status?: "active" | "past_due" | "canceled" | "incomplete" | undefined;
}, {
    updated_at: Date;
    profile_id: string;
    current_period_end: Date | null;
    status?: "active" | "past_due" | "canceled" | "incomplete" | undefined;
    plan?: "pro" | "free" | undefined;
}>;
type Billing = z.infer<typeof BillingSchema>;
type BillingWithPlan<T extends Plan> = Billing & {
    plan: T;
};
type FreeBilling = BillingWithPlan<typeof PLAN.free>;
type ProBilling = BillingWithPlan<typeof PLAN.pro>;
type BillingWithStatus<T extends BillingStatus> = Billing & {
    status: T;
};
type ActiveBilling = BillingWithStatus<typeof BILLING_STATUS.active>;
type PastDueBilling = BillingWithStatus<typeof BILLING_STATUS.past_due>;
type CanceledBilling = BillingWithStatus<typeof BILLING_STATUS.canceled>;
type IncompleteBilling = BillingWithStatus<typeof BILLING_STATUS.incomplete>;

/**
 * Profile DTOs for API operations
 */
declare const CreateProfileDtoSchema: z.ZodObject<Pick<{
    id: z.ZodString;
    handle: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
    role: z.ZodDefault<z.ZodEnum<["user", "pro", "admin"]>>;
    stripe_customer_id: z.ZodOptional<z.ZodString>;
    theme_pref: z.ZodDefault<z.ZodEnum<["light", "dark"]>>;
    created_at: z.ZodDate;
    updated_at: z.ZodDate;
}, "handle" | "name" | "role" | "theme_pref">, "strict", z.ZodTypeAny, {
    handle: string;
    role: "user" | "pro" | "admin";
    theme_pref: "light" | "dark";
    name?: string | undefined;
}, {
    handle: string;
    name?: string | undefined;
    role?: "user" | "pro" | "admin" | undefined;
    theme_pref?: "light" | "dark" | undefined;
}>;
type CreateProfileDto = z.infer<typeof CreateProfileDtoSchema>;
declare const UpdateProfileDtoSchema: z.ZodObject<{
    handle: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    theme_pref: z.ZodOptional<z.ZodDefault<z.ZodEnum<["light", "dark"]>>>;
}, "strict", z.ZodTypeAny, {
    handle?: string | undefined;
    name?: string | undefined;
    theme_pref?: "light" | "dark" | undefined;
}, {
    handle?: string | undefined;
    name?: string | undefined;
    theme_pref?: "light" | "dark" | undefined;
}>;
type UpdateProfileDto = z.infer<typeof UpdateProfileDtoSchema>;

/**
 * Project DTOs for API operations
 */
declare const CreateProjectDtoSchema: z.ZodObject<Pick<{
    id: z.ZodString;
    owner_id: z.ZodString;
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    visibility: z.ZodDefault<z.ZodEnum<["private", "public"]>>;
    created_at: z.ZodDate;
    updated_at: z.ZodDate;
}, "name" | "description" | "visibility">, "strict", z.ZodTypeAny, {
    name: string;
    visibility: "private" | "public";
    description?: string | undefined;
}, {
    name: string;
    description?: string | undefined;
    visibility?: "private" | "public" | undefined;
}>;
type CreateProjectDto = z.infer<typeof CreateProjectDtoSchema>;
declare const UpdateProjectDtoSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    visibility: z.ZodOptional<z.ZodDefault<z.ZodEnum<["private", "public"]>>>;
}, "strict", z.ZodTypeAny, {
    name?: string | undefined;
    description?: string | undefined;
    visibility?: "private" | "public" | undefined;
}, {
    name?: string | undefined;
    description?: string | undefined;
    visibility?: "private" | "public" | undefined;
}>;
type UpdateProjectDto = z.infer<typeof UpdateProjectDtoSchema>;

/**
 * Segment DTOs for API operations
 */
declare const CreateSegmentDtoSchema: z.ZodObject<Pick<{
    id: z.ZodString;
    project_id: z.ZodString;
    name: z.ZodString;
    position: z.ZodDefault<z.ZodNumber>;
    created_at: z.ZodDate;
    updated_at: z.ZodDate;
}, "name" | "project_id" | "position">, "strict", z.ZodTypeAny, {
    name: string;
    project_id: string;
    position: number;
}, {
    name: string;
    project_id: string;
    position?: number | undefined;
}>;
type CreateSegmentDto = z.infer<typeof CreateSegmentDtoSchema>;
declare const UpdateSegmentDtoSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    position: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
}, "strict", z.ZodTypeAny, {
    name?: string | undefined;
    position?: number | undefined;
}, {
    name?: string | undefined;
    position?: number | undefined;
}>;
type UpdateSegmentDto = z.infer<typeof UpdateSegmentDtoSchema>;

/**
 * Prompt DTOs for API operations
 */
declare const CreatePromptDtoSchema: z.ZodObject<Pick<{
    id: z.ZodString;
    segment_id: z.ZodString;
    title: z.ZodString;
    body: z.ZodString;
    language: z.ZodDefault<z.ZodEnum<["en", "pt-BR"]>>;
    kind: z.ZodDefault<z.ZodEnum<["prompt", "system", "tool"]>>;
    position: z.ZodDefault<z.ZodNumber>;
    created_at: z.ZodDate;
    updated_at: z.ZodDate;
}, "position" | "segment_id" | "title" | "body" | "language" | "kind">, "strict", z.ZodTypeAny, {
    position: number;
    segment_id: string;
    title: string;
    body: string;
    language: "en" | "pt-BR";
    kind: "prompt" | "system" | "tool";
}, {
    segment_id: string;
    title: string;
    body: string;
    position?: number | undefined;
    language?: "en" | "pt-BR" | undefined;
    kind?: "prompt" | "system" | "tool" | undefined;
}>;
type CreatePromptDto = z.infer<typeof CreatePromptDtoSchema>;
declare const UpdatePromptDtoSchema: z.ZodObject<{
    position: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    title: z.ZodOptional<z.ZodString>;
    body: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodDefault<z.ZodEnum<["en", "pt-BR"]>>>;
    kind: z.ZodOptional<z.ZodDefault<z.ZodEnum<["prompt", "system", "tool"]>>>;
}, "strict", z.ZodTypeAny, {
    position?: number | undefined;
    title?: string | undefined;
    body?: string | undefined;
    language?: "en" | "pt-BR" | undefined;
    kind?: "prompt" | "system" | "tool" | undefined;
}, {
    position?: number | undefined;
    title?: string | undefined;
    body?: string | undefined;
    language?: "en" | "pt-BR" | undefined;
    kind?: "prompt" | "system" | "tool" | undefined;
}>;
type UpdatePromptDto = z.infer<typeof UpdatePromptDtoSchema>;

/**
 * Validator DTOs for API operations
 */
declare const CreateValidatorDtoSchema: z.ZodObject<Pick<{
    id: z.ZodString;
    prompt_id: z.ZodString;
    title: z.ZodString;
    body: z.ZodString;
    created_at: z.ZodDate;
    updated_at: z.ZodDate;
}, "title" | "body" | "prompt_id">, "strict", z.ZodTypeAny, {
    title: string;
    body: string;
    prompt_id: string;
}, {
    title: string;
    body: string;
    prompt_id: string;
}>;
type CreateValidatorDto = z.infer<typeof CreateValidatorDtoSchema>;
declare const UpdateValidatorDtoSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    body: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    title?: string | undefined;
    body?: string | undefined;
}, {
    title?: string | undefined;
    body?: string | undefined;
}>;
type UpdateValidatorDto = z.infer<typeof UpdateValidatorDtoSchema>;

/**
 * Result type for error handling without exceptions
 *
 * Provides a functional approach to error handling, making errors explicit
 * in the type system and avoiding the need for try/catch blocks.
 */
type Result<T, E = Error> = Readonly<{
    ok: true;
    value: T;
} | {
    ok: false;
    error: E;
}>;
/**
 * Create a successful result
 */
declare function ok<T>(value: T): Result<T, never>;
/**
 * Create an error result
 */
declare function err<E>(error: E): Result<never, E>;
/**
 * Type guard to check if result is successful
 */
declare function isOk<T, E>(result: Result<T, E>): result is {
    ok: true;
    value: T;
};
/**
 * Type guard to check if result is an error
 */
declare function isErr<T, E>(result: Result<T, E>): result is {
    ok: false;
    error: E;
};
/**
 * Unwrap a result, throwing if it's an error
 * Use with caution - prefer explicit error handling
 */
declare function unwrap<T, E>(result: Result<T, E>): T;
/**
 * Unwrap a result with a default value if it's an error
 */
declare function unwrapOr<T, E>(result: Result<T, E>, defaultValue: T): T;
/**
 * Map over the success value of a result
 */
declare function map<T, U, E>(result: Result<T, E>, fn: (value: T) => U): Result<U, E>;
/**
 * Map over the error value of a result
 */
declare function mapErr<T, E, F>(result: Result<T, E>, fn: (error: E) => F): Result<T, F>;
/**
 * Chain operations that return Results
 */
declare function andThen<T, U, E>(result: Result<T, E>, fn: (value: T) => Result<U, E>): Result<U, E>;
/**
 * Combine multiple results into a single result with an array of values
 * If any result is an error, return the first error
 */
declare function combine<T, E>(results: Result<T, E>[]): Result<T[], E>;
/**
 * Convert a Promise to a Result, catching any thrown errors
 */
declare function fromPromise<T>(promise: Promise<T>): Promise<Result<T, Error>>;
/**
 * Convert a function that might throw to a Result
 */
declare function fromThrowable<T, Args extends unknown[]>(fn: (...args: Args) => T): (...args: Args) => Result<T, Error>;

/**
 * Mappers from raw database rows to domain objects
 *
 * These functions take raw database results (snake_case) and validate them
 * against our domain schemas, returning properly typed objects.
 */

/**
 * Map raw database row to Profile domain object
 */
declare function mapToProfile(raw: unknown): Result<Profile, Error>;
/**
 * Map raw database row to Project domain object
 */
declare function mapToProject(raw: unknown): Result<Project, Error>;
/**
 * Map raw database row to Segment domain object
 */
declare function mapToSegment(raw: unknown): Result<Segment, Error>;
/**
 * Map raw database row to Prompt domain object
 */
declare function mapToPrompt(raw: unknown): Result<Prompt, Error>;
/**
 * Map raw database row to Validator domain object
 */
declare function mapToValidator(raw: unknown): Result<Validator, Error>;
/**
 * Map raw database row to Version domain object
 */
declare function mapToVersion(raw: unknown): Result<Version, Error>;
/**
 * Map raw database row to Billing domain object
 */
declare function mapToBilling(raw: unknown): Result<Billing, Error>;
/**
 * Map array of raw database rows to domain objects
 */
declare function mapToProfiles(rawArray: unknown[]): Result<Profile[], Error>;
declare function mapToProjects(rawArray: unknown[]): Result<Project[], Error>;
declare function mapToSegments(rawArray: unknown[]): Result<Segment[], Error>;
declare function mapToPrompts(rawArray: unknown[]): Result<Prompt[], Error>;
declare function mapToValidators(rawArray: unknown[]): Result<Validator[], Error>;
declare function mapToVersions(rawArray: unknown[]): Result<Version[], Error>;

/**
 * Mappers from DTOs to database insert/update objects
 *
 * These functions take validated DTOs and prepare them for database operations,
 * adding necessary fields like timestamps and IDs.
 */

/**
 * Database insert/update object types
 */
interface ProfileInsert extends CreateProfileDto {
    id: string;
    created_at?: Date;
    updated_at?: Date;
}
interface ProfileUpdate extends Partial<UpdateProfileDto> {
    updated_at?: Date;
}
interface ProjectInsert extends CreateProjectDto {
    id: string;
    owner_id: string;
    created_at?: Date;
    updated_at?: Date;
}
interface ProjectUpdate extends Partial<UpdateProjectDto> {
    updated_at?: Date;
}
interface SegmentInsert extends CreateSegmentDto {
    id: string;
    created_at?: Date;
    updated_at?: Date;
}
interface SegmentUpdate extends Partial<UpdateSegmentDto> {
    updated_at?: Date;
}
interface PromptInsert extends CreatePromptDto {
    id: string;
    created_at?: Date;
    updated_at?: Date;
}
interface PromptUpdate extends Partial<UpdatePromptDto> {
    updated_at?: Date;
}
interface ValidatorInsert extends CreateValidatorDto {
    id: string;
    created_at?: Date;
    updated_at?: Date;
}
interface ValidatorUpdate extends Partial<UpdateValidatorDto> {
    updated_at?: Date;
}
/**
 * Map CreateProfileDto to database insert object
 */
declare function mapProfileToInsert(dto: CreateProfileDto, id: string, now?: Date): ProfileInsert;
/**
 * Map UpdateProfileDto to database update object
 */
declare function mapProfileToUpdate(dto: UpdateProfileDto, now?: Date): ProfileUpdate;
/**
 * Map CreateProjectDto to database insert object
 */
declare function mapProjectToInsert(dto: CreateProjectDto, id: string, owner_id: string, now?: Date): ProjectInsert;
/**
 * Map UpdateProjectDto to database update object
 */
declare function mapProjectToUpdate(dto: UpdateProjectDto, now?: Date): ProjectUpdate;
/**
 * Map CreateSegmentDto to database insert object
 */
declare function mapSegmentToInsert(dto: CreateSegmentDto, id: string, now?: Date): SegmentInsert;
/**
 * Map UpdateSegmentDto to database update object
 */
declare function mapSegmentToUpdate(dto: UpdateSegmentDto, now?: Date): SegmentUpdate;
/**
 * Map CreatePromptDto to database insert object
 */
declare function mapPromptToInsert(dto: CreatePromptDto, id: string, now?: Date): PromptInsert;
/**
 * Map UpdatePromptDto to database update object
 */
declare function mapPromptToUpdate(dto: UpdatePromptDto, now?: Date): PromptUpdate;
/**
 * Map CreateValidatorDto to database insert object
 */
declare function mapValidatorToInsert(dto: CreateValidatorDto, id: string, now?: Date): ValidatorInsert;
/**
 * Map UpdateValidatorDto to database update object
 */
declare function mapValidatorToUpdate(dto: UpdateValidatorDto, now?: Date): ValidatorUpdate;

/**
 * Standardized error handling for PromptRepo
 *
 * Provides a consistent error structure and catalog of common error types
 * with i18n support for user-facing messages.
 */
/**
 * Error codes for different types of errors
 */
declare const ERROR_CODE: {
    readonly VALIDATION_ERROR: "VALIDATION_ERROR";
    readonly NOT_FOUND: "NOT_FOUND";
    readonly UNAUTHORIZED: "UNAUTHORIZED";
    readonly FORBIDDEN: "FORBIDDEN";
    readonly CONFLICT: "CONFLICT";
    readonly RATE_LIMIT: "RATE_LIMIT";
    readonly INTERNAL: "INTERNAL";
};
type ErrorCode = typeof ERROR_CODE[keyof typeof ERROR_CODE];
/**
 * Structured error with code, message, and optional details
 */
interface AppError {
    readonly code: ErrorCode;
    readonly message: string;
    readonly details?: Record<string, unknown>;
    readonly i18nKey?: string;
}
/**
 * Create a validation error
 */
declare function validationError(message: string, details?: Record<string, unknown>): AppError;
/**
 * Create a not found error
 */
declare function notFoundError(resource: string, id?: string): AppError;
/**
 * Create an unauthorized error
 */
declare function unauthorizedError(message?: string): AppError;
/**
 * Create a forbidden error
 */
declare function forbiddenError(message?: string): AppError;
/**
 * Create a conflict error
 */
declare function conflictError(message: string, details?: Record<string, unknown>): AppError;
/**
 * Create a rate limit error
 */
declare function rateLimitError(message?: string): AppError;
/**
 * Create an internal server error
 */
declare function internalError(message?: string, details?: Record<string, unknown>): AppError;
/**
 * Convert an unknown error to an AppError
 */
declare function toAppError(error: unknown): AppError;
/**
 * Type guard to check if an error is an AppError
 */
declare function isAppError(error: unknown): error is AppError;
/**
 * Get HTTP status code for an error code
 */
declare function getHttpStatusCode(errorCode: ErrorCode): number;
/**
 * Format an error for logging (without sensitive details)
 */
declare function formatErrorForLogging(error: AppError): Record<string, unknown>;

/**
 * English translations
 */
declare const en: {
    readonly common: {
        readonly ok: "OK";
        readonly cancel: "Cancel";
        readonly save: "Save";
        readonly delete: "Delete";
        readonly edit: "Edit";
        readonly create: "Create";
        readonly update: "Update";
        readonly loading: "Loading...";
        readonly search: "Search";
        readonly filter: "Filter";
        readonly sort: "Sort";
        readonly actions: "Actions";
    };
    readonly project: {
        readonly title: "Projects";
        readonly create: "Create Project";
        readonly edit: "Edit Project";
        readonly delete: "Delete Project";
        readonly name: "Project Name";
        readonly description: "Description";
        readonly visibility: "Visibility";
        readonly visibility_public: "Public";
        readonly visibility_private: "Private";
        readonly owner: "Owner";
        readonly created_at: "Created";
        readonly updated_at: "Updated";
    };
    readonly segment: {
        readonly title: "Collections";
        readonly create: "Create Collection";
        readonly edit: "Edit Collection";
        readonly delete: "Delete Collection";
        readonly name: "Collection Name";
        readonly position: "Position";
        readonly prompts_count: "Prompts";
    };
    readonly prompt: {
        readonly title: "Prompts";
        readonly create: "Create Prompt";
        readonly edit: "Edit Prompt";
        readonly delete: "Delete Prompt";
        readonly title_field: "Prompt Title";
        readonly body: "Content";
        readonly language: "Language";
        readonly kind: "Type";
        readonly kind_prompt: "Prompt";
        readonly kind_system: "System";
        readonly kind_tool: "Tool";
        readonly position: "Position";
    };
    readonly validator: {
        readonly title: "Validators";
        readonly create: "Create Validator";
        readonly edit: "Edit Validator";
        readonly delete: "Delete Validator";
        readonly title_field: "Validator Title";
        readonly body: "Validation Rules";
    };
    readonly profile: {
        readonly title: "Profile";
        readonly edit: "Edit Profile";
        readonly handle: "Username";
        readonly name: "Display Name";
        readonly role: "Role";
        readonly role_user: "User";
        readonly role_pro: "Pro";
        readonly role_admin: "Admin";
        readonly theme_pref: "Theme";
        readonly theme_light: "Light";
        readonly theme_dark: "Dark";
    };
    readonly billing: {
        readonly title: "Billing";
        readonly plan: "Plan";
        readonly plan_free: "Free";
        readonly plan_pro: "Pro";
        readonly status: "Status";
        readonly status_active: "Active";
        readonly status_past_due: "Past Due";
        readonly status_canceled: "Canceled";
        readonly status_incomplete: "Incomplete";
        readonly current_period_end: "Current Period Ends";
    };
    readonly errors: {
        readonly validation: "Invalid data provided";
        readonly not_found: "Resource not found";
        readonly unauthorized: "You need to sign in";
        readonly forbidden: "You do not have permission to perform this action";
        readonly conflict: "A conflict was detected";
        readonly rate_limit: "Too many requests, please try again later";
        readonly internal: "An unexpected error occurred";
    };
};

/**
 * Portuguese (Brazil) translations
 */
declare const ptBR: {
    readonly common: {
        readonly ok: "OK";
        readonly cancel: "Cancelar";
        readonly save: "Salvar";
        readonly delete: "Excluir";
        readonly edit: "Editar";
        readonly create: "Criar";
        readonly update: "Atualizar";
        readonly loading: "Carregando...";
        readonly search: "Buscar";
        readonly filter: "Filtrar";
        readonly sort: "Ordenar";
        readonly actions: "Ações";
    };
    readonly project: {
        readonly title: "Projetos";
        readonly create: "Criar Projeto";
        readonly edit: "Editar Projeto";
        readonly delete: "Excluir Projeto";
        readonly name: "Nome do Projeto";
        readonly description: "Descrição";
        readonly visibility: "Visibilidade";
        readonly visibility_public: "Público";
        readonly visibility_private: "Privado";
        readonly owner: "Proprietário";
        readonly created_at: "Criado em";
        readonly updated_at: "Atualizado em";
    };
    readonly segment: {
        readonly title: "Coleções";
        readonly create: "Criar Coleção";
        readonly edit: "Editar Coleção";
        readonly delete: "Excluir Coleção";
        readonly name: "Nome da Coleção";
        readonly position: "Posição";
        readonly prompts_count: "Prompts";
    };
    readonly prompt: {
        readonly title: "Prompts";
        readonly create: "Criar Prompt";
        readonly edit: "Editar Prompt";
        readonly delete: "Excluir Prompt";
        readonly title_field: "Título do Prompt";
        readonly body: "Conteúdo";
        readonly language: "Idioma";
        readonly kind: "Tipo";
        readonly kind_prompt: "Prompt";
        readonly kind_system: "Sistema";
        readonly kind_tool: "Ferramenta";
        readonly position: "Posição";
    };
    readonly validator: {
        readonly title: "Validadores";
        readonly create: "Criar Validador";
        readonly edit: "Editar Validador";
        readonly delete: "Excluir Validador";
        readonly title_field: "Título do Validador";
        readonly body: "Regras de Validação";
    };
    readonly profile: {
        readonly title: "Perfil";
        readonly edit: "Editar Perfil";
        readonly handle: "Nome de usuário";
        readonly name: "Nome de exibição";
        readonly role: "Função";
        readonly role_user: "Usuário";
        readonly role_pro: "Pro";
        readonly role_admin: "Admin";
        readonly theme_pref: "Tema";
        readonly theme_light: "Claro";
        readonly theme_dark: "Escuro";
    };
    readonly billing: {
        readonly title: "Cobrança";
        readonly plan: "Plano";
        readonly plan_free: "Gratuito";
        readonly plan_pro: "Pro";
        readonly status: "Status";
        readonly status_active: "Ativo";
        readonly status_past_due: "Em atraso";
        readonly status_canceled: "Cancelado";
        readonly status_incomplete: "Incompleto";
        readonly current_period_end: "Período atual termina em";
    };
    readonly errors: {
        readonly validation: "Dados inválidos fornecidos";
        readonly not_found: "Recurso não encontrado";
        readonly unauthorized: "Você precisa fazer login";
        readonly forbidden: "Você não tem permissão para realizar esta ação";
        readonly conflict: "Um conflito foi detectado";
        readonly rate_limit: "Muitas solicitações, tente novamente mais tarde";
        readonly internal: "Ocorreu um erro inesperado";
    };
};

/**
 * Internationalization system for PromptRepo
 *
 * Provides type-safe translations with support for English and Portuguese (Brazil).
 */

/**
 * Available locales
 */
declare const LOCALES: readonly ["en", "pt-BR"];
type Locale = typeof LOCALES[number];
/**
 * Default locale
 */
declare const DEFAULT_LOCALE: Locale;
/**
 * Get translation dictionary for a locale
 */
declare function getDict(locale?: Locale): {
    readonly common: {
        readonly ok: "OK";
        readonly cancel: "Cancel";
        readonly save: "Save";
        readonly delete: "Delete";
        readonly edit: "Edit";
        readonly create: "Create";
        readonly update: "Update";
        readonly loading: "Loading...";
        readonly search: "Search";
        readonly filter: "Filter";
        readonly sort: "Sort";
        readonly actions: "Actions";
    };
    readonly project: {
        readonly title: "Projects";
        readonly create: "Create Project";
        readonly edit: "Edit Project";
        readonly delete: "Delete Project";
        readonly name: "Project Name";
        readonly description: "Description";
        readonly visibility: "Visibility";
        readonly visibility_public: "Public";
        readonly visibility_private: "Private";
        readonly owner: "Owner";
        readonly created_at: "Created";
        readonly updated_at: "Updated";
    };
    readonly segment: {
        readonly title: "Collections";
        readonly create: "Create Collection";
        readonly edit: "Edit Collection";
        readonly delete: "Delete Collection";
        readonly name: "Collection Name";
        readonly position: "Position";
        readonly prompts_count: "Prompts";
    };
    readonly prompt: {
        readonly title: "Prompts";
        readonly create: "Create Prompt";
        readonly edit: "Edit Prompt";
        readonly delete: "Delete Prompt";
        readonly title_field: "Prompt Title";
        readonly body: "Content";
        readonly language: "Language";
        readonly kind: "Type";
        readonly kind_prompt: "Prompt";
        readonly kind_system: "System";
        readonly kind_tool: "Tool";
        readonly position: "Position";
    };
    readonly validator: {
        readonly title: "Validators";
        readonly create: "Create Validator";
        readonly edit: "Edit Validator";
        readonly delete: "Delete Validator";
        readonly title_field: "Validator Title";
        readonly body: "Validation Rules";
    };
    readonly profile: {
        readonly title: "Profile";
        readonly edit: "Edit Profile";
        readonly handle: "Username";
        readonly name: "Display Name";
        readonly role: "Role";
        readonly role_user: "User";
        readonly role_pro: "Pro";
        readonly role_admin: "Admin";
        readonly theme_pref: "Theme";
        readonly theme_light: "Light";
        readonly theme_dark: "Dark";
    };
    readonly billing: {
        readonly title: "Billing";
        readonly plan: "Plan";
        readonly plan_free: "Free";
        readonly plan_pro: "Pro";
        readonly status: "Status";
        readonly status_active: "Active";
        readonly status_past_due: "Past Due";
        readonly status_canceled: "Canceled";
        readonly status_incomplete: "Incomplete";
        readonly current_period_end: "Current Period Ends";
    };
    readonly errors: {
        readonly validation: "Invalid data provided";
        readonly not_found: "Resource not found";
        readonly unauthorized: "You need to sign in";
        readonly forbidden: "You do not have permission to perform this action";
        readonly conflict: "A conflict was detected";
        readonly rate_limit: "Too many requests, please try again later";
        readonly internal: "An unexpected error occurred";
    };
} | {
    readonly common: {
        readonly ok: "OK";
        readonly cancel: "Cancelar";
        readonly save: "Salvar";
        readonly delete: "Excluir";
        readonly edit: "Editar";
        readonly create: "Criar";
        readonly update: "Atualizar";
        readonly loading: "Carregando...";
        readonly search: "Buscar";
        readonly filter: "Filtrar";
        readonly sort: "Ordenar";
        readonly actions: "Ações";
    };
    readonly project: {
        readonly title: "Projetos";
        readonly create: "Criar Projeto";
        readonly edit: "Editar Projeto";
        readonly delete: "Excluir Projeto";
        readonly name: "Nome do Projeto";
        readonly description: "Descrição";
        readonly visibility: "Visibilidade";
        readonly visibility_public: "Público";
        readonly visibility_private: "Privado";
        readonly owner: "Proprietário";
        readonly created_at: "Criado em";
        readonly updated_at: "Atualizado em";
    };
    readonly segment: {
        readonly title: "Coleções";
        readonly create: "Criar Coleção";
        readonly edit: "Editar Coleção";
        readonly delete: "Excluir Coleção";
        readonly name: "Nome da Coleção";
        readonly position: "Posição";
        readonly prompts_count: "Prompts";
    };
    readonly prompt: {
        readonly title: "Prompts";
        readonly create: "Criar Prompt";
        readonly edit: "Editar Prompt";
        readonly delete: "Excluir Prompt";
        readonly title_field: "Título do Prompt";
        readonly body: "Conteúdo";
        readonly language: "Idioma";
        readonly kind: "Tipo";
        readonly kind_prompt: "Prompt";
        readonly kind_system: "Sistema";
        readonly kind_tool: "Ferramenta";
        readonly position: "Posição";
    };
    readonly validator: {
        readonly title: "Validadores";
        readonly create: "Criar Validador";
        readonly edit: "Editar Validador";
        readonly delete: "Excluir Validador";
        readonly title_field: "Título do Validador";
        readonly body: "Regras de Validação";
    };
    readonly profile: {
        readonly title: "Perfil";
        readonly edit: "Editar Perfil";
        readonly handle: "Nome de usuário";
        readonly name: "Nome de exibição";
        readonly role: "Função";
        readonly role_user: "Usuário";
        readonly role_pro: "Pro";
        readonly role_admin: "Admin";
        readonly theme_pref: "Tema";
        readonly theme_light: "Claro";
        readonly theme_dark: "Escuro";
    };
    readonly billing: {
        readonly title: "Cobrança";
        readonly plan: "Plano";
        readonly plan_free: "Gratuito";
        readonly plan_pro: "Pro";
        readonly status: "Status";
        readonly status_active: "Ativo";
        readonly status_past_due: "Em atraso";
        readonly status_canceled: "Cancelado";
        readonly status_incomplete: "Incompleto";
        readonly current_period_end: "Período atual termina em";
    };
    readonly errors: {
        readonly validation: "Dados inválidos fornecidos";
        readonly not_found: "Recurso não encontrado";
        readonly unauthorized: "Você precisa fazer login";
        readonly forbidden: "Você não tem permissão para realizar esta ação";
        readonly conflict: "Um conflito foi detectado";
        readonly rate_limit: "Muitas solicitações, tente novamente mais tarde";
        readonly internal: "Ocorreu um erro inesperado";
    };
};
/**
 * Type for translation keys (dot notation)
 */
type TranslationKey = `common.${keyof typeof en.common}` | `project.${keyof typeof en.project}` | `segment.${keyof typeof en.segment}` | `prompt.${keyof typeof en.prompt}` | `validator.${keyof typeof en.validator}` | `profile.${keyof typeof en.profile}` | `billing.${keyof typeof en.billing}` | `errors.${keyof typeof en.errors}`;
/**
 * Get a nested translation value by key
 */
declare function getTranslation(locale: Locale, key: TranslationKey): string;
/**
 * Simple translation function (t)
 */
declare function t(key: TranslationKey, locale?: Locale): string;
/**
 * Check if a locale is supported
 */
declare function isValidLocale(locale: string): locale is Locale;
/**
 * Get the best matching locale from a list of preferred locales
 */
declare function getBestLocale(preferredLocales: string[]): Locale;

type TranslationDict = typeof en;

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

export { type ActiveBilling, type AdminProfile, type AppError, BILLING_STATUS, BILLING_STATUSES, type Billing, BillingSchema, type BillingStatus, type BillingWithPlan, type BillingWithStatus, type CacheOptions, type CanceledBilling, type CreateProfileDto, CreateProfileDtoSchema, type CreateProjectDto, CreateProjectDtoSchema, type CreatePromptDto, CreatePromptDtoSchema, type CreateSegmentDto, CreateSegmentDtoSchema, type CreateValidatorDto, CreateValidatorDtoSchema, DEFAULT_LANGUAGE, DEFAULT_LOCALE, type Database, ENTITY_TYPE, ERROR_CODE, type EnglishPrompt, type EntityType, type ErrorCode, type FreeBilling, type IncompleteBilling, KIND, KINDS, type Kind, LANGUAGE, LANGUAGES, LOCALES, type Language, type Locale, PLAN, PLANS, type PastDueBilling, type Plan, type PortuguesePrompt, type PrivateProject, type ProBilling, type ProProfile, type Profile, type ProfileInsert, ProfileSchema, type ProfileUpdate, type ProfileWithRole, type Project, type ProjectInsert, ProjectSchema, type ProjectUpdate, type ProjectVersion, type ProjectWithVisibility, type Prompt, type PromptInsert, PromptSchema, type PromptUpdate, type PromptVersion, type PromptWithKind, type PromptWithLanguage, type PublicProject, ROLE, ROLES, type Result, type Role, type Segment, type SegmentInsert, SegmentSchema, type SegmentUpdate, type SegmentVersion, type SubscriptionPlan, type SystemPrompt, THEME_PREF, THEME_PREFS, type ThemeMode, type ThemePref, type ToolPrompt, type TranslationDict, type TranslationKey, type UpdateProfileDto, UpdateProfileDtoSchema, type UpdateProjectDto, UpdateProjectDtoSchema, type UpdatePromptDto, UpdatePromptDtoSchema, type UpdateSegmentDto, UpdateSegmentDtoSchema, type UpdateValidatorDto, UpdateValidatorDtoSchema, type UserProfile, type UserPrompt, VISIBILITIES, VISIBILITY, type Validator, type ValidatorInsert, ValidatorSchema, type ValidatorUpdate, type ValidatorVersion, type Version, VersionSchema, type VersionWithEntityType, type Visibility, andThen, cacheDel, cacheGet, cacheSet, combine, conflictError, createCheckoutSession, createClientAnon, createClientService, createCustomer, createPortalSession, en, err, forbiddenError, formatErrorForLogging, fromPromise, fromThrowable, getBestLocale, getCustomerByEmail, getDict, getHttpStatusCode, getInitialTheme, getRedisClient, getResolvedTheme, getStripeClient, getTranslation, internalError, isAppError, isErr, isOk, isValidLocale, map, mapErr, mapProfileToInsert, mapProfileToUpdate, mapProjectToInsert, mapProjectToUpdate, mapPromptToInsert, mapPromptToUpdate, mapSegmentToInsert, mapSegmentToUpdate, mapToBilling, mapToProfile, mapToProfiles, mapToProject, mapToProjects, mapToPrompt, mapToPrompts, mapToSegment, mapToSegments, mapToValidator, mapToValidators, mapToVersion, mapToVersions, mapValidatorToInsert, mapValidatorToUpdate, notFoundError, ok, ptBR, rateLimit, rateLimitError, setThemePreference, t, toAppError, unauthorizedError, unwrap, unwrapOr, validateWebhookSignature, validationError };
