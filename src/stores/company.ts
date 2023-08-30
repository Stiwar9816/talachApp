import { defineStore } from 'pinia'
// Interface
import type { CompanyItem, CompanyFields } from '@/interface'
import apolloClient from '@/plugins/apollo'
import {
  ALL_COMPANIES,
  CREATE_COMPANY,
  SUBSCRIBE_COMPANY,
  UPDATE_COMPANY,
  WORKER_COUNT_BY_COMPANY
} from '@/gql/company'

export const useCompanyStore = defineStore({
  id: 'company',
  state: (): CompanyFields => ({
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
      { title: 'Régimen Físcal', sortable: true, key: 'tax_regime' },
      { title: 'Teléfono', sortable: false, key: 'phone' },
      { title: 'Nombre Comercial', sortable: false, key: 'bussiness_name' },
      { title: 'Dirección', sortable: false, key: 'address' },
      { title: 'Estado', sortable: false, key: 'department' },
      { title: 'Ciudad', sortable: false, key: 'city' },
      { title: 'Codigo Postal', sortable: false, key: 'postal_code' },
      { title: 'Administrador', sortable: false, key: 'user.fullName' },
      { title: 'Trabajadores Activos', sortable: true, key: 'workerCountByCompany' },
      { title: 'Latitud', sortable: false, key: 'lat' },
      { title: 'Logintud', sortable: false, key: 'lng' },
      { title: 'Geocerca', sortable: false, key: 'geofence' },
      { title: 'Activo', sortable: true, key: 'isActive' },
      { title: 'Acciones', align: 'center', key: 'actions', sortable: false }
    ],
    items: [] as CompanyItem[]
  }),
  actions: {
    async allCompanies() {
      const { data } = await apolloClient.query({
        query: ALL_COMPANIES
      })

      const newItems = data.companies.map((item: CompanyItem) => {
        return {
          ...item,
          workerCountByCompany: 0
        }
      })

      await Promise.all(
        newItems.map(async (company: any) => {
          const { data } = await apolloClient.query({
            query: WORKER_COUNT_BY_COMPANY,
            variables: {
              companyId: company.id
            }
          })

          const workerCount = data.workerCountByCompany
          company.workerCountByCompany = workerCount
        })
      )

      newItems.forEach((newItem: CompanyItem) => {
        const existingItem = this.items.find((item: CompanyItem) => item.id === newItem.id)
        if (!existingItem) {
          this.items.push(newItem)
        }
      })

      return this.items
    },
    async createCompany(formInput: CompanyItem, idCompany: string) {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_COMPANY,
        variables: {
          createCompanyInput: formInput,
          idCompany
        }
      })

      const newCompany = data.createCompany

      const existingItem = this.items.find((item: CompanyItem) => item.id === newCompany.id)
      if (!existingItem) {
        this.items.push(newCompany)
      }

      return this.items
    },
    async updateCompany(id: string, payload: CompanyItem, idCompany: string) {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_COMPANY,
        variables: {
          updateCompanyInput: { id, ...payload },
          idCompany
        }
      })
      this.items = this.items.map((item) => (item.id === id ? data.updateCompany : item))
      return this.items
    },
    subscribeToCompanies() {
      const observableQuery = apolloClient.subscribe({
        query: SUBSCRIBE_COMPANY
      })

      const subscription = observableQuery.subscribe({
        next: (result) => {
          const newCompany = result.data?.newCompany
          if (newCompany) {
            this.updateItems([newCompany])
          }
        },
        error(error: any) {
          console.log(error.message)
        }
      })
      return () => subscription.unsubscribe()
    },
    updateItems(newCompanies: CompanyItem[]) {
      const updatedItems = newCompanies.map((newCompany: CompanyItem) => {
        return {
          ...newCompany
        }
      })

      this.items = [...this.items, ...updatedItems]
    }
  }
})
