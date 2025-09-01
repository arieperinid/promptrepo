/**
 * Standardized error handling for PromptRepo
 * 
 * Provides a consistent error structure and catalog of common error types
 * with i18n support for user-facing messages.
 */

/**
 * Error codes for different types of errors
 */
export const ERROR_CODE = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  CONFLICT: 'CONFLICT',
  RATE_LIMIT: 'RATE_LIMIT',
  INTERNAL: 'INTERNAL',
} as const;

export type ErrorCode = typeof ERROR_CODE[keyof typeof ERROR_CODE];

/**
 * Structured error with code, message, and optional details
 */
export interface AppError {
  readonly code: ErrorCode;
  readonly message: string;
  readonly details?: Record<string, unknown>;
  readonly i18nKey?: string;
}

/**
 * Create a validation error
 */
export function validationError(
  message: string,
  details?: Record<string, unknown>
): AppError {
  return {
    code: ERROR_CODE.VALIDATION_ERROR,
    message,
    i18nKey: 'errors.validation',
    ...(details !== undefined && { details }),
  };
}

/**
 * Create a not found error
 */
export function notFoundError(
  resource: string,
  id?: string
): AppError {
  return {
    code: ERROR_CODE.NOT_FOUND,
    message: `${resource}${id ? ` with id ${id}` : ''} not found`,
    details: { resource, id },
    i18nKey: 'errors.not_found',
  };
}

/**
 * Create an unauthorized error
 */
export function unauthorizedError(
  message: string = 'Authentication required'
): AppError {
  return {
    code: ERROR_CODE.UNAUTHORIZED,
    message,
    i18nKey: 'errors.unauthorized',
  };
}

/**
 * Create a forbidden error
 */
export function forbiddenError(
  message: string = 'Insufficient permissions'
): AppError {
  return {
    code: ERROR_CODE.FORBIDDEN,
    message,
    i18nKey: 'errors.forbidden',
  };
}

/**
 * Create a conflict error
 */
export function conflictError(
  message: string,
  details?: Record<string, unknown>
): AppError {
  return {
    code: ERROR_CODE.CONFLICT,
    message,
    i18nKey: 'errors.conflict',
    ...(details !== undefined && { details }),
  };
}

/**
 * Create a rate limit error
 */
export function rateLimitError(
  message: string = 'Too many requests'
): AppError {
  return {
    code: ERROR_CODE.RATE_LIMIT,
    message,
    i18nKey: 'errors.rate_limit',
  };
}

/**
 * Create an internal server error
 */
export function internalError(
  message: string = 'Internal server error',
  details?: Record<string, unknown>
): AppError {
  return {
    code: ERROR_CODE.INTERNAL,
    message,
    i18nKey: 'errors.internal',
    ...(details !== undefined && { details }),
  };
}

/**
 * Convert an unknown error to an AppError
 */
export function toAppError(error: unknown): AppError {
  if (isAppError(error)) {
    return error;
  }
  
  if (error instanceof Error) {
    return internalError(error.message);
  }
  
  return internalError(String(error));
}

/**
 * Type guard to check if an error is an AppError
 */
export function isAppError(error: unknown): error is AppError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    'message' in error &&
    typeof (error as AppError).code === 'string' &&
    typeof (error as AppError).message === 'string'
  );
}

/**
 * Get HTTP status code for an error code
 */
export function getHttpStatusCode(errorCode: ErrorCode): number {
  switch (errorCode) {
    case ERROR_CODE.VALIDATION_ERROR:
      return 400;
    case ERROR_CODE.UNAUTHORIZED:
      return 401;
    case ERROR_CODE.FORBIDDEN:
      return 403;
    case ERROR_CODE.NOT_FOUND:
      return 404;
    case ERROR_CODE.CONFLICT:
      return 409;
    case ERROR_CODE.RATE_LIMIT:
      return 429;
    case ERROR_CODE.INTERNAL:
    default:
      return 500;
  }
}

/**
 * Format an error for logging (without sensitive details)
 */
export function formatErrorForLogging(error: AppError): Record<string, unknown> {
  return {
    code: error.code,
    message: error.message,
    i18nKey: error.i18nKey,
    // Only include non-sensitive details
    details: error.details ? Object.keys(error.details) : undefined,
  };
}
