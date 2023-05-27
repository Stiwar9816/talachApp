import { defineStore } from 'pinia'
// Interface
import type { CompanyItem, CompanyFields } from '@/interface'
import apolloClient from '@/plugins/apollo'
import { ALL_COMPANIES, CREATE_COMPANY, UPDATE_COMPANY } from '@/gql/company'

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
      { title: 'CFDI', sortable: false, key: 'cfdi' },
      { title: 'Teléfono', sortable: false, key: 'phone' },
      { title: 'Nombre Comercial', sortable: false, key: 'bussiness_name' },
      { title: 'Geocerca', sortable: false, key: 'geofence' },
      { title: 'Latitud', sortable: false, key: 'lat' },
      { title: 'Logintud', sortable: false, key: 'lng' },
      { title: 'Dirección', sortable: false, key: 'address' },
      { title: 'Estado', sortable: false, key: 'department' },
      { title: 'Ciudad', sortable: false, key: 'city' },
      { title: 'Codigo Postal', sortable: false, key: 'postal_code' },
      { title: 'Activo', sortable: false, key: 'isActive' },
      { title: 'Acciones', align: 'center', key: 'actions', sortable: false }
    ],
    items: [] as CompanyItem[],
    cache: {} as Record<string, CompanyItem[]>
  }),
  actions: {
    async allCompanies() {
      if (this.cache.allCompanies) {
        // Devolver datos almacenados en caché si están disponibles
        this.items = this.cache.allCompanies;
        return this.items;
      }
      const { data } = await apolloClient.query({
        query: ALL_COMPANIES
      })
      this.items = data.companies
      // Guardar en caché los datos obtenidos
      this.cache.allCompanies = this.items;
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
      this.cache.allCompanies = this.items; // Actualizar caché
      return this.items
    },
    async updateCompany(id: number, payload: CompanyItem) {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_COMPANY,
        variables: {
          updateCompanyInput: { id, ...payload }
        }
      })
      this.items = this.items.map(item => item.id === id ? data.updateCompany : item)
      this.cache.allCompanies = this.items; // Actualizar caché
      return this.items;
    }
  }
})
