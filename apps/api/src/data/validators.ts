/**
 * Validator data operations (authenticated)
 */
import { createUserClient, mapSupabaseError } from './supabase';
import { 
  mapValidatorToInsert,
  mapValidatorToUpdate,
  type CreateValidatorDto,
  type UpdateValidatorDto,
  type Result,
  ok,
  err
} from '@promptrepo/shared';

/**
 * Create new validator
 */
export async function createValidator(
  dto: CreateValidatorDto, 
  token: string
): Promise<Result<any, Error>> {
  try {
    const supabase = createUserClient(token);
    
    const insertData = mapValidatorToInsert(dto, crypto.randomUUID());
    
    const { data, error } = await supabase
      .from('validators')
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
 * Update validator by ID
 */
export async function updateValidator(
  id: string,
  dto: UpdateValidatorDto,
  token: string
): Promise<Result<any, Error>> {
  try {
    const supabase = createUserClient(token);
    
    const updateData = mapValidatorToUpdate(dto);
    
    const { data, error } = await supabase
      .from('validators')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      const { code, message } = mapSupabaseError(error);
      return err(new Error(`${code}: ${message}`));
    }
    
    if (!data) {
      return err(new Error('NOT_FOUND: Validator not found'));
    }
    
    return ok(data);
  } catch (error) {
    return err(error instanceof Error ? error : new Error(String(error)));
  }
}

/**
 * Delete validator by ID
 */
export async function deleteValidator(id: string, token: string): Promise<Result<void, Error>> {
  try {
    const supabase = createUserClient(token);
    
    const { error } = await supabase
      .from('validators')
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
