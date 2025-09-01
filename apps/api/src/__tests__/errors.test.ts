/**
 * Tests for error handling and validation
 */
import { describe, it, expect } from "vitest";
import { app } from "../server";
import type { ApiResponse } from "./test-types";

describe("Error Handling", () => {
    describe("404 Not Found", () => {
        it("should return 404 for non-existent endpoints", async () => {
            const res = await app.request("/non-existent-endpoint");

            expect(res.status).toBe(404);

            const body = await res.json() as ApiResponse;
            expect(body.ok).toBe(false);
            expect(body.error.code).toBe("NOT_FOUND");
        });
    });

    describe("Request ID", () => {
        it("should include request ID in response headers", async () => {
            const res = await app.request("/health");

            expect(res.status).toBe(200);
            expect(res.headers.get("x-request-id")).toBeTruthy();
        });
    });

    describe("CORS", () => {
        it("should include CORS headers", async () => {
            const res = await app.request("/health", {
                method: "OPTIONS",
            });

            expect(res.status).toBe(204);
            expect(res.headers.get("access-control-allow-origin")).toBeTruthy();
        });
    });

    describe("Validation Errors", () => {
        it("should return 400 for invalid UUID", async () => {
            const res = await app.request("/v1/public/projects/invalid-uuid");

            expect(res.status).toBe(400);

            const body = await res.json() as ApiResponse;
            expect(body.ok).toBe(false);
            expect(body.error.code).toBe("VALIDATION_ERROR");
        });
    });
});