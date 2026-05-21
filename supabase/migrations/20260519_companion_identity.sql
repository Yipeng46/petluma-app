-- PetLuma Companion Identity Number (CIN) system
-- Run in Supabase SQL Editor or via supabase db push

alter table public.pets
  add column if not exists companion_id text,
  add column if not exists passport_number text;

create unique index if not exists pets_companion_id_key
  on public.pets (companion_id)
  where companion_id is not null;

create unique index if not exists pets_passport_number_key
  on public.pets (passport_number)
  where passport_number is not null;

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
begin
  insert into public.companion_identity_counters as counters (year, region_code, last_value)
  values (v_year, v_region, 1)
  on conflict (year, region_code)
  do update
    set last_value = counters.last_value + 1
  returning counters.last_value into v_sequence;

  companion_id := format('PK-%s-%s-%s', v_year, v_region, lpad(v_sequence::text, 6, '0'));
  passport_number := format('PLM-%s-%s', v_year, lpad(v_sequence::text, 6, '0'));
  sequence_value := v_sequence;

  return next;
end;
$$;

grant execute on function public.allocate_companion_identity(text) to service_role;
