-- Backfill existing rows in public.profiles from auth.users metadata
-- Run this in Supabase SQL editor to copy designation and passcode from auth.users into profiles.

-- Make sure the columns exist in public.profiles before running (designation, passcode)
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS designation text;

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS passcode text;

-- Backfill from auth.users raw_user_meta_data
UPDATE public.profiles p
SET designation = u.raw_user_meta_data->>'designation',
    passcode = u.raw_user_meta_data->>'passcode'
FROM auth.users u
WHERE p.id = u.id
  AND (p.designation IS NULL OR p.passcode IS NULL);

-- Verify rows updated
SELECT id, user_id, name, department, designation, passcode FROM public.profiles LIMIT 50;
