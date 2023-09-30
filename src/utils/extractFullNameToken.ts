import { ref } from 'vue'
import { supabase } from './supabase'

const fullName = ref('')

export const extractFullNameFromToken = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    fullName.value = user?.user_metadata.fullName || ''
  } catch (error) {
    console.error(error)
  }
  
  return fullName.value
}