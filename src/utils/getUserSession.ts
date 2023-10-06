import { supabase } from './supabase'

export const getUser = async () => {
  const { data, error } = await supabase.auth.getSession()
  const { session } = data
  if (error) throw new Error(`${error.message}`)
  return session?.user.id
}
