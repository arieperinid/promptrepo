import { z } from "zod";
import { SegmentSchema } from "../schemas/segment";

/**
 * Segment DTOs for API operations
 */

// Create segment DTO
export const CreateSegmentDtoSchema = SegmentSchema.pick({
  project_id: true,
  name: true,
  position: true,
}).strict();

export type CreateSegmentDto = z.infer<typeof CreateSegmentDtoSchema>;

// Update segment DTO - cannot change project_id
export const UpdateSegmentDtoSchema = SegmentSchema.pick({
  name: true,
  position: true,
}).partial().strict();

export type UpdateSegmentDto = z.infer<typeof UpdateSegmentDtoSchema>;
