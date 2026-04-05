import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL?.trim();
/** Anon JWT ili noviji publishable ključ (Supabase dashboard → API) */
const publicKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() ||
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim();

/** Service role — samo za admin panel u browseru (zaobilazi RLS). Čuvaj tajnu. */
const serviceRoleKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY?.trim();

export const isSupabaseConfigured = () => Boolean(url && publicKey);

/** Admin CRUD zahteva service role jer nema Supabase Auth sesije */
export const isSupabaseAdminConfigured = () => Boolean(url && serviceRoleKey);

export const supabase =
  isSupabaseConfigured() && url && publicKey
    ? createClient(url, publicKey, {
        auth: { persistSession: false, autoRefreshToken: false },
      })
    : null;

export const supabaseAdmin =
  isSupabaseAdminConfigured() && url && serviceRoleKey
    ? createClient(url, serviceRoleKey, {
        auth: { persistSession: false, autoRefreshToken: false },
      })
    : null;
