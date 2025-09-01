/**
 * Project data operations (authenticated)
 * Uses user client to respect RLS policies
 */
import { createUserClient, mapSupabaseError } from './supabase';
import { 
  mapToProjects, 
  mapToProject,
  mapProjectToInsert,
  mapProjectToUpdate,
  type CreateProjectDto,
  type UpdateProjectDto,
  type Result,
  ok,
  err
} from '@promptrepo/shared';

/**
 * List projects owned by the authenticated user
 */
export async function listMyProjects(token: string): Promise<Result<any[], Error>> {
  try {
    const supabase = createUserClient(token);
    
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    
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
 * Get project by ID (respects RLS - only returns if user has access)
 */
export async function getProjectById(id: string, token: string): Promise<Result<any, Error>> {
  try {
    const supabase = createUserClient(token);
    
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      const { code, message } = mapSupabaseError(error);
      return err(new Error(`${code}: ${message}`));
    }
    
    if (!data) {
      return err(new Error('NOT_FOUND: Project not found'));
    }
    
    return ok(data);
  } catch (error) {
    return err(error instanceof Error ? error : new Error(String(error)));
  }
}

/**
 * Create new project
 */
export async function createProject(
  dto: CreateProjectDto, 
  token: string
): Promise<Result<any, Error>> {
  try {
    const supabase = createUserClient(token);
    
    // Get current user to set as owner
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return err(new Error('UNAUTHORIZED: Invalid token'));
    }
    
    const insertData = mapProjectToInsert(dto, crypto.randomUUID(), user.id);
    
    const { data, error } = await supabase
      .from('projects')
      .insert(insertData)
      .select()
      .single();
    
    if (error) {
      const { code, message } = mapSupabaseError(error);
      return err(new Error(`${code}: ${message}`));
    }
    
    return ok(data);
  } catch (error) {
    return err(error instanceof Error ? error : new Error(String(error)));
  }
}

/**
 * Update project by ID
 */
export async function updateProject(
  id: string,
  dto: UpdateProjectDto,
  token: string
): Promise<Result<any, Error>> {
  try {
    const supabase = createUserClient(token);
    
    const updateData = mapProjectToUpdate(dto);
    
    const { data, error } = await supabase
      .from('projects')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      const { code, message } = mapSupabaseError(error);
      return err(new Error(`${code}: ${message}`));
    }
    
    if (!data) {
      return err(new Error('NOT_FOUND: Project not found'));
    }
    
    return ok(data);
  } catch (error) {
    return err(error instanceof Error ? error : new Error(String(error)));
  }
}

/**
 * Delete project by ID
 */
export async function deleteProject(id: string, token: string): Promise<Result<void, Error>> {
  try {
    const supabase = createUserClient(token);
    
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
    
    if (error) {
      const { code, message } = mapSupabaseError(error);
      return err(new Error(`${code}: ${message}`));
    }
    
    return ok(undefined);
  } catch (error) {
    return err(error instanceof Error ? error : new Error(String(error)));
  }
}
