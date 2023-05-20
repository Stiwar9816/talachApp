import { defineStore } from 'pinia'
// Interface
import type { CompanyItem, Company } from '@/interface'
import apolloClient from '@/plugins/apollo'
import { ALL_COMPANIES, CREATE_COMPANY, UPDATE_COMPANY } from '@/gql/company'

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
      { title: 'RFC', sortable: false, key: 'rfc' },
      { title: 'CFDI', sortable: false, key: 'cfdi' },
      { title: 'Teléfono', sortable: false, key: 'phone' },
      { title: 'Nombre Comercial', sortable: false, key: 'bussiness_name' },
      { title: 'Dirección', sortable: false, key: 'address' },
      { title: 'Estado', sortable: false, key: 'department' },
      { title: 'Ciudad', sortable: false, key: 'city' },
      { title: 'Codigo Postal', sortable: false, key: 'postal_code' },
      { title: 'Activo', sortable: false, key: 'isActive' },
      { title: 'Acciones', align: 'center', key: 'actions', sortable: false }
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
      this.items = [...this.items, data.createCompany]
      console.log(this.items)
      return this.items
    },
    async updateCompany(id: number, payload: CompanyItem) {
      const { data, errors } = await apolloClient.mutate({
        mutation: UPDATE_COMPANY,
        variables: {
          updateCompanyInput: { id, ...payload }
        }
      })
      console.log(this.items)
      this.items = this.items.map(item => item.id === id ? data.updateCompany : item)
      return this.items;
    }
  }
})
