import { getEnv, validateWebhookSignature } from "@promptrepo/shared";
import { Hono } from "hono";

export const webhookRoutes = new Hono();

// Stripe webhook endpoint
webhookRoutes.post("/stripe", async (c) => {
  try {
    const body = await c.req.text();
    const signature = c.req.header("stripe-signature");

    if (!signature) {
      return c.json({ error: "Missing stripe signature" }, 400);
    }

    const env = getEnv();

    // Validate signature using shared utility
    let event;
    try {
      event = validateWebhookSignature(body, signature, env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Webhook signature verification failed:", err);
      return c.json({ error: "Invalid signature" }, 400);
    }

    // Log the event (no side-effects for now)
    // eslint-disable-next-line no-console
    console.log(`✅ Stripe webhook received: ${event.type} [${event.id}]`);

    // TODO: Implement actual webhook processing in future iterations
    // Switch on event.type to handle different webhook events:
    // - customer.subscription.created
    // - customer.subscription.updated
    // - customer.subscription.deleted
    // - invoice.payment_succeeded
    // - invoice.payment_failed

    return c.json({ received: true, eventId: event.id });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Webhook processing error:", error);
    return c.json({ error: "Webhook processing failed" }, 500);
  }
});
