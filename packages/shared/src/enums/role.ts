/**
 * User role enumeration
 */
export const ROLE = {
  user: 'user',
  pro: 'pro',
  admin: 'admin',
} as const;

export type Role = typeof ROLE[keyof typeof ROLE];

export const ROLES = Object.values(ROLE);
