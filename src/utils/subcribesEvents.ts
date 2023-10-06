import { supabase } from './supabase'

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
      console.log(newData);
    } else {
      // Si el registro no existe, agrégalo al array
      console.log(newCompany);
      data.push(newCompany)
      idSet.add(id)
      idMap.set(id, newCompany)
    }
  }
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
