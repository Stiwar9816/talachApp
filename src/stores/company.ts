import { defineStore } from 'pinia'
// Interface
import type { CompanyItem, CompanyFields } from '@/interface'
import { supabase, updateItems } from '@/utils'

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
      { title: 'Administrador', sortable: false, key: 'useradmin' },
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
      if (error) {
        throw new Error(`${error.message}`)
      }
      this.items = companies as CompanyItem[]
      return this.items
    },
    async createCompany(formInput: CompanyItem, userID: string) {
      const data_company = {
        name_company: formInput.name_company,
        bussiness_name: formInput.bussiness_name,
        phone: formInput.phone,
        rfc: formInput.rfc,
        tax_regime: formInput.tax_regime,
        address: formInput.address,
        department: formInput.department,
        city: formInput.city,
        postal_code: formInput.postal_code,
        geofence: formInput.geofence,
        lat: formInput.lat,
        lng: formInput.lng,
        isActive: (formInput.isActive = 'Inactivo')
      }
      const data_userid = userID

      let { data, error } = await supabase.rpc('insert_company', {
        data_company,
        data_userid
      })

      if (error) {
        throw new Error(`${error.message}`)
      }

      this.items = data as any
      return this.items
    },
    async updateCompany(id: string, formInput: CompanyItem, userID: any) {
      const data_company = {
        id,
        name_company: formInput.name_company,
        bussiness_name: formInput.bussiness_name,
        phone: formInput.phone,
        rfc: formInput.rfc,
        tax_regime: formInput.tax_regime,
        address: formInput.address,
        department: formInput.department,
        city: formInput.city,
        postal_code: formInput.postal_code,
        geofence: formInput.geofence,
        lat: formInput.lat,
        lng: formInput.lng,
        isActive: formInput.isActive
      }
      const data_userid = userID

      let { data, error } = await supabase.rpc('update_company', {
        data_company,
        data_userid
      })

      if (error) {
        throw new Error(`${error.message}`)
      }

      this.items = data as any
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
