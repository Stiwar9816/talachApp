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

  if (error) throw new Error(`${error.message}`)

  // Devuelve la URL del objeto cargado
  return data
}

export const getImageUrl = async (file: any) => {
  const { data, error } = await supabase.storage.from('talachapp').createSignedUrl(`${file}`, 60)

  if (error) throw new Error(`${error.message}`)

  return data?.signedUrl
}

export const subscribeToPrices = (type: string, data: any) => {
  return supabase
    .channel('custom-all-channel')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'prices', filter: `type=eq.${type}` },
      (payload) => {
        updateItems([payload.new], data)
      }
    )
    .subscribe()
}

export const subscribeToUsers = (data: any) => {
  return supabase
    .channel('custom-all-channel')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'users' }, (payload) => {
      updateItems([payload.new], data)
    })
    .subscribe()
}
export const getUser = async () => {
  const { data, error } = await supabase.auth.getSession()
  const { session } = data
  if (error) throw new Error(`${error.message}`)
  return session?.user.id
}

export const transformProducts = async (data: any) => {
  return await Promise.all(
    data.map(async (path: any) => {
      const newImageUrl = await getImageUrl(path?.image)
      path.image = newImageUrl
      return path
    })
  )
}
