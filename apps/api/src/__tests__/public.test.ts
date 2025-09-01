/**
 * Tests for public API endpoints
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { app } from "../server";

// Mock the shared module
vi.mock("@promptrepo/shared", async () => {
  const actual = await vi.importActual("@promptrepo/shared");
  return {
    ...actual,
    getRedisClient: vi.fn(() => ({
      incr: vi.fn().mockResolvedValue(1),
      expire: vi.fn().mockResolvedValue(true),
    })),
    createClientService: vi.fn(() => ({
      rpc: vi.fn(),
      from: vi.fn(() => ({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            order: vi.fn().mockResolvedValue({ data: [], error: null }),
          })),
        })),
      })),
    })),
  };
});

describe("Public API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
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
      const { createClientService } = await import("@promptrepo/shared");
      const mockSupabase = createClientService();
      vi.mocked(mockSupabase.rpc).mockResolvedValue({
        data: mockProjects,
        error: null,
      });

      const res = await app.request("/v1/public/projects");
      
      expect(res.status).toBe(200);
      
      const body = await res.json();
      expect(body).toEqual({
        ok: true,
        data: mockProjects,
      });
    });

    it("should handle pagination parameters", async () => {
      const { createClientService } = await import("@promptrepo/shared");
      const mockSupabase = createClientService();
      vi.mocked(mockSupabase.rpc).mockResolvedValue({
        data: [],
        error: null,
      });

      const res = await app.request("/v1/public/projects?limit=10&offset=20");
      
      expect(res.status).toBe(200);
      expect(mockSupabase.rpc).toHaveBeenCalledWith("public_list_projects", {
        _limit: 10,
        _offset: 20,
      });
    });

    it("should handle database errors", async () => {
      const { createClientService } = await import("@promptrepo/shared");
      const mockSupabase = createClientService();
      vi.mocked(mockSupabase.rpc).mockResolvedValue({
        data: null,
        error: { message: "Database error", code: "INTERNAL" },
      });

      const res = await app.request("/v1/public/projects");
      
      expect(res.status).toBe(500);
      
      const body = await res.json();
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

      const { createClientService } = await import("@promptrepo/shared");
      const mockSupabase = createClientService();
      vi.mocked(mockSupabase.rpc).mockResolvedValue({
        data: [mockProject],
        error: null,
      });

      const res = await app.request("/v1/public/projects/550e8400-e29b-41d4-a716-446655440000");
      
      expect(res.status).toBe(200);
      
      const body = await res.json();
      expect(body).toEqual({
        ok: true,
        data: mockProject,
      });
    });

    it("should return 404 for non-existent project", async () => {
      const { createClientService } = await import("@promptrepo/shared");
      const mockSupabase = createClientService();
      vi.mocked(mockSupabase.rpc).mockResolvedValue({
        data: [],
        error: null,
      });

      const res = await app.request("/v1/public/projects/550e8400-e29b-41d4-a716-446655440000");
      
      expect(res.status).toBe(404);
      
      const body = await res.json();
      expect(body.ok).toBe(false);
      expect(body.error.code).toBe("NOT_FOUND");
    });

    it("should return 400 for invalid UUID", async () => {
      const res = await app.request("/v1/public/projects/invalid-uuid");
      
      expect(res.status).toBe(400);
      
      const body = await res.json();
      expect(body.ok).toBe(false);
      expect(body.error.code).toBe("VALIDATION_ERROR");
    });
  });

  describe("Rate limiting", () => {
    it("should include rate limit headers", async () => {
      const { createClientService } = await import("@promptrepo/shared");
      const mockSupabase = createClientService();
      vi.mocked(mockSupabase.rpc).mockResolvedValue({
        data: [],
        error: null,
      });

      const res = await app.request("/v1/public/projects");
      
      expect(res.headers.get("x-ratelimit-limit")).toBe("60");
      expect(res.headers.get("x-ratelimit-remaining")).toBe("59");
      expect(res.headers.get("x-ratelimit-reset")).toBeTruthy();
    });
  });
});
