import { Hono } from "hono";
import Stripe from "stripe";

export const webhookRoutes = new Hono();

// Stripe webhook endpoint
webhookRoutes.post("/stripe", async (c) => {
  try {
    const body = await c.req.text();
    const signature = c.req.header("stripe-signature");

    if (!signature) {
      return c.json({ error: "Missing stripe signature" }, 400);
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error("STRIPE_WEBHOOK_SECRET is not configured");
      return c.json({ error: "Webhook not configured" }, 500);
    }

    // Validate signature (without processing the event yet)
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
      apiVersion: "2023-10-16",
    });

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return c.json({ error: "Invalid signature" }, 400);
    }

    // Log the event (no side-effects for now)
    console.log(`✅ Stripe webhook received: ${event.type} [${event.id}]`);

    // TODO: Implement actual webhook processing in future iterations
    
    return c.json({ received: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return c.json({ error: "Webhook processing failed" }, 500);
  }
});
