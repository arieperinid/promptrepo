/**
 * Authenticated API routes
 */
import { Hono } from 'hono';
import { auth, requireAuth } from '../middleware/auth';
import { rateLimitAuthed } from '../middleware/rateLimit';
import { validateBody } from '../middleware/validate';
import {
    CreateProjectDtoSchema,
    UpdateProjectDtoSchema,
    CreateSegmentDtoSchema,
    UpdateSegmentDtoSchema,
    CreatePromptDtoSchema,
    UpdatePromptDtoSchema,
    CreateValidatorDtoSchema,
    UpdateValidatorDtoSchema
} from '@promptrepo/shared';
import {
    listMyProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
} from '../data/projects';
import { createSegment, updateSegment, deleteSegment } from '../data/segments';
import { createPrompt, updatePrompt, deletePrompt } from '../data/prompts';
import { createValidator, updateValidator, deleteValidator } from '../data/validators';
import type { AppContext } from '../types/context';

const appRouter = new Hono<AppContext>();

// Apply auth and rate limiting to all authenticated routes
appRouter.use('*', auth());
appRouter.use('*', requireAuth());
appRouter.use('*', rateLimitAuthed(120, 60)); // 120 requests per minute for authenticated users

// Helper to get auth token from context
function getAuthToken(c: any): string {
    const authHeader = c.req.header('Authorization');
    return authHeader?.slice(7) || ''; // Remove 'Bearer '
}

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

// ============================================================================
// PROJECTS
// ============================================================================

/**
 * GET /v1/projects
 * List projects owned by the authenticated user
 */
appRouter.get('/projects', async (c) => {
    const token = getAuthToken(c);
    const result = await listMyProjects(token);

    if (!result.ok) {
        handleResultError(result);
    }

    return c.json({
        ok: true,
        data: result.value,
    });
});

/**
 * GET /v1/projects/:id
 * Get project by ID (only if user has access via RLS)
 */
appRouter.get('/projects/:id', async (c) => {
    const id = c.req.param('id');
    const token = getAuthToken(c);

    const result = await getProjectById(id, token);

    if (!result.ok) {
        const code = getErrorCode(result);

        if (code === 'NOT_FOUND') {
            return c.json({
                ok: false,
                error: {
                    code: 'NOT_FOUND',
                    message: 'Project not found',
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
 * POST /v1/projects
 * Create new project
 */
appRouter.post(
    '/projects',
    validateBody(CreateProjectDtoSchema),
    async (c) => {
        const dto = c.get('validatedBody');
        const token = getAuthToken(c);

        const result = await createProject(dto, token);

        if (!result.ok) {
            handleResultError(result);
        }

        return c.json({
            ok: true,
            data: result.value,
        }, 201);
    }
);

/**
 * PATCH /v1/projects/:id
 * Update project by ID
 */
appRouter.patch(
    '/projects/:id',
    validateBody(UpdateProjectDtoSchema),
    async (c) => {
        const id = c.req.param('id');
        const dto = c.get('validatedBody');
        const token = getAuthToken(c);

        const result = await updateProject(id, dto, token);

        if (!result.ok) {
            const code = getErrorCode(result);

            if (code === 'NOT_FOUND') {
                return c.json({
                    ok: false,
                    error: {
                        code: 'NOT_FOUND',
                        message: 'Project not found',
                    },
                }, 404);
            }

            handleResultError(result);
        }

        return c.json({
            ok: true,
            data: result.value,
        });
    }
);

/**
 * DELETE /v1/projects/:id
 * Delete project by ID
 */
appRouter.delete('/projects/:id', async (c) => {
    const id = c.req.param('id');
    const token = getAuthToken(c);

    const result = await deleteProject(id, token);

    if (!result.ok) {
        const code = getErrorCode(result);

        if (code === 'NOT_FOUND') {
            return c.json({
                ok: false,
                error: {
                    code: 'NOT_FOUND',
                    message: 'Project not found',
                },
            }, 404);
        }

        handleResultError(result);
    }

    return c.json({
        ok: true,
        data: null,
    });
});

// ============================================================================
// SEGMENTS
// ============================================================================

/**
 * POST /v1/segments
 * Create new segment
 */
appRouter.post(
    '/segments',
    validateBody(CreateSegmentDtoSchema),
    async (c) => {
        const dto = c.get('validatedBody');
        const token = getAuthToken(c);

        const result = await createSegment(dto, token);

        if (!result.ok) {
            handleResultError(result);
        }

        return c.json({
            ok: true,
            data: result.value,
        }, 201);
    }
);

/**
 * PATCH /v1/segments/:id
 * Update segment by ID
 */
appRouter.patch(
    '/segments/:id',
    validateBody(UpdateSegmentDtoSchema),
    async (c) => {
        const id = c.req.param('id');
        const dto = c.get('validatedBody');
        const token = getAuthToken(c);

        const result = await updateSegment(id, dto, token);

        if (!result.ok) {
            const code = getErrorCode(result);

            if (code === 'NOT_FOUND') {
                return c.json({
                    ok: false,
                    error: {
                        code: 'NOT_FOUND',
                        message: 'Segment not found',
                    },
                }, 404);
            }

            handleResultError(result);
        }

        return c.json({
            ok: true,
            data: result.value,
        });
    }
);

/**
 * DELETE /v1/segments/:id
 * Delete segment by ID
 */
appRouter.delete('/segments/:id', async (c) => {
    const id = c.req.param('id');
    const token = getAuthToken(c);

    const result = await deleteSegment(id, token);

    if (!result.ok) {
        const code = getErrorCode(result);

        if (code === 'NOT_FOUND') {
            return c.json({
                ok: false,
                error: {
                    code: 'NOT_FOUND',
                    message: 'Segment not found',
                },
            }, 404);
        }

        handleResultError(result);
    }

    return c.json({
        ok: true,
        data: null,
    });
});

// ============================================================================
// PROMPTS
// ============================================================================

/**
 * POST /v1/prompts
 * Create new prompt
 */
appRouter.post(
    '/prompts',
    validateBody(CreatePromptDtoSchema),
    async (c) => {
        const dto = c.get('validatedBody');
        const token = getAuthToken(c);

        const result = await createPrompt(dto, token);

        if (!result.ok) {
            handleResultError(result);
        }

        return c.json({
            ok: true,
            data: result.value,
        }, 201);
    }
);

/**
 * PATCH /v1/prompts/:id
 * Update prompt by ID
 */
appRouter.patch(
    '/prompts/:id',
    validateBody(UpdatePromptDtoSchema),
    async (c) => {
        const id = c.req.param('id');
        const dto = c.get('validatedBody');
        const token = getAuthToken(c);

        const result = await updatePrompt(id, dto, token);

        if (!result.ok) {
            const code = getErrorCode(result);

            if (code === 'NOT_FOUND') {
                return c.json({
                    ok: false,
                    error: {
                        code: 'NOT_FOUND',
                        message: 'Prompt not found',
                    },
                }, 404);
            }

            handleResultError(result);
        }

        return c.json({
            ok: true,
            data: result.value,
        });
    }
);

/**
 * DELETE /v1/prompts/:id
 * Delete prompt by ID
 */
appRouter.delete('/prompts/:id', async (c) => {
    const id = c.req.param('id');
    const token = getAuthToken(c);

    const result = await deletePrompt(id, token);

    if (!result.ok) {
        const code = getErrorCode(result);

        if (code === 'NOT_FOUND') {
            return c.json({
                ok: false,
                error: {
                    code: 'NOT_FOUND',
                    message: 'Prompt not found',
                },
            }, 404);
        }

        handleResultError(result);
    }

    return c.json({
        ok: true,
        data: null,
    });
});

// ============================================================================
// VALIDATORS
// ============================================================================

/**
 * POST /v1/validators
 * Create new validator
 */
appRouter.post(
    '/validators',
    validateBody(CreateValidatorDtoSchema),
    async (c) => {
        const dto = c.get('validatedBody');
        const token = getAuthToken(c);

        const result = await createValidator(dto, token);

        if (!result.ok) {
            handleResultError(result);
        }

        return c.json({
            ok: true,
            data: result.value,
        }, 201);
    }
);

/**
 * PATCH /v1/validators/:id
 * Update validator by ID
 */
appRouter.patch(
    '/validators/:id',
    validateBody(UpdateValidatorDtoSchema),
    async (c) => {
        const id = c.req.param('id');
        const dto = c.get('validatedBody');
        const token = getAuthToken(c);

        const result = await updateValidator(id, dto, token);

        if (!result.ok) {
            const code = getErrorCode(result);

            if (code === 'NOT_FOUND') {
                return c.json({
                    ok: false,
                    error: {
                        code: 'NOT_FOUND',
                        message: 'Validator not found',
                    },
                }, 404);
            }

            handleResultError(result);
        }

        return c.json({
            ok: true,
            data: result.value,
        });
    }
);

/**
 * DELETE /v1/validators/:id
 * Delete validator by ID
 */
appRouter.delete('/validators/:id', async (c) => {
    const id = c.req.param('id');
    const token = getAuthToken(c);

    const result = await deleteValidator(id, token);

    if (!result.ok) {
        const code = getErrorCode(result);

        if (code === 'NOT_FOUND') {
            return c.json({
                ok: false,
                error: {
                    code: 'NOT_FOUND',
                    message: 'Validator not found',
                },
            }, 404);
        }

        handleResultError(result);
    }

    return c.json({
        ok: true,
        data: null,
    });
});

export { appRouter };
