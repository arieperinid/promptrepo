/**
 * PromptRepo Shared Library
 * 
 * This package provides shared types, schemas, utilities, and constants
 * for the PromptRepo application. All domain types use snake_case to
 * align with PostgreSQL conventions and reduce mapping friction.
 * 
 * Conversions to camelCase, if needed in UI components, should be handled
 * in the respective apps (P1.3 UI → GPT-5).
 */

// ============================================================================
// ENUMS
// ============================================================================
export * from "./enums/role";
export * from "./enums/visibility";
export * from "./enums/kind";
export * from "./enums/plan";
export * from "./enums/billingStatus";
export * from "./enums/themePref";
export * from "./enums/language";

// ============================================================================
// SCHEMAS
// ============================================================================
export * from "./schemas/profile";
export * from "./schemas/project";
export * from "./schemas/segment";
export * from "./schemas/prompt";
export * from "./schemas/validator";
export * from "./schemas/version";
export * from "./schemas/billing";

// ============================================================================
// DTOS
// ============================================================================
export * from "./dtos/profile.dto";
export * from "./dtos/project.dto";
export * from "./dtos/segment.dto";
export * from "./dtos/prompt.dto";
export * from "./dtos/validator.dto";

// ============================================================================
// MAPPERS
// ============================================================================
export * from "./mappers/toDomain";
export * from "./mappers/toPersist";

// ============================================================================
// RESULT & ERROR HANDLING
// ============================================================================
export * from "./result";
export * from "./errors";

// ============================================================================
// INTERNATIONALIZATION
// ============================================================================
export * from "./i18n";

// ============================================================================
// ENVIRONMENT & INTEGRATIONS
// ============================================================================
export * from "./env";
export * from "./supabase";
export * from "./redis";
export * from "./stripe";

// ============================================================================
// LEGACY EXPORTS (for backward compatibility)
// ============================================================================
export * from "./utils/theme-preference";
