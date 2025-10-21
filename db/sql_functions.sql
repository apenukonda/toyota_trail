-- SQL functions for module progress and task completion
-- Run this in Supabase SQL editor (or via psql) to install the RPC functions

-- Ensure we run in public schema

create or replace function public.update_module_task(
  module_name text,
  user_id_in uuid,
  task_index int,
  completed boolean,
  score int
)
returns int
language plpgsql
security definer
set search_path = public
as $$
declare
  tbl text;
  col_completed text;
  col_score text;
  sql text;
  m1_sum int := 0;
  m2_sum int := 0;
  m3_sum int := 0;
  total_module_progress int := 0;
  total_user_tasks int := 0;
  new_total int := 0;
begin
  -- Map module_name to table name
  tbl := case lower(module_name)
    when 'm1' then 'module_m1_progress'
    when 'm2' then 'module_m2_progress'
    when 'm3' then 'module_m3_progress'
    else null
  end;

  if tbl is null then
    raise exception 'update_module_task: invalid module_name %', module_name;
  end if;

  col_completed := format('task%s_completed', task_index);
  col_score := format('task%s_score', task_index);

  -- Upsert the specific task columns for this user. Other columns rely on defaults.
  sql := format(
    'INSERT INTO public.%I (user_id, %I, %I) VALUES ($1, $2, $3) ON CONFLICT (user_id) DO UPDATE SET %I = EXCLUDED.%I, %I = EXCLUDED.%I',
    tbl, col_completed, col_score, col_completed, col_completed, col_score, col_score
  );

  execute sql using user_id_in, completed, score;

  -- Compute sums for each module table (safely coalesced). If a table or row doesn't exist,
  -- the subselect returns null; coalesce to 0.
  begin
    select coalesce((select (
      (case when coalesce(m.task1_completed,false) then coalesce(m.task1_score,0) else 0 end)
      + (case when coalesce(m.task2_completed,false) then coalesce(m.task2_score,0) else 0 end)
      + (case when coalesce(m.task3_completed,false) then coalesce(m.task3_score,0) else 0 end)
      + (case when coalesce(m.task4_completed,false) then coalesce(m.task4_score,0) else 0 end)
      + (case when coalesce(m.task5_completed,false) then coalesce(m.task5_score,0) else 0 end)
      + (case when coalesce(m.task6_completed,false) then coalesce(m.task6_score,0) else 0 end)
    ) from module_m1_progress m where m.user_id = user_id_in), 0)
  into m1_sum;
  exception when undefined_table then
    m1_sum := 0;
  end;

  begin
    select coalesce((select (
      (case when coalesce(m.task1_completed,false) then coalesce(m.task1_score,0) else 0 end)
      + (case when coalesce(m.task2_completed,false) then coalesce(m.task2_score,0) else 0 end)
      + (case when coalesce(m.task3_completed,false) then coalesce(m.task3_score,0) else 0 end)
      + (case when coalesce(m.task4_completed,false) then coalesce(m.task4_score,0) else 0 end)
    ) from module_m2_progress m where m.user_id = user_id_in), 0)
  into m2_sum;
  exception when undefined_table then
    m2_sum := 0;
  end;

  begin
    select coalesce((select (
      (case when coalesce(m.task1_completed,false) then coalesce(m.task1_score,0) else 0 end)
      + (case when coalesce(m.task2_completed,false) then coalesce(m.task2_score,0) else 0 end)
      + (case when coalesce(m.task3_completed,false) then coalesce(m.task3_score,0) else 0 end)
      + (case when coalesce(m.task4_completed,false) then coalesce(m.task4_score,0) else 0 end)
      + (case when coalesce(m.task5_completed,false) then coalesce(m.task5_score,0) else 0 end)
    ) from module_m3_progress m where m.user_id = user_id_in), 0)
  into m3_sum;
  exception when undefined_table then
    m3_sum := 0;
  end;

  total_module_progress := coalesce(m1_sum,0) + coalesce(m2_sum,0) + coalesce(m3_sum,0);

  -- Return the module total (client or triggers are responsible for updating profiles)
  return total_module_progress;
end;
$$;


-- Ensure handle_task_completion exists and is idempotent. This RPC will upsert into user_tasks
-- and update profiles.score by summing user_tasks.
create or replace function public.handle_task_completion(
    task_id_in text,
    user_id_in uuid,
    completed_steps_in int,
    score_earned_in int
)
returns int
language plpgsql
security definer
set search_path = public
as $$
declare
  new_total_score int := 0;
begin
  insert into public.user_tasks (user_id, task_id, completed_steps, score)
  values (user_id_in, task_id_in, completed_steps_in, score_earned_in)
  on conflict (user_id, task_id)
  do update set
    completed_steps = excluded.completed_steps,
    score = excluded.score;

  -- Recompute profiles total using helper function
  perform public.recompute_profile_total(user_id_in);
  -- Fetch and return the updated profiles.score if possible
  begin
    select p.score into new_total_score from public.profiles p where p.id = user_id_in;
  exception when undefined_table then
    -- if profiles table missing, fallback to sum of user_tasks
    begin
      select coalesce(sum(ut.score),0) into new_total_score from public.user_tasks ut where ut.user_id = user_id_in;
    exception when undefined_table then
      new_total_score := 0;
    end;
  end;

  return new_total_score;
end;
$$;

-- Helper: recompute profile total from user_tasks and module progress tables
create or replace function public.recompute_profile_total(user_id_in uuid)
returns int
language plpgsql
security definer
set search_path = public
as $$
declare
  ut_sum int := 0;
  m1_sum int := 0;
  m2_sum int := 0;
  m3_sum int := 0;
  total int := 0;
begin
  -- Sum user_tasks
  begin
    select coalesce(sum(ut.score),0) into ut_sum from public.user_tasks ut where ut.user_id = user_id_in;
  exception when undefined_table then
    ut_sum := 0;
  end;

  -- Sum module progress
  begin
    select coalesce((select (coalesce(m.task1_score,0) + coalesce(m.task2_score,0) + coalesce(m.task3_score,0) + coalesce(m.task4_score,0) + coalesce(m.task5_score,0) + coalesce(m.task6_score,0)) from module_m1_progress m where m.user_id = user_id_in), 0)
    into m1_sum;
  exception when undefined_table then
    m1_sum := 0;
  end;

  begin
    select coalesce((select (coalesce(m.task1_score,0) + coalesce(m.task2_score,0) + coalesce(m.task3_score,0) + coalesce(m.task4_score,0)) from module_m2_progress m where m.user_id = user_id_in), 0)
    into m2_sum;
  exception when undefined_table then
    m2_sum := 0;
  end;

  begin
    select coalesce((select (coalesce(m.task1_score,0) + coalesce(m.task2_score,0) + coalesce(m.task3_score,0) + coalesce(m.task4_score,0) + coalesce(m.task5_score,0)) from module_m3_progress m where m.user_id = user_id_in), 0)
    into m3_sum;
  exception when undefined_table then
    m3_sum := 0;
  end;

  total := coalesce(ut_sum,0) + coalesce(m1_sum,0) + coalesce(m2_sum,0) + coalesce(m3_sum,0);

  -- Ensure profiles row exists and update score (insert if missing)
  begin
    insert into public.profiles (id, score)
    values (user_id_in, total)
    on conflict (id) do update set score = excluded.score;
  exception when undefined_table then
    null;
  end;

  return total;
end;
$$;

-- Create triggers on module progress tables to recompute profile total after changes
create or replace function public.trigger_recompute_profile_total()
returns trigger
language plpgsql
security definer
as $$
begin
  perform public.recompute_profile_total(new.user_id);
  return new;
end;
$$;

drop trigger if exists trg_recompute_profile_m1 on public.module_m1_progress;
create trigger trg_recompute_profile_m1
after insert or update on public.module_m1_progress
for each row execute procedure public.trigger_recompute_profile_total();

drop trigger if exists trg_recompute_profile_m2 on public.module_m2_progress;
create trigger trg_recompute_profile_m2
after insert or update on public.module_m2_progress
for each row execute procedure public.trigger_recompute_profile_total();

drop trigger if exists trg_recompute_profile_m3 on public.module_m3_progress;
create trigger trg_recompute_profile_m3
after insert or update on public.module_m3_progress
for each row execute procedure public.trigger_recompute_profile_total();
