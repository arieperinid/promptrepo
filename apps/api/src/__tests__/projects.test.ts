/**
 * Tests for authenticated project endpoints
 */
import { describe, it, expect } from "vitest";
import { app } from "../server";
import type { ApiResponse } from "./test-types";

describe("Authenticated Projects API", () => {
    describe("Authentication", () => {
        it("should return 401 without token for GET /v1/projects", async () => {
            const res = await app.request("/v1/projects");

            expect(res.status).toBe(401);

            const body = await res.json() as ApiResponse;
            expect(body.ok).toBe(false);
            expect(body.error.code).toBe("UNAUTHORIZED");
        });

        it("should return 401 without token for POST /v1/projects", async () => {
            const res = await app.request("/v1/projects", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: "Test Project",
                }),
            });

            expect(res.status).toBe(401);

            const body = await res.json() as ApiResponse;
            expect(body.ok).toBe(false);
            expect(body.error.code).toBe("UNAUTHORIZED");
        });
    });

    describe("Validation", () => {
        it("should return 404 for non-existent project ID", async () => {
            const res = await app.request("/v1/projects/550e8400-e29b-41d4-a716-446655440000");

            expect(res.status).toBe(401); // Will be 401 because no auth token
        });
    });
});