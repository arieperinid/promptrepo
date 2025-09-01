/**
 * Segment data operations (authenticated)
 */
import { createUserClient, mapSupabaseError } from './supabase';
import {
    mapSegmentToInsert,
    mapSegmentToUpdate,
    type CreateSegmentDto,
    type UpdateSegmentDto,
    type Result,
    ok,
    err
} from '@promptrepo/shared';

/**
 * Create new segment
 */
export async function createSegment(
    dto: CreateSegmentDto,
    token: string
): Promise<Result<any, Error>> {
    try {
        const supabase = createUserClient(token);

        const insertData = mapSegmentToInsert(dto, crypto.randomUUID());

        const { data, error } = await supabase
            .from('segments')
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
 * Update segment by ID
 */
export async function updateSegment(
    id: string,
    dto: UpdateSegmentDto,
    token: string
): Promise<Result<any, Error>> {
    try {
        const supabase = createUserClient(token);

        const updateData = mapSegmentToUpdate(dto);

        const { data, error } = await supabase
            .from('segments')
            .update(updateData)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            const { code, message } = mapSupabaseError(error);
            return err(new Error(`${code}: ${message}`));
        }

        if (!data) {
            return err(new Error('NOT_FOUND: Segment not found'));
        }

        return ok(data);
    } catch (error) {
        return err(error instanceof Error ? error : new Error(String(error)));
    }
}

/**
 * Delete segment by ID
 */
export async function deleteSegment(id: string, token: string): Promise<Result<void, Error>> {
    try {
        const supabase = createUserClient(token);

        const { error } = await supabase
            .from('segments')
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
