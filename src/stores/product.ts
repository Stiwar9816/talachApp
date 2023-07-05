import { defineStore } from 'pinia'
// Interface
import type { Field, PriceItem, PricesFields } from '@/interface'
import apolloClient from '@/plugins/apollo'
import { ALL_PRICES_BY_TYPE, CREATE_PRICE, REMOVE_PRICE, SUBSCRIBE_PRICE, UPDATE_PRICE } from '@/gql/price'

export const useProductStore = defineStore({
  id: 'product',
  state: (): PricesFields => ({
    fields: [
      { title: 'ID', sortable: false, key: 'id' },
      {
        title: 'Nombre',
        sortable: false,
        key: 'name'
      },
      { title: 'Precio', align: 'center', key: 'price' },
      {
        title: 'Responsable',
        sortable: false,
        key: 'user'
      },
      { title: 'Acciones', align: 'center', sortable: false, key: 'actions' }
    ] as Field[],
    items: [] as PriceItem[]
  }),
  actions: {
    async allProduct() {

      const { data } = await apolloClient.query({
        query: ALL_PRICES_BY_TYPE,
        variables: {
          priceType: 'Producto'
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
    async createProduct(payload: PriceItem) {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_PRICE,
        variables: {
          createPriceInput: payload
        }
      })

      const newProducts = data.createPrice;

      const existingItem = this.items.find((item: PriceItem) => item.id === newProducts.id);
      if (!existingItem) {
        this.items.push(newProducts);
      }

      return this.items
    },
    async updateProduct(id: number, payload: PriceItem) {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_PRICE,
        variables: {
          updatePriceInput: { id, ...payload }
        }
      })
      this.items = this.items.map((item) => (item.id === id ? data.updatePrice : item))
      return this.items
    },
    async deleteProduct(id: number) {
      const { data } = await apolloClient.mutate({
        mutation: REMOVE_PRICE,
        variables: {
          removePriceId: id
        }
      })
      this.items = this.items.filter((item) => item.id !== id)
      return this.items
    },
    subscribeToProducts() {
      const observableQuery = apolloClient.subscribe({
        query: SUBSCRIBE_PRICE
      });

      const subscription = observableQuery.subscribe({
        next: (result) => {
          const newProducts = result.data?.newProducts;
          if (newProducts) {
            this.updateItems([newProducts]);
          }
        },
        error(error: any) {
          console.log(error.message);
        }
      });
      return () => subscription.unsubscribe();
    },
    updateItems(newProducts: PriceItem[]) {
      const updatedItems = newProducts.map((newProducts: PriceItem) => {
        return {
          ...newProducts
        };
      });

      this.items = [...this.items, ...updatedItems];
    }
  }
})