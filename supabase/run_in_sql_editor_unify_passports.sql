-- PetLuma: unify on petluma_passports (run once in Supabase SQL Editor)
-- Project: use the same project as SUPABASE_URL / NEXT_PUBLIC_SUPABASE_URL
-- Order: base table → V1.5 columns → policies → migrate pets → identity RPC

-- ── 1. Base table (skip if you already have petluma_passports from petluma_passports.sql) ──
create table if not exists public.petluma_passports (
  id uuid primary key default gen_random_uuid(),
  passport_no text unique not null,
  companion_id text unique not null,
  owner_email text not null,
  pet_name text not null,
  species text,
  breed text,
  gender text,
  date_of_birth text,
  place_of_origin text,
  country_code text,
  photo_url text,
  story text,
  special_memory text,
  favorite_things text,
  is_public boolean not null default false,
  guardian_email text,
  guardian_name text,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── 2. V1.5 columns (20260604_registry_story_v15.sql — safe if table already existed) ──
alter table public.petluma_passports
  add column if not exists story text,
  add column if not exists special_memory text,
  add column if not exists favorite_things text,
  add column if not exists is_public boolean not null default false,
  add column if not exists guardian_email text,
  add column if not exists guardian_name text;

create index if not exists petluma_passports_companion_identity_idx
  on public.petluma_passports (
    owner_email,
    country_code,
    date_of_birth,
    species,
    breed,
    gender
  );

create index if not exists petluma_passports_identity_idx
  on public.petluma_passports (owner_email, pet_name, date_of_birth);

create index if not exists petluma_passports_passport_no_idx
  on public.petluma_passports (passport_no);

create index if not exists petluma_passports_public_registry_idx
  on public.petluma_passports (is_public, created_at desc)
  where is_public = true and status = 'active';

alter table public.petluma_passports enable row level security;

drop policy if exists "petluma_passports_public_select" on public.petluma_passports;
create policy "petluma_passports_public_select"
  on public.petluma_passports for select using (true);

drop policy if exists "petluma_passports_public_insert" on public.petluma_passports;
create policy "petluma_passports_public_insert"
  on public.petluma_passports for insert with check (true);

drop policy if exists "petluma_passports_public_update" on public.petluma_passports;
create policy "petluma_passports_public_update"
  on public.petluma_passports for update using (true) with check (true);

-- ── 3. Migrate existing pets → petluma_passports ──
insert into public.petluma_passports (
  passport_no,
  companion_id,
  owner_email,
  pet_name,
  species,
  breed,
  photo_url,
  date_of_birth,
  country_code,
  status,
  is_public,
  created_at,
  updated_at
)
select
  p.passport_number,
  p.companion_id,
  coalesce(nullif(trim(p.owner_email), ''), 'unknown@petluma.local'),
  coalesce(nullif(trim(p.pet_name), ''), 'Companion'),
  p.species,
  p.breed,
  p.photo_url,
  coalesce(p.date_of_birth::text, ''),
  nullif(split_part(p.companion_id, '-', 3), ''),
  'active',
  false,
  coalesce(p.created_at, now()),
  coalesce(p.created_at, now())
from public.pets p
where p.companion_id is not null
  and p.passport_number is not null
on conflict (companion_id) do nothing;

-- ── 4. Community companion IDs from 001001 (20260604) ──
create table if not exists public.companion_identity_counters (
  year integer not null,
  region_code text not null default 'AU',
  last_value bigint not null default 0,
  primary key (year, region_code)
);

create or replace function public.allocate_companion_identity(
  p_region_code text default 'AU'
)
returns table (
  companion_id text,
  passport_number text,
  sequence_value bigint
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_year integer := extract(year from timezone('utc', now()))::integer;
  v_region text := upper(coalesce(nullif(trim(p_region_code), ''), 'AU'));
  v_sequence bigint;
  v_companion_sequence bigint;
begin
  insert into public.companion_identity_counters as counters (year, region_code, last_value)
  values (v_year, v_region, 1001)
  on conflict (year, region_code)
  do update
    set last_value = greatest(counters.last_value + 1, 1001)
  returning counters.last_value into v_sequence;

  v_companion_sequence := greatest(v_sequence, 1001);

  companion_id := format('PK-%s-%s-%s', v_year, v_region, lpad(v_companion_sequence::text, 6, '0'));
  passport_number := format('PLM-%s-%s', v_year, lpad(v_companion_sequence::text, 6, '0'));
  sequence_value := v_companion_sequence;

  return next;
end;
$$;

grant execute on function public.allocate_companion_identity(text) to service_role;

-- Verify:
-- select count(*) from public.petluma_passports;
-- select companion_id, status, is_public from public.petluma_passports order by created_at desc limit 10;
