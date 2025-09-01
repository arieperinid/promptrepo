import { checkIntegrations } from "@promptrepo/shared";
import { Hono } from "hono";

export const healthRoute = new Hono();

healthRoute.get("/", (c) => {
  const integrations = checkIntegrations();

  return c.json({
    ok: true,
    supabase: integrations.supabase,
    redis: integrations.redis,
    stripe: integrations.stripe,
  });
});
