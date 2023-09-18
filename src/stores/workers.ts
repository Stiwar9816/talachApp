import { ref } from 'vue'
import { defineStore } from 'pinia'
import apolloClient from '@/plugins/apollo'
import { ALL_WORKERS, SUBCRIBE_WORKER, UPDATE_WORKER } from '@/gql/workers'
import { ALL_COMPANIES_NAME } from '@/gql/company'
import type { Field, WorkerFields, WorkerItem } from '@/interface'
import { supabase, updateItems } from '@/utils'

export const useWorkerStore = defineStore({
  id: 'workers',
  state: (): WorkerFields => ({
    fields: [
      {
        title: 'ID',
        sortable: false,
        key: 'id'
      },
      {
        title: 'Nombre completo',
        sortable: false,
        key: 'fullName'
      },
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
      let { data: users, error } = await supabase.rpc('LIST_USERS', { role: ROLES })

      if (error) {
        throw new Error(`${error.message}`)
      }

      return (this.items = users as WorkerItem[])
    },
    async allCompanies() {
      const { data } = await apolloClient.query({
        query: ALL_COMPANIES_NAME
      })

      const company = data.companies.filter((item: any) => item.isActive !== 'Inactivo')
      this.companies = [...company]
      return this.companies
    },
    async updateWorker(id: string, payload: WorkerItem, idCompany: string) {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_WORKER,
        variables: {
          updateUserInput: { id, ...payload },
          idCompany
        }
      })
      this.items = this.items.map((item) => (item.id === id ? data.updateUser : item))
      return this.items
    },
    subcribeToWorkers() {
      return supabase
        .channel('custom-all-channel')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'users' }, (payload) => {
          updateItems([payload.new], this.items)
        })
        .subscribe()
    }
  }
})
