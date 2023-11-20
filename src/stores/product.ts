import { ref } from 'vue'
import { defineStore } from 'pinia'
// Interface
import type { CompanyItem, Field, PriceItem, PricesFields } from '@/interface'
import { getUser, supabase, transformProducts, uploadImage } from '@/utils'

export const useProductStore = defineStore({
  id: 'product',
  state: (): PricesFields => ({
    fields: [
      { title: 'Nombre', sortable: true, key: 'name' },
      { title: 'Imagen', align: 'center', sortable: false, key: 'image' },
      { title: 'Precio', align: 'center', key: 'price' },
      { title: 'Creado por', sortable: true, key: 'createby' },
      { title: 'Centro Talachero', sortable: true, key: 'company' },
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
    async createProduct(companies: string[], payload: PriceItem, image: any) {
      const user_id = await getUser()
      // Comprobar si se proporcionó una imagen
      const file = image ? image[0].name.toLowerCase() : 'no-results.png'
      const data_price = { ...payload, user_id }

      let { data, error } = await supabase.rpc('insert_product', {
        company_ids: companies,
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
    async updateProduct(id: string, data_price: PriceItem, company_id: string[], file: any) {
      let image = null

      if (file && file[0]) {
        image = file[0].name.toLowerCase()
        await uploadImage(file[0])
      }

      let { data, error } = await supabase.rpc('update_product', {
        price_id: id,
        data_price,
        company_id,
        file: image
      })

      if (error) throw new Error(`${error.message}`)

      const dataTransform = await transformProducts(data)
      this.items = dataTransform
      return this.items
    }
  }
})
