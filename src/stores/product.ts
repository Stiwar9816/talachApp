import { defineStore } from 'pinia'
// Interface
import type { Field, PriceItem, PricesFields } from '@/interface'
import apolloClient from '@/plugins/apollo'
import { ALL_PRICES_BY_TYPE, CREATE_PRICE, SUBSCRIBE_PRICE, UPDATE_PRICE } from '@/gql/price'
import { ALL_COMPANIES_NAME } from '@/gql/company'
import { ref } from 'vue'

export const useProductStore = defineStore({
  id: 'product',
  state: (): PricesFields => ({
    fields: [
      { title: 'ID', sortable: false, key: 'id' },
      {
        title: 'Imagen',
        sortable: false,
        key: 'image'
      },
      {
        title: 'Nombre',
        sortable: false,
        key: 'name'
      },
      { title: 'Precio', align: 'center', key: 'price' },
      {
        title: 'Creado por',
        sortable: false,
        key: 'user'
      },
      {
        title: 'Centro Talachero',
        sortable: false,
        key: 'companies'
      },
      { title: 'Acciones', align: 'center', sortable: false, key: 'actions' }
    ] as Field[],
    items: [] as PriceItem[],
    companies: ref([])
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
    async allCompanies() {
      const { data } = await apolloClient.query({
        query: ALL_COMPANIES_NAME
      })

      const company = data.companies.filter((item: any) => item.isActive !== 'Inactivo')
      this.companies = [...company]
      return this.companies
    },
    async createProduct(companies: string, payload: PriceItem) {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_PRICE,
        variables: {
          idCompany: companies,
          createPriceInput: payload
        }
      })

      const newProducts = data.createPrice

      const existingItem = this.items.find((item: PriceItem) => item.id === newProducts.id)
      if (!existingItem) {
        this.items.push(newProducts)
      }

      return this.items
    },
    async updateProduct(id: string, payload: PriceItem) {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_PRICE,
        variables: {
          updatePriceInput: { id, ...payload }
        }
      })
      this.items = this.items.map((item) => (item.id === id ? data.updatePrice : item))
      return this.items
    },
    subscribeToProducts() {
      const observableQuery = apolloClient.subscribe({
        query: SUBSCRIBE_PRICE
      })

      const subscription = observableQuery.subscribe({
        next: (result) => {
          const newProducts = result.data?.newProducts
          if (newProducts) {
            this.updateItems([newProducts])
          }
        },
        error(error: any) {
          console.log(error.message)
        }
      })
      return () => subscription.unsubscribe()
    },
    updateItems(newProducts: PriceItem[]) {
      const updatedItems = newProducts.map((newProduct: PriceItem) => {
        return {
          ...newProduct
        }
      })

      this.items = [...this.items, ...updatedItems]
    }
  }
})
