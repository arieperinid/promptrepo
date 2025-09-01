-- PromptRepo Row Level Security (RLS)
-- Version: 1.0
-- Description: Security policies for data access control

-- Enable RLS on all domain tables
alter table profiles enable row level security;
alter table projects enable row level security;
alter table segments enable row level security;
alter table prompts enable row level security;
alter table validators enable row level security;

-- Note: versions and billing tables will have RLS enabled later with admin-only access

-- ============================================================================
-- PROFILES POLICIES
-- ============================================================================

-- Users can only read and update their own profile
create policy "profiles_select_own" on profiles
  for select using (auth.uid() = id);

create policy "profiles_update_own" on profiles
  for update using (auth.uid() = id);

-- Users can insert their own profile (for registration)
create policy "profiles_insert_own" on profiles
  for insert with check (auth.uid() = id);

-- ============================================================================
-- PROJECTS POLICIES
-- ============================================================================

-- Project owners have full CRUD access to their projects
create policy "projects_owner_crud" on projects
  for all using (auth.uid() = owner_id) 
  with check (auth.uid() = owner_id);

-- Anyone can read public projects
create policy "projects_public_read" on projects
  for select using (visibility = 'public');

-- ============================================================================
-- SEGMENTS POLICIES
-- ============================================================================

-- Segment access follows project ownership
create policy "segments_owner_crud" on segments
  for all using (
    exists (
      select 1 from projects p 
      where p.id = project_id and p.owner_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from projects p 
      where p.id = project_id and p.owner_id = auth.uid()
    )
  );

-- Anyone can read segments from public projects
create policy "segments_public_read" on segments
  for select using (
    exists (
      select 1 from projects p 
      where p.id = project_id and p.visibility = 'public'
    )
  );

-- ============================================================================
-- PROMPTS POLICIES
-- ============================================================================

-- Prompt access follows project ownership through segments
create policy "prompts_owner_crud" on prompts
  for all using (
    exists (
      select 1 from segments s
      join projects p on p.id = s.project_id
      where s.id = segment_id and p.owner_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from segments s
      join projects p on p.id = s.project_id
      where s.id = segment_id and p.owner_id = auth.uid()
    )
  );

-- Anyone can read prompts from public projects
create policy "prompts_public_read" on prompts
  for select using (
    exists (
      select 1 from segments s
      join projects p on p.id = s.project_id
      where s.id = segment_id and p.visibility = 'public'
    )
  );

-- ============================================================================
-- VALIDATORS POLICIES
-- ============================================================================

-- Validator access follows project ownership through prompts and segments
create policy "validators_owner_crud" on validators
  for all using (
    exists (
      select 1 from prompts pr
      join segments s on s.id = pr.segment_id
      join projects p on p.id = s.project_id
      where pr.id = prompt_id and p.owner_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from prompts pr
      join segments s on s.id = pr.segment_id
      join projects p on p.id = s.project_id
      where pr.id = prompt_id and p.owner_id = auth.uid()
    )
  );

-- Anyone can read validators from public projects
create policy "validators_public_read" on validators
  for select using (
    exists (
      select 1 from prompts pr
      join segments s on s.id = pr.segment_id
      join projects p on p.id = s.project_id
      where pr.id = prompt_id and p.visibility = 'public'
    )
  );

-- ============================================================================
-- HELPER FUNCTIONS FOR ADMIN ACCESS
-- ============================================================================

-- Function to check if current user is admin
create or replace function is_admin()
returns boolean language sql stable security definer as $$
  select exists (
    select 1 from profiles 
    where id = auth.uid() and role = 'admin'
  );
$$;

-- Function to check if current user is pro or admin
create or replace function is_pro_or_admin()
returns boolean language sql stable security definer as $$
  select exists (
    select 1 from profiles 
    where id = auth.uid() and role in ('pro', 'admin')
  );
$$;

-- ============================================================================
-- FUTURE ADMIN POLICIES (commented for now)
-- ============================================================================

-- Admin policies will be added when admin functionality is implemented
-- These would allow admins to bypass normal RLS restrictions

/*
-- Admin can read all profiles
create policy "profiles_admin_read" on profiles
  for select using (is_admin());

-- Admin can read all projects
create policy "projects_admin_read" on projects
  for select using (is_admin());
*/

-- ============================================================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================================================

comment on policy "profiles_select_own" on profiles is 'Users can only view their own profile';
comment on policy "profiles_update_own" on profiles is 'Users can only update their own profile';
comment on policy "projects_owner_crud" on projects is 'Project owners have full access to their projects';
comment on policy "projects_public_read" on projects is 'Public projects are readable by anyone';
comment on policy "segments_owner_crud" on segments is 'Segment access follows project ownership';
comment on policy "segments_public_read" on segments is 'Segments from public projects are readable by anyone';
comment on policy "prompts_owner_crud" on prompts is 'Prompt access follows project ownership';
comment on policy "prompts_public_read" on prompts is 'Prompts from public projects are readable by anyone';
comment on policy "validators_owner_crud" on validators is 'Validator access follows project ownership';
comment on policy "validators_public_read" on validators is 'Validators from public projects are readable by anyone';

comment on function is_admin() is 'Helper function to check if current user has admin role';
comment on function is_pro_or_admin() is 'Helper function to check if current user has pro or admin role';
