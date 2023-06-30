import { defineStore } from 'pinia'
// Interface
import type { Field, PriceItem, PricesFields } from '@/interface'
import apolloClient from '@/plugins/apollo'
import { ALL_PRICES_BY_TYPE, CREATE_PRICE, REMOVE_PRICE, UPDATE_PRICE } from '@/gql/price'

export const useServiceStore = defineStore({
  id: 'service',
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
    async allService() {
      if (this.cache.allService) {
        // Devolver datos almacenados en caché si están disponibles
        this.items = this.cache.allService;
        return this.items;
      }
      const { data } = await apolloClient.query({
        query: ALL_PRICES_BY_TYPE,
        variables: {
          priceType: 'Servicio'
        }
      })
      const [...service] = data.priceByType
      this.items = [...service]
      // Guardar en caché los datos obtenidos
      this.cache.allService = this.items;
      return this.items
    },
    async createService(payload: PriceItem) {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_PRICE,
        variables: {
          createPriceInput: payload
        }
      })
      this.items = [...this.items, data.createPrice]
      this.cache.allService = this.items; // Actualizar caché
      return this.items
    },
    async updateService(id: number, payload: PriceItem) {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_PRICE,
        variables: {
          updatePriceInput: { id, ...payload }
        }
      })
      this.items = this.items.map(item => item.id === id ? data.updatePrice : item)
      this.cache.allService = this.items; // Actualizar caché
      return this.items;
    },
    async deleteService(id: number) {
      const { data } = await apolloClient.mutate({
        mutation: REMOVE_PRICE,
        variables: {
          removePriceId: id
        }
      })
      this.items = this.items.filter(item => item.id !== id)
      this.cache.allService = this.items; // Actualizar caché
      return this.items;
    }
  }
})
