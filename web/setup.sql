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