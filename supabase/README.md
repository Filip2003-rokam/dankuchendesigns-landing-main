# Supabase — povezivanje i „migracija“

Aplikacija **ne vuče podatke sama** dok u Supabase projektu ne postoje tabele (i eventualno početni redovi). Uradi sledeće **u ovom redosledu**.

## 1. Otvori svoj projekat na Supabase

1. Idi na [supabase.com/dashboard](https://supabase.com/dashboard) i prijavi se.
2. Izaberi projekat (isti kao `VITE_SUPABASE_PROJECT_ID` u `.env`).

## 2. Kreiraj tabele i pravila (RLS) — **obavezno**

1. U levom meniju: **SQL Editor**.
2. **New query**.
3. Otvori lokalni fajl **`schema.sql`** iz ovog foldera, kopiraj **ceo** sadržaj i nalepi u editor.
4. Klikni **Run** (ili Ctrl+Enter).
5. Trebalo bi da piše **Success** (bez crvenih grešaka).

Posle ovoga u **Table Editor** treba da vidiš tabele:

- `kitchen_requests`
- `newsletter_subscriptions`
- `blog_posts`

Ako ih nema, `schema.sql` nije uspešno pokrenut — proveri grešku u SQL Editoru.

## 3. Opciono: test blog post

1. **SQL Editor** → **New query**.
2. Kopiraj sadržaj **`seed.sql`** i pokreni **Run**.

To dodaje jedan objavljeni post **samo ako je tabela bloga prazna** (da ne duplira).

## 4. Poveži aplikaciju (lokalno)

U korenu projekta `.env` mora imati (vrednosti iz **Project Settings → API**):

| Varijabla | Odakle |
|-----------|--------|
| `VITE_SUPABASE_URL` | Project URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` ili `VITE_SUPABASE_ANON_KEY` | javni ključ |
| `VITE_SUPABASE_SERVICE_ROLE_KEY` | **service_role** (secret) — za Admin panel |

Restartuj dev server posle izmene `.env`:

```bash
npm run dev
```

## 5. Šta znači „migracija“ starog Base44

Podaci iz stare Base44 baze **ne prelaze automatski**. Ako imaš export (CSV, Excel), mogu se ručno uvesti u Supabase preko **Table Editor → Insert row** ili novog SQL `INSERT` skripta — to je poseban korak i zavisi od formata exporta.

## 6. Brza provera u dashboardu

- **Table Editor** → `blog_posts` — treba da vidiš redove posle seed-a ili posle dodavanja u Adminu.
- **Authentication** nije obavezan za ovu aplikaciju (admin je lokalna šifra + service role u `.env`).
