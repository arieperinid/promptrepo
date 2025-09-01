import { z } from "zod";

/**
 * Validator schema matching the database structure
 */
export const ValidatorSchema = z.object({
  id: z.string().uuid(),
  prompt_id: z.string().uuid(),
  title: z.string().min(1).max(200),
  body: z.string().min(1),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
}).strict();

export type Validator = z.infer<typeof ValidatorSchema>;
