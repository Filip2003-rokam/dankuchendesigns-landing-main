-- Opciono: pokreni POSLE schema.sql ako želiš jedan test post da vidiš blog odmah.
-- SQL Editor → New query → Paste → Run

insert into public.blog_posts (naslov, kratak_opis, sadrzaj, datum, slika_url, status)
select
  'Dobrodošli u DanKüchen blog',
  'Prvi post nakon podešavanja Supabase baze.',
  'Ako vidiš ovaj tekst na sajtu, blog i baza rade ispravno. Ostale postove dodaješ u Admin panelu.',
  to_char(current_date, 'YYYY-MM-DD'),
  'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&q=80',
  'objavljeno'
where not exists (select 1 from public.blog_posts limit 1);
