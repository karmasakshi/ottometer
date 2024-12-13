create policy "give users access to own folder 1oj01fe_0" on storage.objects for select to public using (bucket_id = 'avatars' and (select auth.uid()::text) = (storage.foldername(name))[1]);

create policy "give users access to own folder 1oj01fe_1" on storage.objects for insert to public with check (bucket_id = 'avatars' and (select auth.uid()::text) = (storage.foldername(name))[1]);