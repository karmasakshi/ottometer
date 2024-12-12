-- auth.users

create or replace trigger insert_profile
after insert on auth.users
for each row
execute function insert_profile();

-- public.profiles

create or replace trigger update_updated_at
before update on public.profiles
for each row
execute function update_updated_at();

-- public.autos

create or replace trigger update_updated_at
before update on public.autos
for each row
execute function update_updated_at();

-- public.reports

create or replace trigger check_daily_report_limit
before insert on public.reports
for each row
execute function check_daily_report_limit();

create or replace trigger update_auto_id
before insert on public.reports
for each row
execute function public.update_auto_id();

create or replace trigger update_updated_at
before update on public.reports
for each row
execute function update_updated_at();
