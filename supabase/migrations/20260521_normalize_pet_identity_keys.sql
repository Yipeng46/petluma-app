-- Normalize pet identity keys for duplicate prevention
-- Run in Supabase SQL Editor after 20260520_prevent_duplicate_passports.sql
--
-- Inspect rows that would collide after normalization (manual cleanup only):
--   select
--     public.build_pet_identity_key(owner_email, pet_name, species, date_of_birth) as normalized_key,
--     array_agg(id order by created_at) as pet_ids,
--     array_agg(pet_name order by created_at) as pet_names,
--     count(*) as row_count
--   from public.pets
--   group by 1
--   having count(*) > 1;
--
-- Inspect legacy rows whose stored key differs from the normalized key:
--   select id, pet_name, owner_email, species, date_of_birth, pet_identity_key,
--          public.build_pet_identity_key(owner_email, pet_name, species, date_of_birth) as normalized_key
--   from public.pets
--   where pet_identity_key is distinct from
--         public.build_pet_identity_key(owner_email, pet_name, species, date_of_birth);

create or replace function public.normalize_identity_text(p_value text)
returns text
language sql
immutable
as $$
  select lower(
    trim(
      regexp_replace(coalesce(p_value, ''), '\s+', ' ', 'g')
    )
  );
$$;

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
    public.normalize_identity_text(p_owner_email) || '|' ||
    public.normalize_identity_text(p_pet_name) || '|' ||
    coalesce(
      nullif(public.normalize_identity_text(p_species), ''),
      'companion'
    ) || '|' ||
    coalesce(to_char(p_date_of_birth, 'YYYY-MM-DD'), '');
$$;

create or replace function public.set_pet_identity_key()
returns trigger
language plpgsql
as $$
begin
  new.owner_email := public.normalize_identity_text(new.owner_email);
  new.pet_name := trim(regexp_replace(coalesce(new.pet_name, ''), '\s+', ' ', 'g'));
  new.species := coalesce(
    nullif(trim(regexp_replace(coalesce(new.species, ''), '\s+', ' ', 'g')), ''),
    'Companion'
  );
  new.pet_identity_key := public.build_pet_identity_key(
    new.owner_email,
    new.pet_name,
    new.species,
    new.date_of_birth
  );
  return new;
end;
$$;

create or replace function public.find_pet_by_identity(
  p_owner_email text,
  p_pet_name text,
  p_species text,
  p_date_of_birth date
)
returns setof public.pets
language sql
stable
security definer
set search_path = public
as $$
  select *
  from public.pets
  where pet_identity_key = public.build_pet_identity_key(
    p_owner_email,
    p_pet_name,
    p_species,
    p_date_of_birth
  )
  order by created_at asc
  limit 1;
$$;

grant execute on function public.find_pet_by_identity(text, text, text, date) to service_role;

-- Optional: recompute keys for existing rows after resolving duplicate groups above.
-- update public.pets
-- set
--   owner_email = owner_email,
--   pet_name = pet_name,
--   species = species,
--   date_of_birth = date_of_birth;
