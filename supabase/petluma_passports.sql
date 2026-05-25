-- PetLuma Cloud Registry (Phase 2.3)
-- Run in Supabase SQL Editor

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
  photo_url text,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists petluma_passports_identity_idx
  on public.petluma_passports (owner_email, pet_name, date_of_birth);

create index if not exists petluma_passports_passport_no_idx
  on public.petluma_passports (passport_no);

alter table public.petluma_passports enable row level security;

-- Temporary permissive policies for MVP (tighten later)
create policy "petluma_passports_public_select"
  on public.petluma_passports
  for select
  using (true);

create policy "petluma_passports_public_insert"
  on public.petluma_passports
  for insert
  with check (true);

create policy "petluma_passports_public_update"
  on public.petluma_passports
  for update
  using (true)
  with check (true);
