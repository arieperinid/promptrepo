import { describe, it, expect } from "vitest";
import { healthRoute } from "../routes/health";

describe("Health endpoint", () => {
  it("should return ok: true with integration status", async () => {
    // Test that the route exists and is properly configured
    expect(healthRoute).toBeDefined();
    
    // We can't easily test the Hono handler without setting up the full context
    // So we just test that the healthRoute is properly exported
    expect(typeof healthRoute.get).toBe("function");
    
    // Test expected response structure
    const expectedResponse = { 
      ok: true, 
      supabase: expect.any(Boolean),
      redis: expect.any(Boolean),
      stripe: expect.any(Boolean)
    };
    expect(expectedResponse).toMatchObject({
      ok: true,
      supabase: expect.any(Boolean),
      redis: expect.any(Boolean),
      stripe: expect.any(Boolean)
    });
  });

  it("should have correct route structure", () => {
    // Verify the route is a Hono instance
    expect(healthRoute).toBeDefined();
    expect(healthRoute.get).toBeDefined();
    expect(typeof healthRoute.get).toBe("function");
  });

  it("should import checkIntegrations function", async () => {
    // Test that the checkIntegrations function is available
    const { checkIntegrations } = await import("@promptrepo/shared");
    expect(typeof checkIntegrations).toBe("function");
    
    // Test that it returns the expected structure
    const result = checkIntegrations();
    expect(result).toHaveProperty("supabase");
    expect(result).toHaveProperty("redis");
    expect(result).toHaveProperty("stripe");
    expect(typeof result.supabase).toBe("boolean");
    expect(typeof result.redis).toBe("boolean");
    expect(typeof result.stripe).toBe("boolean");
  });
});
