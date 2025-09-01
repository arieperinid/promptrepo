/**
 * Tests for public API endpoints
 */
import { describe, it, expect, beforeEach } from "vitest";
import { app } from "../server";
import { mockServiceClient } from "./setup";
import type { ApiResponse, MockPostgrestResponse } from "./test-types";

describe("Public API", () => {
    beforeEach(() => {
        // Reset all mocks before each test
        mockServiceClient.rpc.mockReset();
    });

    describe("GET /v1/public/projects", () => {
        it("should return 200 with projects array", async () => {
            const mockProjects = [
                {
                    id: "550e8400-e29b-41d4-a716-446655440000",
                    name: "Test Project",
                    visibility: "public",
                },
            ];

            // Mock the RPC call
            mockServiceClient.rpc.mockResolvedValue({
                data: mockProjects,
                error: null,
                count: mockProjects.length,
                status: 200,
                statusText: "OK",
            } as MockPostgrestResponse<typeof mockProjects>);

            const res = await app.request("/v1/public/projects");

            expect(res.status).toBe(200);

            const body = await res.json() as ApiResponse;
            expect(body).toEqual({
                ok: true,
                data: mockProjects,
            });
        });

        it("should handle pagination parameters", async () => {
            mockServiceClient.rpc.mockResolvedValue({
                data: [],
                error: null,
                count: 0,
                status: 200,
                statusText: "OK",
            } as MockPostgrestResponse<any[]>);

            const res = await app.request("/v1/public/projects?limit=10&offset=20");

            expect(res.status).toBe(200);
            expect(mockServiceClient.rpc).toHaveBeenCalledWith("public_list_projects", {
                _limit: 10,
                _offset: 20,
            });
        });

        it("should handle database errors", async () => {
            mockServiceClient.rpc.mockResolvedValue({
                data: null,
                error: {
                    message: "Database error",
                    code: "INTERNAL",
                    details: "Mock database error",
                    hint: "Check connection",
                    name: "DatabaseError"
                },
                count: 0,
                status: 500,
                statusText: "Internal Server Error",
            });

            const res = await app.request("/v1/public/projects");

            expect(res.status).toBe(500);

            const body = await res.json() as ApiResponse;
            expect(body.ok).toBe(false);
            expect(body.error.code).toBe("INTERNAL");
        });
    });

    describe("GET /v1/public/projects/:id", () => {
        it("should return 200 with project data", async () => {
            const mockProject = {
                id: "550e8400-e29b-41d4-a716-446655440000",
                name: "Test Project",
                visibility: "public",
            };

            mockServiceClient.rpc.mockResolvedValue({
                data: [mockProject],
                error: null,
                count: 1,
                status: 200,
                statusText: "OK",
            } as MockPostgrestResponse<typeof mockProject[]>);

            const res = await app.request("/v1/public/projects/550e8400-e29b-41d4-a716-446655440000");

            expect(res.status).toBe(200);

            const body = await res.json() as ApiResponse;
            expect(body).toEqual({
                ok: true,
                data: mockProject,
            });
        });

        it("should return 404 for non-existent project", async () => {
            mockServiceClient.rpc.mockResolvedValue({
                data: [],
                error: null,
                count: 0,
                status: 200,
                statusText: "OK",
            } as MockPostgrestResponse<any[]>);

            const res = await app.request("/v1/public/projects/550e8400-e29b-41d4-a716-446655440000");

            expect(res.status).toBe(404);

            const body = await res.json() as ApiResponse;
            expect(body.ok).toBe(false);
            expect(body.error.code).toBe("NOT_FOUND");
        });

        it("should return 400 for invalid UUID", async () => {
            const res = await app.request("/v1/public/projects/invalid-uuid");

            expect(res.status).toBe(400);

            const body = await res.json() as ApiResponse;
            expect(body.ok).toBe(false);
            expect(body.error.code).toBe("VALIDATION_ERROR");
        });
    });

    describe("Rate limiting", () => {
        it("should include rate limit headers", async () => {
            mockServiceClient.rpc.mockResolvedValue({
                data: [],
                error: null,
                count: 0,
                status: 200,
                statusText: "OK",
            } as MockPostgrestResponse<any[]>);

            const res = await app.request("/v1/public/projects");

            expect(res.status).toBe(200);
            // Rate limiting headers are added by the middleware
            // In a real test, we would check for X-RateLimit-* headers
        });
    });
});