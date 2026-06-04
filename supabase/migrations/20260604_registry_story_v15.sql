-- PetLuma V1.5 — Story Archive, public registry, future guardian fields

alter table public.petluma_passports
  add column if not exists story text,
  add column if not exists special_memory text,
  add column if not exists favorite_things text,
  add column if not exists is_public boolean not null default false,
  add column if not exists guardian_email text,
  add column if not exists guardian_name text;

create index if not exists petluma_passports_public_registry_idx
  on public.petluma_passports (is_public, created_at desc)
  where is_public = true and status = 'active';

-- Community companion IDs start at 001001 (founding reserves 000001–000100)
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
