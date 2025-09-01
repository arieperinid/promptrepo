/**
 * Zod validation middleware
 */
import { createMiddleware } from 'hono/factory';
import { z } from 'zod';
import { validationError } from '@promptrepo/shared';
import type { AppContext } from '../types/context';

/**
 * Validate request body against Zod schema
 */
export const validateBody = <T extends z.ZodTypeAny>(schema: T) => {
  return createMiddleware<AppContext>(async (c, next) => {
    try {
      const body = await c.req.json();
      const result = schema.safeParse(body);
      
      if (!result.success) {
        const errors = result.error.errors.map(err => ({
          path: err.path.join('.'),
          message: err.message,
          code: err.code,
        }));
        
        throw validationError('Invalid request body', { errors });
      }
      
      // Store validated data in context for use in handlers
      c.set('validatedBody', result.data);
      await next();
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw validationError('Invalid JSON in request body');
      }
      throw error;
    }
  });
};

/**
 * Validate query parameters against Zod schema
 */
export const validateQuery = <T extends z.ZodTypeAny>(schema: T) => {
  return createMiddleware<AppContext>(async (c, next) => {
    const query = c.req.query();
    const result = schema.safeParse(query);
    
    if (!result.success) {
      const errors = result.error.errors.map(err => ({
        path: err.path.join('.'),
        message: err.message,
        code: err.code,
      }));
      
      throw validationError('Invalid query parameters', { errors });
    }
    
    // Store validated data in context for use in handlers
    c.set('validatedQuery', result.data);
    await next();
  });
};
