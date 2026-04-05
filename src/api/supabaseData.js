import {
  supabase,
  supabaseAdmin,
  isSupabaseConfigured,
  isSupabaseAdminConfigured,
} from '@/lib/supabaseClient';

function ensurePublic() {
  if (!isSupabaseConfigured() || !supabase) {
    throw new Error(
      'Supabase: dodaj VITE_SUPABASE_URL i VITE_SUPABASE_ANON_KEY ili VITE_SUPABASE_PUBLISHABLE_KEY u .env'
    );
  }
}

function ensureAdminDb() {
  if (!isSupabaseAdminConfigured() || !supabaseAdmin) {
    throw new Error(
      'Admin baza: dodaj VITE_SUPABASE_SERVICE_ROLE_KEY u .env (Supabase → Project Settings → API → service_role secret).'
    );
  }
}

function mapKitchenRow(row) {
  if (!row) return row;
  return {
    ...row,
    created_date: row.created_at ?? row.created_date,
  };
}

function mapNewsletterRow(row) {
  if (!row) return row;
  return {
    ...row,
    created_date: row.created_at ?? row.created_date,
  };
}

/** Javni upis zahteva za kuhinju (anon / publishable) */
export async function createKitchenRequest(payload) {
  ensurePublic();
  const { error } = await supabase.from('kitchen_requests').insert(payload);
  if (error) throw error;
}

/** Lista zahteva — service role (admin panel) */
export async function listKitchenRequests() {
  ensureAdminDb();
  const { data, error } = await supabaseAdmin
    .from('kitchen_requests')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);
  if (error) throw error;
  return (data ?? []).map(mapKitchenRow);
}

export async function updateKitchenRequestStatus(id, status) {
  ensureAdminDb();
  const { error } = await supabaseAdmin.from('kitchen_requests').update({ status }).eq('id', id);
  if (error) throw error;
}

/** Newsletter prijava (anon) */
export async function createNewsletterSubscription(payload) {
  ensurePublic();
  const { error } = await supabase.from('newsletter_subscriptions').insert(payload);
  if (error) throw error;
}

export async function listNewsletterSubscriptions() {
  ensureAdminDb();
  const { data, error } = await supabaseAdmin
    .from('newsletter_subscriptions')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);
  if (error) throw error;
  return (data ?? []).map(mapNewsletterRow);
}

/** Javno: samo objavljeni (RLS) */
export async function listPublishedBlogPosts(limit) {
  ensurePublic();
  let q = supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'objavljeno')
    .order('datum', { ascending: false });
  if (limit != null) q = q.limit(limit);
  const { data, error } = await q;
  if (error) throw error;
  return data ?? [];
}

/** Admin: svi postovi */
export async function listAllBlogPosts() {
  ensureAdminDb();
  const { data, error } = await supabaseAdmin
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);
  if (error) throw error;
  return data ?? [];
}

export async function createBlogPost(payload) {
  ensureAdminDb();
  const { error } = await supabaseAdmin.from('blog_posts').insert(payload);
  if (error) throw error;
}

export async function updateBlogPost(id, payload) {
  ensureAdminDb();
  const { error } = await supabaseAdmin.from('blog_posts').update(payload).eq('id', id);
  if (error) throw error;
}

export async function deleteBlogPost(id) {
  ensureAdminDb();
  const { error } = await supabaseAdmin.from('blog_posts').delete().eq('id', id);
  if (error) throw error;
}
