import { defineStore } from 'pinia'
// Interface
import type { Field, Item } from '@/interface'
import apolloClient from '@/plugins/apollo'
import { ALL_PRICES_BY_TYPE, CREATE_PRICE, REMOVE_PRICE, UPDATE_PRICE } from '@/gql/price'

export const useServiceStore = defineStore({
  id: 'service',
  state: () => ({
    fields: [
      { title: 'ID', sortable: false, key: 'id' },
      {
        title: 'Nombre',
        sortable: false,
        key: 'name'
      },
      { title: 'Precio', align: 'center', key: 'price' },
      { title: 'Acciones', sortable: false, key: 'actions' }
    ] as Field[],

    items: [] as Item[]
  }), actions: {
    async allService() {
      const { data } = await apolloClient.query({
        query: ALL_PRICES_BY_TYPE,
        variables: {
          priceType: 'Servicio'
        }
      })
      const [...service] = data.priceByType
      this.items = [...service]
      return this.items
    },
    async createService(payload: Item){
      const {data} = await apolloClient.mutate({
        mutation: CREATE_PRICE,
        variables: {
          createPriceInput: payload
        }
      })
      this.items = [...this.items, data.createPrice ]
      return this.items
    },
    async updateService(id: number, payload: Item) {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_PRICE,
        variables: {
          updatePriceInput: { id, ...payload }
        }
      })
      this.items = this.items.map(item => item.id === id ? data.updatePrice : item)
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
      return this.items;
    }
  }
})
