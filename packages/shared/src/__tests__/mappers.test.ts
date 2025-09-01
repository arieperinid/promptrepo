import { describe, it, expect } from "vitest";
import {
  mapToProfile,
  mapToProject,
  mapToSegment,
  mapToPrompt,
  mapToValidator,
  mapToVersion,
  mapToBilling,
  mapToProfiles,
  mapToProjects
} from "../mappers/toDomain";
import {
  mapProfileToInsert,
  mapProfileToUpdate,
  mapProjectToInsert,
  mapProjectToUpdate,
  mapSegmentToInsert,
  mapSegmentToUpdate,
  mapPromptToInsert,
  mapPromptToUpdate,
  mapValidatorToInsert,
  mapValidatorToUpdate
} from "../mappers/toPersist";

describe("Mappers", () => {
  describe("toDomain mappers", () => {
    it("should map valid raw data to Profile", () => {
      const rawProfile = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        handle: "test_user",
        name: "Test User",
        role: "user",
        theme_pref: "light",
        created_at: new Date(),
        updated_at: new Date(),
      };

      const result = mapToProfile(rawProfile);
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value.handle).toBe("test_user");
        expect(result.value.role).toBe("user");
      }
    });

    it("should return error for invalid raw data", () => {
      const invalidRaw = {
        id: "invalid-uuid",
        handle: "",
        role: "invalid-role",
      };

      const result = mapToProfile(invalidRaw);
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error.message).toContain("Invalid profile data");
      }
    });

    it("should map valid raw data to Project", () => {
      const rawProject = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        owner_id: "550e8400-e29b-41d4-a716-446655440001",
        name: "Test Project",
        visibility: "private",
        created_at: new Date(),
        updated_at: new Date(),
      };

      const result = mapToProject(rawProject);
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value.name).toBe("Test Project");
        expect(result.value.visibility).toBe("private");
      }
    });

    it("should map array of raw data to domain objects", () => {
      const rawProfiles = [
        {
          id: "550e8400-e29b-41d4-a716-446655440000",
          handle: "user1",
          role: "user",
          theme_pref: "light",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: "550e8400-e29b-41d4-a716-446655440001",
          handle: "user2",
          role: "pro",
          theme_pref: "dark",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];

      const result = mapToProfiles(rawProfiles);
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value).toHaveLength(2);
        expect(result.value[0]?.handle).toBe("user1");
        expect(result.value[1]?.handle).toBe("user2");
      }
    });

    it("should return error if any item in array is invalid", () => {
      const rawProfiles = [
        {
          id: "550e8400-e29b-41d4-a716-446655440000",
          handle: "user1",
          role: "user",
          theme_pref: "light",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: "invalid-uuid", // invalid
          handle: "",
          role: "invalid-role",
        },
      ];

      const result = mapToProfiles(rawProfiles);
      expect(result.ok).toBe(false);
    });
  });

  describe("toPersist mappers", () => {
    it("should map CreateProfileDto to insert object", () => {
      const dto = {
        handle: "test_user",
        name: "Test User",
        role: "user" as const,
        theme_pref: "light" as const,
      };
      const id = "550e8400-e29b-41d4-a716-446655440000";
      const now = new Date();

      const result = mapProfileToInsert(dto, id, now);

      expect(result.id).toBe(id);
      expect(result.handle).toBe("test_user");
      expect(result.name).toBe("Test User");
      expect(result.role).toBe("user");
      expect(result.theme_pref).toBe("light");
      expect(result.created_at).toBe(now);
      expect(result.updated_at).toBe(now);
    });

    it("should map UpdateProfileDto to update object", () => {
      const dto = {
        name: "Updated Name",
        theme_pref: "dark" as const,
      };
      const now = new Date();

      const result = mapProfileToUpdate(dto, now);

      expect(result.name).toBe("Updated Name");
      expect(result.theme_pref).toBe("dark");
      expect(result.updated_at).toBe(now);
      expect(result.handle).toBeUndefined(); // not in DTO
    });

    it("should map CreateProjectDto to insert object", () => {
      const dto = {
        name: "Test Project",
        description: "A test project",
        visibility: "private" as const,
      };
      const id = "550e8400-e29b-41d4-a716-446655440000";
      const owner_id = "550e8400-e29b-41d4-a716-446655440001";
      const now = new Date();

      const result = mapProjectToInsert(dto, id, owner_id, now);

      expect(result.id).toBe(id);
      expect(result.owner_id).toBe(owner_id);
      expect(result.name).toBe("Test Project");
      expect(result.description).toBe("A test project");
      expect(result.visibility).toBe("private");
      expect(result.created_at).toBe(now);
      expect(result.updated_at).toBe(now);
    });

    it("should map UpdateProjectDto to update object", () => {
      const dto = {
        visibility: "public" as const,
      };
      const now = new Date();

      const result = mapProjectToUpdate(dto, now);

      expect(result.visibility).toBe("public");
      expect(result.updated_at).toBe(now);
      expect(result.name).toBeUndefined(); // not in DTO
      expect('owner_id' in result).toBe(false); // cannot be updated
    });

    it("should map CreateSegmentDto to insert object", () => {
      const dto = {
        project_id: "550e8400-e29b-41d4-a716-446655440000",
        name: "Test Segment",
        position: 0,
      };
      const id = "550e8400-e29b-41d4-a716-446655440001";
      const now = new Date();

      const result = mapSegmentToInsert(dto, id, now);

      expect(result.id).toBe(id);
      expect(result.project_id).toBe("550e8400-e29b-41d4-a716-446655440000");
      expect(result.name).toBe("Test Segment");
      expect(result.position).toBe(0);
      expect(result.created_at).toBe(now);
      expect(result.updated_at).toBe(now);
    });

    it("should map CreatePromptDto to insert object", () => {
      const dto = {
        segment_id: "550e8400-e29b-41d4-a716-446655440000",
        title: "Test Prompt",
        body: "This is a test prompt",
        language: "pt-BR" as const,
        kind: "prompt" as const,
        position: 0,
      };
      const id = "550e8400-e29b-41d4-a716-446655440001";
      const now = new Date();

      const result = mapPromptToInsert(dto, id, now);

      expect(result.id).toBe(id);
      expect(result.segment_id).toBe("550e8400-e29b-41d4-a716-446655440000");
      expect(result.title).toBe("Test Prompt");
      expect(result.body).toBe("This is a test prompt");
      expect(result.language).toBe("pt-BR");
      expect(result.kind).toBe("prompt");
      expect(result.position).toBe(0);
      expect(result.created_at).toBe(now);
      expect(result.updated_at).toBe(now);
    });

    it("should map CreateValidatorDto to insert object", () => {
      const dto = {
        prompt_id: "550e8400-e29b-41d4-a716-446655440000",
        title: "Test Validator",
        body: "Validation rules",
      };
      const id = "550e8400-e29b-41d4-a716-446655440001";
      const now = new Date();

      const result = mapValidatorToInsert(dto, id, now);

      expect(result.id).toBe(id);
      expect(result.prompt_id).toBe("550e8400-e29b-41d4-a716-446655440000");
      expect(result.title).toBe("Test Validator");
      expect(result.body).toBe("Validation rules");
      expect(result.created_at).toBe(now);
      expect(result.updated_at).toBe(now);
    });
  });
});
