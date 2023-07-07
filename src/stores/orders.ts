import { defineStore } from 'pinia'
// Interface
import type { Field, OrdersFields, OrdersItem } from '@/interface'
import moment from 'moment'
import apolloClient from '@/plugins/apollo'
import { ALL_ORDERS, SUBSCRIBE_ORDER } from '@/gql/order'

export const useOrdersStore = defineStore({
  id: 'orders',
  state: (): OrdersFields => ({
    fields: [
      {
        key: 'id',
        sortable: false,
        title: 'ID'
      },
      { key: 'user', sortable: false, title: 'Usuario' },
      { key: 'createdAt', sortable: true, title: 'Fecha de servicio' },
      { key: 'companies', sortable: false, title: 'Centro talachero' },
      { key: 'total', sortable: false, title: 'Total' },
    ] as Field[],
    items: [] as OrdersItem[],
    count: 0 as number,
    cacheCount: 0 as number
  }),
  actions: {
    async allOrders() {
      const { data } = await apolloClient.query({
        query: ALL_ORDERS
      })

      const newItems = data.orders.map((item: OrdersItem) => {
        return {
          ...item,
          createdAt: moment(item.createdAt).format('LLL')
        };
      });

      newItems.forEach((newItem: OrdersItem) => {
        const existingItem = this.items.find((item: OrdersItem) => item.id === newItem.id);
        if (!existingItem) {
          this.items.push(newItem);
        }
      });

      return this.items
    },
    async countPayment() {
      if (this.cacheCount) {
        this.count = this.cacheCount
        return this.count
      }
      const { data } = await apolloClient.query({
        query: ALL_ORDERS
      })
      let count = 0
      for (const price of data.orders) {
        count += price.total
      }
      this.count = +count.toFixed(2)
      this.cacheCount = this.count
      return this.count
    },
    subscribeToOrders() {
      const observableQuery = apolloClient.subscribe({
        query: SUBSCRIBE_ORDER
      });

      const subscription = observableQuery.subscribe({
        next: (result) => {
          const newOrders = result.data?.newOrder;
          if (newOrders) {
            this.updateItems([newOrders]);
          }
        },
        error(error: any) {
          console.log(error.message);
        }
      });
      return () => subscription.unsubscribe();
    },
    updateItems(newOrders: OrdersItem[]) {
      const updatedItems = newOrders.map((newOrder: OrdersItem) => {
        return {
          ...newOrder,
          createdAt: moment(newOrder.createdAt).format('LLL')
        };
      });

      this.items = [...this.items, ...updatedItems];
    }
  }
})
