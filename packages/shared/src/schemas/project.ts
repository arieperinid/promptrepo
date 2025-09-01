import { z } from "zod";
import { VISIBILITY, type Visibility } from "../enums/visibility";

/**
 * Project schema matching the database structure
 */
export const ProjectSchema = z.object({
  id: z.string().uuid(),
  owner_id: z.string().uuid(),
  name: z.string().min(1).max(100),
  description: z.string().max(1000).optional(),
  visibility: z.enum([VISIBILITY.private, VISIBILITY.public]).default(VISIBILITY.private),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
}).strict();

export type Project = z.infer<typeof ProjectSchema>;

// Helper type for project with known visibility
export type ProjectWithVisibility<T extends Visibility> = Project & { visibility: T };
export type PrivateProject = ProjectWithVisibility<typeof VISIBILITY.private>;
export type PublicProject = ProjectWithVisibility<typeof VISIBILITY.public>;
