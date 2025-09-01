import { z } from "zod";
import { PromptSchema } from "../schemas/prompt";

/**
 * Prompt DTOs for API operations
 */

// Create prompt DTO
export const CreatePromptDtoSchema = PromptSchema.pick({
  segment_id: true,
  title: true,
  body: true,
  language: true,
  kind: true,
  position: true,
}).strict();

export type CreatePromptDto = z.infer<typeof CreatePromptDtoSchema>;

// Update prompt DTO - cannot change segment_id
export const UpdatePromptDtoSchema = PromptSchema.pick({
  title: true,
  body: true,
  language: true,
  kind: true,
  position: true,
}).partial().strict();

export type UpdatePromptDto = z.infer<typeof UpdatePromptDtoSchema>;
