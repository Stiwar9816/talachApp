import { defineStore } from 'pinia'
// Interface
import type { Field, InventoryFields, InventoryItem } from '@/interface'
import apolloClient from '@/plugins/apollo'
import { ALL_INVENTORY, UPDATE_INVENTORY } from '@/gql/inventory'
import { supabase, updateItems } from '@/utils'

export const useInventoryStore = defineStore({
  id: 'inventory',
  state: (): InventoryFields => ({
    fields: [
      {
        title: 'Nombre',
        sortable: false,
        key: 'name'
      },
      { title: 'Stock', key: 'stock' },
      { title: 'Descripción', key: 'description' },
      {
        title: 'Creado por',
        sortable: false,
        key: 'createby'
      },
      {
        title: 'Empresa',
        sortable: false,
        key: 'company'
      },
      { title: 'Acciones', align: 'center', key: 'actions', sortable: false }
    ] as Field[],
    items: [] as InventoryItem[],
    cache: {} as Record<string, InventoryItem[]>,
    count: 0 as number,
    cacheCount: 0 as number
  }),
  actions: {
    async allInventory() {
      // Obtén la lista completa de usuarios registrados
      let { data: inventory, error } = await supabase.rpc('list_price_by_type', {
        typeprice: 'Producto'
      })

      if (error) {
        throw new Error(`${error.message}`)
      }
      this.items = inventory as InventoryItem[]
      return this.items
    },
    async updateInventory(id: string, payload: InventoryItem) {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_INVENTORY,
        variables: {
          updatePriceInput: { id, ...payload }
        }
      })
      this.items = this.items.map((item) => (item.id === id ? data.updatePrice : item))
      this.cache.allProduct = this.items // Actualizar caché
      return this.items
    },
    async countLowInventory() {
      let { data: count, error } = await supabase.rpc('low_inventory_products')
      if (error) throw new Error(`${error.message}`)
      this.count = count
      return this.count
    },
    subscribeToInventory() {
      return supabase
        .channel('custom-all-channel')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'prices' }, (payload) => {
          updateItems([payload.new], this.items)
        })
        .subscribe()
    }
  }
})
