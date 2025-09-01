/**
 * Mappers from DTOs to database insert/update objects
 * 
 * These functions take validated DTOs and prepare them for database operations,
 * adding necessary fields like timestamps and IDs.
 */

import { 
  type CreateProfileDto, 
  type UpdateProfileDto 
} from "../dtos/profile.dto";
import { 
  type CreateProjectDto, 
  type UpdateProjectDto 
} from "../dtos/project.dto";
import { 
  type CreateSegmentDto, 
  type UpdateSegmentDto 
} from "../dtos/segment.dto";
import { 
  type CreatePromptDto, 
  type UpdatePromptDto 
} from "../dtos/prompt.dto";
import { 
  type CreateValidatorDto, 
  type UpdateValidatorDto 
} from "../dtos/validator.dto";

/**
 * Database insert/update object types
 */
export interface ProfileInsert extends CreateProfileDto {
  id: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface ProfileUpdate extends Partial<UpdateProfileDto> {
  updated_at?: Date;
}

export interface ProjectInsert extends CreateProjectDto {
  id: string;
  owner_id: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface ProjectUpdate extends Partial<UpdateProjectDto> {
  updated_at?: Date;
}

export interface SegmentInsert extends CreateSegmentDto {
  id: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface SegmentUpdate extends Partial<UpdateSegmentDto> {
  updated_at?: Date;
}

export interface PromptInsert extends CreatePromptDto {
  id: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface PromptUpdate extends Partial<UpdatePromptDto> {
  updated_at?: Date;
}

export interface ValidatorInsert extends CreateValidatorDto {
  id: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface ValidatorUpdate extends Partial<UpdateValidatorDto> {
  updated_at?: Date;
}

/**
 * Map CreateProfileDto to database insert object
 */
export function mapProfileToInsert(
  dto: CreateProfileDto,
  id: string,
  now: Date = new Date()
): ProfileInsert {
  return {
    ...dto,
    id,
    created_at: now,
    updated_at: now,
  };
}

/**
 * Map UpdateProfileDto to database update object
 */
export function mapProfileToUpdate(
  dto: UpdateProfileDto,
  now: Date = new Date()
): ProfileUpdate {
  return {
    ...dto,
    updated_at: now,
  };
}

/**
 * Map CreateProjectDto to database insert object
 */
export function mapProjectToInsert(
  dto: CreateProjectDto,
  id: string,
  owner_id: string,
  now: Date = new Date()
): ProjectInsert {
  return {
    ...dto,
    id,
    owner_id,
    created_at: now,
    updated_at: now,
  };
}

/**
 * Map UpdateProjectDto to database update object
 */
export function mapProjectToUpdate(
  dto: UpdateProjectDto,
  now: Date = new Date()
): ProjectUpdate {
  return {
    ...dto,
    updated_at: now,
  };
}

/**
 * Map CreateSegmentDto to database insert object
 */
export function mapSegmentToInsert(
  dto: CreateSegmentDto,
  id: string,
  now: Date = new Date()
): SegmentInsert {
  return {
    ...dto,
    id,
    created_at: now,
    updated_at: now,
  };
}

/**
 * Map UpdateSegmentDto to database update object
 */
export function mapSegmentToUpdate(
  dto: UpdateSegmentDto,
  now: Date = new Date()
): SegmentUpdate {
  return {
    ...dto,
    updated_at: now,
  };
}

/**
 * Map CreatePromptDto to database insert object
 */
export function mapPromptToInsert(
  dto: CreatePromptDto,
  id: string,
  now: Date = new Date()
): PromptInsert {
  return {
    ...dto,
    id,
    created_at: now,
    updated_at: now,
  };
}

/**
 * Map UpdatePromptDto to database update object
 */
export function mapPromptToUpdate(
  dto: UpdatePromptDto,
  now: Date = new Date()
): PromptUpdate {
  return {
    ...dto,
    updated_at: now,
  };
}

/**
 * Map CreateValidatorDto to database insert object
 */
export function mapValidatorToInsert(
  dto: CreateValidatorDto,
  id: string,
  now: Date = new Date()
): ValidatorInsert {
  return {
    ...dto,
    id,
    created_at: now,
    updated_at: now,
  };
}

/**
 * Map UpdateValidatorDto to database update object
 */
export function mapValidatorToUpdate(
  dto: UpdateValidatorDto,
  now: Date = new Date()
): ValidatorUpdate {
  return {
    ...dto,
    updated_at: now,
  };
}
