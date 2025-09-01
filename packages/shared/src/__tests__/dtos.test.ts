import { describe, it, expect } from "vitest";
import { 
  CreateProfileDtoSchema, 
  UpdateProfileDtoSchema 
} from "../dtos/profile.dto";
import { 
  CreateProjectDtoSchema, 
  UpdateProjectDtoSchema 
} from "../dtos/project.dto";
import { 
  CreateSegmentDtoSchema, 
  UpdateSegmentDtoSchema 
} from "../dtos/segment.dto";
import { 
  CreatePromptDtoSchema, 
  UpdatePromptDtoSchema 
} from "../dtos/prompt.dto";
import { 
  CreateValidatorDtoSchema, 
  UpdateValidatorDtoSchema 
} from "../dtos/validator.dto";

describe("DTOs", () => {
  describe("Profile DTOs", () => {
    it("should validate CreateProfileDto with required fields", () => {
      const validDto = {
        handle: "test_user",
        name: "Test User",
        role: "user",
        theme_pref: "light",
      };

      const result = CreateProfileDtoSchema.safeParse(validDto);
      expect(result.success).toBe(true);
    });

    it("should reject CreateProfileDto with missing required fields", () => {
      const invalidDto = {
        name: "Test User",
        // missing handle
      };

      const result = CreateProfileDtoSchema.safeParse(invalidDto);
      expect(result.success).toBe(false);
    });

    it("should validate UpdateProfileDto with partial fields", () => {
      const validDto = {
        name: "Updated Name",
      };

      const result = UpdateProfileDtoSchema.safeParse(validDto);
      expect(result.success).toBe(true);
    });

    it("should validate empty UpdateProfileDto", () => {
      const emptyDto = {};

      const result = UpdateProfileDtoSchema.safeParse(emptyDto);
      expect(result.success).toBe(true);
    });
  });

  describe("Project DTOs", () => {
    it("should validate CreateProjectDto with required fields", () => {
      const validDto = {
        name: "Test Project",
        description: "A test project",
        visibility: "private",
      };

      const result = CreateProjectDtoSchema.safeParse(validDto);
      expect(result.success).toBe(true);
    });

    it("should validate CreateProjectDto without optional fields", () => {
      const validDto = {
        name: "Test Project",
      };

      const result = CreateProjectDtoSchema.safeParse(validDto);
      expect(result.success).toBe(true);
    });

    it("should reject CreateProjectDto with empty name", () => {
      const invalidDto = {
        name: "",
        description: "A test project",
      };

      const result = CreateProjectDtoSchema.safeParse(invalidDto);
      expect(result.success).toBe(false);
    });

    it("should validate UpdateProjectDto with partial fields", () => {
      const validDto = {
        visibility: "public",
      };

      const result = UpdateProjectDtoSchema.safeParse(validDto);
      expect(result.success).toBe(true);
    });
  });

  describe("Segment DTOs", () => {
    it("should validate CreateSegmentDto with required fields", () => {
      const validDto = {
        project_id: "550e8400-e29b-41d4-a716-446655440000",
        name: "Test Segment",
        position: 0,
      };

      const result = CreateSegmentDtoSchema.safeParse(validDto);
      expect(result.success).toBe(true);
    });

    it("should reject CreateSegmentDto with invalid project_id", () => {
      const invalidDto = {
        project_id: "invalid-uuid",
        name: "Test Segment",
      };

      const result = CreateSegmentDtoSchema.safeParse(invalidDto);
      expect(result.success).toBe(false);
    });

    it("should validate UpdateSegmentDto without project_id", () => {
      const validDto = {
        name: "Updated Segment",
        position: 1,
      };

      const result = UpdateSegmentDtoSchema.safeParse(validDto);
      expect(result.success).toBe(true);
    });

    it("should reject UpdateSegmentDto with project_id (not allowed)", () => {
      const invalidDto = {
        project_id: "550e8400-e29b-41d4-a716-446655440000",
        name: "Updated Segment",
      };

      const result = UpdateSegmentDtoSchema.safeParse(invalidDto);
      expect(result.success).toBe(false);
    });
  });

  describe("Prompt DTOs", () => {
    it("should validate CreatePromptDto with all fields", () => {
      const validDto = {
        segment_id: "550e8400-e29b-41d4-a716-446655440000",
        title: "Test Prompt",
        body: "This is a test prompt",
        language: "pt-BR",
        kind: "prompt",
        position: 0,
      };

      const result = CreatePromptDtoSchema.safeParse(validDto);
      expect(result.success).toBe(true);
    });

    it("should validate CreatePromptDto with required fields only", () => {
      const validDto = {
        segment_id: "550e8400-e29b-41d4-a716-446655440000",
        title: "Test Prompt",
        body: "This is a test prompt",
      };

      const result = CreatePromptDtoSchema.safeParse(validDto);
      expect(result.success).toBe(true);
    });

    it("should reject CreatePromptDto with empty body", () => {
      const invalidDto = {
        segment_id: "550e8400-e29b-41d4-a716-446655440000",
        title: "Test Prompt",
        body: "", // empty body
      };

      const result = CreatePromptDtoSchema.safeParse(invalidDto);
      expect(result.success).toBe(false);
    });

    it("should validate UpdatePromptDto without segment_id", () => {
      const validDto = {
        title: "Updated Prompt",
        kind: "system",
      };

      const result = UpdatePromptDtoSchema.safeParse(validDto);
      expect(result.success).toBe(true);
    });
  });

  describe("Validator DTOs", () => {
    it("should validate CreateValidatorDto with required fields", () => {
      const validDto = {
        prompt_id: "550e8400-e29b-41d4-a716-446655440000",
        title: "Test Validator",
        body: "Validation rules",
      };

      const result = CreateValidatorDtoSchema.safeParse(validDto);
      expect(result.success).toBe(true);
    });

    it("should reject CreateValidatorDto with missing fields", () => {
      const invalidDto = {
        prompt_id: "550e8400-e29b-41d4-a716-446655440000",
        // missing title and body
      };

      const result = CreateValidatorDtoSchema.safeParse(invalidDto);
      expect(result.success).toBe(false);
    });

    it("should validate UpdateValidatorDto without prompt_id", () => {
      const validDto = {
        title: "Updated Validator",
      };

      const result = UpdateValidatorDtoSchema.safeParse(validDto);
      expect(result.success).toBe(true);
    });

    it("should reject UpdateValidatorDto with prompt_id (not allowed)", () => {
      const invalidDto = {
        prompt_id: "550e8400-e29b-41d4-a716-446655440000",
        title: "Updated Validator",
      };

      const result = UpdateValidatorDtoSchema.safeParse(invalidDto);
      expect(result.success).toBe(false);
    });
  });
});
