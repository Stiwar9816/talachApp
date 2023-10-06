import { supabase } from './supabase'

// Carga la imagen a Supabase Storage
export const uploadImage = async (file: any) => {
  const { data, error } = await supabase.storage
    .from('talachapp')
    .upload(`${file.name.toLowerCase()}`, file, {
      cacheControl: '3600',
      upsert: true
    })

  if (error) throw new Error(`${error.message}`)

  return data
}
