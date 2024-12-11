create or replace function check_daily_report_limit()
returns trigger
security definer
set search_path = '' as $$
begin
  if (select count(*) 
      from reports 
      where reporter_id = new.reporter_id 
        and created_at::date = current_date) >= 5 then
    raise exception 'Daily report limit (5) reached.';
  end if;
  return new;
end;
$$ language plpgsql;

--

create or replace function insert_profile()
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

create or replace function insert_report_and_auto()
returns trigger
security definer
set search_path = '' as $$
declare
    new_auto_id uuid;
begin
    select id into new_auto_id
    from autos
    where plate_state_code = new.plate_state_code
      and plate_district_code = new.plate_district_code
      and plate_series_code = new.plate_series_code
      and plate_vehicle_number = new.plate_vehicle_number;
    if new_auto_id is null then
      insert into autos (plate_state_code, plate_district_code, plate_series_code, plate_vehicle_number)
      values (new.plate_state_code, new.plate_district_code, new.plate_series_code, new.plate_vehicle_number)
      returning id into new_auto_id;
    end if;
    insert into reports (auto_id, reporter_id, area_from, area_to, fare_difference_in_inr, meter_distance_in_km, meter_fare_in_inr, meter_waiting_time_in_min, is_tamper_indicator_on, time_in, time_out, type)
    values (new_auto_id, new.reporter_id, new.area_from, new.area_to, new.fare_difference_in_inr, new.meter_distance_in_km, new.meter_fare_in_inr, new.meter_waiting_time_in_min, new.is_tamper_indicator_on, new.time_in, new.time_out, new.type);
    return new;
end;
$$ language plpgsql;

--

create or replace function update_updated_at()
returns trigger
security definer
set search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;