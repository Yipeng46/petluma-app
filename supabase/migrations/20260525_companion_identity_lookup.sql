-- Companion identity lookup for petluma_passports (email + species + breed + gender + birthday + country_code)
-- Run in Supabase SQL Editor after petluma_passports.sql

alter table public.petluma_passports
  add column if not exists country_code text;

create index if not exists petluma_passports_companion_identity_idx
  on public.petluma_passports (
    owner_email,
    country_code,
    date_of_birth,
    species,
    breed,
    gender
  );

-- Optional backfill for legacy rows:
-- update public.petluma_passports
-- set country_code = upper(substring(companion_id from '^PK-[0-9]{4}-([A-Z]{2})-[0-9]{6}$'))
-- where country_code is null;
