/**
 * Test setup and mocks
 */
import { vi } from "vitest";

// Mock Redis client
export const mockRedisClient = {
  incr: vi.fn().mockResolvedValue(1),
  expire: vi.fn().mockResolvedValue(true),
};

// Mock Supabase client
export const mockSupabaseClient = {
  rpc: vi.fn(),
  from: vi.fn(() => ({
    select: vi.fn(() => ({
      eq: vi.fn(() => ({
        single: vi.fn().mockResolvedValue({ data: null, error: null }),
        order: vi.fn().mockResolvedValue({ data: [], error: null }),
      })),
    })),
    insert: vi.fn(() => ({
      select: vi.fn(() => ({
        single: vi.fn().mockResolvedValue({ data: null, error: null }),
      })),
    })),
    update: vi.fn(() => ({
      eq: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn().mockResolvedValue({ data: null, error: null }),
        })),
      })),
    })),
    delete: vi.fn(() => ({
      eq: vi.fn().mockResolvedValue({ data: null, error: null }),
    })),
  })),
  auth: {
    setSession: vi.fn(),
    getUser: vi.fn().mockResolvedValue({ data: { user: null }, error: null }),
  },
};

// Mock service client
export const mockServiceClient = {
  ...mockSupabaseClient,
};

// Global mocks
vi.mock("@promptrepo/shared", async () => {
  const actual = await vi.importActual("@promptrepo/shared");
  return {
    ...actual,
    getRedisClient: vi.fn(() => mockRedisClient),
    createClientAnon: vi.fn(() => mockSupabaseClient),
    createClientService: vi.fn(() => mockServiceClient),
  };
});

export { mockSupabaseClient as mockSupabase };
