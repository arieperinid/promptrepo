/**
 * Rate limiting middleware using Upstash Redis
 */
import { createMiddleware } from 'hono/factory';
import { getRedisClient, rateLimitError } from '@promptrepo/shared';
import type { AppContext } from '../types/context';

/**
 * Rate limit for public endpoints (by IP)
 */
export const rateLimitPublic = (limit: number = 60, windowSeconds: number = 60) => {
  return createMiddleware<AppContext>(async (c, next) => {
    const ip = c.req.header('x-forwarded-for') || 
               c.req.header('x-real-ip') || 
               'unknown';
    
    const key = `ratelimit:public:${ip}`;
    
    try {
      const redis = getRedisClient();
      const current = await redis.incr(key);
      
      if (current === 1) {
        // First request - set expiration
        await redis.expire(key, windowSeconds);
      }
      
      if (current > limit) {
        throw rateLimitError(`Too many requests. Limit: ${limit} per ${windowSeconds}s`);
      }
      
      // Add rate limit headers
      c.header('x-ratelimit-limit', limit.toString());
      c.header('x-ratelimit-remaining', Math.max(0, limit - current).toString());
      c.header('x-ratelimit-reset', (Date.now() + windowSeconds * 1000).toString());
      
      await next();
    } catch (error) {
      if (error instanceof Error && error.message.includes('Too many requests')) {
        throw error;
      }
      
      // Redis error - log but don't block request
      // eslint-disable-next-line no-console
      console.error('Rate limit Redis error:', error);
      await next();
    }
  });
};

/**
 * Rate limit for authenticated endpoints (by user ID)
 */
export const rateLimitAuthed = (limit: number = 120, windowSeconds: number = 60) => {
  return createMiddleware<AppContext>(async (c, next) => {
    const auth = c.get('auth');
    
    if (!auth.user) {
      // No user - skip rate limiting (should be handled by requireAuth)
      await next();
      return;
    }
    
    const key = `ratelimit:user:${auth.user.id}`;
    
    try {
      const redis = getRedisClient();
      const current = await redis.incr(key);
      
      if (current === 1) {
        // First request - set expiration
        await redis.expire(key, windowSeconds);
      }
      
      if (current > limit) {
        throw rateLimitError(`Too many requests. Limit: ${limit} per ${windowSeconds}s`);
      }
      
      // Add rate limit headers
      c.header('x-ratelimit-limit', limit.toString());
      c.header('x-ratelimit-remaining', Math.max(0, limit - current).toString());
      c.header('x-ratelimit-reset', (Date.now() + windowSeconds * 1000).toString());
      
      await next();
    } catch (error) {
      if (error instanceof Error && error.message.includes('Too many requests')) {
        throw error;
      }
      
      // Redis error - log but don't block request
      // eslint-disable-next-line no-console
      console.error('Rate limit Redis error:', error);
      await next();
    }
  });
};
