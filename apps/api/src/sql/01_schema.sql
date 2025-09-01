-- PromptRepo Database Schema
-- Version: 1.0
-- Description: Initial schema with profiles, projects, segments, prompts, validators, versions, and billing

-- Enable required extensions
create extension if not exists "pgcrypto";
create extension if not exists "uuid-ossp";

-- Profiles table - User accounts and roles
create table profiles (
  id uuid primary key default auth.uid(),
  handle text unique not null,
  name text,
  role text check (role in ('user', 'pro', 'admin')) default 'user',
  stripe_customer_id text,
  theme_pref text check (theme_pref in ('light', 'dark')) default 'light',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Projects table - Top-level containers for prompts
create table projects (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references profiles(id) on delete cascade,
  name text not null,
  description text,
  visibility text check (visibility in ('private', 'public')) default 'private',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Segments table - Collections/folders within projects
create table segments (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  name text not null,
  position int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Prompts table - Individual prompts within segments
create table prompts (
  id uuid primary key default gen_random_uuid(),
  segment_id uuid not null references segments(id) on delete cascade,
  title text not null,
  body text not null,
  language text default 'pt-BR',
  kind text check (kind in ('prompt', 'system', 'tool')) default 'prompt',
  position int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Validators table - Validation rules for prompts
create table validators (
  id uuid primary key default gen_random_uuid(),
  prompt_id uuid not null references prompts(id) on delete cascade,
  title text not null,
  body text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Versions table - Audit trail and versioning
create table versions (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null check (entity_type in ('project', 'segment', 'prompt', 'validator')),
  entity_id uuid not null,
  snapshot jsonb not null,
  author_id uuid references profiles(id) on delete set null,
  created_at timestamptz default now()
);

-- Billing table - Subscription and payment information
create table billing (
  profile_id uuid primary key references profiles(id) on delete cascade,
  plan text check (plan in ('free', 'pro')) default 'free',
  current_period_end timestamptz,
  status text check (status in ('active', 'past_due', 'canceled', 'incomplete')),
  updated_at timestamptz default now()
);

-- Comments for documentation
comment on table profiles is 'User profiles with role-based access control';
comment on table projects is 'Top-level containers for organizing prompts';
comment on table segments is 'Collections or folders within projects';
comment on table prompts is 'Individual prompts with metadata';
comment on table validators is 'Validation rules and tests for prompts';
comment on table versions is 'Audit trail for all entity changes';
comment on table billing is 'Subscription and billing information';

comment on column profiles.handle is 'Unique username/handle for the user';
comment on column profiles.role is 'User role: user (free), pro (paid), admin (staff)';
comment on column profiles.theme_pref is 'UI theme preference for P5.0';
comment on column projects.visibility is 'Project visibility: private or public';
comment on column prompts.kind is 'Type of prompt: prompt (user), system (AI), tool (function)';
comment on column prompts.language is 'Language code for the prompt content';
comment on column versions.snapshot is 'JSON snapshot of entity state before change';
comment on column billing.plan is 'Subscription plan level';
comment on column billing.status is 'Current subscription status';
