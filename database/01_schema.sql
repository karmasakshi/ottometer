-- public.profiles

create table
  public.profiles (
    id uuid not null,
    avatar_url text not null,
    username text not null,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now(),
    constraint profiles_pkey primary key (id),
    constraint profiles_username_key unique (username),
    constraint profiles_id_fkey foreign key (id) references auth.users (id),
    constraint profiles_avatar_url_check check (
      (
        (length(avatar_url) >= 3)
        and (length(avatar_url) <= 300)
        and (avatar_url ~* '^https?://.+$'::text)
      )
    ),
    constraint profiles_username_check check (
      (
        (length(username) >= 3)
        and (length(username) <= 30)
      )
    )
  ) tablespace pg_default;

alter table public.profiles enable row level security;

-- public.autos

create table
  public.autos (
    id uuid not null default gen_random_uuid (),
    plate_state_code text not null,
    plate_district_code text not null,
    plate_series_code text not null,
    plate_vehicle_number text not null,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now(),
    constraint autos_pkey primary key (id),
    constraint autos_plate_code unique (
      plate_state_code,
      plate_district_code,
      plate_series_code,
      plate_vehicle_number
    ),
    constraint autos_plate_district_code_check check ((plate_district_code ~* '^\d{2}$'::text)),
    constraint autos_plate_series_code_check check ((plate_series_code ~* '^[A-Z]{1,2}$'::text)),
    constraint autos_plate_state_code_check check ((plate_state_code ~* '^[A-Z]{2}$'::text)),
    constraint autos_plate_vehicle_number_check check ((plate_vehicle_number ~* '^\d{4}$'::text))
  ) tablespace pg_default;

alter table public.autos enable row level security;

-- public.reports

create type report_type as enum (
  'meter_correct',
  'meter_incorrect'
);

create table
  public.reports (
    id uuid not null default gen_random_uuid (),
    auto_id uuid not null,
    auto_plate_state_code text not null,
    auto_plate_district_code text not null,
    auto_plate_series_code text not null,
    auto_plate_vehicle_number text not null,
    reporter_id uuid not null,
    area_from text null,
    area_to text null,
    fare_difference_in_inr real null,
    meter_distance_in_km real null,
    meter_fare_in_inr real null,
    meter_waiting_time_in_min real null,
    is_tamper_indicator_on boolean null,
    time_in timestamp with time zone null,
    time_out timestamp with time zone null,
    type public.report_type not null,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now(),
    constraint reports_pkey primary key (id),
    constraint reports_auto_id_fkey foreign key (auto_id) references autos (id),
    constraint reports_reporter_id_fkey foreign key (reporter_id) references auth.users (id),
    constraint reports_auto_plate_series_code_check check ((auto_plate_series_code ~* '^[A-Z]{1,2}$'::text)),
    constraint reports_auto_plate_state_code_check check ((auto_plate_state_code ~* '^[A-Z]{2}$'::text)),
    constraint reports_area_from_check check ((length(area_from) <= 300)),
    constraint reports_fare_difference_in_inr_check check ((fare_difference_in_inr >= (0)::double precision)),
    constraint reports_meter_distance_in_km_check check ((meter_distance_in_km >= (0)::double precision)),
    constraint reports_meter_fare_in_inr_check check ((meter_fare_in_inr >= (23)::double precision)),
    constraint reports_meter_waiting_time_in_min_check check (
      (
        meter_waiting_time_in_min >= (0)::double precision
      )
    ),
    constraint reports_auto_plate_vehicle_number_check check ((auto_plate_vehicle_number ~* '^\d{4}$'::text)),
    constraint reports_area_to_check check ((length(area_to) <= 300)),
    constraint reports_auto_plate_district_code_check check ((auto_plate_district_code ~* '^\d{2}$'::text))
  ) tablespace pg_default;

alter table public.reports enable row level security;

-- public.leaderboard_top_reporters

create table
  public.leaderboard_top_reporters (
    id uuid not null default gen_random_uuid (),
    reporter_avatar_url text not null,
    reporter_username text not null,
    meter_correct_reports_count integer not null default 0,
    meter_incorrect_reports_count integer not null default 0,
    total_reports_count integer not null,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now(),
    constraint leaderboard_top_reporters_pkey primary key (id),
    constraint leaderboard_top_reporters_reporter_username_fkey foreign key (reporter_username) references profiles (username)
  ) tablespace pg_default;

alter table public.leaderboard_top_reporters enable row level security;

-- public.leaderboard_top_fair_autos

create table
  public.leaderboard_top_fair_autos (
    id uuid not null default gen_random_uuid (),
    auto_id uuid not null,
    auto_plate_state_code text not null,
    auto_plate_district_code text not null,
    auto_plate_series_code text not null,
    auto_plate_vehicle_number text not null,
    meter_correct_reports_count integer not null default 0,
    meter_incorrect_reports_count integer not null default 0,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now(),
    constraint leaderboard_top_fair_autos_pkey primary key (id),
    constraint leaderboard_top_fair_autos_auto_id_fkey foreign key (auto_id) references autos (id)
  ) tablespace pg_default;

alter table public.leaderboard_top_fair_autos enable row level security;

-- public.leaderboard_top_unfair_autos

create table
  public.leaderboard_top_unfair_autos (
    id uuid not null default gen_random_uuid (),
    auto_id uuid not null,
    auto_plate_state_code text not null,
    auto_plate_district_code text not null,
    auto_plate_series_code text not null,
    auto_plate_vehicle_number text not null,
    meter_correct_reports_count integer not null default 0,
    meter_incorrect_reports_count integer not null default 0,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now(),
    constraint leaderboard_top_unfair_autos_pkey primary key (id),
    constraint leaderboard_top_unfair_autos_auto_id_fkey foreign key (auto_id) references autos (id)
  ) tablespace pg_default;

alter table public.leaderboard_top_unfair_autos enable row level security;