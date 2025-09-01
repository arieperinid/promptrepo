/**
 * Prompt data operations (authenticated)
 */
import { createUserClient, mapSupabaseError } from './supabase';
import { 
  mapPromptToInsert,
  mapPromptToUpdate,
  type CreatePromptDto,
  type UpdatePromptDto,
  type Result,
  ok,
  err
} from '@promptrepo/shared';

/**
 * Create new prompt
 */
export async function createPrompt(
  dto: CreatePromptDto, 
  token: string
): Promise<Result<any, Error>> {
  try {
    const supabase = createUserClient(token);
    
    const insertData = mapPromptToInsert(dto, crypto.randomUUID());
    
    const { data, error } = await supabase
      .from('prompts')
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
 * Update prompt by ID
 */
export async function updatePrompt(
  id: string,
  dto: UpdatePromptDto,
  token: string
): Promise<Result<any, Error>> {
  try {
    const supabase = createUserClient(token);
    
    const updateData = mapPromptToUpdate(dto);
    
    const { data, error } = await supabase
      .from('prompts')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      const { code, message } = mapSupabaseError(error);
      return err(new Error(`${code}: ${message}`));
    }
    
    if (!data) {
      return err(new Error('NOT_FOUND: Prompt not found'));
    }
    
    return ok(data);
  } catch (error) {
    return err(error instanceof Error ? error : new Error(String(error)));
  }
}

/**
 * Delete prompt by ID
 */
export async function deletePrompt(id: string, token: string): Promise<Result<void, Error>> {
  try {
    const supabase = createUserClient(token);
    
    const { error } = await supabase
      .from('prompts')
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
