/**
 * Billing plan enumeration
 */
export const PLAN = {
  free: 'free',
  pro: 'pro',
} as const;

export type Plan = typeof PLAN[keyof typeof PLAN];

export const PLANS = Object.values(PLAN);
