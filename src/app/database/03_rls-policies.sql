-- public.profiles

create policy "Enable read access for all users"
on public.profiles
for select
to public
using (
  true
);

create policy "Enable insert for users based on their own profile"
on public.profiles
for insert
to authenticated
with check (
  auth.uid() = user_id
);

create policy "Enable update for users based on their own profile"
on public.profiles
for update
to authenticated
with check (
  auth.uid() = user_id
);

-- public.autos

create policy "Enable read access for all users"
on public.autos
for select
to public
using (
  true
);

create policy "Enable insert for authenticated users only"
on public.autos
for insert
to authenticated
with check (
  true
);

-- public.reports

create policy "Enable users to view their own reports"
on public.reports
for select
to authenticated
using (
  auth.uid() = reporter_id
);

create policy "Enable insert for users based on their own reports"
on public.reports
for insert
to authenticated
with check (
  auth.uid() = reporter_id
);

create policy "Enable delete for users based on their own reports"
on public.reports
for delete
to authenticated
using (
  auth.uid() = reporter_id
);