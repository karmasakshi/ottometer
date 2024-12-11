-- Profiles

create policy "Enable read access for all users"
on public.profiles
for select
to public
using (
  true
);

create policy "Enable insert for users based on user_id"
on public.profiles
for insert
to authenticated
with check (
  auth.uid() = user_id
);

create policy "Enable update for users based on user_id"
on public.profiles
for update
to authenticated
with check (
  auth.uid() = user_id
);

-- Autos

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

-- Reports

create policy "Enable users to view their own data only"
on public.reports
for select
to authenticated
using (
  auth.uid() = reporter_id
);

create policy "Enable insert for users based on user_id"
on public.reports
for insert
to authenticated
with check (
  auth.uid() = reporter_id
);

create policy "Enable delete for users based on user_id"
on public.reports
for delete
to authenticated
using (
  auth.uid() = reporter_id
);
