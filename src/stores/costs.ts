import { defineStore } from 'pinia'
// Interface
import type { Field, PriceItem, PricesFields } from '@/interface'
// Utils
import { supabase } from '@/utils'

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
      let { data: costs, error } = await supabase.rpc('list_price_by_type', { typeprice: 'Costo' })
      if (error) throw new Error(`${error.message}`)

      this.items = costs as PriceItem[]
      return this.items
    },
    async createCost({ name, price, type }: PriceItem) {
      const data_service = {
        name,
        price,
        type
      }

      let { data, error } = await supabase.rpc('insert_prices', {
        data_service
      })
      if (error) throw new Error(`${error.message}`)
      this.items = data as PriceItem[]
      return this.items
    },
    async updateCost(id: string, payload: PriceItem) {
      let { data, error } = await supabase.rpc('update_prices', {
        data_price: payload,
        price_id: id
      })

      if (error) throw new Error(`${error.message}`)
      this.items = data as PriceItem[]
      return this.items
    }
  }
})
