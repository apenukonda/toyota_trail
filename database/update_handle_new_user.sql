-- Update the handle_new_user trigger function to copy more metadata into profiles
-- This should be run in Supabase SQL editor. It will replace the existing function.

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, user_id, name, department, designation, passcode, score)
  values (
    new.id,
    new.raw_user_meta_data->>'userId',
    new.raw_user_meta_data->>'name',
    new.raw_user_meta_data->>'department',
    new.raw_user_meta_data->>'designation',
    new.raw_user_meta_data->>'passcode',
    0
  );
  return new;
end;
$$ language plpgsql security definer;

-- Recreate trigger to ensure it uses the updated function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute procedure public.handle_new_user();
