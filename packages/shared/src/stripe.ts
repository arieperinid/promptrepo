import Stripe from "stripe";
import { getEnv } from "./env";

let _stripe: Stripe | null = null;

/**
 * Get or create Stripe client instance
 * Configured with API version and secret key
 */
export function getStripeClient(): Stripe {
    if (!_stripe) {
        const env = getEnv();

        _stripe = new Stripe(env.STRIPE_SECRET_KEY, {
            apiVersion: "2023-10-16",
            typescript: true,
        });
    }

    return _stripe;
}

/**
 * Validate Stripe webhook signature
 * 
 * @param body - Raw request body as string
 * @param signature - Stripe signature header
 * @param secret - Webhook secret from Stripe dashboard
 * @returns Parsed Stripe event or throws error
 */
export function validateWebhookSignature(
    body: string,
    signature: string,
    secret: string
): Stripe.Event {
    const stripe = getStripeClient();

    try {
        return stripe.webhooks.constructEvent(body, signature, secret);
    } catch (error) {
        console.error("Stripe webhook signature validation failed:", error);
        throw new Error("Invalid webhook signature");
    }
}

/**
 * Subscription management helpers
 * TODO: Implement subscription creation, updates, cancellation
 */
export interface SubscriptionPlan {
    id: string;
    name: string;
    price: number;
    currency: string;
    interval: "month" | "year";
    features: string[];
}

/**
 * Create customer portal session
 * Allows customers to manage their subscriptions
 */
export async function createPortalSession(customerId: string, returnUrl: string): Promise<string> {
    const stripe = getStripeClient();

    const session = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: returnUrl,
    });

    return session.url;
}

/**
 * Create checkout session for subscription
 * TODO: Implement full checkout flow
 */
export async function createCheckoutSession(
    priceId: string,
    customerId?: string,
    successUrl?: string,
    cancelUrl?: string
): Promise<string> {
    const stripe = getStripeClient();

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
        mode: "subscription",
        line_items: [
            {
                price: priceId,
                quantity: 1,
            },
        ],
        success_url: successUrl || "https://example.com/success",
        cancel_url: cancelUrl || "https://example.com/cancel",
    };

    if (customerId) {
        sessionParams.customer = customerId;
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    return session.url || "";
}

/**
 * Get customer by email
 */
export async function getCustomerByEmail(email: string): Promise<Stripe.Customer | null> {
    const stripe = getStripeClient();

    const customers = await stripe.customers.list({
        email,
        limit: 1,
    });

    return customers.data[0] || null;
}

/**
 * Create new customer
 */
export async function createCustomer(email: string, name?: string): Promise<Stripe.Customer> {
    const stripe = getStripeClient();

    const customerParams: Stripe.CustomerCreateParams = {
        email,
    };

    if (name) {
        customerParams.name = name;
    }

    return stripe.customers.create(customerParams);
}
