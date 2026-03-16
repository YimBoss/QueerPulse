import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // Este cliente es para uso en el Navegador (Client Components)
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}