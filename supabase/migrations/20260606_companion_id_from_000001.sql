-- Companion IDs start at 000001 (PK-YYYY-CC-000001)

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

-- Align counters with existing passports to avoid duplicate IDs after the rule change.
insert into public.companion_identity_counters (year, region_code, last_value)
select
  (m[1])::integer as year,
  m[2] as region_code,
  max((m[3])::bigint) as last_value
from public.petluma_passports p,
  lateral regexp_match(p.companion_id, '^PK-(\d{4})-([A-Z]{2})-(\d{6})$') as m
where p.companion_id is not null
group by (m[1])::integer, m[2]
on conflict (year, region_code) do update
  set last_value = greatest(companion_identity_counters.last_value, excluded.last_value);
