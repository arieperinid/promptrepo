/**
 * Tests for rate limiting functionality
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { app } from "../server";

// Mock the shared module with rate limiting behavior
vi.mock("@promptrepo/shared", async () => {
  const actual = await vi.importActual("@promptrepo/shared");
  
  let requestCount = 0;
  
  return {
    ...actual,
    getRedisClient: vi.fn(() => ({
      incr: vi.fn(() => {
        requestCount++;
        return Promise.resolve(requestCount);
      }),
      expire: vi.fn().mockResolvedValue(true),
    })),
    createClientService: vi.fn(() => ({
      rpc: vi.fn().mockResolvedValue({ data: [], error: null }),
    })),
    rateLimitError: vi.fn((message: string) => {
      const error = new Error(message);
      error.name = "RateLimitError";
      return error;
    }),
  };
});

describe("Rate Limiting", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset request count
    const { getRedisClient } = vi.mocked(require("@promptrepo/shared"));
    let requestCount = 0;
    const mockRedis = getRedisClient();
    vi.mocked(mockRedis.incr).mockImplementation(() => {
      requestCount++;
      return Promise.resolve(requestCount);
    });
  });

  describe("Public endpoints", () => {
    it("should allow requests within limit", async () => {
      const res = await app.request("/v1/public/projects");
      
      expect(res.status).toBe(200);
      expect(res.headers.get("x-ratelimit-limit")).toBe("60");
      expect(res.headers.get("x-ratelimit-remaining")).toBe("59");
    });

    it("should return 429 when rate limit exceeded", async () => {
      // Mock Redis to return count > limit
      const { getRedisClient } = vi.mocked(require("@promptrepo/shared"));
      const mockRedis = getRedisClient();
      vi.mocked(mockRedis.incr).mockResolvedValue(61); // Over the limit of 60

      const res = await app.request("/v1/public/projects");
      
      expect(res.status).toBe(429);
      
      const body = await res.json();
      expect(body.ok).toBe(false);
      expect(body.error.code).toBe("RATE_LIMIT");
    });

    it("should set expiration on first request", async () => {
      const { getRedisClient } = vi.mocked(require("@promptrepo/shared"));
      const mockRedis = getRedisClient();
      vi.mocked(mockRedis.incr).mockResolvedValue(1); // First request

      await app.request("/v1/public/projects");
      
      expect(mockRedis.expire).toHaveBeenCalledWith(
        expect.stringContaining("ratelimit:public:"),
        60
      );
    });
  });

  describe("Authenticated endpoints", () => {
    const validToken = "Bearer valid-jwt-token";

    beforeEach(() => {
      // Setup auth mocks
      const { createClientService } = vi.mocked(require("@promptrepo/shared"));
      const mockServiceClient = createClientService();
      vi.mocked(mockServiceClient).auth = {
        getUser: vi.fn().mockResolvedValue({
          data: { user: { id: "user-123" } },
          error: null,
        }),
      };
      vi.mocked(mockServiceClient).from = vi.fn(() => ({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: vi.fn().mockResolvedValue({
              data: { role: "user" },
              error: null,
            }),
          })),
          order: vi.fn().mockResolvedValue({
            data: [],
            error: null,
          }),
        })),
      }));
    });

    it("should use user-based rate limiting", async () => {
      const { getRedisClient } = vi.mocked(require("@promptrepo/shared"));
      const mockRedis = getRedisClient();

      await app.request("/v1/projects", {
        headers: {
          Authorization: validToken,
        },
      });
      
      expect(mockRedis.incr).toHaveBeenCalledWith("ratelimit:user:user-123");
    });

    it("should have higher limit for authenticated users", async () => {
      const res = await app.request("/v1/projects", {
        headers: {
          Authorization: validToken,
        },
      });
      
      expect(res.status).toBe(200);
      expect(res.headers.get("x-ratelimit-limit")).toBe("120");
    });
  });

  describe("Redis errors", () => {
    it("should not block requests when Redis is unavailable", async () => {
      const { getRedisClient } = vi.mocked(require("@promptrepo/shared"));
      const mockRedis = getRedisClient();
      vi.mocked(mockRedis.incr).mockRejectedValue(new Error("Redis connection failed"));

      const res = await app.request("/v1/public/projects");
      
      // Should still return 200 despite Redis error
      expect(res.status).toBe(200);
    });
  });
});
