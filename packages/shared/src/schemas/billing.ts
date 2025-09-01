import { z } from "zod";
import { PLAN, type Plan } from "../enums/plan";
import { BILLING_STATUS, type BillingStatus } from "../enums/billingStatus";

/**
 * Billing schema matching the database structure
 */
export const BillingSchema = z.object({
  profile_id: z.string().uuid(),
  plan: z.enum([PLAN.free, PLAN.pro]).default(PLAN.free),
  current_period_end: z.coerce.date().nullable(),
  status: z.enum([BILLING_STATUS.active, BILLING_STATUS.past_due, BILLING_STATUS.canceled, BILLING_STATUS.incomplete]).optional(),
  updated_at: z.coerce.date(),
}).strict();

export type Billing = z.infer<typeof BillingSchema>;

// Helper types for billing with known plan
export type BillingWithPlan<T extends Plan> = Billing & { plan: T };
export type FreeBilling = BillingWithPlan<typeof PLAN.free>;
export type ProBilling = BillingWithPlan<typeof PLAN.pro>;

// Helper types for billing with known status
export type BillingWithStatus<T extends BillingStatus> = Billing & { status: T };
export type ActiveBilling = BillingWithStatus<typeof BILLING_STATUS.active>;
export type PastDueBilling = BillingWithStatus<typeof BILLING_STATUS.past_due>;
export type CanceledBilling = BillingWithStatus<typeof BILLING_STATUS.canceled>;
export type IncompleteBilling = BillingWithStatus<typeof BILLING_STATUS.incomplete>;
