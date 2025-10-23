-- RPC to return per-task completion counts for modules m1, m2, m3
-- Run this in Supabase SQL editor as a security-definer function

create or replace function public.admin_quiz_completion_counts()
returns table(task text, m1 int, m2 int, m3 int)
language plpgsql security definer set search_path = public
as $$
begin
  -- task1
  task := 'task1';
  select count(distinct user_id) into m1 from public.module_m1_progress where coalesce(task1_completed,false) = true;
  select count(distinct user_id) into m2 from public.module_m2_progress where coalesce(task1_completed,false) = true;
  select count(distinct user_id) into m3 from public.module_m3_progress where coalesce(task1_completed,false) = true;
  return next;

  -- task2
  task := 'task2';
  select count(distinct user_id) into m1 from public.module_m1_progress where coalesce(task2_completed,false) = true;
  select count(distinct user_id) into m2 from public.module_m2_progress where coalesce(task2_completed,false) = true;
  select count(distinct user_id) into m3 from public.module_m3_progress where coalesce(task2_completed,false) = true;
  return next;

  -- task3
  task := 'task3';
  select count(distinct user_id) into m1 from public.module_m1_progress where coalesce(task3_completed,false) = true;
  select count(distinct user_id) into m2 from public.module_m2_progress where coalesce(task3_completed,false) = true;
  select count(distinct user_id) into m3 from public.module_m3_progress where coalesce(task3_completed,false) = true;
  return next;

  -- task4
  task := 'task4';
  select count(distinct user_id) into m1 from public.module_m1_progress where coalesce(task4_completed,false) = true;
  select count(distinct user_id) into m2 from public.module_m2_progress where coalesce(task4_completed,false) = true;
  select count(distinct user_id) into m3 from public.module_m3_progress where coalesce(task4_completed,false) = true;
  return next;

  -- task5
  task := 'task5';
  select count(distinct user_id) into m1 from public.module_m1_progress where coalesce(task5_completed,false) = true;
  -- m2 has no task5, so zero
  m2 := 0;
  select count(distinct user_id) into m3 from public.module_m3_progress where coalesce(task5_completed,false) = true;
  return next;

  -- task6
  task := 'task6';
  select count(distinct user_id) into m1 from public.module_m1_progress where coalesce(task6_completed,false) = true;
  -- m2/m3 don't have task6
  m2 := 0;
  m3 := 0;
  return next;
end;
$$;

-- Optionally grant execute to anon if desired:
-- grant execute on function public.admin_quiz_completion_counts() to public;
