import { describe, it, expect } from "vitest";
import { rateLimit } from "../redis";

describe("Redis utilities", () => {
    it("should have rateLimit function", () => {
        expect(typeof rateLimit).toBe("function");
    });

    it("should return true for rate limit check (mock)", async () => {
        const result = await rateLimit("test-key", 10, 60);
        expect(result).toBe(true);
    });
});
