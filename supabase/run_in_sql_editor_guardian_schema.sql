-- PetLuma: apply Guardian schema to live Supabase (run once in SQL Editor)
-- Fixes: Could not find the 'guardian_id' column of 'petluma_passports'
-- Safe to re-run: uses IF NOT EXISTS / IF EXISTS throughout.
--
-- Does NOT migrate or delete existing rows.
-- Keeps owner_email, guardian_email, guardian_name unchanged.

-- ── 1. Guardian profiles (required before guardian_id FK) ───────────────────
create table if not exists public.guardian_profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint guardian_profiles_email_unique unique (email)
);

comment on table public.guardian_profiles is
  'Registered Guardian profile. id matches auth.users.id from Supabase Auth.';

create index if not exists guardian_profiles_email_idx
  on public.guardian_profiles (email);

create or replace function public.set_guardian_profiles_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists guardian_profiles_set_updated_at on public.guardian_profiles;
create trigger guardian_profiles_set_updated_at
  before update on public.guardian_profiles
  for each row
  execute function public.set_guardian_profiles_updated_at();

alter table public.guardian_profiles enable row level security;

-- ── 2. petluma_passports.guardian_id ─────────────────────────────────────────
alter table public.petluma_passports
  add column if not exists guardian_id uuid;

-- Add FK only if missing (Postgres has no ADD CONSTRAINT IF NOT EXISTS before PG 9.1 workaround)
do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'petluma_passports_guardian_id_fkey'
      and conrelid = 'public.petluma_passports'::regclass
  ) then
    alter table public.petluma_passports
      add constraint petluma_passports_guardian_id_fkey
      foreign key (guardian_id)
      references public.guardian_profiles (id)
      on delete set null;
  end if;
end;
$$;

comment on column public.petluma_passports.guardian_id is
  'FK to guardian_profiles. NULL for legacy companions; set on new Passport issue.';

create index if not exists petluma_passports_guardian_id_idx
  on public.petluma_passports (guardian_id)
  where guardian_id is not null;

-- ── 3. Phase 2 RLS (My Kingdom / Guardian profile) ─────────────────────────
create or replace function public.get_auth_user_id_by_email(p_email text)
returns uuid
language sql
security definer
set search_path = auth, public
stable
as $$
  select id
  from auth.users
  where lower(trim(email)) = lower(trim(p_email))
  limit 1;
$$;

revoke all on function public.get_auth_user_id_by_email(text) from public;
grant execute on function public.get_auth_user_id_by_email(text) to service_role;

drop policy if exists "guardian_profiles_select_own" on public.guardian_profiles;
create policy "guardian_profiles_select_own"
  on public.guardian_profiles
  for select
  to authenticated
  using (auth.uid() = id);

drop policy if exists "guardian_profiles_insert_own" on public.guardian_profiles;
create policy "guardian_profiles_insert_own"
  on public.guardian_profiles
  for insert
  to authenticated
  with check (auth.uid() = id);

drop policy if exists "guardian_profiles_update_own" on public.guardian_profiles;
create policy "guardian_profiles_update_own"
  on public.guardian_profiles
  for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

drop policy if exists "petluma_passports_guardian_select_own" on public.petluma_passports;
create policy "petluma_passports_guardian_select_own"
  on public.petluma_passports
  for select
  to authenticated
  using (guardian_id = auth.uid());

-- ── 4. Verify (should return guardian_id column + guardian_profiles table) ───
select
  column_name,
  data_type,
  is_nullable
from information_schema.columns
where table_schema = 'public'
  and table_name = 'petluma_passports'
  and column_name in ('guardian_id', 'owner_email', 'guardian_email', 'guardian_name')
order by column_name;

select to_regclass('public.guardian_profiles') as guardian_profiles_table;
