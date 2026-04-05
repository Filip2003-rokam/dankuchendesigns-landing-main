-- Pokreni u Supabase: SQL Editor → New query → Paste → Run (ceo fajl odjednom).
-- Posle toga opciono pokreni seed.sql za jedan test blog post.

create table if not exists public.kitchen_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  ime text not null,
  prezime text not null,
  email text not null,
  telefon text,
  tip_kuhinje text,
  stil_kuhinje text,
  boja_prednost text,
  budzet text,
  dodatne_napomene text,
  status text not null default 'novi'
);

create table if not exists public.newsletter_subscriptions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  ime text not null,
  prezime text not null,
  email text not null,
  status text not null default 'aktivan'
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  naslov text not null,
  kratak_opis text,
  sadrzaj text,
  datum text not null,
  slika_url text,
  status text not null default 'nacrt'
);

alter table public.kitchen_requests enable row level security;
alter table public.newsletter_subscriptions enable row level security;
alter table public.blog_posts enable row level security;

-- Javno: slanje formi
drop policy if exists "kitchen_requests insert anon" on public.kitchen_requests;
create policy "kitchen_requests insert anon"
  on public.kitchen_requests for insert
  to anon
  with check (true);

drop policy if exists "newsletter insert anon" on public.newsletter_subscriptions;
create policy "newsletter insert anon"
  on public.newsletter_subscriptions for insert
  to anon
  with check (true);

-- Javno: čitanje objavljenog bloga
drop policy if exists "blog published read anon" on public.blog_posts;
create policy "blog published read anon"
  on public.blog_posts for select
  to anon
  using (status = 'objavljeno');

-- Ulogovani korisnik (admin): zahtevi i newsletter
drop policy if exists "kitchen_requests admin select" on public.kitchen_requests;
create policy "kitchen_requests admin select"
  on public.kitchen_requests for select
  to authenticated
  using (true);

drop policy if exists "kitchen_requests admin update" on public.kitchen_requests;
create policy "kitchen_requests admin update"
  on public.kitchen_requests for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "newsletter admin select" on public.newsletter_subscriptions;
create policy "newsletter admin select"
  on public.newsletter_subscriptions for select
  to authenticated
  using (true);

-- Admin: pun pristup blogu
drop policy if exists "blog admin select" on public.blog_posts;
create policy "blog admin select"
  on public.blog_posts for select
  to authenticated
  using (true);

drop policy if exists "blog admin insert" on public.blog_posts;
create policy "blog admin insert"
  on public.blog_posts for insert
  to authenticated
  with check (true);

drop policy if exists "blog admin update" on public.blog_posts;
create policy "blog admin update"
  on public.blog_posts for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "blog admin delete" on public.blog_posts;
create policy "blog admin delete"
  on public.blog_posts for delete
  to authenticated
  using (true);
