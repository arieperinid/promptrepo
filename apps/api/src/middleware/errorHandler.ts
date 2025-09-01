/**
 * Global error handler middleware
 */
import { ErrorHandler } from 'hono';
import { 
  toAppError, 
  getHttpStatusCode, 
  formatErrorForLogging,
  type AppError 
} from '@promptrepo/shared';
import type { AppContext } from '../types/context';

export const errorHandler: ErrorHandler<AppContext> = (err, c) => {
  const requestId = c.get('requestId') || 'unknown';
  
  // Convert unknown error to AppError
  const appError = toAppError(err);
  
  // Log error (without sensitive details)
  const logData = {
    requestId,
    method: c.req.method,
    path: c.req.path,
    ...formatErrorForLogging(appError),
  };
  
  // eslint-disable-next-line no-console
  console.error('API Error:', logData);
  
  // Return standardized error response
  const status = getHttpStatusCode(appError.code);
  return c.json({
    ok: false,
    error: {
      code: appError.code,
      message: appError.message,
      ...(appError.details && { details: appError.details }),
    },
  }, status as any);
};
