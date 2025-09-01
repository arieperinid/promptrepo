/**
 * Result type for error handling without exceptions
 * 
 * Provides a functional approach to error handling, making errors explicit
 * in the type system and avoiding the need for try/catch blocks.
 */

export type Result<T, E = Error> = Readonly<
  | { ok: true; value: T }
  | { ok: false; error: E }
>;

/**
 * Create a successful result
 */
export function ok<T>(value: T): Result<T, never> {
  return { ok: true, value } as const;
}

/**
 * Create an error result
 */
export function err<E>(error: E): Result<never, E> {
  return { ok: false, error } as const;
}

/**
 * Type guard to check if result is successful
 */
export function isOk<T, E>(result: Result<T, E>): result is { ok: true; value: T } {
  return result.ok;
}

/**
 * Type guard to check if result is an error
 */
export function isErr<T, E>(result: Result<T, E>): result is { ok: false; error: E } {
  return !result.ok;
}

/**
 * Unwrap a result, throwing if it's an error
 * Use with caution - prefer explicit error handling
 */
export function unwrap<T, E>(result: Result<T, E>): T {
  if (result.ok) {
    return result.value;
  }
  
  if (result.error instanceof Error) {
    throw result.error;
  }
  
  throw new Error(`Unwrap failed: ${String(result.error)}`);
}

/**
 * Unwrap a result with a default value if it's an error
 */
export function unwrapOr<T, E>(result: Result<T, E>, defaultValue: T): T {
  return result.ok ? result.value : defaultValue;
}

/**
 * Map over the success value of a result
 */
export function map<T, U, E>(
  result: Result<T, E>,
  fn: (value: T) => U
): Result<U, E> {
  return result.ok ? ok(fn(result.value)) : result;
}

/**
 * Map over the error value of a result
 */
export function mapErr<T, E, F>(
  result: Result<T, E>,
  fn: (error: E) => F
): Result<T, F> {
  return result.ok ? result : err(fn(result.error));
}

/**
 * Chain operations that return Results
 */
export function andThen<T, U, E>(
  result: Result<T, E>,
  fn: (value: T) => Result<U, E>
): Result<U, E> {
  return result.ok ? fn(result.value) : result;
}

/**
 * Combine multiple results into a single result with an array of values
 * If any result is an error, return the first error
 */
export function combine<T, E>(results: Result<T, E>[]): Result<T[], E> {
  const values: T[] = [];
  
  for (const result of results) {
    if (!result.ok) {
      return result;
    }
    values.push(result.value);
  }
  
  return ok(values);
}

/**
 * Convert a Promise to a Result, catching any thrown errors
 */
export async function fromPromise<T>(
  promise: Promise<T>
): Promise<Result<T, Error>> {
  try {
    const value = await promise;
    return ok(value);
  } catch (error) {
    return err(error instanceof Error ? error : new Error(String(error)));
  }
}

/**
 * Convert a function that might throw to a Result
 */
export function fromThrowable<T, Args extends unknown[]>(
  fn: (...args: Args) => T
): (...args: Args) => Result<T, Error> {
  return (...args: Args) => {
    try {
      const value = fn(...args);
      return ok(value);
    } catch (error) {
      return err(error instanceof Error ? error : new Error(String(error)));
    }
  };
}
