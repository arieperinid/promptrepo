/**
 * Test types and utilities
 */

// Mock types for Supabase responses
export interface MockPostgrestResponse<T> {
  data: T;
  error: null;
  count?: number;
  status?: number;
  statusText?: string;
}

export interface MockPostgrestError {
  message: string;
  code: string;
  details?: string;
  hint?: string;
  name?: string;
}

export interface MockPostgrestErrorResponse {
  data: null;
  error: MockPostgrestError;
  count?: number;
  status?: number;
  statusText?: string;
}

// API Response types
export interface ApiSuccessResponse<T = any> {
  ok: true;
  data: T;
}

export interface ApiErrorResponse {
  ok: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
}

export type ApiResponse<T = any> = ApiSuccessResponse<T> | ApiErrorResponse;
