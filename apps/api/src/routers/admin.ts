/**
 * Admin API routes (admin role required)
 */
import { Hono } from 'hono';
import { z } from 'zod';
import { auth, requireAuth, requireRole } from '../middleware/auth';
import { rateLimitAuthed } from '../middleware/rateLimit';
import { validateQuery } from '../middleware/validate';
import { getServiceClient } from '../data/supabase';
import { isErr } from '@promptrepo/shared';
import type { AppContext } from '../types/context';

const adminRouter = new Hono<AppContext>();

// Apply auth, admin role check, and rate limiting to all admin routes
adminRouter.use('*', auth());
adminRouter.use('*', requireAuth());
adminRouter.use('*', requireRole('admin'));
adminRouter.use('*', rateLimitAuthed(120, 60)); // Same rate limit as regular authenticated routes

// Query schemas
const AdminProjectsQuerySchema = z.object({
  owner_id: z.string().uuid().optional(),
  visibility: z.enum(['private', 'public']).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0),
});

/**
 * GET /v1/admin/projects
 * List all projects with admin filters
 */
adminRouter.get(
  '/projects',
  validateQuery(AdminProjectsQuerySchema),
  async (c) => {
    const { owner_id, visibility, limit, offset } = c.get('validatedQuery') as z.infer<typeof AdminProjectsQuerySchema>;
    
    try {
      const supabase = getServiceClient();
      
      let query = supabase
        .from('projects')
        .select(`
          *,
          profiles!projects_owner_id_fkey (
            handle,
            name,
            role
          )
        `)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);
      
      // Apply filters
      if (owner_id) {
        query = query.eq('owner_id', owner_id);
      }
      
      if (visibility) {
        query = query.eq('visibility', visibility);
      }
      
      const { data, error } = await query;
      
      if (error) {
        throw new Error(`INTERNAL: ${error.message}`);
      }
      
      return c.json({
        ok: true,
        data: data || [],
      });
    } catch (error) {
      const [code, message] = (error as Error).message.split(': ', 2);
      throw new Error(`${code}: ${message}`);
    }
  }
);

/**
 * GET /v1/admin/stats
 * Get platform statistics
 */
adminRouter.get('/stats', async (c) => {
  try {
    const supabase = getServiceClient();
    
    // Get counts for different entities
    const [
      { count: totalProjects },
      { count: publicProjects },
      { count: totalUsers },
      { count: totalSegments },
      { count: totalPrompts },
      { count: totalValidators }
    ] = await Promise.all([
      supabase.from('projects').select('*', { count: 'exact', head: true }),
      supabase.from('projects').select('*', { count: 'exact', head: true }).eq('visibility', 'public'),
      supabase.from('profiles').select('*', { count: 'exact', head: true }),
      supabase.from('segments').select('*', { count: 'exact', head: true }),
      supabase.from('prompts').select('*', { count: 'exact', head: true }),
      supabase.from('validators').select('*', { count: 'exact', head: true }),
    ]);
    
    return c.json({
      ok: true,
      data: {
        projects: {
          total: totalProjects || 0,
          public: publicProjects || 0,
          private: (totalProjects || 0) - (publicProjects || 0),
        },
        users: {
          total: totalUsers || 0,
        },
        content: {
          segments: totalSegments || 0,
          prompts: totalPrompts || 0,
          validators: totalValidators || 0,
        },
      },
    });
  } catch (error) {
    throw new Error(`INTERNAL: Failed to fetch stats - ${error}`);
  }
});

/**
 * GET /v1/admin/users
 * List all users (profiles)
 */
adminRouter.get('/users', async (c) => {
  const limit = Number(c.req.query('limit')) || 20;
  const offset = Number(c.req.query('offset')) || 0;
  
  try {
    const supabase = getServiceClient();
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);
    
    if (error) {
      throw new Error(`INTERNAL: ${error.message}`);
    }
    
    return c.json({
      ok: true,
      data: data || [],
    });
  } catch (error) {
    const [code, message] = (error as Error).message.split(': ', 2);
    throw new Error(`${code}: ${message}`);
  }
});

export { adminRouter };
