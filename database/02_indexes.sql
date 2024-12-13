-- public.profiles

create index idx_profiles_id on public.profiles (id);
create unique index idx_profiles_username on public.profiles (username);

-- public.autos

create unique index idx_autos_plate_code on public.autos (plate_state_code, plate_district_code, plate_series_code, plate_vehicle_number);

-- public.reports

create index idx_reports_auto_id on public.reports (auto_id);
create index idx_reports_auto_id_type on public.reports (auto_id, type);
create index idx_reports_reporter_id on public.reports (reporter_id);
create index idx_reports_reporter_id_type on public.reports (reporter_id, type);
create index idx_reports_type on public.reports (type);

-- public.leaderboard_top_reporters

create index idx_leaderboard_top_reporters_id on public.leaderboard_top_reporters (id);

-- public.leaderboard_top_fair_autos

create index idx_leaderboard_top_fair_autos_id on public.leaderboard_top_fair_autos (id);

-- public.leaderboard_top_unfair_autos

create index idx_leaderboard_top_unfair_autos_id on public.leaderboard_top_unfair_autos (id);