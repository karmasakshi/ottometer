create policy "allow users to view their own folder"
on storage.objects
for select
using (
    bucket_id = 'avatars'
    and auth.uid()::text = (storage.foldername(name))[1]
);

create policy "allow users to insert into their own folder"
on storage.objects
for insert
with check (
    bucket_id = 'avatars'
    and auth.uid()::text = (storage.foldername(name))[1]
);
