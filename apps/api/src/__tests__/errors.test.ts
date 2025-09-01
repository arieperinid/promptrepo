/**
 * Tests for error handling and validation
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
    })),
  };
});

describe("Error Handling", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("404 Not Found", () => {
    it("should return 404 for non-existent endpoints", async () => {
      const res = await app.request("/non-existent-endpoint");
      
      expect(res.status).toBe(404);
      
      const body = await res.json();
      expect(body).toEqual({
        ok: false,
        error: {
          code: "NOT_FOUND",
          message: "Endpoint not found",
        },
      });
    });
  });

  describe("Validation Errors", () => {
    it("should return 400 for invalid JSON", async () => {
      const res = await app.request("/v1/public/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: "invalid json",
      });
      
      expect(res.status).toBe(400);
      
      const body = await res.json();
      expect(body.ok).toBe(false);
      expect(body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return 400 for invalid query parameters", async () => {
      const res = await app.request("/v1/public/projects?limit=invalid");
      
      expect(res.status).toBe(400);
      
      const body = await res.json();
      expect(body.ok).toBe(false);
      expect(body.error.code).toBe("VALIDATION_ERROR");
    });
  });

  describe("Request ID", () => {
    it("should include request ID in response headers", async () => {
      const res = await app.request("/health");
      
      const requestId = res.headers.get("x-request-id");
      expect(requestId).toBeTruthy();
      expect(requestId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
    });
  });

  describe("CORS", () => {
    it("should include CORS headers", async () => {
      const res = await app.request("/health", {
        method: "OPTIONS",
        headers: {
          Origin: "http://localhost:3000",
        },
      });
      
      expect(res.headers.get("access-control-allow-origin")).toBe("http://localhost:3000");
      expect(res.headers.get("access-control-allow-methods")).toContain("GET");
      expect(res.headers.get("access-control-allow-methods")).toContain("POST");
    });
  });

  describe("Database Errors", () => {
    it("should handle database connection errors", async () => {
      const { createClientService } = await import("@promptrepo/shared");
      const mockSupabase = createClientService();
      vi.mocked(mockSupabase.rpc).mockRejectedValue(new Error("Connection failed"));

      const res = await app.request("/v1/public/projects");
      
      expect(res.status).toBe(500);
      
      const body = await res.json();
      expect(body.ok).toBe(false);
      expect(body.error.code).toBe("INTERNAL");
    });
  });
});
