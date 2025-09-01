import { z } from "zod";
import { ProjectSchema } from "../schemas/project";

/**
 * Project DTOs for API operations
 */

// Create project DTO
export const CreateProjectDtoSchema = ProjectSchema.pick({
  name: true,
  description: true,
  visibility: true,
}).strict();

export type CreateProjectDto = z.infer<typeof CreateProjectDtoSchema>;

// Update project DTO - all fields optional
export const UpdateProjectDtoSchema = ProjectSchema.pick({
  name: true,
  description: true,
  visibility: true,
}).partial().strict();

export type UpdateProjectDto = z.infer<typeof UpdateProjectDtoSchema>;
