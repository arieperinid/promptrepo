/**
 * Billing status enumeration
 */
export const BILLING_STATUS = {
  active: 'active',
  past_due: 'past_due',
  canceled: 'canceled',
  incomplete: 'incomplete',
} as const;

export type BillingStatus = typeof BILLING_STATUS[keyof typeof BILLING_STATUS];

export const BILLING_STATUSES = Object.values(BILLING_STATUS);
