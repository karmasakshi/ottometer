create or replace function public.check_daily_report_limit()
returns trigger
language plpgsql
security definer
set search_path = '' as
$$
  begin
    if (select count(*) from public.reports where reporter_id = new.reporter_id and created_at::date = current_date) >= 5 then
      raise exception 'Daily report limit (5) exhausted.';
    end if;
    return new;
  end;
$$;

--

create or replace function public.insert_profile()
returns trigger
language plpgsql
security definer
set search_path = '' as
$$
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
$$;

--

create or replace function public.update_auto_id()
returns trigger
language plpgsql
security definer
set search_path = '' as
$$
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
$$;

--

create or replace function public.update_updated_at()
returns trigger
language plpgsql
security definer
set search_path = '' as
$$
  begin
    new.updated_at = now();
    return new;
  end;
$$;

--

create or replace function public.update_leaderboard_top_reporters()
returns void
language plpgsql
security definer
set search_path = '' as
$$
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
$$;

--

create or replace function public.update_leaderboard_top_fair_autos()
returns void
language plpgsql
security definer
set search_path = '' as
$$
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
$$;

--

create or replace function public.update_leaderboard_top_unfair_autos()
returns void
language plpgsql
security definer
set search_path = '' as
$$
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
$$;

--

create or replace function public.select_reports(
  x_page_number int default 1,
  x_page_size int default 10,
  x_auto_id uuid default null,
  x_type public.report_type default null
)
returns table (
  total_count bigint,
  id uuid,
  auto_id uuid,
  auto_plate_state_code text,
  auto_plate_district_code text,
  auto_plate_series_code text,
  auto_plate_vehicle_number text,
  reporter_id uuid,
  area_from text,
  area_to text,
  fare_difference_in_inr real,
  meter_distance_in_km real,
  meter_fare_in_inr real,
  meter_waiting_time_in_min real,
  is_tamper_indicator_on boolean,
  time_in timestamp with time zone,
  time_out timestamp with time zone,
  type public.report_type,
  created_at timestamp with time zone,
  updated_at timestamp with time zone
)
language plpgsql
security invoker
set search_path = '' as
$$
  begin
    if x_page_number <= 0 or x_page_number > 10000 then
      raise exception 'Invalid x_page_number: %. Must be between 1 and 10000.', x_page_number;
    end if;
    if x_page_size <= 0 or x_page_size > 1000 then
      raise exception 'Invalid x_page_size: %. Must be between 1 and 1000.', x_page_size;
    end if;
    if x_auto_id is not null and not (x_auto_id::text ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$') then
      raise exception 'Invalid x_auto_id: %. Must be a valid UUID.', x_auto_id;
    end if;
    if x_type is not null and not exists (select 1 from pg_enum where enumtypid = 'public.report_type'::regtype and enumlabel = x_type::text) then
      raise exception 'Invalid x_type: %. Must be a valid report type.', x_type;
    end if;
    return query
    select
      total_count.total_count,
      r.id,
      r.auto_id,
      r.auto_plate_state_code,
      r.auto_plate_district_code,
      r.auto_plate_series_code,
      r.auto_plate_vehicle_number,
      r.reporter_id,
      r.area_from,
      r.area_to,
      r.fare_difference_in_inr,
      r.meter_distance_in_km,
      r.meter_fare_in_inr,
      r.meter_waiting_time_in_min,
      r.is_tamper_indicator_on,
      r.time_in,
      r.time_out,
      r.type,
      r.created_at,
      r.updated_at
    from (
      select count(*) as total_count
      from public.reports r
      where
        r.reporter_id = auth.uid()
        and (x_type is null or r.type = x_type)
        and (x_auto_id is null or r.auto_id = x_auto_id)
    ) total_count,
    lateral (
      select *
      from public.reports r
      where
        r.reporter_id = auth.uid()
        and (x_type is null or r.type = x_type)
        and (x_auto_id is null or r.auto_id = x_auto_id)
      order by r.created_at desc
      limit x_page_size offset (x_page_number - 1) * x_page_size
    ) r;
  end;
$$;

--

create or replace function select_auto_with_reports_count(
  x_plate_state_code text,
  x_plate_district_code text,
  x_plate_series_code text,
  x_plate_vehicle_number text
)
returns table (
  id uuid,
  plate_state_code text,
  plate_district_code text,
  plate_series_code text,
  plate_vehicle_number text,
  created_at timestamptz,
  updated_at timestamptz,
  meter_correct_reports_count bigint,
  meter_incorrect_reports_count bigint,
  total_reports_count bigint
)
language plpgsql
security definer
set search_path = '' as
$$
  begin
    x_plate_state_code := upper(trim(x_plate_state_code));
    x_plate_district_code := trim(x_plate_district_code);
    x_plate_series_code := upper(trim(x_plate_series_code));
    x_plate_vehicle_number := trim(x_plate_vehicle_number);
    if length(x_plate_state_code) != 2 or not (x_plate_state_code ~ '^[A-Z]{2}$') then
        raise exception 'invalid plate_state_code: %. must be 2 uppercase letters.', x_plate_state_code;
    end if;
    if length(x_plate_district_code) != 2 or not (x_plate_district_code ~ '^\d{2}$') then
        raise exception 'invalid plate_district_code: %. must be 2 digits.', x_plate_district_code;
    end if;
    if length(x_plate_series_code) > 2 or not (x_plate_series_code ~ '^[A-Z]{1,2}$') then
        raise exception 'invalid plate_series_code: %. must be 1 or 2 uppercase letters.', x_plate_series_code;
    end if;
    if length(x_plate_vehicle_number) != 4 or not (x_plate_vehicle_number ~ '^\d{4}$') then
        raise exception 'invalid plate_vehicle_number: %. must be 4 digits.', x_plate_vehicle_number;
    end if;
    return query
    select 
        a.id,
        a.plate_state_code,
        a.plate_district_code,
        a.plate_series_code,
        a.plate_vehicle_number,
        a.created_at,
        a.updated_at,
        count(case when r.type = 'meter_correct' then 1 end) as meter_correct_reports_count,
        count(case when r.type = 'meter_incorrect' then 1 end) as meter_incorrect_reports_count,
        count(*) as total_reports_count
    from 
        public.autos a
    left join 
        public.reports r 
    on 
        a.id = r.auto_id
    where 
        a.plate_state_code = x_plate_state_code
        and a.plate_district_code = x_plate_district_code
        and a.plate_series_code = x_plate_series_code
        and a.plate_vehicle_number = x_plate_vehicle_number
    group by 
        a.id, a.plate_state_code, a.plate_district_code, a.plate_series_code, a.plate_vehicle_number, a.created_at, a.updated_at;
  end;
$$;
