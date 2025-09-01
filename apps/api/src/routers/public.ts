/**
 * Public API routes (no authentication required)
 */
import { Hono } from 'hono';
import { z } from 'zod';
import { rateLimitPublic } from '../middleware/rateLimit';
import { validateQuery } from '../middleware/validate';
import {
    listPublicProjects,
    getPublicProject,
    getPublicSegments,
    getPublicPrompts,
    getPublicProjectHierarchy
} from '../data/public';

import type { AppContext } from '../types/context';

const publicRouter = new Hono<AppContext>();

// Helper to handle result errors
function handleResultError(result: any): never {
    if (result.ok) {
        throw new Error('Expected error result');
    }
    const [code, message] = result.error.message.split(': ', 2);
    throw new Error(`${code}: ${message}`);
}

// Helper to get error code from result
function getErrorCode(result: any): string {
    if (result.ok) {
        return '';
    }
    const [code] = result.error.message.split(': ', 2);
    return code;
}

// Apply rate limiting to all public routes
publicRouter.use('*', rateLimitPublic(60, 60)); // 60 requests per minute

// Query schemas
const PaginationSchema = z.object({
    limit: z.coerce.number().int().min(1).max(100).default(20),
    offset: z.coerce.number().int().min(0).default(0),
});

const ProjectIdSchema = z.object({
    id: z.string().uuid(),
});

/**
 * GET /v1/public/projects
 * List public projects with pagination
 */
publicRouter.get(
    '/projects',
    validateQuery(PaginationSchema),
    async (c) => {
        const { limit, offset } = c.get('validatedQuery') as z.infer<typeof PaginationSchema>;

        const result = await listPublicProjects(limit, offset);

        if (!result.ok) {
            handleResultError(result);
        }

        return c.json({
            ok: true,
            data: result.value,
        });
    }
);

/**
 * GET /v1/public/projects/:id
 * Get public project by ID
 */
publicRouter.get('/projects/:id', async (c) => {
    const id = c.req.param('id');

    // Validate UUID format
    if (!z.string().uuid().safeParse(id).success) {
        return c.json({
            ok: false,
            error: {
                code: 'VALIDATION_ERROR',
                message: 'Invalid project ID format',
            },
        }, 400);
    }

    const result = await getPublicProject(id);

    if (!result.ok) {
        const code = getErrorCode(result);

        if (code === 'NOT_FOUND') {
            return c.json({
                ok: false,
                error: {
                    code: 'NOT_FOUND',
                    message: 'Project not found or not public',
                },
            }, 404);
        }

        handleResultError(result);
    }

    return c.json({
        ok: true,
        data: result.value,
    });
});

/**
 * GET /v1/public/projects/:id/segments
 * Get public segments for a project
 */
publicRouter.get('/projects/:id/segments', async (c) => {
    const id = c.req.param('id');

    // Validate UUID format
    if (!z.string().uuid().safeParse(id).success) {
        return c.json({
            ok: false,
            error: {
                code: 'VALIDATION_ERROR',
                message: 'Invalid project ID format',
            },
        }, 400);
    }

    const result = await getPublicSegments(id);

    if (!result.ok) {
        handleResultError(result);
    }

    return c.json({
        ok: true,
        data: result.value,
    });
});

/**
 * GET /v1/public/segments/:id/prompts
 * Get public prompts for a segment
 */
publicRouter.get('/segments/:id/prompts', async (c) => {
    const id = c.req.param('id');

    // Validate UUID format
    if (!z.string().uuid().safeParse(id).success) {
        return c.json({
            ok: false,
            error: {
                code: 'VALIDATION_ERROR',
                message: 'Invalid segment ID format',
            },
        }, 400);
    }

    const result = await getPublicPrompts(id);

    if (!result.ok) {
        handleResultError(result);
    }

    return c.json({
        ok: true,
        data: result.value,
    });
});

/**
 * GET /v1/public/projects/:id/hierarchy
 * Get full public project hierarchy (project + segments + prompts + validators)
 */
publicRouter.get('/projects/:id/hierarchy', async (c) => {
    const id = c.req.param('id');

    // Validate UUID format
    if (!z.string().uuid().safeParse(id).success) {
        return c.json({
            ok: false,
            error: {
                code: 'VALIDATION_ERROR',
                message: 'Invalid project ID format',
            },
        }, 400);
    }

    const result = await getPublicProjectHierarchy(id);

    if (!result.ok) {
        const code = getErrorCode(result);

        if (code === 'NOT_FOUND') {
            return c.json({
                ok: false,
                error: {
                    code: 'NOT_FOUND',
                    message: 'Project not found or not public',
                },
            }, 404);
        }

        handleResultError(result);
    }

    return c.json({
        ok: true,
        data: result.value,
    });
});

export { publicRouter };
