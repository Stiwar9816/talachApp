import { ref } from 'vue'
import { supabase } from './supabase'

const fullName = ref<string>('')

export const extractFullNameFromSession = async () => {
  const {
    data: { user },
    error
  } = await supabase.auth.getUser()
  fullName.value = user?.user_metadata.fullName || ''
  if (error) throw new Error(`${error.message}`)

  return fullName.value
}
