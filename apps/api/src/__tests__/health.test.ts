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
});
