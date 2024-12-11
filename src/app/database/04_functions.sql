create or replace function check_daily_report_limit()
returns trigger
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

create or replace function update_updated_at()
returns trigger
set search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;