import { defineStore } from 'pinia'
// Interface
import type { Field, PriceItem, PricesFields } from '@/interface'
import apolloClient from '@/plugins/apollo'
import { ALL_PRICES_BY_TYPE, CREATE_PRICE, REMOVE_PRICE, UPDATE_PRICE } from '@/gql/price'

export const useProductStore = defineStore({
  id: 'product',
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
  }),
  actions: {
    async allProduct() {
      if (this.cache.allProduct) {
        // Devolver datos almacenados en caché si están disponibles
        this.items = this.cache.allProduct;
        return this.items;
      }
      const { data } = await apolloClient.query({
        query: ALL_PRICES_BY_TYPE,
        variables: {
          priceType: 'Producto'
        }
      })
      const [...product] = data.priceByType
      this.items = [...product]
      // Guardar en caché los datos obtenidos
      this.cache.allProduct = this.items;
      return this.items
    },
    async createProduct(payload: PriceItem) {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_PRICE,
        variables: {
          createPriceInput: payload
        }
      })
      this.items = [...this.items, data.createPrice]
      this.cache.allProduct = this.items; // Actualizar caché
      return this.items
    },
    async updateProduct(id: number, payload: PriceItem) {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_PRICE,
        variables: {
          updatePriceInput: { id, ...payload }
        }
      })
      this.items = this.items.map(item => item.id === id ? data.updatePrice : item)
      this.cache.allProduct = this.items; // Actualizar caché
      return this.items;
    },
    async deleteProduct(id: number) {
      const { data } = await apolloClient.mutate({
        mutation: REMOVE_PRICE,
        variables: {
          removePriceId: id
        }
      })
      this.items = this.items.filter(item => item.id !== id)
      this.cache.allProduct = this.items; // Actualizar caché
      return this.items;
    }
  }
})
