-- PetLuma Cloud Registry — add missing columns on public.petluma_passports
--
-- Safe migration:
--   - no DELETE / TRUNCATE / DROP
--   - no table rebuild
--   - only ADD COLUMN IF NOT EXISTS
--
-- Prerequisite:
--   If public.petluma_passports does not exist yet, run supabase/petluma_passports.sql
--   once in Supabase SQL Editor before this migration.
--
-- Code writes these fields on insert (see src/lib/registry.ts → toCloudRegistryPayload):
--   passport_no, companion_id, owner_email, pet_name, species, breed, gender,
--   date_of_birth, place_of_origin, country_code, photo_url, status, updated_at
--
-- Note: the app uses owner_email (not a separate "email" column).

alter table public.petluma_passports
  add column if not exists owner_email text,
  add column if not exists species text,
  add column if not exists breed text,
  add column if not exists gender text,
  add column if not exists date_of_birth text,
  add column if not exists country_code text,
  add column if not exists place_of_origin text,
  add column if not exists photo_url text,
  add column if not exists status text,
  add column if not exists created_at timestamptz default now(),
  add column if not exists updated_at timestamptz default now();

-- Optional backfill for legacy rows missing country_code
update public.petluma_passports
set country_code = upper(substring(companion_id from '^PK-[0-9]{4}-([A-Z]{2})-[0-9]{6}$'))
where country_code is null
  and companion_id ~ '^PK-[0-9]{4}-[A-Z]{2}-[0-9]{6}$';

update public.petluma_passports
set updated_at = coalesce(updated_at, created_at, now())
where updated_at is null;

create index if not exists petluma_passports_companion_identity_idx
  on public.petluma_passports (
    owner_email,
    country_code,
    date_of_birth,
    species,
    breed,
    gender
  );

-- Refresh PostgREST / Supabase API schema cache
notify pgrst, 'reload schema';
