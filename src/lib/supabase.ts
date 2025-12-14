import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Export for convenience in components that expect `auth`
export const auth = supabase.auth;

// Export the client as `db` for consistency with existing code
export const db = supabase;

export default supabase;
