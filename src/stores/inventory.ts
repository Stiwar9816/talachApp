import { defineStore } from 'pinia'
// Interface
import type { Field, InventoryItem } from '@/interface'
import apolloClient from '@/plugins/apollo'
import { ALL_INVENTORY } from '@/gql/inventory'
import { CREATE_PRICE } from '@/gql/price'

export const useInventoryStore = defineStore({
  id: 'inventory',
  state: () => ({
    fields: [
      {
        title: 'Nombre',
        sortable: false,
        key: 'name'
      },
      { title: 'Stock', key: 'stock' },
      { title: 'Descripción', key: 'description' },
      { title: 'Responsable', key: 'user.fullName' },
      { title: 'Acciones', align: 'center', key: 'actions', sortable: false }
    ] as Field[],
    items: [] as InventoryItem[]
  }),
  actions: {
    async allInventory() {
      const { data } = await apolloClient.query({
        query: ALL_INVENTORY,
        variables: {
          priceType: 'Producto'
        }
      })
      const [...invetory] = data.priceByType
      this.items = [...invetory]
      return this.items;
    },
    async createInventory(payload: InventoryItem) {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_PRICE,
        variables: {
          createPriceInput: payload
        }
      })
      this.items = [...this.items, data.createPrice]
      return this.items;
    }
  }

})
