import { z } from "zod";
import { ValidatorSchema } from "../schemas/validator";

/**
 * Validator DTOs for API operations
 */

// Create validator DTO
export const CreateValidatorDtoSchema = ValidatorSchema.pick({
  prompt_id: true,
  title: true,
  body: true,
}).strict();

export type CreateValidatorDto = z.infer<typeof CreateValidatorDtoSchema>;

// Update validator DTO - cannot change prompt_id
export const UpdateValidatorDtoSchema = ValidatorSchema.pick({
  title: true,
  body: true,
}).partial().strict();

export type UpdateValidatorDto = z.infer<typeof UpdateValidatorDtoSchema>;
