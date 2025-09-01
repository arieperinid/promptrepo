/**
 * Public data operations (no authentication required)
 * Uses RPCs and views for public access
 */
import { getServiceClient, mapSupabaseError } from './supabase';
import {
    mapToProjects,
    mapToProject,
    mapToSegments,
    mapToPrompts,
    type Result,
    ok,
    err
} from '@promptrepo/shared';

/**
 * List public projects with pagination
 */
export async function listPublicProjects(
    limit: number = 20,
    offset: number = 0
): Promise<Result<any[], Error>> {
    try {
        const supabase = getServiceClient();

        const { data, error } = await supabase
            .rpc('public_list_projects', { _limit: limit, _offset: offset });

        if (error) {
            const { code, message } = mapSupabaseError(error);
            return err(new Error(`${code}: ${message}`));
        }

        return ok(data || []);
    } catch (error) {
        return err(error instanceof Error ? error : new Error(String(error)));
    }
}

/**
 * Get public project by ID
 */
export async function getPublicProject(id: string): Promise<Result<any, Error>> {
    try {
        const supabase = getServiceClient();

        const { data, error } = await supabase
            .rpc('public_get_project', { _project_id: id });

        if (error) {
            const { code, message } = mapSupabaseError(error);
            return err(new Error(`${code}: ${message}`));
        }

        if (!data || data.length === 0) {
            return err(new Error('NOT_FOUND: Project not found or not public'));
        }

        return ok(data[0]);
    } catch (error) {
        return err(error instanceof Error ? error : new Error(String(error)));
    }
}

/**
 * Get public segments for a project
 */
export async function getPublicSegments(projectId: string): Promise<Result<any[], Error>> {
    try {
        const supabase = getServiceClient();

        const { data, error } = await supabase
            .from('public_segments')
            .select('*')
            .eq('project_id', projectId)
            .order('position');

        if (error) {
            const { code, message } = mapSupabaseError(error);
            return err(new Error(`${code}: ${message}`));
        }

        return ok(data || []);
    } catch (error) {
        return err(error instanceof Error ? error : new Error(String(error)));
    }
}

/**
 * Get public prompts for a segment
 */
export async function getPublicPrompts(segmentId: string): Promise<Result<any[], Error>> {
    try {
        const supabase = getServiceClient();

        const { data, error } = await supabase
            .from('public_prompts')
            .select('*')
            .eq('segment_id', segmentId)
            .order('position');

        if (error) {
            const { code, message } = mapSupabaseError(error);
            return err(new Error(`${code}: ${message}`));
        }

        return ok(data || []);
    } catch (error) {
        return err(error instanceof Error ? error : new Error(String(error)));
    }
}

/**
 * Get full public project hierarchy
 */
export async function getPublicProjectHierarchy(projectId: string): Promise<Result<any, Error>> {
    try {
        const supabase = getServiceClient();

        const { data, error } = await supabase
            .rpc('public_get_project_hierarchy', { _project_id: projectId });

        if (error) {
            const { code, message } = mapSupabaseError(error);
            return err(new Error(`${code}: ${message}`));
        }

        if (!data) {
            return err(new Error('NOT_FOUND: Project not found or not public'));
        }

        return ok(data);
    } catch (error) {
        return err(error instanceof Error ? error : new Error(String(error)));
    }
}
