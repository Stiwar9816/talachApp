import { defineStore } from 'pinia'
// Interface
import type { CompanyItem, CompanyFields } from '@/interface'
import { geofenceIsActive, supabase, updateItems } from '@/utils'

export const useCompanyStore = defineStore({
  id: 'company',
  state: (): CompanyFields => ({
    fields: [
      { title: 'Nombre', sortable: false, key: 'name_company' },
      { title: 'RFC', sortable: false, key: 'rfc' },
      { title: 'Régimen Físcal', sortable: true, key: 'tax_regime' },
      { title: 'Teléfono', sortable: false, key: 'phone' },
      { title: 'Nombre Comercial', sortable: false, key: 'bussiness_name' },
      { title: 'Dirección', sortable: false, key: 'address' },
      { title: 'Estado', sortable: false, key: 'department' },
      { title: 'Ciudad', sortable: false, key: 'city' },
      { title: 'Codigo Postal', sortable: false, key: 'postal_code' },
      { title: 'Administrador', sortable: true, key: 'useradmin' },
      { title: 'Trabajadores Activos', sortable: true, key: 'userworker' },
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
      // Obtén la lista completa de usuarios registrados
      let { data: companies, error } = await supabase.rpc('list_company_workers')
      if (error) throw new Error(`${error.message}`)
      this.items = companies as CompanyItem[]
      return this.items
    },
    async createCompany(data_company: CompanyItem, data_userid: string) {
      let { data, error } = await supabase.rpc('insert_company', {
        data_company,
        data_userid
      })
      geofenceIsActive(data_company)
      if (error) throw new Error(`${error.message}`)
      this.items = data as CompanyItem[]
      return this.items
    },
    async updateCompany(id: string, payload: CompanyItem, userID: string) {
      const data_company = {
        ...payload,
        geofence:
          typeof payload.geofence === 'object' ? payload.geofence.join(',') : payload.geofence
      }

      geofenceIsActive(data_company)

      let { data, error } = await supabase.rpc('update_company', {
        company_id: id,
        data_company,
        data_userid: userID
      })

      if (error) throw new Error(`${error.message}`)
      this.items = data as CompanyItem[]
      return this.items
    },
    subscribeToCompanies() {
      return supabase
        .channel('custom-all-channel')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'companies' }, (payload) => {
          updateItems([payload.new], this.items)
        })
        .subscribe()
    }
  }
})
