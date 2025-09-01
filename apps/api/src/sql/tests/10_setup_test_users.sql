-- PromptRepo P1 Validation - Setup Test Users
-- Version: 1.0
-- Description: Creates test fixtures for RLS and trigger validation

-- ============================================================================
-- CLEANUP PREVIOUS TEST DATA
-- ============================================================================

-- Clean up test data in reverse dependency order
delete from versions where author_id in ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222');
delete from validators where prompt_id in (
  select pr.id from prompts pr
  join segments s on s.id = pr.segment_id
  join projects p on p.id = s.project_id
  where p.owner_id in ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222')
);
delete from prompts where segment_id in (
  select s.id from segments s
  join projects p on p.id = s.project_id
  where p.owner_id in ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222')
);
delete from segments where project_id in (
  select id from projects 
  where owner_id in ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222')
);
delete from projects where owner_id in ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222');
delete from billing where profile_id in ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222');
delete from profiles where id in ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222');

-- ============================================================================
-- CREATE TEST PROFILES
-- ============================================================================

-- Insert test profiles with fixed UUIDs
insert into profiles (id, handle, name, role, theme_pref) values
  ('11111111-1111-1111-1111-111111111111', 'test_owner', 'Test Owner', 'user', 'light'),
  ('22222222-2222-2222-2222-222222222222', 'test_other', 'Test Other', 'user', 'dark')
on conflict (id) do update set 
  handle = excluded.handle,
  name = excluded.name,
  role = excluded.role,
  theme_pref = excluded.theme_pref;

-- ============================================================================
-- CREATE TEST DATA AS OWNER
-- ============================================================================

-- Set context to act as owner
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111"}', true);

-- Create projects (1 private, 1 public)
insert into projects (id, owner_id, name, description, visibility) values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'Private Project', 'Test private project', 'private'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', 'Public Project', 'Test public project', 'public')
on conflict (id) do update set
  name = excluded.name,
  description = excluded.description,
  visibility = excluded.visibility;

-- Create segments (1 per project)
insert into segments (id, project_id, name, position) values
  ('seg11111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Private Segment', 0),
  ('seg22222-2222-2222-2222-222222222222', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Public Segment', 0)
on conflict (id) do update set
  name = excluded.name,
  position = excluded.position;

-- Create prompts (1 per segment)
insert into prompts (id, segment_id, title, body, kind, position) values
  ('pmt11111-1111-1111-1111-111111111111', 'seg11111-1111-1111-1111-111111111111', 'Private Prompt', 'This is a private prompt for testing', 'prompt', 0),
  ('pmt22222-2222-2222-2222-222222222222', 'seg22222-2222-2222-2222-222222222222', 'Public Prompt', 'This is a public prompt for testing', 'prompt', 0)
on conflict (id) do update set
  title = excluded.title,
  body = excluded.body,
  kind = excluded.kind,
  position = excluded.position;

-- Create validators (1 per prompt)
insert into validators (id, prompt_id, title, body) values
  ('val11111-1111-1111-1111-111111111111', 'pmt11111-1111-1111-1111-111111111111', 'Private Validator', 'Validation rules for private prompt'),
  ('val22222-2222-2222-2222-222222222222', 'pmt22222-2222-2222-2222-222222222222', 'Public Validator', 'Validation rules for public prompt')
on conflict (id) do update set
  title = excluded.title,
  body = excluded.body;

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Verify test data was created correctly
select 
  'TEST_SETUP_VERIFICATION' as test_phase,
  (select count(*) from profiles where id in ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222')) as profiles_count,
  (select count(*) from projects where owner_id = '11111111-1111-1111-1111-111111111111') as projects_count,
  (select count(*) from segments where project_id in ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb')) as segments_count,
  (select count(*) from prompts where segment_id in ('seg11111-1111-1111-1111-111111111111', 'seg22222-2222-2222-2222-222222222222')) as prompts_count,
  (select count(*) from validators where prompt_id in ('pmt11111-1111-1111-1111-111111111111', 'pmt22222-2222-2222-2222-222222222222')) as validators_count;

-- Verify visibility settings
select 
  'VISIBILITY_VERIFICATION' as test_phase,
  p.name,
  p.visibility,
  case when p.visibility in ('private', 'public') then 'OK' else 'FAIL' end as visibility_check
from projects p 
where p.owner_id = '11111111-1111-1111-1111-111111111111'
order by p.visibility;

-- Assert expected counts
select case 
  when (select count(*) from profiles where id in ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222')) = 2
    and (select count(*) from projects where owner_id = '11111111-1111-1111-1111-111111111111') = 2
    and (select count(*) from segments) >= 2
    and (select count(*) from prompts) >= 2
    and (select count(*) from validators) >= 2
  then 'OK'
  else 'FAIL'
end as setup_assertion;

-- Clear JWT claims for next test
select set_config('request.jwt.claims', null, true);

-- ============================================================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================================================

comment on table profiles is 'Test profiles: owner (11111111...) and other (22222222...)';
comment on table projects is 'Test projects: 1 private (aaaaaaaa...) and 1 public (bbbbbbbb...)';
comment on table segments is 'Test segments: 1 per project for hierarchy testing';
comment on table prompts is 'Test prompts: 1 per segment for RLS validation';
comment on table validators is 'Test validators: 1 per prompt for complete hierarchy testing';
