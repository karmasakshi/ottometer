-- auth.users

create trigger insert_profile
after insert on auth.users
for each row
execute function insert_profile();

-- public.profiles

create trigger update_updated_at
before update on public.profiles
for each row execute function update_updated_at();

-- public.autos

create trigger update_updated_at
before update on public.autos
for each row execute function update_updated_at();

-- public.reports

create trigger update_updated_at
before update on public.reports
for each row execute function update_updated_at();

create trigger insert_auto
before insert on public.reports
for each row execute function insert_auto();

create trigger check_daily_report_limit
before insert on reports
for each row
execute function check_daily_report_limit();
