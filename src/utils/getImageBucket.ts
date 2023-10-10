import { supabase } from './supabase'

export const getImageUrl = async (file: any) => {
  const { data, error } = await supabase.storage.from('talachapp').createSignedUrl(`${file}`, 60)

  if (error) throw new Error(`${error.message}`)

  return data?.signedUrl
}

export const getImageServicesUrl = async (file: any) => {
  const { data, error } = await supabase.storage
    .from('talachapp')
    .createSignedUrl(`services_history/${file}`, 60)

  if (error) throw new Error(`${error.message}`)
  return data?.signedUrl
}
