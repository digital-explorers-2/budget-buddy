// lib/supabaseClient.ts
import { createClient, SupabaseClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL and Key are required.");
}

//console.log("Supabase URL:", supabaseUrl);
//console.log("Supabase Key:", supabaseKey);

export const supabase = createClient(supabaseUrl, supabaseKey)

export function createServerClient(): SupabaseClient {
  return createClient(supabaseUrl, supabaseKey)
}

export default supabase;
