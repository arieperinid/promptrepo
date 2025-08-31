import { describe, it, expect } from "vitest";
import request from "supertest";
import { Hono } from "hono";
import { healthRoute } from "../routes/health";

// Create a test app with just the health route
const testApp = new Hono();
testApp.route("/health", healthRoute);

describe("Health endpoint", () => {
  it("should return ok: true", async () => {
    const response = await request(testApp.request.bind(testApp))
      .get("/health")
      .expect(200);

    expect(response.body).toEqual({ ok: true });
  });
});
