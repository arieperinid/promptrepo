import { z } from "zod";
import { ProfileSchema } from "../schemas/profile";

/**
 * Profile DTOs for API operations
 */

// Create profile DTO - used during registration
export const CreateProfileDtoSchema = ProfileSchema.pick({
  handle: true,
  name: true,
  role: true,
  theme_pref: true,
}).strict();

export type CreateProfileDto = z.infer<typeof CreateProfileDtoSchema>;

// Update profile DTO - all fields optional except constraints
export const UpdateProfileDtoSchema = ProfileSchema.pick({
  handle: true,
  name: true,
  theme_pref: true,
}).partial().strict();

export type UpdateProfileDto = z.infer<typeof UpdateProfileDtoSchema>;
