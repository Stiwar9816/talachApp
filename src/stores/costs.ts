import { defineStore } from 'pinia'
// Interface
import type { Field, PriceItem } from '@/interface'
import apolloClient from '@/plugins/apollo'
import { ALL_PRICES_BY_TYPE, CREATE_PRICE, REMOVE_PRICE, UPDATE_PRICE } from '@/gql/price'

export const useCostsStore = defineStore({
  id: 'costs',
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
    items: [] as PriceItem[]
  }),actions:{
    async allCost(){
      const {data} = await apolloClient.query({
        query: ALL_PRICES_BY_TYPE,
        variables: {
          priceType: 'Costo'
        }
      })
      const [...cost] = data.priceByType
      this.items =  [...cost]
      return this.items;
    },
    async createCost(payload: PriceItem){
      const {data} = await apolloClient.mutate({
        mutation: CREATE_PRICE,
        variables: {
          createPriceInput: payload
        }
      })
      this.items = [...this.items, data.createPrice ]
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
      return this.items;
    }
  }
})
