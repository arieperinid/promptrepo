import { describe, it, expect } from "vitest";
import { ProfileSchema, ProjectSchema, Ok, Err, isOk, isErr } from "../index";

describe("Schemas", () => {
  it("should validate ProfileSchema correctly", () => {
    const validProfile = {
      id: "550e8400-e29b-41d4-a716-446655440000",
      email: "test@example.com",
      name: "Test User",
      role: "user" as const,
      theme_preference: "light" as const,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const result = ProfileSchema.safeParse(validProfile);
    expect(result.success).toBe(true);
  });

  it("should reject invalid ProfileSchema", () => {
    const invalidProfile = {
      id: "invalid-uuid",
      email: "not-an-email",
      name: "",
    };

    const result = ProfileSchema.safeParse(invalidProfile);
    expect(result.success).toBe(false);
  });

  it("should validate ProjectSchema correctly", () => {
    const validProject = {
      id: "550e8400-e29b-41d4-a716-446655440000",
      name: "Test Project",
      user_id: "550e8400-e29b-41d4-a716-446655440001",
      is_public: false,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const result = ProjectSchema.safeParse(validProject);
    expect(result.success).toBe(true);
  });
});

describe("Result helpers", () => {
  it("should create Ok result", () => {
    const result = Ok("success");
    expect(result.ok).toBe(true);
    if (isOk(result)) {
      expect(result.data).toBe("success");
    }
    expect(isOk(result)).toBe(true);
    expect(isErr(result)).toBe(false);
  });

  it("should create Err result", () => {
    const error = new Error("failure");
    const result = Err(error);
    expect(result.ok).toBe(false);
    if (isErr(result)) {
      expect(result.error).toBe(error);
    }
    expect(isOk(result)).toBe(false);
    expect(isErr(result)).toBe(true);
  });
});
