import { createClient } from '@supabase/supabase-js'

// Supabase client — initialized but NOT used in static build.
// When Coder A publishes credentials:
// 1. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local
// 2. Replace MOCK data with real Supabase queries
//
// IMPORTANT: VITE_SUPABASE_ANON_KEY is the public anon key — safe to expose.
// Never put SUPABASE_SERVICE_ROLE_KEY in client code.

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? ''

// Guard: createClient throws if URL is empty. Return null when env vars aren't set.
// All callers must check `if (supabase) { ... }` before using.
export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null
