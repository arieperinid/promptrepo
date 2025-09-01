-- PromptRepo Database Indexes
-- Version: 1.0
-- Description: Performance indexes for efficient queries

-- Foreign key indexes for join performance
create index idx_projects_owner_id on projects(owner_id);
create index idx_segments_project_id on segments(project_id);
create index idx_prompts_segment_id on prompts(segment_id);
create index idx_validators_prompt_id on validators(prompt_id);

-- Position indexes for ordering
create index idx_segments_position on segments(project_id, position);
create index idx_prompts_position on prompts(segment_id, position);

-- Visibility index for public content queries
create index idx_projects_visibility on projects(visibility);
create index idx_projects_public_created on projects(visibility, created_at desc) where visibility = 'public';

-- Versioning indexes for audit queries
create index idx_versions_entity on versions(entity_type, entity_id);
create index idx_versions_created_desc on versions(created_at desc);
create index idx_versions_author on versions(author_id);

-- Billing indexes
create index idx_billing_plan on billing(plan);
create index idx_billing_status on billing(status);
create index idx_billing_period_end on billing(current_period_end);

-- Search preparation indexes (for future FTS implementation in P2.3)
-- Note: Full-text search will be implemented later with materialized columns
-- create index idx_projects_search on projects using gin(to_tsvector('portuguese', name || ' ' || coalesce(description, '')));
-- create index idx_prompts_search on prompts using gin(to_tsvector('portuguese', title || ' ' || body));

-- Composite indexes for common query patterns
create index idx_projects_owner_visibility on projects(owner_id, visibility);
create index idx_segments_project_position on segments(project_id, position, created_at);
create index idx_prompts_segment_kind on prompts(segment_id, kind, position);

-- Unique constraints beyond primary keys
create unique index idx_profiles_handle_lower on profiles(lower(handle));

-- Partial indexes for active records
create index idx_billing_active on billing(profile_id) where status = 'active';
create index idx_projects_public_active on projects(id, name, created_at) where visibility = 'public';

-- Comments for documentation
comment on index idx_projects_owner_id is 'Fast lookup of projects by owner';
comment on index idx_projects_visibility is 'Efficient filtering by project visibility';
comment on index idx_projects_public_created is 'Optimized for public project listings with date ordering';
comment on index idx_versions_entity is 'Quick access to version history by entity';
comment on index idx_profiles_handle_lower is 'Case-insensitive unique constraint on handles';
comment on index idx_billing_active is 'Fast lookup of active subscriptions';
