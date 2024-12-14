-- public.profiles

create policy "Allow authenticated users to select their own profiles"
on public.profiles
for select
to authenticated
using ((select auth.uid()) = id);

create policy "Allow authenticated users to update their own profiles"
on public.profiles
for update
to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

-- public.autos

create policy "Allow public users to select all autos"
on public.autos
for select
to public
using (true);

-- public.reports

create policy "Allow authenticated users to select their own reports"
on public.reports
for select
to authenticated
using ((select auth.uid()) = reporter_id);

create policy "Allow authenticated users to insert their own reports"
on public.reports
for insert
to authenticated
with check ((select auth.uid()) = reporter_id);

create policy "Allow authenticated users to delete their own reports"
on public.reports
for delete
to authenticated
using ((select auth.uid()) = reporter_id);

-- public.leaderboard_top_reporters

create policy "Allow public users to select all rows"
on public.leaderboard_top_reporters
for select
to public
using (true);

-- public.leaderboard_top_fair_autos

create policy "Allow public users to select all rows"
on public.leaderboard_top_fair_autos
for select
to public
using (true);

-- public.leaderboard_top_unfair_autos

create policy "Allow public users to select all rows"
on public.leaderboard_top_unfair_autos
for select
to public
using (true);