-- public.leaderboard_top_reporters

select cron.schedule(
  'update_leaderboard_profiles_top_reports',
  '0 2 * * *',
  $$refresh materialized view public.leaderboard_profiles_top_reports;$$
);

-- public.leaderboard_top_fair_autos

select cron.schedule(
  'update_leaderboard_autos_top_meter_correct_reports',
  '0 2 * * *',
  $$refresh materialized view public.leaderboard_autos_top_meter_correct_reports;$$
);

-- public.leaderboard_top_unfair_autos

select cron.schedule(
  'update_leaderboard_autos_top_meter_incorrect_reports',
  '0 2 * * *',
  $$refresh materialized view public.leaderboard_autos_top_meter_incorrect_reports;$$
);
