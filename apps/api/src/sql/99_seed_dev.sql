-- PromptRepo Development Seed Data
-- Version: 1.0
-- Description: Sample data for development and testing
-- WARNING: This file should NOT be run in production

-- ============================================================================
-- DEVELOPMENT PROFILES
-- ============================================================================

-- Insert test profiles (using fixed UUIDs for consistency in development)
-- Note: In real usage, profiles.id should match auth.uid() from Supabase Auth

insert into profiles (id, handle, name, role, theme_pref) values
  ('11111111-1111-1111-1111-111111111111', 'admin_user', 'Admin User', 'admin', 'dark'),
  ('22222222-2222-2222-2222-222222222222', 'pro_user', 'Pro User', 'pro', 'light'),
  ('33333333-3333-3333-3333-333333333333', 'demo_user', 'Demo User', 'user', 'light')
on conflict (id) do nothing;

-- ============================================================================
-- SAMPLE PROJECTS
-- ============================================================================

-- Public project for testing public access
insert into projects (id, owner_id, name, description, visibility) values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '33333333-3333-3333-3333-333333333333', 
   'Prompts de Marketing Digital', 
   'Coleção de prompts para campanhas de marketing digital e copywriting', 
   'public'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222',
   'Prompts de Desenvolvimento', 
   'Prompts para auxiliar no desenvolvimento de software', 
   'public'),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', '33333333-3333-3333-3333-333333333333',
   'Projeto Privado', 
   'Este projeto é privado e não deve aparecer nas listagens públicas', 
   'private')
on conflict (id) do nothing;

-- ============================================================================
-- SAMPLE SEGMENTS
-- ============================================================================

-- Segments for Marketing project
insert into segments (id, project_id, name, position) values
  ('seg11111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Copywriting', 0),
  ('seg22222-2222-2222-2222-222222222222', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Social Media', 1),
  ('seg33333-3333-3333-3333-333333333333', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Email Marketing', 2)
on conflict (id) do nothing;

-- Segments for Development project
insert into segments (id, project_id, name, position) values
  ('seg44444-4444-4444-4444-444444444444', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Code Review', 0),
  ('seg55555-5555-5555-5555-555555555555', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Documentation', 1)
on conflict (id) do nothing;

-- Segments for Private project
insert into segments (id, project_id, name, position) values
  ('seg66666-6666-6666-6666-666666666666', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'Confidential', 0)
on conflict (id) do nothing;

-- ============================================================================
-- SAMPLE PROMPTS
-- ============================================================================

-- Prompts for Copywriting segment
insert into prompts (id, segment_id, title, body, kind, position) values
  ('pmt11111-1111-1111-1111-111111111111', 'seg11111-1111-1111-1111-111111111111',
   'Headline Persuasivo',
   'Crie um headline persuasivo para um produto de [CATEGORIA] que resolve [PROBLEMA]. O headline deve ser direto, criar urgência e destacar o principal benefício.',
   'prompt', 0),
  ('pmt22222-2222-2222-2222-222222222222', 'seg11111-1111-1111-1111-111111111111',
   'Call-to-Action Irresistível',
   'Escreva 5 variações de call-to-action para [PRODUTO/SERVIÇO] que criem senso de urgência e exclusividade. Use verbos de ação e benefícios claros.',
   'prompt', 1)
on conflict (id) do nothing;

-- Prompts for Social Media segment
insert into prompts (id, segment_id, title, body, kind, position) values
  ('pmt33333-3333-3333-3333-333333333333', 'seg22222-2222-2222-2222-222222222222',
   'Post Engajamento Instagram',
   'Crie um post para Instagram sobre [TÓPICO] que gere engajamento. Inclua: hook inicial, conteúdo de valor, call-to-action e 5 hashtags relevantes.',
   'prompt', 0),
  ('pmt44444-4444-4444-4444-444444444444', 'seg22222-2222-2222-2222-222222222222',
   'Thread Twitter Educativo',
   'Escreva uma thread de Twitter (8-10 tweets) explicando [CONCEITO] de forma didática. Use linguagem simples, exemplos práticos e emojis relevantes.',
   'prompt', 1)
on conflict (id) do nothing;

-- Prompts for Code Review segment
insert into prompts (id, segment_id, title, body, kind, position) values
  ('pmt55555-5555-5555-5555-555555555555', 'seg44444-4444-4444-4444-444444444444',
   'Análise de Código',
   'Analise o seguinte código e forneça feedback sobre: 1) Legibilidade, 2) Performance, 3) Segurança, 4) Melhores práticas, 5) Sugestões de melhoria.',
   'system', 0),
  ('pmt66666-6666-6666-6666-666666666666', 'seg44444-4444-4444-4444-444444444444',
   'Refatoração de Função',
   'Refatore a função abaixo seguindo princípios SOLID e clean code. Explique as mudanças feitas e os benefícios de cada alteração.',
   'prompt', 1)
on conflict (id) do nothing;

-- ============================================================================
-- SAMPLE VALIDATORS
-- ============================================================================

-- Validators for marketing prompts
insert into validators (id, prompt_id, title, body) values
  ('val11111-1111-1111-1111-111111111111', 'pmt11111-1111-1111-1111-111111111111',
   'Validação de Headline',
   'Verifique se o headline: 1) Tem menos de 60 caracteres, 2) Inclui benefício claro, 3) Cria urgência, 4) É específico para o público-alvo'),
  ('val22222-2222-2222-2222-222222222222', 'pmt22222-2222-2222-2222-222222222222',
   'Validação de CTA',
   'Confirme se o CTA: 1) Usa verbo de ação, 2) Cria senso de urgência, 3) É específico, 4) Destaca benefício, 5) Tem menos de 5 palavras')
on conflict (id) do nothing;

-- Validators for social media prompts
insert into validators (id, prompt_id, title, body) values
  ('val33333-3333-3333-3333-333333333333', 'pmt33333-3333-3333-3333-333333333333',
   'Validação Post Instagram',
   'Verifique se o post: 1) Tem hook nos primeiros 125 caracteres, 2) Fornece valor, 3) Inclui CTA claro, 4) Hashtags são relevantes e não excedem 10'),
  ('val44444-4444-4444-4444-444444444444', 'pmt44444-4444-4444-4444-444444444444',
   'Validação Thread Twitter',
   'Confirme se a thread: 1) Cada tweet tem menos de 280 caracteres, 2) Sequência lógica, 3) Linguagem acessível, 4) Inclui exemplos práticos')
on conflict (id) do nothing;

-- Validators for development prompts
insert into validators (id, prompt_id, title, body) values
  ('val55555-5555-5555-5555-555555555555', 'pmt55555-5555-5555-5555-555555555555',
   'Validação Análise de Código',
   'Verifique se a análise: 1) Cobre todos os 5 pontos solicitados, 2) Fornece exemplos específicos, 3) Sugere melhorias concretas, 4) Mantém tom construtivo'),
  ('val66666-6666-6666-6666-666666666666', 'pmt66666-6666-6666-6666-666666666666',
   'Validação Refatoração',
   'Confirme se a refatoração: 1) Aplica princípios SOLID, 2) Melhora legibilidade, 3) Mantém funcionalidade, 4) Explica mudanças claramente')
on conflict (id) do nothing;

-- ============================================================================
-- SAMPLE BILLING DATA
-- ============================================================================

-- Billing records are automatically created by trigger, but we can update them
update billing set 
  plan = 'pro',
  status = 'active',
  current_period_end = now() + interval '1 month'
where profile_id = '22222222-2222-2222-2222-222222222222';

update billing set 
  plan = 'pro',
  status = 'active',
  current_period_end = now() + interval '1 year'
where profile_id = '11111111-1111-1111-1111-111111111111';

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- These queries can be used to verify the seed data was inserted correctly

/*
-- Count records by table
select 'profiles' as table_name, count(*) as count from profiles
union all
select 'projects', count(*) from projects
union all
select 'segments', count(*) from segments
union all
select 'prompts', count(*) from prompts
union all
select 'validators', count(*) from validators
union all
select 'billing', count(*) from billing;

-- Verify public projects are accessible
select p.name, p.visibility, count(s.id) as segments_count
from projects p
left join segments s on s.project_id = p.id
where p.visibility = 'public'
group by p.id, p.name, p.visibility;

-- Test public RPC functions
select * from public_list_projects(5, 0);
select * from public_get_project('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa');
select * from public_project_stats('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa');
*/

-- ============================================================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================================================

comment on table profiles is 'Seed data includes admin, pro, and regular user profiles for testing';
comment on table projects is 'Includes both public and private projects to test visibility controls';
comment on table segments is 'Organized by topic areas within each project';
comment on table prompts is 'Mix of different prompt types (prompt, system, tool) for comprehensive testing';
comment on table validators is 'Validation rules that correspond to each prompt for quality assurance';

-- Note: This seed data provides a realistic dataset for:
-- 1. Testing public API endpoints
-- 2. Verifying RLS policies work correctly
-- 3. Demonstrating the full data hierarchy
-- 4. Validating search and discovery functions
-- 5. Testing different user roles and permissions
