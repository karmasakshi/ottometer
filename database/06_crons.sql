-- public.leaderboard_top_reporters

select cron.schedule(
  'update_leaderboard_top_reporters',
  '0 0 * * *',
  $$select update_leaderboard_top_reporters();$$
);

-- public.leaderboard_top_fair_autos

select cron.schedule(
  'update_leaderboard_top_fair_autos',
  '0 0 * * *',
  $$select update_leaderboard_top_fair_autos();$$
);

-- public.leaderboard_top_unfair_autos

select cron.schedule(
  'update_leaderboard_top_unfair_autos',
  '0 0 * * *',
  $$select update_leaderboard_top_unfair_autos();$$
);
