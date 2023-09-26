import { ref } from 'vue'
import { defineStore } from 'pinia'
// Interface
import type { CompanyItem, Field, PriceItem, PricesFields } from '@/interface'
import { supabase, transformProducts, uploadImage } from '@/utils'

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

      if (error) throw new Error(`${error.message}`)
      const dataTransform = await transformProducts(products)
      this.items = dataTransform as PriceItem[]
      return this.items
    },
    async allCompanies() {
      // Get the complete list of registered users
      let { data: company, error } = await supabase.rpc('list_companies_selects')

      if (error) {
        throw new Error(`${error.message}`)
      }

      this.companies = company as CompanyItem[]
      return this.companies
    },
    async createProduct(companies: string, payload: PriceItem, image: any) {
      //! TODO:  Get id of the logged in user with the realation of the auth schema of the user table and the public schema of the user table.
      // const storage = localStorage.getItem('sb-qcjjqopkavhufubvcqom-auth-token') || ''
      // const parse = JSON.parse(storage)
      const user_id = 'd9854699-9702-4914-921b-f4ae58fb081d'
      // Comprobar si se proporcionó una imagen
      const file = image ? image[0].name.toLowerCase() : 'no-results.png'
      const data_price = { ...payload, user_id }

      let { data, error } = await supabase.rpc('insert_product', {
        company_id: companies,
        data_price,
        file
      })

      if (error) throw new Error(`${error.message}`)
      else if (image) await uploadImage(image[0])
      // Get items with reassigned image field with url belonging to the storage image
      const dataTransform = await transformProducts(data)

      this.items = dataTransform as any
      return this.items
    },
    async updateProduct(id: string, payload: PriceItem, file: any, idCompany: string) {
      const image = file[0]?.name.toLowerCase() || null

      let { data, error } = await supabase.rpc('update_product', {
        company_id: idCompany,
        data_price: payload,
        file: image,
        price_id: id
      })

      if (error) throw new Error(`${error.message}`)
      if (file[0]) await uploadImage(file[0])

      const dataTransform = await transformProducts(data)
      this.items = dataTransform
      return this.items
    }
  }
})
