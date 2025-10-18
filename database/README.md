Run these SQL files in your Supabase project (SQL editor) to make sure new user signups populate `designation`, `passcode`, and `role` into `public.profiles`, and to backfill existing profiles.

1. Open Supabase dashboard -> SQL Editor.
2. Run `update_handle_new_user_v2.sql` (this creates/updates the trigger function and ensures `profiles` has the required columns).
3. Run `backfill_profiles_from_auth.sql` to copy existing `designation` and `passcode` from `auth.users.raw_user_meta_data` into `public.profiles`.

Security note: The current implementation stores `passcode` in user metadata and copies it into `profiles`. Storing plaintext passcodes is insecure — consider using a hashed field or relying on Supabase auth passwords only. If you want, I can remove passcode propagation and store only roles/department/designation in profiles.
