-- update_handle_new_user_v2.sql
-- Idempotent migration to ensure `public.profiles` has designation, passcode, role
-- and to replace the `handle_new_user` trigger function so new signups populate those fields.

-- Add columns if they don't exist (we do NOT store passcode in profiles for security)
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS designation text;
-- ensure passcode column is removed to avoid storing plaintext secrets
ALTER TABLE public.profiles DROP COLUMN IF EXISTS passcode;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role text DEFAULT 'user';

-- Replace trigger function
create or replace function public.handle_new_user()
returns trigger
language plpgsql

security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, user_id, name, department, designation, role, score)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'userId', ''),
    coalesce(new.raw_user_meta_data->>'name', ''),
    coalesce(new.raw_user_meta_data->>'department', ''),
    nullif(coalesce(new.raw_user_meta_data->>'designation', ''), ''),
    coalesce(new.raw_user_meta_data->>'role', 'user'),
    0
  )
  on conflict (id) do update set
    user_id = excluded.user_id,
    name = excluded.name,
    department = excluded.department,
    designation = coalesce(excluded.designation, public.profiles.designation),
    role = excluded.role;

  return new;
end;
$$ language plpgsql security definer;

-- Recreate trigger to ensure it uses the updated function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute procedure public.handle_new_user();
