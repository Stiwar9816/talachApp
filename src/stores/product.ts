import { defineStore } from 'pinia'
// Interface
import type { CompanyItem, Field, PriceItem, PricesFields } from '@/interface'
import apolloClient from '@/plugins/apollo'
import { ALL_PRICES_BY_TYPE, CREATE_PRICE, SUBSCRIBE_PRICE, UPDATE_PRICE } from '@/gql/price'
import { ref } from 'vue'
import { supabase, updateItems, uploadImage } from '@/utils'
import { getImageUrl } from '@/utils/supabase'

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
        key: 'createby'
      },
      {
        title: 'Centro Talachero',
        sortable: false,
        key: 'company'
      },
      { title: 'Acciones', align: 'center', sortable: false, key: 'actions' }
    ] as Field[],
    items: [] as PriceItem[],
    companies: ref([])
  }),
  actions: {
    async allProduct() {
      let { data: products, error } = await supabase.rpc('list_price_by_type', {
        typeprice: 'Producto'
      })

      if (error) {
        throw new Error(`${error.message}`)
      }
      this.items = products as PriceItem[]
      return this.items
    },
    async allCompanies() {
      // Obtén la lista completa de usuarios registrados
      let { data: company, error } = await supabase.rpc('list_companies_selects')

      if (error) {
        throw new Error(`${error.message}`)
      }
     
      this.companies = company as CompanyItem[]
      return this.companies
    },
    async createProduct(companies: string, payload: PriceItem, image: any) {
      const data_price = {
        name: payload.name,
        price: payload.price,
        stock: payload.stock,
        type: payload.type,
        companies: payload.companies
      }

      const company_id = companies
      const imageProduct = image[0]

      const imageUrl = await uploadImage(imageProduct)
      
      let { data, error } = await supabase.rpc('insert_prices', {
        company_id,
        data_price,
        file: imageUrl
      })
     
      if (error) {
        throw new Error(`${error.message}`)
      }

      this.items = data as any
      return this.items
    },
    async updateProduct(id: string, payload: PriceItem, file: any, idCompany: string) {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_PRICE,
        variables: {
          updatePriceInput: {
            id,
            ...payload
          },
          file: file[0],
          idCompany
        },
        context: {
          useMultipart: true
        }
      })
      this.items = this.items.map((item) => (item.id === id ? data.updatePrice : item))
      return this.items
    },
    subscribeToProducts() {
      return supabase
        .channel('custom-all-channel')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'prices' }, (payload) => {
          updateItems([payload.new], this.items)
        })
        .subscribe()
    }
  }
})
