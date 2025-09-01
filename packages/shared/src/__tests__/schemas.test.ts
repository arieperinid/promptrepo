import { describe, it, expect } from "vitest";
import { ProfileSchema } from "../schemas/profile";
import { ProjectSchema } from "../schemas/project";
import { SegmentSchema } from "../schemas/segment";
import { PromptSchema } from "../schemas/prompt";
import { ValidatorSchema } from "../schemas/validator";
import { VersionSchema, ENTITY_TYPE } from "../schemas/version";
import { BillingSchema } from "../schemas/billing";

describe("Schemas", () => {
  describe("ProfileSchema", () => {
    it("should validate correct profile data", () => {
      const validProfile = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        handle: "test_user",
        name: "Test User",
        role: "user",
        theme_pref: "light",
        created_at: new Date(),
        updated_at: new Date(),
      };

      const result = ProfileSchema.safeParse(validProfile);
      expect(result.success).toBe(true);
    });

    it("should reject invalid profile data", () => {
      const invalidProfile = {
        id: "invalid-uuid",
        handle: "", // empty handle
        role: "invalid-role",
      };

      const result = ProfileSchema.safeParse(invalidProfile);
      expect(result.success).toBe(false);
    });

    it("should apply defaults", () => {
      const profileWithDefaults = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        handle: "test_user",
        created_at: new Date(),
        updated_at: new Date(),
      };

      const result = ProfileSchema.safeParse(profileWithDefaults);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.role).toBe("user");
        expect(result.data.theme_pref).toBe("light");
      }
    });
  });

  describe("ProjectSchema", () => {
    it("should validate correct project data", () => {
      const validProject = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        owner_id: "550e8400-e29b-41d4-a716-446655440001",
        name: "Test Project",
        description: "A test project",
        visibility: "private",
        created_at: new Date(),
        updated_at: new Date(),
      };

      const result = ProjectSchema.safeParse(validProject);
      expect(result.success).toBe(true);
    });

    it("should reject invalid project data", () => {
      const invalidProject = {
        id: "invalid-uuid",
        owner_id: "invalid-uuid",
        name: "", // empty name
        visibility: "invalid-visibility",
      };

      const result = ProjectSchema.safeParse(invalidProject);
      expect(result.success).toBe(false);
    });

    it("should apply defaults", () => {
      const projectWithDefaults = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        owner_id: "550e8400-e29b-41d4-a716-446655440001",
        name: "Test Project",
        created_at: new Date(),
        updated_at: new Date(),
      };

      const result = ProjectSchema.safeParse(projectWithDefaults);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.visibility).toBe("private");
      }
    });
  });

  describe("SegmentSchema", () => {
    it("should validate correct segment data", () => {
      const validSegment = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        project_id: "550e8400-e29b-41d4-a716-446655440001",
        name: "Test Segment",
        position: 0,
        created_at: new Date(),
        updated_at: new Date(),
      };

      const result = SegmentSchema.safeParse(validSegment);
      expect(result.success).toBe(true);
    });

    it("should reject negative position", () => {
      const invalidSegment = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        project_id: "550e8400-e29b-41d4-a716-446655440001",
        name: "Test Segment",
        position: -1, // negative position
        created_at: new Date(),
        updated_at: new Date(),
      };

      const result = SegmentSchema.safeParse(invalidSegment);
      expect(result.success).toBe(false);
    });
  });

  describe("PromptSchema", () => {
    it("should validate correct prompt data", () => {
      const validPrompt = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        segment_id: "550e8400-e29b-41d4-a716-446655440001",
        title: "Test Prompt",
        body: "This is a test prompt",
        language: "pt-BR",
        kind: "prompt",
        position: 0,
        created_at: new Date(),
        updated_at: new Date(),
      };

      const result = PromptSchema.safeParse(validPrompt);
      expect(result.success).toBe(true);
    });

    it("should apply defaults", () => {
      const promptWithDefaults = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        segment_id: "550e8400-e29b-41d4-a716-446655440001",
        title: "Test Prompt",
        body: "This is a test prompt",
        created_at: new Date(),
        updated_at: new Date(),
      };

      const result = PromptSchema.safeParse(promptWithDefaults);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.language).toBe("pt-BR");
        expect(result.data.kind).toBe("prompt");
        expect(result.data.position).toBe(0);
      }
    });
  });

  describe("ValidatorSchema", () => {
    it("should validate correct validator data", () => {
      const validValidator = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        prompt_id: "550e8400-e29b-41d4-a716-446655440001",
        title: "Test Validator",
        body: "Validation rules",
        created_at: new Date(),
        updated_at: new Date(),
      };

      const result = ValidatorSchema.safeParse(validValidator);
      expect(result.success).toBe(true);
    });

    it("should reject empty title and body", () => {
      const invalidValidator = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        prompt_id: "550e8400-e29b-41d4-a716-446655440001",
        title: "", // empty title
        body: "", // empty body
        created_at: new Date(),
        updated_at: new Date(),
      };

      const result = ValidatorSchema.safeParse(invalidValidator);
      expect(result.success).toBe(false);
    });
  });

  describe("VersionSchema", () => {
    it("should validate correct version data", () => {
      const validVersion = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        entity_type: "project",
        entity_id: "550e8400-e29b-41d4-a716-446655440001",
        snapshot: { name: "Test Project", description: "A test" },
        author_id: "550e8400-e29b-41d4-a716-446655440002",
        created_at: new Date(),
      };

      const result = VersionSchema.safeParse(validVersion);
      expect(result.success).toBe(true);
    });

    it("should accept null author_id", () => {
      const versionWithNullAuthor = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        entity_type: "segment",
        entity_id: "550e8400-e29b-41d4-a716-446655440001",
        snapshot: { name: "Test Segment" },
        author_id: null,
        created_at: new Date(),
      };

      const result = VersionSchema.safeParse(versionWithNullAuthor);
      expect(result.success).toBe(true);
    });

    it("should validate entity types", () => {
      expect(ENTITY_TYPE.project).toBe("project");
      expect(ENTITY_TYPE.segment).toBe("segment");
      expect(ENTITY_TYPE.prompt).toBe("prompt");
      expect(ENTITY_TYPE.validator).toBe("validator");
    });
  });

  describe("BillingSchema", () => {
    it("should validate correct billing data", () => {
      const validBilling = {
        profile_id: "550e8400-e29b-41d4-a716-446655440000",
        plan: "pro",
        current_period_end: new Date(),
        status: "active",
        updated_at: new Date(),
      };

      const result = BillingSchema.safeParse(validBilling);
      expect(result.success).toBe(true);
    });

    it("should apply defaults", () => {
      const billingWithDefaults = {
        profile_id: "550e8400-e29b-41d4-a716-446655440000",
        current_period_end: null,
        updated_at: new Date(),
      };

      const result = BillingSchema.safeParse(billingWithDefaults);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.plan).toBe("free");
      }
    });

    it("should accept null current_period_end", () => {
      const billingWithNullPeriod = {
        profile_id: "550e8400-e29b-41d4-a716-446655440000",
        plan: "free",
        current_period_end: null,
        updated_at: new Date(),
      };

      const result = BillingSchema.safeParse(billingWithNullPeriod);
      expect(result.success).toBe(true);
    });
  });
});