import { defineStore } from 'pinia'
// Interface
import type { Field, OrdersFields, OrdersItem } from '@/interface'
import moment from 'moment'
import apolloClient from '@/plugins/apollo'
import { ALL_ORDERS } from '@/gql/order'
import { supabase, updateItems } from '@/utils'

export const useOrdersStore = defineStore({
  id: 'orders',
  state: (): OrdersFields => ({
    fields: [
      {
        key: 'id',
        sortable: false,
        title: 'ID'
      },
      { key: 'client', sortable: false, title: 'Usuario' },
      { key: 'company', sortable: false, title: 'Empresa' },
      { key: 'created_at', sortable: true, title: 'Fecha de servicio' },
      { key: 'total', sortable: false, title: 'Total' },
      { key: 'status', sortable: false, title: 'Estado' }
    ] as Field[],
    items: [] as OrdersItem[],
    count: 0 as number,
    cacheCount: 0 as number
  }),
  actions: {
    async allOrders() {
      let { data: orders, error } = await supabase.rpc('list_orders')

      if (error) {
        throw new Error(`${error.message}`)
      }

      // Iterar sobre los objetos de scores y formatear la fecha
      const OrderFormatted = orders.map((order: OrdersItem) => {
        return {
          ...order,
          created_at: moment(order.created_at).format('LLL')
        }
      })

      this.items = OrderFormatted as OrdersItem[]

      return this.items
    },
    async countPayment() {
      let { data, error } = await supabase.rpc('count_payment')

      if (error) throw new Error(`${error.message}`)

      let count = 0
      for (const price of data) {
        count += price.total
      }
      this.count = +count.toFixed(2)
      return this.count
    },
    subscribeToOrders() {
      return supabase
        .channel('custom-all-channel')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, (payload) => {
          updateItems([payload.new], this.items)
        })
        .subscribe()
    }
  }
})
