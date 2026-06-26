import { createClient as supabaseCreateClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

let clientInstance = null

export function createClient() {
  if (!clientInstance) {
    clientInstance = supabaseCreateClient(supabaseUrl, supabaseAnonKey)
  }
  return clientInstance
}

export const supabase = createClient()

export default supabase