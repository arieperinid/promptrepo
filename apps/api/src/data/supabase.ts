/**
 * Supabase client utilities for data operations
 */
import { createClientAnon, createClientService } from '@promptrepo/shared';

/**
 * Create authenticated Supabase client for a user
 * This ensures RLS policies are applied correctly
 */
export function createUserClient(token: string) {
  const client = createClientAnon();
  // Set the session manually for RLS to work
  client.auth.setSession({
    access_token: token,
    refresh_token: '',
  } as any);
  return client;
}

/**
 * Get service client for admin operations
 */
export function getServiceClient() {
  return createClientService();
}

/**
 * Convert Supabase error to standard error info
 */
export function mapSupabaseError(error: any): { code: string; message: string } {
  if (!error) return { code: 'INTERNAL', message: 'Unknown error' };
  
  // Map common Supabase error codes
  if (error.code === 'PGRST116') {
    return { code: 'NOT_FOUND', message: 'Resource not found' };
  }
  
  if (error.code === '23505') {
    return { code: 'CONFLICT', message: 'Resource already exists' };
  }
  
  if (error.code === '23503') {
    return { code: 'VALIDATION_ERROR', message: 'Invalid reference' };
  }
  
  if (error.code === '42501') {
    return { code: 'FORBIDDEN', message: 'Access denied' };
  }
  
  return { 
    code: 'INTERNAL', 
    message: error.message || 'Database operation failed' 
  };
}
