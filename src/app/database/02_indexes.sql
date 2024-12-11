-- public.profiles

create index idx_profiles_user_id ON public.profiles (user_id);
create index idx_profiles_username ON public.profiles (username);

-- public.autos

create index idx_autos_plate_code on public.autos (plate_state_code, plate_district_code, plate_series_code, plate_vehicle_number);

-- public.reports

create index idx_reports_auto_id on public.reports (auto_id);
create index idx_reports_reporter_id on public.reports (reporter_id);
create index idx_reports_reporter_id_type on public.reports (reporter_id, type);
create index idx_reports_type on public.reports (type);
create index idx_reports_created_at on public.reports (created_at);
