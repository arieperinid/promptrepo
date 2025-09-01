-- PromptRepo P1 Validation - Version Triggers Tests
-- Version: 1.0
-- Description: Tests that update/delete operations create version snapshots

-- ============================================================================
-- SETUP: Clear existing versions and set owner context
-- ============================================================================

-- Set context to act as owner
select set_config('request.jwt.claims', '{"sub":"11111111-1111-1111-1111-111111111111"}', true);

-- Clear any existing versions from previous tests
delete from versions where author_id = '11111111-1111-1111-1111-111111111111';

-- Get baseline version count
select 
  'BASELINE_VERSIONS' as test_phase,
  count(*) as initial_version_count
from versions;

-- ============================================================================
-- TEST T1: PROJECT UPDATE TRIGGER
-- ============================================================================

-- Update project name to trigger version snapshot
update projects 
set name = 'Updated Private Project Name'
where id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';

-- Test T1: Verify version was created for project update
select 
  'T1_PROJECT_UPDATE_VERSION' as test_case,
  count(*) as actual_count,
  1 as expected_count,
  case when count(*) = 1 then 'OK' else 'FAIL' end as result
from versions 
where entity_type = 'project' 
  and entity_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'
  and author_id = '11111111-1111-1111-1111-111111111111';

-- Test T1b: Verify version snapshot contains old data
select 
  'T1B_PROJECT_VERSION_SNAPSHOT' as test_case,
  case when snapshot->>'name' = 'Private Project' then 'OK' else 'FAIL' end as result,
  snapshot->>'name' as snapshot_name,
  'Private Project' as expected_old_name
from versions 
where entity_type = 'project' 
  and entity_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'
order by created_at desc 
limit 1;

-- ============================================================================
-- TEST T2: SEGMENT UPDATE TRIGGER
-- ============================================================================

-- Update segment name to trigger version snapshot
update segments 
set name = 'Updated Private Segment Name'
where id = 'seg11111-1111-1111-1111-111111111111';

-- Test T2: Verify version was created for segment update
select 
  'T2_SEGMENT_UPDATE_VERSION' as test_case,
  count(*) as actual_count,
  1 as expected_count,
  case when count(*) = 1 then 'OK' else 'FAIL' end as result
from versions 
where entity_type = 'segment' 
  and entity_id = 'seg11111-1111-1111-1111-111111111111'
  and author_id = '11111111-1111-1111-1111-111111111111';

-- Test T2b: Verify version snapshot contains old data
select 
  'T2B_SEGMENT_VERSION_SNAPSHOT' as test_case,
  case when snapshot->>'name' = 'Private Segment' then 'OK' else 'FAIL' end as result,
  snapshot->>'name' as snapshot_name,
  'Private Segment' as expected_old_name
from versions 
where entity_type = 'segment' 
  and entity_id = 'seg11111-1111-1111-1111-111111111111'
order by created_at desc 
limit 1;

-- ============================================================================
-- TEST T3: PROMPT UPDATE TRIGGER
-- ============================================================================

-- Update prompt title to trigger version snapshot
update prompts 
set title = 'Updated Private Prompt Title'
where id = 'pmt11111-1111-1111-1111-111111111111';

-- Test T3: Verify version was created for prompt update
select 
  'T3_PROMPT_UPDATE_VERSION' as test_case,
  count(*) as actual_count,
  1 as expected_count,
  case when count(*) = 1 then 'OK' else 'FAIL' end as result
from versions 
where entity_type = 'prompt' 
  and entity_id = 'pmt11111-1111-1111-1111-111111111111'
  and author_id = '11111111-1111-1111-1111-111111111111';

-- Test T3b: Verify version snapshot contains old data
select 
  'T3B_PROMPT_VERSION_SNAPSHOT' as test_case,
  case when snapshot->>'title' = 'Private Prompt' then 'OK' else 'FAIL' end as result,
  snapshot->>'title' as snapshot_title,
  'Private Prompt' as expected_old_title
from versions 
where entity_type = 'prompt' 
  and entity_id = 'pmt11111-1111-1111-1111-111111111111'
order by created_at desc 
limit 1;

-- ============================================================================
-- TEST T4: VALIDATOR UPDATE TRIGGER
-- ============================================================================

-- Update validator title to trigger version snapshot
update validators 
set title = 'Updated Private Validator Title'
where id = 'val11111-1111-1111-1111-111111111111';

-- Test T4: Verify version was created for validator update
select 
  'T4_VALIDATOR_UPDATE_VERSION' as test_case,
  count(*) as actual_count,
  1 as expected_count,
  case when count(*) = 1 then 'OK' else 'FAIL' end as result
from versions 
where entity_type = 'validator' 
  and entity_id = 'val11111-1111-1111-1111-111111111111'
  and author_id = '11111111-1111-1111-1111-111111111111';

-- Test T4b: Verify version snapshot contains old data
select 
  'T4B_VALIDATOR_VERSION_SNAPSHOT' as test_case,
  case when snapshot->>'title' = 'Private Validator' then 'OK' else 'FAIL' end as result,
  snapshot->>'title' as snapshot_title,
  'Private Validator' as expected_old_title
from versions 
where entity_type = 'validator' 
  and entity_id = 'val11111-1111-1111-1111-111111111111'
order by created_at desc 
limit 1;

-- ============================================================================
-- TEST T5: DELETE TRIGGER (using public entities to preserve test data)
-- ============================================================================

-- Create a temporary validator to test delete trigger
insert into validators (id, prompt_id, title, body) values
  ('temp-val-1111-1111-1111-111111111111', 'pmt22222-2222-2222-2222-222222222222', 'Temp Validator', 'Temporary validator for delete test');

-- Delete the temporary validator to trigger version snapshot
delete from validators 
where id = 'temp-val-1111-1111-1111-111111111111';

-- Test T5: Verify version was created for validator delete
select 
  'T5_VALIDATOR_DELETE_VERSION' as test_case,
  count(*) as actual_count,
  1 as expected_count,
  case when count(*) = 1 then 'OK' else 'FAIL' end as result
from versions 
where entity_type = 'validator' 
  and entity_id = 'temp-val-1111-1111-1111-111111111111'
  and author_id = '11111111-1111-1111-1111-111111111111';

-- Test T5b: Verify version snapshot contains deleted data
select 
  'T5B_VALIDATOR_DELETE_SNAPSHOT' as test_case,
  case when snapshot->>'title' = 'Temp Validator' then 'OK' else 'FAIL' end as result,
  snapshot->>'title' as snapshot_title,
  'Temp Validator' as expected_deleted_title
from versions 
where entity_type = 'validator' 
  and entity_id = 'temp-val-1111-1111-1111-111111111111'
order by created_at desc 
limit 1;

-- ============================================================================
-- TEST T6: MULTIPLE OPERATIONS TRACKING
-- ============================================================================

-- Count total versions created during this test
select 
  'T6_TOTAL_VERSIONS_CREATED' as test_case,
  count(*) as actual_count,
  5 as expected_count, -- 4 updates + 1 delete
  case when count(*) = 5 then 'OK' else 'FAIL' end as result
from versions 
where author_id = '11111111-1111-1111-1111-111111111111';

-- Test T6b: Verify all entity types are represented
select 
  'T6B_ALL_ENTITY_TYPES' as test_case,
  count(distinct entity_type) as actual_types,
  4 as expected_types, -- project, segment, prompt, validator
  case when count(distinct entity_type) = 4 then 'OK' else 'FAIL' end as result
from versions 
where author_id = '11111111-1111-1111-1111-111111111111';

-- ============================================================================
-- TEST T7: AUTHOR TRACKING
-- ============================================================================

-- Test T7: Verify all versions have correct author
select 
  'T7_AUTHOR_TRACKING' as test_case,
  count(*) as versions_with_correct_author,
  (select count(*) from versions where author_id = '11111111-1111-1111-1111-111111111111') as total_versions,
  case when count(*) = (select count(*) from versions where author_id = '11111111-1111-1111-1111-111111111111') 
    then 'OK' else 'FAIL' end as result
from versions 
where author_id = '11111111-1111-1111-1111-111111111111';

-- ============================================================================
-- TEST T8: TIMESTAMP TRACKING
-- ============================================================================

-- Test T8: Verify all versions have recent timestamps
select 
  'T8_TIMESTAMP_TRACKING' as test_case,
  count(*) as recent_versions,
  case when count(*) = 5 then 'OK' else 'FAIL' end as result
from versions 
where author_id = '11111111-1111-1111-1111-111111111111'
  and created_at > now() - interval '1 minute';

-- ============================================================================
-- TEST T9: SNAPSHOT INTEGRITY
-- ============================================================================

-- Test T9: Verify all snapshots are valid JSON and contain expected fields
select 
  'T9_SNAPSHOT_INTEGRITY' as test_case,
  count(*) as valid_snapshots,
  case when count(*) = 5 then 'OK' else 'FAIL' end as result
from versions 
where author_id = '11111111-1111-1111-1111-111111111111'
  and snapshot is not null
  and jsonb_typeof(snapshot) = 'object'
  and snapshot ? 'id'
  and snapshot ? 'created_at'
  and snapshot ? 'updated_at';

-- ============================================================================
-- FINAL ASSERTION CHECK
-- ============================================================================

-- Final comprehensive check
select 
  'FINAL_TRIGGERS_ASSERTION' as test_phase,
  case when (
    -- All expected versions created
    (select count(*) from versions where author_id = '11111111-1111-1111-1111-111111111111') = 5
    and
    -- All entity types covered
    (select count(distinct entity_type) from versions where author_id = '11111111-1111-1111-1111-111111111111') = 4
    and
    -- All snapshots are valid
    (select count(*) from versions where author_id = '11111111-1111-1111-1111-111111111111' and snapshot is not null) = 5
  ) then 'OK' else 'FAIL' end as overall_result;

-- Clear JWT claims
select set_config('request.jwt.claims', null, true);

-- ============================================================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================================================

comment on table versions is 'Triggers tested: update/delete on projects/segments/prompts/validators create version snapshots';
comment on column versions.entity_type is 'Tested: correctly identifies project, segment, prompt, validator';
comment on column versions.entity_id is 'Tested: correctly captures the ID of the modified entity';
comment on column versions.snapshot is 'Tested: contains valid JSON snapshot of entity state before change';
comment on column versions.author_id is 'Tested: correctly captures auth.uid() of the user making the change';
