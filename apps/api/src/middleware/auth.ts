/**
 * Authentication middleware using Supabase
 */
import { createMiddleware } from 'hono/factory';
import { createClientService } from '@promptrepo/shared';
import { unauthorizedError, forbiddenError } from '@promptrepo/shared';
import type { AppContext, AuthContext } from '../types/context';

/**
 * Auth middleware - validates Bearer token and sets auth context
 */
export const auth = () => {
  return createMiddleware<AppContext>(async (c, next) => {
    const authHeader = c.req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // No auth - set anonymous context
      c.set('auth', { user: null, role: 'anonymous' });
      await next();
      return;
    }
    
    const token = authHeader.slice(7); // Remove 'Bearer '
    
    try {
      // Validate token with Supabase service client
      const supabase = createClientService();
      const { data: { user }, error } = await supabase.auth.getUser(token);
      
      if (error || !user) {
        c.set('auth', { user: null, role: 'anonymous' });
        await next();
        return;
      }
      
      // Get user role from profiles table
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
      
      if (profileError || !profile) {
        // User exists but no profile - default to user role
        c.set('auth', { 
          user: { id: user.id }, 
          role: 'user' 
        });
      } else {
        c.set('auth', { 
          user: { id: user.id }, 
          role: profile.role as 'user' | 'pro' | 'admin'
        });
      }
      
      await next();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Auth middleware error:', error);
      c.set('auth', { user: null, role: 'anonymous' });
      await next();
    }
  });
};

/**
 * Require authentication - throws if user not authenticated
 */
export const requireAuth = () => {
  return createMiddleware<AppContext>(async (c, next) => {
    const auth = c.get('auth');
    
    if (!auth.user) {
      throw unauthorizedError('Authentication required');
    }
    
    await next();
  });
};

/**
 * Require specific role - throws if user doesn't have required role
 */
export const requireRole = (requiredRole: 'admin' | 'pro') => {
  return createMiddleware<AppContext>(async (c, next) => {
    const auth = c.get('auth');
    
    if (!auth.user) {
      throw unauthorizedError('Authentication required');
    }
    
    if (requiredRole === 'admin' && auth.role !== 'admin') {
      throw forbiddenError('Admin role required');
    }
    
    if (requiredRole === 'pro' && !['pro', 'admin'].includes(auth.role)) {
      throw forbiddenError('Pro role or higher required');
    }
    
    await next();
  });
};
