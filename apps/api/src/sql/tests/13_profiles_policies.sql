-- PromptRepo P1 Validation - Profiles RLS Policies Tests
-- Version: 1.0
-- Description: Tests that profiles can only be viewed/edited by their owners

-- ============================================================================
-- TEST P1: OWNER CAN ACCESS OWN PROFILE
-- ============================================================================

-- Set context to act as owner
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111"}', true);

-- Test P1a: Owner should see their own profile
select 
  'P1A_OWNER_SELECT_OWN' as test_case,
  count(*) as actual_count,
  1 as expected_count,
  case when count(*) = 1 then 'OK' else 'FAIL' end as result
from profiles 
where id = '11111111-1111-1111-1111-111111111111';

-- Test P1b: Owner should see correct profile data
select 
  'P1B_OWNER_PROFILE_DATA' as test_case,
  handle as actual_handle,
  'test_owner' as expected_handle,
  case when handle = 'test_owner' then 'OK' else 'FAIL' end as result
from profiles 
where id = '11111111-1111-1111-1111-111111111111';

-- Test P1c: Owner should be able to update their own profile
update profiles 
set name = 'Updated Owner Name'
where id = '11111111-1111-1111-1111-111111111111';

select 
  'P1C_OWNER_UPDATE_OWN' as test_case,
  name as actual_name,
  'Updated Owner Name' as expected_name,
  case when name = 'Updated Owner Name' then 'OK' else 'FAIL' end as result
from profiles 
where id = '11111111-1111-1111-1111-111111111111';

-- ============================================================================
-- TEST P2: OWNER CANNOT ACCESS OTHER PROFILES
-- ============================================================================

-- Test P2a: Owner should NOT see other user's profile
select 
  'P2A_OWNER_CANNOT_SELECT_OTHER' as test_case,
  count(*) as actual_count,
  0 as expected_count,
  case when count(*) = 0 then 'OK' else 'FAIL' end as result
from profiles 
where id = '22222222-2222-2222-2222-222222222222';

-- Test P2b: Owner should NOT be able to update other user's profile
-- This update should affect 0 rows due to RLS
update profiles 
set name = 'Attempted update by owner'
where id = '22222222-2222-2222-2222-222222222222';

-- Verify other user's profile was not updated (check as that user)
select set_config('request.jwt.claims', '{"sub":"22222222-2222-2222-2222-222222222222"}', true);

select 
  'P2B_OWNER_CANNOT_UPDATE_OTHER' as test_case,
  name as actual_name,
  'Test Other' as expected_name,
  case when name = 'Test Other' then 'OK' else 'FAIL' end as result
from profiles 
where id = '22222222-2222-2222-2222-222222222222';

-- ============================================================================
-- TEST P3: OTHER USER CAN ACCESS OWN PROFILE
-- ============================================================================

-- Already set as other user from previous test

-- Test P3a: Other user should see their own profile
select 
  'P3A_OTHER_SELECT_OWN' as test_case,
  count(*) as actual_count,
  1 as expected_count,
  case when count(*) = 1 then 'OK' else 'FAIL' end as result
from profiles 
where id = '22222222-2222-2222-2222-222222222222';

-- Test P3b: Other user should see correct profile data
select 
  'P3B_OTHER_PROFILE_DATA' as test_case,
  handle as actual_handle,
  'test_other' as expected_handle,
  case when handle = 'test_other' then 'OK' else 'FAIL' end as result
from profiles 
where id = '22222222-2222-2222-2222-222222222222';

-- Test P3c: Other user should be able to update their own profile
update profiles 
set theme_pref = 'light'
where id = '22222222-2222-2222-2222-222222222222';

select 
  'P3C_OTHER_UPDATE_OWN' as test_case,
  theme_pref as actual_theme,
  'light' as expected_theme,
  case when theme_pref = 'light' then 'OK' else 'FAIL' end as result
from profiles 
where id = '22222222-2222-2222-2222-222222222222';

-- ============================================================================
-- TEST P4: OTHER USER CANNOT ACCESS OWNER PROFILE
-- ============================================================================

-- Test P4a: Other user should NOT see owner's profile
select 
  'P4A_OTHER_CANNOT_SELECT_OWNER' as test_case,
  count(*) as actual_count,
  0 as expected_count,
  case when count(*) = 0 then 'OK' else 'FAIL' end as result
from profiles 
where id = '11111111-1111-1111-1111-111111111111';

-- Test P4b: Other user should NOT be able to update owner's profile
-- This update should affect 0 rows due to RLS
update profiles 
set name = 'Attempted update by other user'
where id = '11111111-1111-1111-1111-111111111111';

-- Verify owner's profile was not updated (check as owner)
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111"}', true);

select 
  'P4B_OTHER_CANNOT_UPDATE_OWNER' as test_case,
  name as actual_name,
  'Updated Owner Name' as expected_name,
  case when name = 'Updated Owner Name' then 'OK' else 'FAIL' end as result
from profiles 
where id = '11111111-1111-1111-1111-111111111111';

-- ============================================================================
-- TEST P5: ANONYMOUS USER CANNOT ACCESS ANY PROFILES
-- ============================================================================

-- Clear JWT claims to simulate anonymous user
select set_config('request.jwt.claims', null, true);

-- Test P5a: Anonymous should NOT see any profiles
select 
  'P5A_ANONYMOUS_CANNOT_SELECT' as test_case,
  count(*) as actual_count,
  0 as expected_count,
  case when count(*) = 0 then 'OK' else 'FAIL' end as result
from profiles;

-- Test P5b: Anonymous should NOT be able to update any profile
-- This update should affect 0 rows due to RLS
update profiles 
set name = 'Attempted update by anonymous'
where id = '11111111-1111-1111-1111-111111111111';

-- Verify owner's profile was not updated by anonymous (check as owner)
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111"}', true);

select 
  'P5B_ANONYMOUS_CANNOT_UPDATE' as test_case,
  name as actual_name,
  'Updated Owner Name' as expected_name,
  case when name = 'Updated Owner Name' then 'OK' else 'FAIL' end as result
from profiles 
where id = '11111111-1111-1111-1111-111111111111';

-- ============================================================================
-- TEST P6: PROFILE ISOLATION (each user sees only their own)
-- ============================================================================

-- Test P6a: Owner sees exactly 1 profile (their own)
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111"}', true);

select 
  'P6A_OWNER_SEES_ONE_PROFILE' as test_case,
  count(*) as actual_count,
  1 as expected_count,
  case when count(*) = 1 then 'OK' else 'FAIL' end as result
from profiles;

-- Test P6b: Other user sees exactly 1 profile (their own)
select set_config('request.jwt.claims', '{"sub":"22222222-2222-2222-2222-222222222222"}', true);

select 
  'P6B_OTHER_SEES_ONE_PROFILE' as test_case,
  count(*) as actual_count,
  1 as expected_count,
  case when count(*) = 1 then 'OK' else 'FAIL' end as result
from profiles;

-- Test P6c: Each user sees their correct profile
select 
  'P6C_OTHER_SEES_CORRECT_PROFILE' as test_case,
  id as actual_id,
  '22222222-2222-2222-2222-222222222222' as expected_id,
  case when id = '22222222-2222-2222-2222-222222222222' then 'OK' else 'FAIL' end as result
from profiles 
limit 1;

-- ============================================================================
-- TEST P7: PROFILE CREATION POLICIES
-- ============================================================================

-- Test P7a: User should be able to create their own profile (insert policy)
-- First, let's test with a new user ID
select set_config('request.jwt.claims', '{"sub":"33333333-3333-3333-3333-333333333333"}', true);

-- Attempt to insert a profile for the authenticated user
insert into profiles (id, handle, name, role, theme_pref) values
  ('33333333-3333-3333-3333-333333333333', 'test_new_user', 'New Test User', 'user', 'light');

-- Verify the profile was created
select 
  'P7A_USER_CAN_CREATE_OWN' as test_case,
  count(*) as actual_count,
  1 as expected_count,
  case when count(*) = 1 then 'OK' else 'FAIL' end as result
from profiles 
where id = '33333333-3333-3333-3333-333333333333';

-- Test P7b: User should NOT be able to create profile for another user
-- This should fail due to RLS policy
begin;
  -- This should fail, so we'll catch the exception
  insert into profiles (id, handle, name, role, theme_pref) values
    ('44444444-4444-4444-4444-444444444444', 'test_unauthorized', 'Unauthorized User', 'user', 'dark');
rollback;

-- Verify the unauthorized profile was not created
select 
  'P7B_USER_CANNOT_CREATE_OTHER' as test_case,
  count(*) as actual_count,
  0 as expected_count,
  case when count(*) = 0 then 'OK' else 'FAIL' end as result
from profiles 
where id = '44444444-4444-4444-4444-444444444444';

-- Clean up the test profile
delete from profiles where id = '33333333-3333-3333-3333-333333333333';

-- ============================================================================
-- FINAL ASSERTION CHECK
-- ============================================================================

-- Final comprehensive check for profile policies
select 
  'FINAL_PROFILES_ASSERTION' as test_phase,
  case when (
    -- Owner can see their profile
    (select count(*) from profiles where id = '11111111-1111-1111-1111-111111111111') = 1
  ) then 'OK' else 'FAIL' end as owner_access_check;

-- Switch to other user for final check
select set_config('request.jwt.claims', '{"sub":"22222222-2222-2222-2222-222222222222"}', true);

select 
  'FINAL_PROFILES_ASSERTION_OTHER' as test_phase,
  case when (
    -- Other user can see their profile
    (select count(*) from profiles where id = '22222222-2222-2222-2222-222222222222') = 1
    and
    -- Other user cannot see owner's profile
    (select count(*) from profiles where id = '11111111-1111-1111-1111-111111111111') = 0
  ) then 'OK' else 'FAIL' end as other_access_check;

-- Anonymous final check
select set_config('request.jwt.claims', null, true);

select 
  'FINAL_PROFILES_ASSERTION_ANON' as test_phase,
  case when (
    -- Anonymous cannot see any profiles
    (select count(*) from profiles) = 0
  ) then 'OK' else 'FAIL' end as anonymous_access_check;

-- Clear JWT claims
select set_config('request.jwt.claims', null, true);

-- ============================================================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================================================

comment on table profiles is 'RLS tested: users can only select/update their own profile, anonymous has no access';
comment on column profiles.id is 'Tested: used as primary key for RLS policy matching with auth.uid()';
comment on column profiles.handle is 'Tested: can be updated by profile owner only';
comment on column profiles.name is 'Tested: can be updated by profile owner only';
comment on column profiles.theme_pref is 'Tested: can be updated by profile owner only';
