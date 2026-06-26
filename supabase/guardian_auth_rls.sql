-- PetLuma Guardian Account — Phase 2 (Auth RLS + helper)
-- Run once in Supabase SQL Editor (same content as migrations/20260608_guardian_auth_rls.sql)

create or replace function public.get_auth_user_id_by_email(p_email text)
returns uuid
language sql
security definer
set search_path = auth, public
stable
as $$
  select id
  from auth.users
  where lower(trim(email)) = lower(trim(p_email))
  limit 1;
$$;

revoke all on function public.get_auth_user_id_by_email(text) from public;
grant execute on function public.get_auth_user_id_by_email(text) to service_role;

drop policy if exists "guardian_profiles_select_own" on public.guardian_profiles;
create policy "guardian_profiles_select_own"
  on public.guardian_profiles
  for select
  to authenticated
  using (auth.uid() = id);

drop policy if exists "guardian_profiles_insert_own" on public.guardian_profiles;
create policy "guardian_profiles_insert_own"
  on public.guardian_profiles
  for insert
  to authenticated
  with check (auth.uid() = id);

drop policy if exists "guardian_profiles_update_own" on public.guardian_profiles;
create policy "guardian_profiles_update_own"
  on public.guardian_profiles
  for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

drop policy if exists "petluma_passports_guardian_select_own" on public.petluma_passports;
create policy "petluma_passports_guardian_select_own"
  on public.petluma_passports
  for select
  to authenticated
  using (guardian_id = auth.uid());
