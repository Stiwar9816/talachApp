import { defineStore } from 'pinia'
// Interface
import type { Field, OrdersFields, OrdersItem } from '@/interface'
import moment from 'moment'
import apolloClient from '@/plugins/apollo'
import { ALL_ORDERS } from '@/gql/order'

export const useOrdersStore = defineStore({
  id: 'orders',
  state: (): OrdersFields => ({
    fields: [
      {
        key: 'id',
        sortable: false,
        title: 'ID'
      },
      { key: 'user.fullName', sortable: false, title: 'Usuario' },
      { key: 'createdAt', sortable: true, title: 'Fecha de servicio' },
      { key: 'companies.name_company', sortable: false, title: 'Talachero' },
      { key: 'total', sortable: false, title: 'Total' },
    ] as Field[],
    items: [] as OrdersItem[],
    cache: {} as Record<string, OrdersItem[]>
  }),
  actions: {
    async allOrders() {
      if (this.cache.allOrders) {
        this.items = this.cache.allOrders
        return this.items;
      }
      const { data } = await apolloClient.query({
        query: ALL_ORDERS
      })
      this.items = data.orders.map((item: OrdersItem) => {
        return {
          ...item,
          createdAt: moment(item.createdAt).format('LLL') // Aquí defines el formato de fecha deseado
        };
      });
      this.cache.allOrders = this.items
      return this.items
    }
  }
})
