-- Migrate legacy pets rows into petluma_passports (idempotent)
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
