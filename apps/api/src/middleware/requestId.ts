/**
 * Request ID middleware - generates unique request ID for tracing
 */
import { createMiddleware } from 'hono/factory';
import type { AppContext } from '../types/context';

export const requestId = () => {
  return createMiddleware<AppContext>(async (c, next) => {
    const requestId = crypto.randomUUID();
    c.set('requestId', requestId);
    c.header('x-request-id', requestId);
    await next();
  });
};
