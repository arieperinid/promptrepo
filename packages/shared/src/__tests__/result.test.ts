import { describe, it, expect } from "vitest";
import { 
  ok, 
  err, 
  isOk, 
  isErr, 
  unwrap, 
  unwrapOr, 
  map, 
  mapErr, 
  andThen, 
  combine, 
  fromPromise, 
  fromThrowable 
} from "../result";

describe("Result", () => {
  describe("ok and err constructors", () => {
    it("should create successful result", () => {
      const result = ok("success");
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value).toBe("success");
      }
    });

    it("should create error result", () => {
      const error = new Error("failure");
      const result = err(error);
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error).toBe(error);
      }
    });
  });

  describe("type guards", () => {
    it("should identify ok results", () => {
      const result = ok("success");
      expect(isOk(result)).toBe(true);
      expect(isErr(result)).toBe(false);
    });

    it("should identify error results", () => {
      const result = err(new Error("failure"));
      expect(isOk(result)).toBe(false);
      expect(isErr(result)).toBe(true);
    });
  });

  describe("unwrap", () => {
    it("should unwrap successful result", () => {
      const result = ok("success");
      expect(unwrap(result)).toBe("success");
    });

    it("should throw on error result", () => {
      const error = new Error("failure");
      const result = err(error);
      expect(() => unwrap(result)).toThrow("failure");
    });

    it("should throw with string error", () => {
      const result = err("string error");
      expect(() => unwrap(result)).toThrow("Unwrap failed: string error");
    });
  });

  describe("unwrapOr", () => {
    it("should return value for successful result", () => {
      const result = ok("success");
      expect(unwrapOr(result, "default")).toBe("success");
    });

    it("should return default for error result", () => {
      const result = err(new Error("failure"));
      expect(unwrapOr(result, "default")).toBe("default");
    });
  });

  describe("map", () => {
    it("should map successful result", () => {
      const result = ok(5);
      const mapped = map(result, (x) => x * 2);
      expect(isOk(mapped)).toBe(true);
      if (isOk(mapped)) {
        expect(mapped.value).toBe(10);
      }
    });

    it("should not map error result", () => {
      const error = new Error("failure");
      const result = err(error);
      const mapped = map(result, (x) => x * 2);
      expect(isErr(mapped)).toBe(true);
      if (isErr(mapped)) {
        expect(mapped.error).toBe(error);
      }
    });
  });

  describe("mapErr", () => {
    it("should not map successful result", () => {
      const result = ok("success");
      const mapped = mapErr(result, (err) => new Error(`Mapped: ${err}`));
      expect(isOk(mapped)).toBe(true);
      if (isOk(mapped)) {
        expect(mapped.value).toBe("success");
      }
    });

    it("should map error result", () => {
      const result = err("original error");
      const mapped = mapErr(result, (err) => new Error(`Mapped: ${err}`));
      expect(isErr(mapped)).toBe(true);
      if (isErr(mapped)) {
        expect(mapped.error.message).toBe("Mapped: original error");
      }
    });
  });

  describe("andThen", () => {
    it("should chain successful results", () => {
      const result = ok(5);
      const chained = andThen(result, (x) => ok(x * 2));
      expect(isOk(chained)).toBe(true);
      if (isOk(chained)) {
        expect(chained.value).toBe(10);
      }
    });

    it("should not chain error results", () => {
      const error = new Error("failure");
      const result = err(error);
      const chained = andThen(result, (x) => ok(x * 2));
      expect(isErr(chained)).toBe(true);
      if (isErr(chained)) {
        expect(chained.error).toBe(error);
      }
    });

    it("should propagate error from chained function", () => {
      const result = ok(5);
      const chainedError = new Error("chained error");
      const chained = andThen(result, () => err(chainedError));
      expect(isErr(chained)).toBe(true);
      if (isErr(chained)) {
        expect(chained.error).toBe(chainedError);
      }
    });
  });

  describe("combine", () => {
    it("should combine successful results", () => {
      const results = [ok(1), ok(2), ok(3)];
      const combined = combine(results);
      expect(isOk(combined)).toBe(true);
      if (isOk(combined)) {
        expect(combined.value).toEqual([1, 2, 3]);
      }
    });

    it("should return first error", () => {
      const error1 = new Error("error1");
      const error2 = new Error("error2");
      const results = [ok(1), err(error1), err(error2)];
      const combined = combine(results);
      expect(isErr(combined)).toBe(true);
      if (isErr(combined)) {
        expect(combined.error).toBe(error1);
      }
    });

    it("should handle empty array", () => {
      const results: never[] = [];
      const combined = combine(results);
      expect(isOk(combined)).toBe(true);
      if (isOk(combined)) {
        expect(combined.value).toEqual([]);
      }
    });
  });

  describe("fromPromise", () => {
    it("should convert resolved promise to ok result", async () => {
      const promise = Promise.resolve("success");
      const result = await fromPromise(promise);
      expect(isOk(result)).toBe(true);
      if (isOk(result)) {
        expect(result.value).toBe("success");
      }
    });

    it("should convert rejected promise to error result", async () => {
      const error = new Error("failure");
      const promise = Promise.reject(error);
      const result = await fromPromise(promise);
      expect(isErr(result)).toBe(true);
      if (isErr(result)) {
        expect(result.error).toBe(error);
      }
    });

    it("should convert rejected string to error result", async () => {
      const promise = Promise.reject("string error");
      const result = await fromPromise(promise);
      expect(isErr(result)).toBe(true);
      if (isErr(result)) {
        expect(result.error.message).toBe("string error");
      }
    });
  });

  describe("fromThrowable", () => {
    it("should convert successful function to ok result", () => {
      const fn = (x: number) => x * 2;
      const safeFn = fromThrowable(fn);
      const result = safeFn(5);
      expect(isOk(result)).toBe(true);
      if (isOk(result)) {
        expect(result.value).toBe(10);
      }
    });

    it("should convert throwing function to error result", () => {
      const error = new Error("function error");
      const fn = () => {
        throw error;
      };
      const safeFn = fromThrowable(fn);
      const result = safeFn();
      expect(isErr(result)).toBe(true);
      if (isErr(result)) {
        expect(result.error).toBe(error);
      }
    });

    it("should convert throwing string to error result", () => {
      const fn = () => {
        throw "string error";
      };
      const safeFn = fromThrowable(fn);
      const result = safeFn();
      expect(isErr(result)).toBe(true);
      if (isErr(result)) {
        expect(result.error.message).toBe("string error");
      }
    });
  });
});
