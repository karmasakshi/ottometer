select cron.schedule(
  'update-leaderboard_profiles_top_reports',
  '0 2 * * *',
  $$refresh materialized view public.leaderboard_profiles_top_reports;$$
);

select cron.schedule(
  'update-leaderboard_autos_top_meter_correct_reports',
  '0 2 * * *',
  $$refresh materialized view public.leaderboard_autos_top_meter_correct_reports;$$
);

select cron.schedule(
  'update-leaderboard_autos_top_meter_incorrect_reports',
  '0 2 * * *',
  $$refresh materialized view public.leaderboard_autos_top_meter_incorrect_reports;$$
);
