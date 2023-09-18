import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const updateItems = (newData: any[], data: any) => {
  // Itera sobre los nuevos datos y actualiza o agrega cada registro
  for (const newCompany of newData) {
    const index = data.findIndex((item: any) => item.id === newCompany.id)
    if (index !== -1) {
      // Si se encuentra el registro, actualízalo
      data[index] = newCompany
    } else {
      // Si no se encuentra, agrégalo al array
      data.push(newCompany)
    }
  }
}
