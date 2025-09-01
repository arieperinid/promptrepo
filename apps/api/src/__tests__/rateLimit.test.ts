/**
 * Tests for rate limiting functionality
 */
import { describe, it, expect } from "vitest";
import { app } from "../server";
import type { ApiResponse } from "./test-types";

describe("Rate Limiting", () => {
    describe("Basic functionality", () => {
        it("should allow requests to public endpoints", async () => {
            const res = await app.request("/v1/public/projects/invalid-uuid");

            // This should return 400 for validation, not rate limit error
            expect(res.status).toBe(400);

            const body = await res.json() as ApiResponse;
            expect(body.ok).toBe(false);
            expect(body.error.code).toBe("VALIDATION_ERROR");
        });

        it("should require authentication for protected endpoints", async () => {
            const res = await app.request("/v1/projects");

            expect(res.status).toBe(401);

            const body = await res.json() as ApiResponse;
            expect(body.ok).toBe(false);
            expect(body.error.code).toBe("UNAUTHORIZED");
        });
    });
});