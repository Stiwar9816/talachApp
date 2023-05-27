import { defineStore } from 'pinia'
// Interface
import type { Field, InventoryFields, InventoryItem} from '@/interface'
import apolloClient from '@/plugins/apollo'
import { ALL_INVENTORY, UPDATE_INVENTORY } from '@/gql/inventory'

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
      { title: 'Acciones', align: 'center', key: 'actions', sortable: false }
    ] as Field[],
    items: [] as InventoryItem[],
    cache: {} as Record<string, InventoryItem[]>
  }),
  actions: {
    async allInventory() {
      if (this.cache.allProduct) {
        // Devolver datos almacenados en caché si están disponibles
        this.items = this.cache.allProduct;
        return this.items;
      }
      const { data } = await apolloClient.query({
        query: ALL_INVENTORY,
        variables: {
          priceType: 'Producto'
        }
      })
      const [...invetory] = data.priceByType
      this.items = [...invetory]
      // Guardar en caché los datos obtenidos
      this.cache.allProduct = this.items;
      return this.items;
    },
    async updateInventory(id: number, payload: InventoryItem) {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_INVENTORY,
        variables: {
          updatePriceInput: { id, ...payload }
        }
      })
      this.items = this.items.map(item => item.id === id ? data.updatePrice : item)
      this.cache.allProduct = this.items; // Actualizar caché
      return this.items;
    }
  }
})
