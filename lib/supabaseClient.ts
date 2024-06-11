// // lib/supabaseClient.ts
// import { createClient, SupabaseClient } from "@supabase/supabase-js"

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY as string

// console.log("Supabase URL:", supabaseUrl)
// console.log("Supabase Key:", supabaseKey)

// export const supabase = createClient(supabaseUrl, supabaseKey)

// export function createServerClient(): SupabaseClient {
//   return createClient(supabaseUrl, supabaseKey)
// }

// export default supabase;


// utils/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;


if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and anonymous key must be provided.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);