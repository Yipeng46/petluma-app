-- Prevent duplicate PetLuma passports for the same owner + companion
-- Run in Supabase SQL Editor after 20260519_companion_identity.sql
--
-- If unique index creation fails, inspect existing duplicates first:
--   select pet_identity_key, count(*)
--   from public.pets
--   where pet_identity_key is not null
--   group by 1
--   having count(*) > 1;
-- Resolve duplicates manually before re-running this migration.

alter table public.pets
  add column if not exists owner_email text,
  add column if not exists species text,
  add column if not exists date_of_birth date,
  add column if not exists pet_identity_key text;

create or replace function public.build_pet_identity_key(
  p_owner_email text,
  p_pet_name text,
  p_species text,
  p_date_of_birth date
)
returns text
language sql
immutable
as $$
  select
    lower(trim(coalesce(p_owner_email, ''))) || '|' ||
    lower(trim(coalesce(p_pet_name, ''))) || '|' ||
    lower(trim(coalesce(nullif(p_species, ''), 'companion'))) || '|' ||
    coalesce(to_char(p_date_of_birth, 'YYYY-MM-DD'), '');
$$;

create or replace function public.set_pet_identity_key()
returns trigger
language plpgsql
as $$
begin
  new.owner_email := lower(trim(coalesce(new.owner_email, '')));
  new.species := coalesce(nullif(trim(new.species), ''), 'Companion');
  new.pet_identity_key := public.build_pet_identity_key(
    new.owner_email,
    new.pet_name,
    new.species,
    new.date_of_birth
  );
  return new;
end;
$$;

drop trigger if exists pets_set_pet_identity_key on public.pets;

create trigger pets_set_pet_identity_key
before insert or update of owner_email, pet_name, species, date_of_birth
on public.pets
for each row
execute function public.set_pet_identity_key();

create unique index if not exists pets_pet_identity_key_key
  on public.pets (pet_identity_key)
  where pet_identity_key is not null;

create unique index if not exists pets_owner_email_pet_identity_key_key
  on public.pets (owner_email, pet_identity_key)
  where owner_email is not null
    and pet_identity_key is not null;
