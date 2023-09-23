import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const updateItems = (newData: any, data: any) => {
  const idSet = new Set()
  const idMap = new Map()

  for (const item of data) {
    idSet.add(item.id)
    idMap.set(item.id, item)
  }

  for (const newCompany of newData) {
    const { id } = newCompany
    if (idSet.has(id)) {
      // Si el registro existe, actualízalo
      Object.assign(idMap.get(id), newCompany)
    } else {
      // Si el registro no existe, agrégalo al array
      data.push(newCompany)
      idSet.add(id)
      idMap.set(id, newCompany)
    }
  }
}

// Carga la imagen a Supabase Storage
export const uploadImage = async (file: any) => {
  const { data, error } = await supabase.storage
    .from('talachapp')
    .upload(`${file.name.toLowerCase()}`, file, {
      cacheControl: '3600',
      upsert: true
    })

  if (error) {
    throw new Error(`${error.message}`)
  }
  // Devuelve la URL del objeto cargado
  return data
}

export const getImageUrl = async (file: any) => {
  const { data, error } = await supabase.storage.from('talachapp').createSignedUrl(`${file}`, 60)

  if (error) {
    throw new Error(`${error.message}`)
  }
  return data?.signedUrl
}
