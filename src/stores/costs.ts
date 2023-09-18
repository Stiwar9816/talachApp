import { defineStore } from 'pinia'
// Interface
import type { Field, PriceItem, PricesFields } from '@/interface'
import apolloClient from '@/plugins/apollo'
import {
  ALL_PRICES_BY_TYPE,
  CREATE_PRICE,
  REMOVE_PRICE,
  SUBSCRIBE_PRICE,
  UPDATE_PRICE
} from '@/gql/price'
import { supabase, updateItems } from '@/utils'

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
    items: [] as PriceItem[]
  }),
  actions: {
    async allCost() {
      let { data: costs, error } = await supabase.rpc('LIST_PRICES_BY_TYPE', { typeprice: 'Costo' })
      if (error) {
        throw new Error(`${error.message}`)
      }
      this.items = costs as PriceItem[]
      return this.items
    },
    async createCost(payload: PriceItem) {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_PRICE,
        variables: {
          createPriceInput: payload
        }
      })

      const newCosts = data.createPrice

      const existingItem = this.items.find((item: PriceItem) => item.id === newCosts.id)
      if (!existingItem) {
        this.items.push(newCosts)
      }

      return this.items
    },
    async updateCost(id: string, payload: PriceItem) {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_PRICE,
        variables: {
          updatePriceInput: { id, ...payload }
        }
      })
      this.items = this.items.map((item) => (item.id === id ? data.updatePrice : item))
      return this.items
    },
    subscribeToCosts() {
      return supabase
        .channel('custom-all-channel')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'prices' }, (payload) => {
          updateItems([payload.new], this.items)
        })
        .subscribe()
    }
  }
})
