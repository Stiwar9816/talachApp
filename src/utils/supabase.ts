import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseServiceRolekey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY
// Access auth admin api
export const supabase = createClient(supabaseUrl, supabaseServiceRolekey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true
  }
})
