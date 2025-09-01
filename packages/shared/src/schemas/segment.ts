import { z } from "zod";

/**
 * Segment schema matching the database structure
 */
export const SegmentSchema = z.object({
  id: z.string().uuid(),
  project_id: z.string().uuid(),
  name: z.string().min(1).max(100),
  position: z.number().int().min(0).default(0),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
}).strict();

export type Segment = z.infer<typeof SegmentSchema>;
