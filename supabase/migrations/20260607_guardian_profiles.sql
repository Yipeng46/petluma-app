-- PetLuma Guardian Account — Phase 1 (database structure only)
-- Links Supabase Auth users to companion ownership via guardian_profiles + guardian_id.
-- Does NOT migrate existing rows; guardian_id stays NULL until Phase 2+.

-- ── 1. Guardian profiles ──────────────────────────────────────────────────────
create table if not exists public.guardian_profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint guardian_profiles_email_unique unique (email)
);

comment on table public.guardian_profiles is
  'Registered Guardian (user) profile. id matches auth.users.id from Supabase Auth.';

comment on column public.guardian_profiles.display_name is
  'Optional display name chosen by the Guardian.';

create index if not exists guardian_profiles_email_idx
  on public.guardian_profiles (email);

create or replace function public.set_guardian_profiles_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists guardian_profiles_set_updated_at on public.guardian_profiles;
create trigger guardian_profiles_set_updated_at
  before update on public.guardian_profiles
  for each row
  execute function public.set_guardian_profiles_updated_at();

alter table public.guardian_profiles enable row level security;

-- No client-facing RLS policies in Phase 1.
-- Service role (server-side) bypasses RLS; login policies ship in Phase 2.

-- ── 2. Companion → Guardian link ────────────────────────────────────────────
alter table public.petluma_passports
  add column if not exists guardian_id uuid references public.guardian_profiles (id) on delete set null;

comment on column public.petluma_passports.guardian_id is
  'Optional FK to guardian_profiles. NULL for legacy companions created before Guardian accounts.';

create index if not exists petluma_passports_guardian_id_idx
  on public.petluma_passports (guardian_id)
  where guardian_id is not null;
