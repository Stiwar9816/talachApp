import { defineStore } from 'pinia'
import moment from 'moment'
// Interface
import type { Field, OrdersFields, OrdersItem } from '@/interface'
// Utlis
import { supabase, updateItems } from '@/utils'

export const useOrdersStore = defineStore({
  id: 'orders',
  state: (): OrdersFields => ({
    fields: [
      { key: 'checkOutOrder', sortable: false, title: 'N° Orden conekta' },
      { key: 'mechanic', sortable: false, title: 'Talachero' },
      { key: 'model', sortable: false, title: 'Modelo' },
      { key: 'color', sortable: false, title: 'Color' },
      { key: 'plate', sortable: false, title: 'Placa' },
      { key: 'from', sortable: false, title: 'Punto de partida' },
      { key: 'to', sortable: false, title: 'Punto de llegada' },
      { key: 'price', sortable: false, title: 'Total' },
      { key: 'status', sortable: false, title: 'Estado' },
      { key: 'created_at', sortable: true, title: 'Fecha de servicio' }
    ] as Field[],
    items: [] as OrdersItem[],
    count: 0 as number,
    cacheCount: 0 as number
  }),
  actions: {
    async allOrders() {
      let { data: orders, error } = await supabase.rpc('list_orders')

      if (error) throw new Error(`${error.message}`)

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
      for (const total of data) {
        count += total.price
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
