import { z } from "zod";

/**
 * Entity types that can be versioned
 */
export const ENTITY_TYPE = {
  project: 'project',
  segment: 'segment',
  prompt: 'prompt',
  validator: 'validator',
} as const;

export type EntityType = typeof ENTITY_TYPE[keyof typeof ENTITY_TYPE];

/**
 * Version schema matching the database structure
 */
export const VersionSchema = z.object({
  id: z.string().uuid(),
  entity_type: z.enum([ENTITY_TYPE.project, ENTITY_TYPE.segment, ENTITY_TYPE.prompt, ENTITY_TYPE.validator]),
  entity_id: z.string().uuid(),
  snapshot: z.any(), // Keep broad - consuming code will validate by entity type
  author_id: z.string().uuid().nullable(),
  created_at: z.coerce.date(),
}).strict();

export type Version = z.infer<typeof VersionSchema>;

// Helper types for version with known entity type
export type VersionWithEntityType<T extends EntityType> = Version & { entity_type: T };
export type ProjectVersion = VersionWithEntityType<typeof ENTITY_TYPE.project>;
export type SegmentVersion = VersionWithEntityType<typeof ENTITY_TYPE.segment>;
export type PromptVersion = VersionWithEntityType<typeof ENTITY_TYPE.prompt>;
export type ValidatorVersion = VersionWithEntityType<typeof ENTITY_TYPE.validator>;
