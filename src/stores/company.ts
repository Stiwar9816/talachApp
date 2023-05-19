import { defineStore } from 'pinia'
// Interface
import type { CompanyItem, Field } from '@/interface'
import apolloClient from '@/plugins/apollo'
import { ALL_COMPANIES, CREATE_COMPANY } from '@/gql/company'

interface Company {
  fields: Field[]
  items: CompanyItem[]
}

export const useCompanyStore = defineStore({
  id: 'company',
  state: (): Company => ({
    fields: [
      {
        title: 'ID',
        sortable: false,
        key: 'id'
      },
      {
        title: 'Nombre',
        sortable: false,
        key: 'name_company'
      },
      { title: 'Teléfono', sortable: false, key: 'phone' },
      { title: 'Nombre Comercial', sortable: false, key: 'bussiness_name' },
      { title: 'Dirección', sortable: false, key: 'address' },
      { title: 'Estado', sortable: false, key: 'department' },
      { title: 'Ciudad', sortable: false, key: 'city' },
      { title: 'Codigo Postal', sortable: false, key: 'postal_code' },
      { title: 'Activo', key: 'isActive' },
      { title: 'Acciones', key: 'actions', sortable: false }
    ],
    items: [] as CompanyItem[]
  }),
  actions: {
    async allCompanies() {
      const { data } = await apolloClient.query({
        query: ALL_COMPANIES
      })
      this.items = data.companies
      return this.items
    },
    async createCompany(formInput: CompanyItem) {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_COMPANY,
        variables: {
          createCompanyInput: formInput
        }
      })
      console.log('data company store:', data)
      this.items = [...this.items, data.createCompany]
      return this.items
    }
  }
})
