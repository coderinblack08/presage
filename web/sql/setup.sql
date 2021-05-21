-- profiles
create table profiles (
  id uuid primary key references auth.users not null,
  username text unique,
  "createdAt" timestamp with time zone default now()
);

alter table profiles enable row level security;

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- soundbites
create table soundbites (
  id uuid primary key,
  title text not null,
  description text,
  "thumbnailUrl" text,
  soundbite uuid references storage.objects(id) not null,
  length integer not null check (length <= 60 * 5),
  views bigint default 0,
  "userId" uuid references profiles(id) not null,
  "createdAt" timestamp with time zone default now()
);


alter table soundbites enable row level security;

create policy "Soundbites are viewable by everyone."
  on soundbites for select
  using ( true );

create policy "Users can upload as themselves."
    on soundbites for insert
    with check ( auth.uid() = "userId" );

-- storage
insert into storage.buckets (id, name)
values ('soundbites', 'soundbites');

create policy "Soundbites are publicly accessible."
  on storage.objects for select
  using ( bucket_id = 'soundbites' );

create policy "Anyone authenticated can upload an soundbite."
  on storage.objects for insert
  with check ( bucket_id = 'soundbites' and auth.role() = 'authenticated' );

insert into storage.buckets (id, name)
values ('thumbnails', 'thumbnails');

create policy "Thumbnails are publicly accessible."
  on storage.objects for select
  using ( bucket_id = 'thumbnails' );

create policy "Anyone authenticated can upload an thumbnail."
  on storage.objects for insert
  with check ( bucket_id = 'thumbnails' and auth.role() = 'authenticated' );


-- triggers

create table soundbite_details (
  soundbite_id uuid primary key references soundbites(id) not null,
  upvotes bigint default 0,
  views bigint default 0
);

create or replace function public.handle_new_soundbite() 
returns trigger as $$
begin
  insert into soundbite_details (soundbite_id, upvotes, views)
  values (new.id, 0, 0);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_soundbite_created
  after insert on soundbites
  for each row execute procedure public.handle_new_soundbite();

-- upvote stuff
create or replace function public.handle_new_upvote() 
returns trigger as $$
begin
  update soundbite_details
  set upvotes = upvotes + new.value
  where soundbite_id = new.soundbite_id;
  return new;
end;
$$ language plpgsql security definer;

create trigger on_upvote_created
  after insert on upvotes
  for each row execute procedure public.handle_new_upvote();

create or replace function public.handle_removed_upvote() 
returns trigger as $$
begin
  update soundbite_details
  set upvotes = upvotes - old.value
  where soundbite_id = old.soundbite_id;
  return old;
end;
$$ language plpgsql security definer;

create trigger on_upvote_removed
  after delete on upvotes
  for each row execute procedure public.handle_removed_upvote();

create or replace function public.handle_updated_upvote() 
returns trigger as $$
begin
  update soundbite_details
  set upvotes = upvotes + new.value - old.value
  where soundbite_id = new.soundbite_id;
  return new;
end;
$$ language plpgsql security definer;

create trigger on_upvote_udpated
  after update on upvotes
  for each row execute procedure public.handle_updated_upvote();