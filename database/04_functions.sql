create or replace function public.check_daily_report_limit()
returns trigger
security definer
set search_path = '' as $$
begin
  if (select count(*) 
    from public.reports 
    where reporter_id = new.reporter_id 
      and created_at::date = current_date) >= 5 then
    raise exception 'Daily report limit (5) exhausted.';
  end if;
  return new;
end;
$$ language plpgsql;

--

create or replace function public.insert_profile()
returns trigger
security definer
set search_path = '' as $$
declare
  generated_username text;
begin
  loop
    generated_username := 'user_' || substring(md5(random()::text) from 1 for 8);
    exit when not exists (select 1 from public.profiles where username = generated_username);
  end loop;
  insert into public.profiles (id, avatar_url, username)
  values (new.id, 'https://avatar.iran.liara.run/public?username=' || generated_username, generated_username);
  return new;
end;
$$ language plpgsql;

--

create or replace function public.update_auto_id()
returns trigger
security definer
set search_path = '' as $$
declare
  auto_id uuid;
begin
  select id into auto_id
  from public.autos
  where plate_state_code = upper(new.auto_plate_state_code)
    and plate_district_code = new.auto_plate_district_code
    and plate_series_code = upper(new.auto_plate_series_code)
    and plate_vehicle_number = new.auto_plate_vehicle_number;
  if auto_id is null then
    insert into public.autos (plate_state_code, plate_district_code, plate_series_code, plate_vehicle_number)
    values (upper(new.auto_plate_state_code), new.auto_plate_district_code, upper(new.auto_plate_series_code), new.auto_plate_vehicle_number)
    returning id into auto_id;
  end if;
  new.auto_id := auto_id;
  return new;
end;
$$ language plpgsql;

--

create or replace function public.update_updated_at()
returns trigger
security definer
set search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

--

create or replace function public.update_leaderboard_top_reporters()
returns void
security definer
set search_path = '' as $$
begin
  truncate table public.leaderboard_top_reporters;
  insert into public.leaderboard_top_reporters (reporter_avatar_url, reporter_username, meter_correct_reports_count, meter_incorrect_reports_count, total_reports_count)
  select 
    p.avatar_url,
    p.username,
    count(case when r.type = 'meter_correct' then 1 end) as meter_correct_reports_count,
    count(case when r.type = 'meter_incorrect' then 1 end) as meter_incorrect_reports_count,
    count(r.id) as total_reports_count
  from public.reports r
  join public.profiles p on r.reporter_id = p.id
  group by p.id
  order by total_reports_count desc
  limit 10;
end;
$$ language plpgsql;

--

create or replace function public.update_leaderboard_top_fair_autos()
returns void
security definer
set search_path = '' as $$
begin
  truncate table public.leaderboard_top_fair_autos;
  insert into public.leaderboard_top_fair_autos (auto_id, auto_plate_state_code, auto_plate_district_code, auto_plate_series_code, auto_plate_vehicle_number, meter_correct_reports_count, meter_incorrect_reports_count)
  select 
    a.id,
    a.plate_state_code,
    a.plate_district_code,
    a.plate_series_code,
    a.plate_vehicle_number,
    count(case when r.type = 'meter_correct' then 1 end) as meter_correct_reports_count,
    count(case when r.type = 'meter_incorrect' then 1 end) as meter_incorrect_reports_count
  from public.reports r
  join public.autos a on r.auto_id = a.id
  group by a.id
  order by meter_correct_reports_count desc
  limit 10; 
end;
$$ language plpgsql;

--

create or replace function public.update_leaderboard_top_unfair_autos()
returns void
security definer
set search_path = '' as $$
begin
  truncate table public.leaderboard_top_unfair_autos;
  insert into public.leaderboard_top_unfair_autos (auto_id, auto_plate_state_code, auto_plate_district_code, auto_plate_series_code, auto_plate_vehicle_number, meter_correct_reports_count, meter_incorrect_reports_count)
  select 
    a.id,
    a.plate_state_code,
    a.plate_district_code,
    a.plate_series_code,
    a.plate_vehicle_number,
    count(case when r.type = 'meter_correct' then 1 end) as meter_correct_reports_count,
    count(case when r.type = 'meter_incorrect' then 1 end) as meter_incorrect_reports_count
  from public.reports r
  join public.autos a on r.auto_id = a.id
  group by a.id
  order by meter_incorrect_reports_count desc
  limit 10;
end;
$$ language plpgsql;