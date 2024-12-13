-- public.profiles

create policy "Enable users to view their own data only"
on "public"."profiles"
as PERMISSIVE
for SELECT
to authenticated
using ((select auth.uid()) = id);

create policy "Enable update for users based on id"
on "public"."profiles"
as PERMISSIVE
for UPDATE
to public
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

-- public.autos

create policy "Enable read access for all users"
on "public"."autos"
as PERMISSIVE
for SELECT
to public
using (true);

-- public.reports

create policy "Enable select for authenticated users for their own reports"
on public.reports
for select
to authenticated
using (
  reporter_id = auth.uid()
);

create policy "Enable insert for authenticated users for their own reports"
on public.reports
for insert
to authenticated
with check (
  reporter_id = auth.uid()
);

create policy "Enable delete for authenticated users for their own reports"
on public.reports
for delete
to authenticated
using (
  reporter_id = auth.uid()
);

-- public.leaderboard_top_reporters

create policy "Enable select for all users"
on public.leaderboard_top_reporters
for select
to public
using (
  true
);

-- public.leaderboard_top_fair_autos

create policy "Enable select for all users"
on public.leaderboard_top_fair_autos
for select
to public
using (
  true
);

-- public.leaderboard_top_unfair_autos

create policy "Enable select for all users"
on public.leaderboard_top_unfair_autos
for select
to public
using (
  true
);