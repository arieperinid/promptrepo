import { describe, it, expect } from "vitest";
import { ROLE, ROLES, type Role } from "../enums/role";
import { VISIBILITY, VISIBILITIES, type Visibility } from "../enums/visibility";
import { KIND, KINDS, type Kind } from "../enums/kind";
import { PLAN, PLANS, type Plan } from "../enums/plan";
import { BILLING_STATUS, BILLING_STATUSES, type BillingStatus } from "../enums/billingStatus";
import { THEME_PREF, THEME_PREFS, type ThemePref } from "../enums/themePref";
import { LANGUAGE, LANGUAGES, DEFAULT_LANGUAGE, type Language } from "../enums/language";

describe("Enums", () => {
  describe("ROLE", () => {
    it("should have correct values", () => {
      expect(ROLE.user).toBe("user");
      expect(ROLE.pro).toBe("pro");
      expect(ROLE.admin).toBe("admin");
    });

    it("should have correct array of values", () => {
      expect(ROLES).toEqual(["user", "pro", "admin"]);
    });

    it("should have correct type", () => {
      const role: Role = ROLE.user;
      expect(role).toBe("user");
    });
  });

  describe("VISIBILITY", () => {
    it("should have correct values", () => {
      expect(VISIBILITY.private).toBe("private");
      expect(VISIBILITY.public).toBe("public");
    });

    it("should have correct array of values", () => {
      expect(VISIBILITIES).toEqual(["private", "public"]);
    });

    it("should have correct type", () => {
      const visibility: Visibility = VISIBILITY.public;
      expect(visibility).toBe("public");
    });
  });

  describe("KIND", () => {
    it("should have correct values", () => {
      expect(KIND.prompt).toBe("prompt");
      expect(KIND.system).toBe("system");
      expect(KIND.tool).toBe("tool");
    });

    it("should have correct array of values", () => {
      expect(KINDS).toEqual(["prompt", "system", "tool"]);
    });

    it("should have correct type", () => {
      const kind: Kind = KIND.system;
      expect(kind).toBe("system");
    });
  });

  describe("PLAN", () => {
    it("should have correct values", () => {
      expect(PLAN.free).toBe("free");
      expect(PLAN.pro).toBe("pro");
    });

    it("should have correct array of values", () => {
      expect(PLANS).toEqual(["free", "pro"]);
    });

    it("should have correct type", () => {
      const plan: Plan = PLAN.pro;
      expect(plan).toBe("pro");
    });
  });

  describe("BILLING_STATUS", () => {
    it("should have correct values", () => {
      expect(BILLING_STATUS.active).toBe("active");
      expect(BILLING_STATUS.past_due).toBe("past_due");
      expect(BILLING_STATUS.canceled).toBe("canceled");
      expect(BILLING_STATUS.incomplete).toBe("incomplete");
    });

    it("should have correct array of values", () => {
      expect(BILLING_STATUSES).toEqual(["active", "past_due", "canceled", "incomplete"]);
    });

    it("should have correct type", () => {
      const status: BillingStatus = BILLING_STATUS.active;
      expect(status).toBe("active");
    });
  });

  describe("THEME_PREF", () => {
    it("should have correct values", () => {
      expect(THEME_PREF.light).toBe("light");
      expect(THEME_PREF.dark).toBe("dark");
    });

    it("should have correct array of values", () => {
      expect(THEME_PREFS).toEqual(["light", "dark"]);
    });

    it("should have correct type", () => {
      const theme: ThemePref = THEME_PREF.dark;
      expect(theme).toBe("dark");
    });
  });

  describe("LANGUAGE", () => {
    it("should have correct values", () => {
      expect(LANGUAGE.en).toBe("en");
      expect(LANGUAGE["pt-BR"]).toBe("pt-BR");
    });

    it("should have correct array of values", () => {
      expect(LANGUAGES).toEqual(["en", "pt-BR"]);
    });

    it("should have correct default", () => {
      expect(DEFAULT_LANGUAGE).toBe("pt-BR");
    });

    it("should have correct type", () => {
      const language: Language = LANGUAGE.en;
      expect(language).toBe("en");
    });
  });
});
