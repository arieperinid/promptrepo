import { Redis } from "@upstash/redis";
import type { Context, Next } from "hono";

// Rate limit middleware hook - ready for implementation
export async function rateLimitMiddleware(c: Context, next: Next) {
  // TODO: Implement actual rate limiting logic
  // This is a placeholder hook for future implementation

  const clientIp = c.req.header("x-forwarded-for") || c.req.header("x-real-ip") || "unknown";

  // For now, just log the request and continue
  // eslint-disable-next-line no-console
  console.log(`Rate limit check for IP: ${clientIp}`);

  // Future implementation would:
  // 1. Get Redis client
  // 2. Check current request count for IP
  // 3. Increment counter
  // 4. Return 429 if limit exceeded

  await next();
}

// Utility to create Redis client (prepared but not used yet)
export function createRedisClient() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    // eslint-disable-next-line no-console
    console.warn("Redis credentials not configured - rate limiting disabled");
    return null;
  }

  return new Redis({
    url,
    token,
  });
}
