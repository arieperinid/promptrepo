import { Redis } from "@upstash/redis";
import { getEnv } from "./env";

let _redisClient: Redis | null = null;

/**
 * Get or create Upstash Redis client
 * Uses REST API for serverless compatibility
 */
export function getRedisClient(): Redis {
    if (!_redisClient) {
        const env = getEnv();

        _redisClient = new Redis({
            url: env.UPSTASH_REDIS_REST_URL,
            token: env.UPSTASH_REDIS_REST_TOKEN,
        });
    }

    return _redisClient;
}

/**
 * Simple rate limiting helper
 * TODO: Implement actual sliding window rate limiting logic
 * 
 * @param key - Unique identifier for rate limit (e.g., user ID, IP)
 * @param limit - Maximum number of requests allowed
 * @param window - Time window in seconds
 * @returns Promise<boolean> - true if request is allowed, false if rate limited
 */
export async function rateLimit(key: string, limit: number, window: number): Promise<boolean> {
    // Mock implementation - always returns true for now
    // In real implementation, this would:
    // 1. Get current count from Redis for the key
    // 2. Check if count exceeds limit within window
    // 3. Increment counter with expiration
    // 4. Return true/false based on limit

    console.log(`Rate limit check: ${key}, limit: ${limit}, window: ${window}s`);

    // TODO: Replace with actual Redis-based rate limiting
    return true;
}

/**
 * Cache helper functions
 * TODO: Implement caching utilities
 */
export interface CacheOptions {
    ttl?: number; // Time to live in seconds
}

/**
 * Get value from cache
 */
export async function cacheGet<T>(key: string): Promise<T | null> {
    try {
        const redis = getRedisClient();
        const value = await redis.get(key);
        return value as T | null;
    } catch (error) {
        console.error("Cache get error:", error);
        return null;
    }
}

/**
 * Set value in cache
 */
export async function cacheSet<T>(key: string, value: T, options: CacheOptions = {}): Promise<void> {
    try {
        const redis = getRedisClient();

        if (options.ttl) {
            await redis.setex(key, options.ttl, JSON.stringify(value));
        } else {
            await redis.set(key, JSON.stringify(value));
        }
    } catch (error) {
        console.error("Cache set error:", error);
    }
}

/**
 * Delete value from cache
 */
export async function cacheDel(key: string): Promise<void> {
    try {
        const redis = getRedisClient();
        await redis.del(key);
    } catch (error) {
        console.error("Cache delete error:", error);
    }
}
