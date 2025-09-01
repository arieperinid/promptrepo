/**
 * Mappers from raw database rows to domain objects
 * 
 * These functions take raw database results (snake_case) and validate them
 * against our domain schemas, returning properly typed objects.
 */

import { ProfileSchema, type Profile } from "../schemas/profile";
import { ProjectSchema, type Project } from "../schemas/project";
import { SegmentSchema, type Segment } from "../schemas/segment";
import { PromptSchema, type Prompt } from "../schemas/prompt";
import { ValidatorSchema, type Validator } from "../schemas/validator";
import { VersionSchema, type Version } from "../schemas/version";
import { BillingSchema, type Billing } from "../schemas/billing";
import { type Result, ok, err } from "../result";

/**
 * Map raw database row to Profile domain object
 */
export function mapToProfile(raw: unknown): Result<Profile, Error> {
  try {
    const profile = ProfileSchema.parse(raw);
    return ok(profile);
  } catch (error) {
    return err(new Error(`Invalid profile data: ${error}`));
  }
}

/**
 * Map raw database row to Project domain object
 */
export function mapToProject(raw: unknown): Result<Project, Error> {
  try {
    const project = ProjectSchema.parse(raw);
    return ok(project);
  } catch (error) {
    return err(new Error(`Invalid project data: ${error}`));
  }
}

/**
 * Map raw database row to Segment domain object
 */
export function mapToSegment(raw: unknown): Result<Segment, Error> {
  try {
    const segment = SegmentSchema.parse(raw);
    return ok(segment);
  } catch (error) {
    return err(new Error(`Invalid segment data: ${error}`));
  }
}

/**
 * Map raw database row to Prompt domain object
 */
export function mapToPrompt(raw: unknown): Result<Prompt, Error> {
  try {
    const prompt = PromptSchema.parse(raw);
    return ok(prompt);
  } catch (error) {
    return err(new Error(`Invalid prompt data: ${error}`));
  }
}

/**
 * Map raw database row to Validator domain object
 */
export function mapToValidator(raw: unknown): Result<Validator, Error> {
  try {
    const validator = ValidatorSchema.parse(raw);
    return ok(validator);
  } catch (error) {
    return err(new Error(`Invalid validator data: ${error}`));
  }
}

/**
 * Map raw database row to Version domain object
 */
export function mapToVersion(raw: unknown): Result<Version, Error> {
  try {
    const version = VersionSchema.parse(raw);
    return ok(version);
  } catch (error) {
    return err(new Error(`Invalid version data: ${error}`));
  }
}

/**
 * Map raw database row to Billing domain object
 */
export function mapToBilling(raw: unknown): Result<Billing, Error> {
  try {
    const billing = BillingSchema.parse(raw);
    return ok(billing);
  } catch (error) {
    return err(new Error(`Invalid billing data: ${error}`));
  }
}

/**
 * Map array of raw database rows to domain objects
 */
export function mapToProfiles(rawArray: unknown[]): Result<Profile[], Error> {
  const profiles: Profile[] = [];
  
  for (const raw of rawArray) {
    const result = mapToProfile(raw);
    if (!result.ok) {
      return result;
    }
    profiles.push(result.value);
  }
  
  return ok(profiles);
}

export function mapToProjects(rawArray: unknown[]): Result<Project[], Error> {
  const projects: Project[] = [];
  
  for (const raw of rawArray) {
    const result = mapToProject(raw);
    if (!result.ok) {
      return result;
    }
    projects.push(result.value);
  }
  
  return ok(projects);
}

export function mapToSegments(rawArray: unknown[]): Result<Segment[], Error> {
  const segments: Segment[] = [];
  
  for (const raw of rawArray) {
    const result = mapToSegment(raw);
    if (!result.ok) {
      return result;
    }
    segments.push(result.value);
  }
  
  return ok(segments);
}

export function mapToPrompts(rawArray: unknown[]): Result<Prompt[], Error> {
  const prompts: Prompt[] = [];
  
  for (const raw of rawArray) {
    const result = mapToPrompt(raw);
    if (!result.ok) {
      return result;
    }
    prompts.push(result.value);
  }
  
  return ok(prompts);
}

export function mapToValidators(rawArray: unknown[]): Result<Validator[], Error> {
  const validators: Validator[] = [];
  
  for (const raw of rawArray) {
    const result = mapToValidator(raw);
    if (!result.ok) {
      return result;
    }
    validators.push(result.value);
  }
  
  return ok(validators);
}

export function mapToVersions(rawArray: unknown[]): Result<Version[], Error> {
  const versions: Version[] = [];
  
  for (const raw of rawArray) {
    const result = mapToVersion(raw);
    if (!result.ok) {
      return result;
    }
    versions.push(result.value);
  }
  
  return ok(versions);
}
