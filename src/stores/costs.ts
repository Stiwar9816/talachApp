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
      const { data } = await apolloClient.query({
        query: ALL_PRICES_BY_TYPE,
        variables: {
          priceType: 'Costo'
        }
      })

      const newItems = data.priceByType.map((item: PriceItem) => {
        return {
          ...item
        }
      })

      newItems.forEach((newItem: PriceItem) => {
        const existingItem = this.items.find((item: PriceItem) => item.id === newItem.id)
        if (!existingItem) {
          this.items.push(newItem)
        }
      })

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
      const observableQuery = apolloClient.subscribe({
        query: SUBSCRIBE_PRICE
      })

      const subscription = observableQuery.subscribe({
        next: (result) => {
          const newCosts = result.data?.newCosts
          if (newCosts) {
            this.updateItems([newCosts])
          }
        },
        error(error: any) {
          console.log(error.message)
        }
      })
      return () => subscription.unsubscribe()
    },
    updateItems(newCosts: PriceItem[]) {
      const updatedItems = newCosts.map((newCost: PriceItem) => {
        return {
          ...newCost
        }
      })

      this.items = [...this.items, ...updatedItems]
    }
  }
})
