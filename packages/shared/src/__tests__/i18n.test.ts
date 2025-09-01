import { describe, it, expect } from "vitest";
import {
  LOCALES,
  DEFAULT_LOCALE,
  getDict,
  getTranslation,
  t,
  isValidLocale,
  getBestLocale,
  en,
  ptBR
} from "../i18n";

describe("i18n", () => {
  describe("constants", () => {
    it("should have correct locales", () => {
      expect(LOCALES).toEqual(["en", "pt-BR"]);
    });

    it("should have correct default locale", () => {
      expect(DEFAULT_LOCALE).toBe("en");
    });
  });

  describe("getDict", () => {
    it("should return English dictionary by default", () => {
      const dict = getDict();
      expect(dict).toBe(en);
      expect(dict.common.ok).toBe("OK");
      expect(dict.errors.validation).toBe("Invalid data provided");
    });

    it("should return English dictionary explicitly", () => {
      const dict = getDict("en");
      expect(dict).toBe(en);
      expect(dict.common.cancel).toBe("Cancel");
    });

    it("should return Portuguese dictionary", () => {
      const dict = getDict("pt-BR");
      expect(dict).toBe(ptBR);
      expect(dict.common.ok).toBe("OK");
      expect(dict.common.cancel).toBe("Cancelar");
      expect(dict.errors.validation).toBe("Dados inválidos fornecidos");
    });
  });

  describe("getTranslation", () => {
    it("should get nested translation", () => {
      const translation = getTranslation("en", "common.save");
      expect(translation).toBe("Save");
    });

    it("should get Portuguese translation", () => {
      const translation = getTranslation("pt-BR", "common.save");
      expect(translation).toBe("Salvar");
    });

    it("should get error translation", () => {
      const translation = getTranslation("en", "errors.not_found");
      expect(translation).toBe("Resource not found");
    });

    it("should get project translation", () => {
      const translation = getTranslation("pt-BR", "project.visibility_public");
      expect(translation).toBe("Público");
    });

    it("should fallback to key for missing translation", () => {
      const translation = getTranslation("en", "nonexistent.key" as any);
      expect(translation).toBe("nonexistent.key");
    });

    it("should fallback to key for missing section", () => {
      const translation = getTranslation("en", "missing.section" as any);
      expect(translation).toBe("missing.section");
    });
  });

  describe("t function", () => {
    it("should translate with default locale", () => {
      const translation = t("common.delete");
      expect(translation).toBe("Delete"); // English is default
    });

    it("should translate with specified locale", () => {
      const translation = t("common.delete", "pt-BR");
      expect(translation).toBe("Excluir");
    });

    it("should handle complex keys", () => {
      const translation = t("billing.status_past_due", "pt-BR");
      expect(translation).toBe("Em atraso");
    });
  });

  describe("isValidLocale", () => {
    it("should validate supported locales", () => {
      expect(isValidLocale("en")).toBe(true);
      expect(isValidLocale("pt-BR")).toBe(true);
    });

    it("should reject unsupported locales", () => {
      expect(isValidLocale("fr")).toBe(false);
      expect(isValidLocale("es")).toBe(false);
      expect(isValidLocale("pt")).toBe(false);
      expect(isValidLocale("")).toBe(false);
    });
  });

  describe("getBestLocale", () => {
    it("should return exact match", () => {
      const best = getBestLocale(["pt-BR", "en"]);
      expect(best).toBe("pt-BR");
    });

    it("should return first supported locale", () => {
      const best = getBestLocale(["fr", "en", "pt-BR"]);
      expect(best).toBe("en");
    });

    it("should match language part for Portuguese", () => {
      const best = getBestLocale(["pt", "fr"]);
      expect(best).toBe("pt-BR");
    });

    it("should match language part for English", () => {
      const best = getBestLocale(["en-US", "fr"]);
      expect(best).toBe("en");
    });

    it("should fallback to default locale", () => {
      const best = getBestLocale(["fr", "de", "es"]);
      expect(best).toBe(DEFAULT_LOCALE);
    });

    it("should handle empty array", () => {
      const best = getBestLocale([]);
      expect(best).toBe(DEFAULT_LOCALE);
    });
  });

  describe("dictionary structure", () => {
    it("should have consistent structure between locales", () => {
      const enKeys = Object.keys(en);
      const ptKeys = Object.keys(ptBR);
      expect(enKeys.sort()).toEqual(ptKeys.sort());

      // Check nested keys for common section
      const enCommonKeys = Object.keys(en.common);
      const ptCommonKeys = Object.keys(ptBR.common);
      expect(enCommonKeys.sort()).toEqual(ptCommonKeys.sort());

      // Check nested keys for errors section
      const enErrorKeys = Object.keys(en.errors);
      const ptErrorKeys = Object.keys(ptBR.errors);
      expect(enErrorKeys.sort()).toEqual(ptErrorKeys.sort());
    });

    it("should have all required sections", () => {
      const requiredSections = [
        "common",
        "project", 
        "segment",
        "prompt",
        "validator",
        "profile",
        "billing",
        "errors"
      ];

      for (const section of requiredSections) {
        expect(en).toHaveProperty(section);
        expect(ptBR).toHaveProperty(section);
      }
    });
  });
});
