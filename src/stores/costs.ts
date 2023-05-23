import { defineStore } from 'pinia'
// Interface
import type { Field, PriceItem, PricesFields } from '@/interface'
import apolloClient from '@/plugins/apollo'
import { ALL_PRICES_BY_TYPE, CREATE_PRICE, REMOVE_PRICE, UPDATE_PRICE } from '@/gql/price'

export const useCostsStore = defineStore({
  id: 'costs',
  state: (): PricesFields => ({
    fields: [
      { title: 'ID', sortable: false, key: 'id' },
      {
        title: 'Nombre',
        sortable: false,
        key: 'name'
      },
      { title: 'Precio', align: 'center', key: 'price' },
      { title: 'Acciones', align: 'center', sortable: false, key: 'actions' }
    ] as Field[],
    items: [] as PriceItem[],
    cache: {} as Record<string, PriceItem[]>
  }), actions: {
    async allCost() {
      if (this.cache.allCost) {
        // Devolver datos almacenados en caché si están disponibles
        this.items = this.cache.allCost;
        return this.items;
      }
      const { data } = await apolloClient.query({
        query: ALL_PRICES_BY_TYPE,
        variables: {
          priceType: 'Costo'
        }
      })
      const [...cost] = data.priceByType
      this.items = [...cost]
      // Guardar en caché los datos obtenidos
      this.cache.allCost = this.items;
      return this.items;
    },
    async createCost(payload: PriceItem) {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_PRICE,
        variables: {
          createPriceInput: payload
        }
      })
      this.items = [...this.items, data.createPrice]
      this.cache.allCost = this.items; // Actualizar caché
      return this.items
    },
    async updateCost(id: number, payload: PriceItem) {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_PRICE,
        variables: {
          updatePriceInput: { id, ...payload }
        }
      })
      this.items = this.items.map(item => item.id === id ? data.updatePrice : item)
      this.cache.allCost = this.items; // Actualizar caché
      return this.items;
    },
    async deleteCost(id: number) {
      const { data } = await apolloClient.mutate({
        mutation: REMOVE_PRICE,
        variables: {
          removePriceId: id
        }
      })
      this.items = this.items.filter(item => item.id !== id)
      this.cache.allCost = this.items; // Actualizar caché
      return this.items;
    }
  }
})
