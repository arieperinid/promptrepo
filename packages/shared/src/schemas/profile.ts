import { z } from "zod";
import { ROLE, type Role } from "../enums/role";
import { THEME_PREF, type ThemePref } from "../enums/themePref";

/**
 * Profile schema matching the database structure
 */
export const ProfileSchema = z.object({
  id: z.string().uuid(),
  handle: z.string().min(1).max(50),
  name: z.string().min(1).max(100).optional(),
  role: z.enum([ROLE.user, ROLE.pro, ROLE.admin]).default(ROLE.user),
  stripe_customer_id: z.string().optional(),
  theme_pref: z.enum([THEME_PREF.light, THEME_PREF.dark]).default(THEME_PREF.light),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
}).strict();

export type Profile = z.infer<typeof ProfileSchema>;

// Helper type for profile with known role
export type ProfileWithRole<T extends Role> = Profile & { role: T };
export type UserProfile = ProfileWithRole<typeof ROLE.user>;
export type ProProfile = ProfileWithRole<typeof ROLE.pro>;
export type AdminProfile = ProfileWithRole<typeof ROLE.admin>;
