import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Log environment variable status for debugging
console.log('Supabase URL present:', !!supabaseUrl)
console.log('Supabase Anon Key present:', !!supabaseAnonKey)

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('⚠️ CRITICAL: Supabase credentials not found!')
    console.error('Environment variables needed:')
    console.error('- VITE_SUPABASE_URL:', supabaseUrl ? '✓' : '✗')
    console.error('- VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✓' : '✗')
    console.warn('Running in demo mode with placeholder credentials.')
}

// Using untyped client - types will be inferred from queries
// For full type safety, generate types from your Supabase schema:
// npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/supabase.ts
export const supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder-key'
)
