-- PromptRepo Remote Procedure Calls (RPCs)
-- Version: 1.0
-- Description: Public functions for API access and data retrieval

-- ============================================================================
-- PUBLIC PROJECT LISTING
-- ============================================================================

-- Function to list public projects with pagination
create or replace function public_list_projects(_limit int default 20, _offset int default 0)
returns setof projects 
language sql stable security definer as $$
  select * from projects
  where visibility = 'public'
  order by created_at desc
  limit coalesce(_limit, 20) 
  offset coalesce(_offset, 0);
$$;

-- Function to count total public projects
create or replace function public_count_projects()
returns bigint
language sql stable security definer as $$
  select count(*) from projects where visibility = 'public';
$$;

-- ============================================================================
-- PUBLIC PROJECT DETAILS
-- ============================================================================

-- Function to get a specific public project by ID
create or replace function public_get_project(_project_id uuid)
returns projects
language sql stable security definer as $$
  select * from projects p
  where p.id = _project_id and p.visibility = 'public';
$$;

-- Function to get project with owner information
create or replace function public_get_project_with_owner(_project_id uuid)
returns table (
  id uuid,
  owner_id uuid,
  owner_handle text,
  owner_name text,
  name text,
  description text,
  visibility text,
  created_at timestamptz,
  updated_at timestamptz
)
language sql stable security definer as $$
  select 
    p.id,
    p.owner_id,
    pr.handle as owner_handle,
    pr.name as owner_name,
    p.name,
    p.description,
    p.visibility,
    p.created_at,
    p.updated_at
  from projects p
  join profiles pr on pr.id = p.owner_id
  where p.id = _project_id and p.visibility = 'public';
$$;

-- ============================================================================
-- PUBLIC CONTENT HIERARCHY
-- ============================================================================

-- Function to get segments for a public project
create or replace function public_get_project_segments(_project_id uuid)
returns setof segments
language sql stable security definer as $$
  select s.* from segments s
  join projects p on p.id = s.project_id
  where s.project_id = _project_id and p.visibility = 'public'
  order by s.position, s.created_at;
$$;

-- Function to get prompts for a public segment
create or replace function public_get_segment_prompts(_segment_id uuid)
returns setof prompts
language sql stable security definer as $$
  select pr.* from prompts pr
  join segments s on s.id = pr.segment_id
  join projects p on p.id = s.project_id
  where pr.segment_id = _segment_id and p.visibility = 'public'
  order by pr.position, pr.created_at;
$$;

-- Function to get validators for a public prompt
create or replace function public_get_prompt_validators(_prompt_id uuid)
returns setof validators
language sql stable security definer as $$
  select v.* from validators v
  join prompts pr on pr.id = v.prompt_id
  join segments s on s.id = pr.segment_id
  join projects p on p.id = s.project_id
  where v.prompt_id = _prompt_id and p.visibility = 'public'
  order by v.created_at;
$$;

-- ============================================================================
-- PUBLIC VIEWS FOR EASIER ACCESS
-- ============================================================================

-- View for public segments with project context
create or replace view public_segments as
  select 
    s.*,
    p.name as project_name,
    p.owner_id as project_owner_id
  from segments s
  join projects p on p.id = s.project_id
  where p.visibility = 'public';

-- View for public prompts with full context
create or replace view public_prompts as
  select 
    pr.*,
    s.name as segment_name,
    s.project_id,
    p.name as project_name,
    p.owner_id as project_owner_id
  from prompts pr
  join segments s on s.id = pr.segment_id
  join projects p on p.id = s.project_id
  where p.visibility = 'public';

-- View for public validators with full context
create or replace view public_validators as
  select 
    v.*,
    pr.title as prompt_title,
    pr.segment_id,
    s.name as segment_name,
    s.project_id,
    p.name as project_name,
    p.owner_id as project_owner_id
  from validators v
  join prompts pr on pr.id = v.prompt_id
  join segments s on s.id = pr.segment_id
  join projects p on p.id = s.project_id
  where p.visibility = 'public';

-- ============================================================================
-- SEARCH AND DISCOVERY FUNCTIONS
-- ============================================================================

-- Function to search public projects by name (simple text matching for now)
create or replace function public_search_projects(_query text, _limit int default 20, _offset int default 0)
returns setof projects
language sql stable security definer as $$
  select * from projects
  where visibility = 'public'
    and (
      name ilike '%' || _query || '%' or
      description ilike '%' || _query || '%'
    )
  order by 
    case when name ilike _query || '%' then 1 else 2 end,
    created_at desc
  limit coalesce(_limit, 20)
  offset coalesce(_offset, 0);
$$;

-- Function to get recent public projects
create or replace function public_recent_projects(_limit int default 10)
returns setof projects
language sql stable security definer as $$
  select * from projects
  where visibility = 'public'
  order by created_at desc
  limit coalesce(_limit, 10);
$$;

-- Function to get projects by owner handle
create or replace function public_get_projects_by_owner(_handle text, _limit int default 20, _offset int default 0)
returns setof projects
language sql stable security definer as $$
  select p.* from projects p
  join profiles pr on pr.id = p.owner_id
  where p.visibility = 'public' and pr.handle = _handle
  order by p.created_at desc
  limit coalesce(_limit, 20)
  offset coalesce(_offset, 0);
$$;

-- ============================================================================
-- STATISTICS AND ANALYTICS FUNCTIONS
-- ============================================================================

-- Function to get public project statistics
create or replace function public_project_stats(_project_id uuid)
returns table (
  project_id uuid,
  segments_count bigint,
  prompts_count bigint,
  validators_count bigint,
  last_updated timestamptz
)
language sql stable security definer as $$
  select 
    p.id as project_id,
    count(distinct s.id) as segments_count,
    count(distinct pr.id) as prompts_count,
    count(distinct v.id) as validators_count,
    max(greatest(p.updated_at, s.updated_at, pr.updated_at, v.updated_at)) as last_updated
  from projects p
  left join segments s on s.project_id = p.id
  left join prompts pr on pr.segment_id = s.id
  left join validators v on v.prompt_id = pr.id
  where p.id = _project_id and p.visibility = 'public'
  group by p.id;
$$;

-- ============================================================================
-- UTILITY FUNCTIONS
-- ============================================================================

-- Function to check if a project is public
create or replace function is_project_public(_project_id uuid)
returns boolean
language sql stable security definer as $$
  select exists (
    select 1 from projects 
    where id = _project_id and visibility = 'public'
  );
$$;

-- Function to get project hierarchy (project -> segments -> prompts)
create or replace function public_get_project_hierarchy(_project_id uuid)
returns table (
  project_id uuid,
  project_name text,
  segment_id uuid,
  segment_name text,
  segment_position int,
  prompt_id uuid,
  prompt_title text,
  prompt_position int,
  prompt_kind text
)
language sql stable security definer as $$
  select 
    p.id as project_id,
    p.name as project_name,
    s.id as segment_id,
    s.name as segment_name,
    s.position as segment_position,
    pr.id as prompt_id,
    pr.title as prompt_title,
    pr.position as prompt_position,
    pr.kind as prompt_kind
  from projects p
  left join segments s on s.project_id = p.id
  left join prompts pr on pr.segment_id = s.id
  where p.id = _project_id and p.visibility = 'public'
  order by s.position, s.created_at, pr.position, pr.created_at;
$$;

-- ============================================================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================================================

comment on function public_list_projects(int, int) is 'Lists public projects with pagination';
comment on function public_count_projects() is 'Returns total count of public projects';
comment on function public_get_project(uuid) is 'Gets a specific public project by ID';
comment on function public_get_project_with_owner(uuid) is 'Gets public project with owner information';
comment on function public_search_projects(text, int, int) is 'Searches public projects by name/description';
comment on function public_recent_projects(int) is 'Gets recently created public projects';
comment on function public_project_stats(uuid) is 'Returns statistics for a public project';
comment on function is_project_public(uuid) is 'Checks if a project is publicly visible';
comment on function public_get_project_hierarchy(uuid) is 'Gets complete hierarchy for a public project';

comment on view public_segments is 'Public segments with project context';
comment on view public_prompts is 'Public prompts with full hierarchy context';
comment on view public_validators is 'Public validators with full hierarchy context';
