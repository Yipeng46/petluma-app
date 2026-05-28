-- PetLuma Cloud Registry (Phase 2.3)
-- Run in Supabase SQL Editor
-- Safe for existing tables: adds missing columns before creating indexes.

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
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.petluma_passports
  add column if not exists owner_email text,
  add column if not exists species text,
  add column if not exists breed text,
  add column if not exists gender text,
  add column if not exists date_of_birth text,
  add column if not exists country_code text,
  add column if not exists place_of_origin text,
  add column if not exists photo_url text,
  add column if not exists status text default 'active',
  add column if not exists created_at timestamptz default now(),
  add column if not exists updated_at timestamptz default now();

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

alter table public.petluma_passports enable row level security;

drop policy if exists "petluma_passports_public_select" on public.petluma_passports;
create policy "petluma_passports_public_select"
  on public.petluma_passports
  for select
  using (true);

drop policy if exists "petluma_passports_public_insert" on public.petluma_passports;
create policy "petluma_passports_public_insert"
  on public.petluma_passports
  for insert
  with check (true);

drop policy if exists "petluma_passports_public_update" on public.petluma_passports;
create policy "petluma_passports_public_update"
  on public.petluma_passports
  for update
  using (true)
  with check (true);

notify pgrst, 'reload schema';
