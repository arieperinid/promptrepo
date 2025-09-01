-- PromptRepo Database Triggers
-- Version: 1.0
-- Description: Triggers for versioning, auditing, and automatic field updates

-- ============================================================================
-- UPDATED_AT TRIGGER FUNCTION
-- ============================================================================

-- Function to automatically update the updated_at timestamp
create or replace function touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

-- Apply updated_at triggers to all tables with updated_at column
create trigger trg_profiles_touch 
  before update on profiles
  for each row execute function touch_updated_at();

create trigger trg_projects_touch 
  before update on projects
  for each row execute function touch_updated_at();

create trigger trg_segments_touch 
  before update on segments
  for each row execute function touch_updated_at();

create trigger trg_prompts_touch 
  before update on prompts
  for each row execute function touch_updated_at();

create trigger trg_validators_touch 
  before update on validators
  for each row execute function touch_updated_at();

create trigger trg_billing_touch 
  before update on billing
  for each row execute function touch_updated_at();

-- ============================================================================
-- VERSION SNAPSHOT TRIGGER FUNCTION
-- ============================================================================

-- Function to create version snapshots before updates and deletes
create or replace function log_version_snapshot()
returns trigger language plpgsql security definer as $$
begin
  -- Only log versions for actual changes, not just updated_at changes
  if TG_OP = 'UPDATE' then
    -- Skip if only updated_at changed (avoid infinite version loops)
    if (OLD.updated_at is distinct from NEW.updated_at) and 
       (row(OLD.*) is not distinct from row(NEW.*) except for updated_at) then
      return NEW;
    end if;
  end if;

  -- Insert version snapshot
  insert into versions (entity_type, entity_id, snapshot, author_id, created_at)
  values (
    TG_ARGV[0], 
    (case when TG_OP = 'DELETE' then OLD.id else NEW.id end), 
    to_jsonb(coalesce(OLD, NEW)), 
    auth.uid(), 
    now()
  );

  return (case when TG_OP = 'DELETE' then OLD else NEW end);
end $$;

-- ============================================================================
-- VERSION SNAPSHOT TRIGGERS
-- ============================================================================

-- Create version snapshots for projects
create trigger trg_projects_version
  before update or delete on projects
  for each row execute function log_version_snapshot('project');

-- Create version snapshots for segments
create trigger trg_segments_version
  before update or delete on segments
  for each row execute function log_version_snapshot('segment');

-- Create version snapshots for prompts
create trigger trg_prompts_version
  before update or delete on prompts
  for each row execute function log_version_snapshot('prompt');

-- Create version snapshots for validators
create trigger trg_validators_version
  before update or delete on validators
  for each row execute function log_version_snapshot('validator');

-- ============================================================================
-- PROFILE CREATION TRIGGER
-- ============================================================================

-- Function to create billing record when profile is created
create or replace function create_billing_on_profile()
returns trigger language plpgsql security definer as $$
begin
  -- Create default billing record for new profile
  insert into billing (profile_id, plan, status)
  values (NEW.id, 'free', 'active');
  
  return NEW;
end $$;

-- Trigger to create billing record on profile creation
create trigger trg_profiles_create_billing
  after insert on profiles
  for each row execute function create_billing_on_profile();

-- ============================================================================
-- POSITION MANAGEMENT TRIGGERS (Future Enhancement)
-- ============================================================================

-- Function to manage position ordering (placeholder for future implementation)
create or replace function manage_position_ordering()
returns trigger language plpgsql as $$
begin
  -- TODO: Implement automatic position management
  -- This would handle:
  -- 1. Auto-incrementing positions on insert
  -- 2. Reordering positions when items are moved
  -- 3. Filling gaps in position sequences
  
  -- For now, just return the record unchanged
  return coalesce(NEW, OLD);
end $$;

-- Position management triggers (disabled for now)
-- create trigger trg_segments_position before insert or update on segments
--   for each row execute function manage_position_ordering();
-- create trigger trg_prompts_position before insert or update on prompts
--   for each row execute function manage_position_ordering();

-- ============================================================================
-- VALIDATION TRIGGERS (Future Enhancement)
-- ============================================================================

-- Function to validate business rules (placeholder for future implementation)
create or replace function validate_business_rules()
returns trigger language plpgsql as $$
begin
  -- TODO: Implement business rule validations
  -- This could handle:
  -- 1. Project name uniqueness per user
  -- 2. Maximum number of projects per plan
  -- 3. Content length limits based on plan
  -- 4. Rate limiting for operations
  
  -- For now, just return the record unchanged
  return coalesce(NEW, OLD);
end $$;

-- ============================================================================
-- SEARCH INDEX TRIGGERS (Future Enhancement)
-- ============================================================================

-- Function to update search indexes (placeholder for P2.3 FTS implementation)
create or replace function update_search_index()
returns trigger language plpgsql as $$
begin
  -- TODO: Implement full-text search index updates
  -- This will be implemented in P2.3 with materialized search columns
  
  -- For now, just return the record unchanged
  return coalesce(NEW, OLD);
end $$;

-- ============================================================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================================================

comment on function touch_updated_at() is 'Automatically updates updated_at timestamp on record changes';
comment on function log_version_snapshot() is 'Creates version snapshots for audit trail before updates/deletes';
comment on function create_billing_on_profile() is 'Creates default billing record when new profile is created';
comment on function manage_position_ordering() is 'Placeholder for automatic position management (future)';
comment on function validate_business_rules() is 'Placeholder for business rule validation (future)';
comment on function update_search_index() is 'Placeholder for search index updates (P2.3)';

comment on trigger trg_profiles_touch on profiles is 'Updates updated_at on profile changes';
comment on trigger trg_projects_version on projects is 'Creates version snapshot before project changes';
comment on trigger trg_profiles_create_billing on profiles is 'Creates billing record for new profiles';
