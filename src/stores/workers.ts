import { ref } from 'vue'
import { defineStore } from 'pinia'
// Interfaces
import type { CompanyItem, Field, WorkerFields, WorkerItem } from '@/interface'
// utils
import { geofenceIsActive, supabase } from '@/utils'

export const useWorkerStore = defineStore({
  id: 'workers',
  state: (): WorkerFields => ({
    fields: [
      { title: 'Nombre completo', sortable: false, key: 'fullName' },
      { title: 'Teléfono', sortable: false, key: 'phone' },
      { title: 'Correo electronico', sortable: false, key: 'email' },
      { title: 'Empresa', sortable: true, key: 'company' },
      { title: 'Latitud', sortable: false, key: 'lat' },
      { title: 'Longitud', sortable: false, key: 'lng' },
      { title: 'Geocerca', sortable: false, key: 'geofence' },
      { title: 'Estado', sortable: true, key: 'isActive' },
      { title: 'Acciones', align: 'center', key: 'actions', sortable: false }
    ] as Field[],
    items: [] as WorkerItem[],
    companies: ref([])
  }),
  actions: {
    async allWorkers() {
      const ROLES = ['Trabajador']
      // Obtén la lista completa de usuarios registrados
      let { data: users, error } = await supabase.rpc('list_users', { role: ROLES })

      if (error) throw new Error(`${error.message}`)

      return (this.items = users as WorkerItem[])
    },
    async allCompanies() {
      let { data: company, error } = await supabase.rpc('list_companies_selects')
      if (error) throw new Error(`${error.message}`)
      this.companies = company as CompanyItem[]
      return this.companies
    },
    async updateWorker(id: string, payload: WorkerItem, idCompany: string) {
      const data_worker = {
        ...payload,
        geofence:
          typeof payload.geofence === 'object' ? payload.geofence.join(',') : payload.geofence
      }

      geofenceIsActive(data_worker)

      let { data, error } = await supabase.rpc('update_worker', {
        company_id: idCompany,
        data_worker,
        worker_id: id
      })

      if (error) throw new Error(`${error.message}`)

      if (data) {
        const { data: user, error } = await supabase.auth.admin.updateUserById(id, {
          email: payload.email,
          user_metadata: { email: payload.email }
        })
        if (error) throw new Error(`${error.message}`)
        if (user) {
          this.items = data as WorkerItem[]
          return this.items
        }
      } else {
        throw new Error('The process has been rejected try again later')
      }
    }
  }
})
