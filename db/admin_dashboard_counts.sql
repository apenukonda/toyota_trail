-- RPC to return admin dashboard counts in one row.
-- Run this in Supabase SQL editor as a security-definer function (owner role) so it can count across tables.

create or replace function public.admin_dashboard_counts()
returns table(
  total_users int,
  slogans int,
  image_submitters int,
  completed_all int
)
language plpgsql security definer set search_path = public
as $$
begin
  -- total users from profiles
  select count(*) into total_users from public.profiles;

  -- slogans count: number of rows in user_slogans
  select count(*) into slogans from public.user_slogans;

  -- distinct image submitters
  select count(distinct user_id) into image_submitters from public.image_submissions;

  -- completed all modules: users who have all taskN_completed = true in m1,m2,m3
  select count(*) into completed_all from (
    select p.id from public.profiles p
    join public.module_m1_progress m1 on m1.user_id = p.id
    join public.module_m2_progress m2 on m2.user_id = p.id
    join public.module_m3_progress m3 on m3.user_id = p.id
    where (m1.task1_completed is true and m1.task2_completed is true and m1.task3_completed is true and m1.task4_completed is true and m1.task5_completed is true and m1.task6_completed is true)
      and (m2.task1_completed is true and m2.task2_completed is true and m2.task3_completed is true and m2.task4_completed is true)
      and (m3.task1_completed is true and m3.task2_completed is true and m3.task3_completed is true and m3.task4_completed is true and m3.task5_completed is true)
  ) t;

  return next;
end;
$$;

-- Grant execute to anon (optional) if you want the client to be able to call it directly
-- grant execute on function public.admin_dashboard_counts() to public;
