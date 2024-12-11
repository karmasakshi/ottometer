create or replace function check_daily_report_limit()
returns trigger as $$
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

create or replace function insert_auto()
returns trigger as $$
begin
  insert into autos (plate_state_code, plate_district_code, plate_series_code, plate_vehicle_number)
  values (new.plate_state_code, new.plate_district_code, new.plate_series_code, new.plate_vehicle_number)
  on conflict (plate_state_code, plate_district_code, plate_series_code, plate_vehicle_number) 
  do nothing;
  return new;
end;
$$ language plpgsql;

--

create or replace function insert_profile()
returns trigger as $$
declare
  generated_username text;
begin
  loop
    generated_username := 'user_' || substring(md5(random()::text) from 1 for 8);
    exit when not exists (select 1 from public.profiles where username = generated_username);
  end loop;
  insert into public.profiles (id, username)
  values (new.id, generated_username);
  return new;
end;
$$ language plpgsql;

--

create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;