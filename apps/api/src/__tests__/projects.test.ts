/**
 * Tests for authenticated project endpoints
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
    createClientAnon: vi.fn(() => ({
      auth: {
        setAuth: vi.fn(),
        getUser: vi.fn(),
      },
      from: vi.fn(() => ({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: vi.fn(),
            order: vi.fn(),
          })),
          insert: vi.fn(() => ({
            select: vi.fn(() => ({
              single: vi.fn(),
            })),
          })),
          update: vi.fn(() => ({
            eq: vi.fn(() => ({
              select: vi.fn(() => ({
                single: vi.fn(),
              })),
            })),
          })),
          delete: vi.fn(() => ({
            eq: vi.fn(),
          })),
        })),
      })),
    })),
    createClientService: vi.fn(() => ({
      auth: {
        getUser: vi.fn(),
      },
      from: vi.fn(() => ({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: vi.fn(),
          })),
        })),
      })),
    })),
  };
});

describe("Authenticated Projects API", () => {
  const validToken = "Bearer valid-jwt-token";
  const mockUser = { id: "user-123" };
  const mockProfile = { role: "user" };

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Setup default auth mocks
    const { createClientService } = vi.mocked(require("@promptrepo/shared"));
    const mockServiceClient = createClientService();
    vi.mocked(mockServiceClient.auth.getUser).mockResolvedValue({
      data: { user: mockUser },
      error: null,
    });
    vi.mocked(mockServiceClient.from).mockReturnValue({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn().mockResolvedValue({
            data: mockProfile,
            error: null,
          }),
        })),
      })),
    } as any);
  });

  describe("GET /v1/projects", () => {
    it("should return 401 without token", async () => {
      const res = await app.request("/v1/projects");
      
      expect(res.status).toBe(401);
      
      const body = await res.json();
      expect(body.ok).toBe(false);
      expect(body.error.code).toBe("UNAUTHORIZED");
    });

    it("should return 200 with projects for authenticated user", async () => {
      const mockProjects = [
        {
          id: "550e8400-e29b-41d4-a716-446655440000",
          name: "My Project",
          owner_id: "user-123",
        },
      ];

      const { createClientAnon } = vi.mocked(require("@promptrepo/shared"));
      const mockUserClient = createClientAnon();
      vi.mocked(mockUserClient.from).mockReturnValue({
        select: vi.fn(() => ({
          order: vi.fn().mockResolvedValue({
            data: mockProjects,
            error: null,
          }),
        })),
      } as any);

      const res = await app.request("/v1/projects", {
        headers: {
          Authorization: validToken,
        },
      });
      
      expect(res.status).toBe(200);
      
      const body = await res.json();
      expect(body).toEqual({
        ok: true,
        data: mockProjects,
      });
    });
  });

  describe("POST /v1/projects", () => {
    it("should return 401 without token", async () => {
      const res = await app.request("/v1/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "New Project",
        }),
      });
      
      expect(res.status).toBe(401);
    });

    it("should return 400 with invalid data", async () => {
      const res = await app.request("/v1/projects", {
        method: "POST",
        headers: {
          Authorization: validToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // missing required name field
        }),
      });
      
      expect(res.status).toBe(400);
      
      const body = await res.json();
      expect(body.ok).toBe(false);
      expect(body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should create project with valid data", async () => {
      const mockProject = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        name: "New Project",
        owner_id: "user-123",
      };

      const { createClientAnon } = vi.mocked(require("@promptrepo/shared"));
      const mockUserClient = createClientAnon();
      
      // Mock auth.getUser for getting current user
      vi.mocked(mockUserClient.auth.getUser).mockResolvedValue({
        data: { user: mockUser },
        error: null,
      });
      
      // Mock insert operation
      vi.mocked(mockUserClient.from).mockReturnValue({
        insert: vi.fn(() => ({
          select: vi.fn(() => ({
            single: vi.fn().mockResolvedValue({
              data: mockProject,
              error: null,
            }),
          })),
        })),
      } as any);

      const res = await app.request("/v1/projects", {
        method: "POST",
        headers: {
          Authorization: validToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "New Project",
          description: "A test project",
          visibility: "private",
        }),
      });
      
      expect(res.status).toBe(201);
      
      const body = await res.json();
      expect(body).toEqual({
        ok: true,
        data: mockProject,
      });
    });
  });

  describe("GET /v1/projects/:id", () => {
    it("should return 404 for non-existent project", async () => {
      const { createClientAnon } = vi.mocked(require("@promptrepo/shared"));
      const mockUserClient = createClientAnon();
      vi.mocked(mockUserClient.from).mockReturnValue({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: vi.fn().mockResolvedValue({
              data: null,
              error: { code: "PGRST116" }, // Supabase not found error
            }),
          })),
        })),
      } as any);

      const res = await app.request("/v1/projects/550e8400-e29b-41d4-a716-446655440000", {
        headers: {
          Authorization: validToken,
        },
      });
      
      expect(res.status).toBe(404);
      
      const body = await res.json();
      expect(body.ok).toBe(false);
      expect(body.error.code).toBe("NOT_FOUND");
    });
  });

  describe("Rate limiting", () => {
    it("should include rate limit headers for authenticated requests", async () => {
      const { createClientAnon } = vi.mocked(require("@promptrepo/shared"));
      const mockUserClient = createClientAnon();
      vi.mocked(mockUserClient.from).mockReturnValue({
        select: vi.fn(() => ({
          order: vi.fn().mockResolvedValue({
            data: [],
            error: null,
          }),
        })),
      } as any);

      const res = await app.request("/v1/projects", {
        headers: {
          Authorization: validToken,
        },
      });
      
      expect(res.headers.get("x-ratelimit-limit")).toBe("120");
      expect(res.headers.get("x-ratelimit-remaining")).toBe("119");
    });
  });
});
