# DanKüchen landing

React (Vite) sajt sa blogom, formama za kuhinju i newsletter — backend je **Supabase**.

## Lokalno pokretanje

1. `npm install`
2. U `.env` (ili `.env.local`) postavi:
   - **VITE_SUPABASE_URL** — Project Settings → API → Project URL
   - **VITE_SUPABASE_ANON_KEY** *ili* **VITE_SUPABASE_PUBLISHABLE_KEY** — javni ključ (anon JWT ili `sb_publishable_...`)
   - **VITE_SUPABASE_SERVICE_ROLE_KEY** — **service_role** secret (isti ekran u API podešavanjima); potreban za **admin panel** (liste, blog CRUD). Ne objavljuj ovaj ključ.
3. **Baza:** u Supabase **SQL Editor** pokreni ceo fajl **`supabase/schema.sql`** (jednom). Detalji: vidi **`supabase/README.md`**. Opciono pokreni **`supabase/seed.sql`** za jedan test blog post.
4. **Admin prijava** je lokalna (email/šifra u `Admin.jsx` ili preko `VITE_ADMIN_EMAIL` / `VITE_ADMIN_PASSWORD` u `.env`).
5. `npm run dev`

## Produkcija

U hosting panelu dodaj iste `VITE_*` varijable. **Ne** stavljaj service role u javni repozitorijum.

## Dokumentacija

- [Supabase](https://supabase.com/docs)
