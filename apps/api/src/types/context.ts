/**
 * Hono context types for the API
 */

export interface AuthUser {
  id: string;
}

export interface AuthContext {
  user: AuthUser | null;
  role: 'anonymous' | 'user' | 'pro' | 'admin';
}

export interface AppContext {
  Variables: {
    auth: AuthContext;
    requestId: string;
    validatedBody?: any;
    validatedQuery?: any;
  };
}
