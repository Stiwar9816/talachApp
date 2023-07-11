import { defineStore } from 'pinia'
// Interface
import type { Field, PriceItem, PricesFields } from '@/interface'
import apolloClient from '@/plugins/apollo'
import { ALL_PRICES_BY_TYPE, CREATE_PRICE, REMOVE_PRICE, SUBSCRIBE_PRICE, UPDATE_PRICE } from '@/gql/price'

export const useServiceStore = defineStore({
  id: 'service',
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
  }), actions: {
    async allService() {
      const { data } = await apolloClient.query({
        query: ALL_PRICES_BY_TYPE,
        variables: {
          priceType: 'Servicio'
        }
      })

      const newItems = data.priceByType.map((item: PriceItem) => {
        return {
          ...item
        };
      });

      newItems.forEach((newItem: PriceItem) => {
        const existingItem = this.items.find((item: PriceItem) => item.id === newItem.id);
        if (!existingItem) {
          this.items.push(newItem);
        }
      });

      return this.items
    },
    async createService(payload: PriceItem) {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_PRICE,
        variables: {
          createPriceInput: payload
        }
      })

      const newServices = data.createPrice;

      const existingItem = this.items.find((item: PriceItem) => item.id === newServices.id);
      if (!existingItem) {
        this.items.push(newServices);
      }

      return this.items
    },
    async updateService(id: string, payload: PriceItem) {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_PRICE,
        variables: {
          updatePriceInput: { id, ...payload }
        }
      })
      this.items = this.items.map(item => item.id === id ? data.updatePrice : item)
      return this.items;
    },
    async deleteService(id: string) {
      const { data } = await apolloClient.mutate({
        mutation: REMOVE_PRICE,
        variables: {
          removePriceId: id
        }
      })
      this.items = this.items.filter(item => item.id !== id)
      return this.items;
    },
    subscribeToServices() {
      const observableQuery = apolloClient.subscribe({
        query: SUBSCRIBE_PRICE
      });

      const subscription = observableQuery.subscribe({
        next: (result) => {
          const newServices = result.data?.newServices;
          if (newServices) {
            this.updateItems([newServices]);
          }
        },
        error(error: any) {
          console.log(error.message);
        }
      });
      return () => subscription.unsubscribe();
    },
    updateItems(newServices: PriceItem[]) {
      const updatedItems = newServices.map((newService: PriceItem) => {
        return {
          ...newService
        };
      });

      this.items = [...this.items, ...updatedItems];
    }
  }
})
