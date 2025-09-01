import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@supabase/supabase-js";

let supabase: SupabaseClient | null = null;

/**
 * Get or create Supabase server client with service role key
 */
export function getSupabaseServerClient(): SupabaseClient {
  if (supabase) {
    return supabase;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE;

  if (!supabaseUrl || !supabaseServiceRole) {
    throw new Error(
      "Missing Supabase configuration - check NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE",
    );
  }

  supabase = createClient(supabaseUrl, supabaseServiceRole, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return supabase;
}

/**
 * Example utility function for future database queries
 * TODO: Implement actual database operations
 */
export async function queryExample() {
  const _client = getSupabaseServerClient();

  // Example query structure - not executed yet
  // const { data, error } = await client
  //   .from('profiles')
  //   .select('*')
  //   .limit(10);

  // eslint-disable-next-line no-console
  console.log("Supabase client ready for queries");
  return { data: [], error: null };
}
