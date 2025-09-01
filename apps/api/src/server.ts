/**
 * PromptRepo API Server
 * Hono-based API with authentication, rate limiting, and CRUD operations
 */
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";

// Middleware
import { requestId } from "./middleware/requestId";
import { errorHandler } from "./middleware/errorHandler";

// Routers
import { healthRoute } from "./routes/health";
import { webhookRoutes } from "./routes/webhooks";
import { publicRouter } from "./routers/public";
import { appRouter } from "./routers/app";
import { adminRouter } from "./routers/admin";

import type { AppContext } from "./types/context";

const app = new Hono<AppContext>();

// ============================================================================
// GLOBAL MIDDLEWARE
// ============================================================================

// Request ID for tracing
app.use("*", requestId());

// Logging
app.use("*", logger());

// Pretty JSON in development
app.use("*", prettyJSON());

// CORS
app.use(
  "*",
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001", "https://*.vercel.app"],
    allowHeaders: ["Content-Type", "Authorization", "x-request-id"],
    allowMethods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);

// ============================================================================
// ROUTES
// ============================================================================

// Health check (no auth required)
app.route("/health", healthRoute);

// Webhooks (no auth, raw body needed for Stripe)
app.route("/webhooks", webhookRoutes);

// Public API (no auth, rate limited by IP)
app.route("/v1/public", publicRouter);

// Authenticated API (auth required, rate limited by user)
app.route("/v1", appRouter);

// Admin API (admin role required)
app.route("/v1/admin", adminRouter);

// ============================================================================
// ERROR HANDLING
// ============================================================================

// 404 handler
app.notFound((c) => {
  return c.json({
    ok: false,
    error: {
      code: "NOT_FOUND",
      message: "Endpoint not found",
    },
  }, 404);
});

// Global error handler
app.onError(errorHandler);

// ============================================================================
// SERVER STARTUP
// ============================================================================

// Only start server if not in test environment
if (process.env.NODE_ENV !== "test") {
  const port = Number(process.env.PORT) || 8000;

  // eslint-disable-next-line no-console
  console.log(`🚀 PromptRepo API v1 running on http://localhost:${port}`);
  // eslint-disable-next-line no-console
  console.log(`📚 Public API: http://localhost:${port}/v1/public`);
  // eslint-disable-next-line no-console
  console.log(`🔐 Authenticated API: http://localhost:${port}/v1`);
  // eslint-disable-next-line no-console
  console.log(`👑 Admin API: http://localhost:${port}/v1/admin`);

  serve({
    fetch: app.fetch,
    port,
  });
}

export { app };
