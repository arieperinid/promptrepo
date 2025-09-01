import { describe, it, expect } from "vitest";
import {
  ERROR_CODE,
  validationError,
  notFoundError,
  unauthorizedError,
  forbiddenError,
  conflictError,
  rateLimitError,
  internalError,
  toAppError,
  isAppError,
  getHttpStatusCode,
  formatErrorForLogging
} from "../errors";

describe("Errors", () => {
  describe("error constructors", () => {
    it("should create validation error", () => {
      const error = validationError("Invalid input", { field: "name" });
      expect(error.code).toBe(ERROR_CODE.VALIDATION_ERROR);
      expect(error.message).toBe("Invalid input");
      expect(error.details).toEqual({ field: "name" });
      expect(error.i18nKey).toBe("errors.validation");
    });

    it("should create not found error", () => {
      const error = notFoundError("User", "123");
      expect(error.code).toBe(ERROR_CODE.NOT_FOUND);
      expect(error.message).toBe("User with id 123 not found");
      expect(error.details).toEqual({ resource: "User", id: "123" });
      expect(error.i18nKey).toBe("errors.not_found");
    });

    it("should create not found error without id", () => {
      const error = notFoundError("User");
      expect(error.message).toBe("User not found");
      expect(error.details).toEqual({ resource: "User", id: undefined });
    });

    it("should create unauthorized error", () => {
      const error = unauthorizedError();
      expect(error.code).toBe(ERROR_CODE.UNAUTHORIZED);
      expect(error.message).toBe("Authentication required");
      expect(error.i18nKey).toBe("errors.unauthorized");
    });

    it("should create unauthorized error with custom message", () => {
      const error = unauthorizedError("Invalid token");
      expect(error.message).toBe("Invalid token");
    });

    it("should create forbidden error", () => {
      const error = forbiddenError();
      expect(error.code).toBe(ERROR_CODE.FORBIDDEN);
      expect(error.message).toBe("Insufficient permissions");
      expect(error.i18nKey).toBe("errors.forbidden");
    });

    it("should create conflict error", () => {
      const error = conflictError("Resource already exists", { name: "duplicate" });
      expect(error.code).toBe(ERROR_CODE.CONFLICT);
      expect(error.message).toBe("Resource already exists");
      expect(error.details).toEqual({ name: "duplicate" });
      expect(error.i18nKey).toBe("errors.conflict");
    });

    it("should create rate limit error", () => {
      const error = rateLimitError();
      expect(error.code).toBe(ERROR_CODE.RATE_LIMIT);
      expect(error.message).toBe("Too many requests");
      expect(error.i18nKey).toBe("errors.rate_limit");
    });

    it("should create internal error", () => {
      const error = internalError();
      expect(error.code).toBe(ERROR_CODE.INTERNAL);
      expect(error.message).toBe("Internal server error");
      expect(error.i18nKey).toBe("errors.internal");
    });

    it("should create internal error with details", () => {
      const error = internalError("Database connection failed", { database: "postgres" });
      expect(error.message).toBe("Database connection failed");
      expect(error.details).toEqual({ database: "postgres" });
    });
  });

  describe("toAppError", () => {
    it("should return AppError as is", () => {
      const appError = validationError("Invalid input");
      const result = toAppError(appError);
      expect(result).toBe(appError);
    });

    it("should convert Error to AppError", () => {
      const error = new Error("Something went wrong");
      const result = toAppError(error);
      expect(result.code).toBe(ERROR_CODE.INTERNAL);
      expect(result.message).toBe("Something went wrong");
    });

    it("should convert string to AppError", () => {
      const result = toAppError("String error");
      expect(result.code).toBe(ERROR_CODE.INTERNAL);
      expect(result.message).toBe("String error");
    });

    it("should convert unknown to AppError", () => {
      const result = toAppError({ unknown: "object" });
      expect(result.code).toBe(ERROR_CODE.INTERNAL);
      expect(result.message).toBe("[object Object]");
    });
  });

  describe("isAppError", () => {
    it("should identify AppError", () => {
      const appError = validationError("Invalid input");
      expect(isAppError(appError)).toBe(true);
    });

    it("should reject regular Error", () => {
      const error = new Error("Regular error");
      expect(isAppError(error)).toBe(false);
    });

    it("should reject string", () => {
      expect(isAppError("string")).toBe(false);
    });

    it("should reject null", () => {
      expect(isAppError(null)).toBe(false);
    });

    it("should reject object without required fields", () => {
      expect(isAppError({ code: "TEST" })).toBe(false);
      expect(isAppError({ message: "test" })).toBe(false);
    });

    it("should reject object with wrong field types", () => {
      expect(isAppError({ code: 123, message: "test" })).toBe(false);
      expect(isAppError({ code: "TEST", message: 123 })).toBe(false);
    });
  });

  describe("getHttpStatusCode", () => {
    it("should return correct status codes", () => {
      expect(getHttpStatusCode(ERROR_CODE.VALIDATION_ERROR)).toBe(400);
      expect(getHttpStatusCode(ERROR_CODE.UNAUTHORIZED)).toBe(401);
      expect(getHttpStatusCode(ERROR_CODE.FORBIDDEN)).toBe(403);
      expect(getHttpStatusCode(ERROR_CODE.NOT_FOUND)).toBe(404);
      expect(getHttpStatusCode(ERROR_CODE.CONFLICT)).toBe(409);
      expect(getHttpStatusCode(ERROR_CODE.RATE_LIMIT)).toBe(429);
      expect(getHttpStatusCode(ERROR_CODE.INTERNAL)).toBe(500);
    });
  });

  describe("formatErrorForLogging", () => {
    it("should format error without details", () => {
      const error = unauthorizedError("Invalid token");
      const formatted = formatErrorForLogging(error);
      expect(formatted).toEqual({
        code: ERROR_CODE.UNAUTHORIZED,
        message: "Invalid token",
        i18nKey: "errors.unauthorized",
        details: undefined,
      });
    });

    it("should format error with details (keys only)", () => {
      const error = validationError("Invalid input", { 
        field: "name", 
        value: "sensitive-data",
        userId: "123" 
      });
      const formatted = formatErrorForLogging(error);
      expect(formatted).toEqual({
        code: ERROR_CODE.VALIDATION_ERROR,
        message: "Invalid input",
        i18nKey: "errors.validation",
        details: ["field", "value", "userId"],
      });
    });
  });
});
