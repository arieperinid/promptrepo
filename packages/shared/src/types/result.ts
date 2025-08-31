/**
 * Result type for better error handling
 */
export type Result<T, E = Error> = 
  | { ok: true; data: T }
  | { ok: false; error: E };

/**
 * Create a successful result
 */
export const Ok = <T>(data: T): Result<T> => ({
  ok: true,
  data,
});

/**
 * Create an error result  
 */
export const Err = <E = Error>(error: E): Result<never, E> => ({
  ok: false,
  error,
});

/**
 * Type guard to check if result is successful
 */
export const isOk = <T, E>(result: Result<T, E>): result is { ok: true; data: T } => {
  return result.ok;
};

/**
 * Type guard to check if result is an error
 */
export const isErr = <T, E>(result: Result<T, E>): result is { ok: false; error: E } => {
  return !result.ok;
};
