import { ref } from 'vue'
import { defineStore } from 'pinia'
import apolloClient from '@/plugins/apollo'
import { ALL_WORKERS, SUBCRIBE_WORKER, UPDATE_WORKER } from '@/gql/workers'
import { ALL_COMPANIES_NAME } from '@/gql/company'
import type { Field, WorkerFields, WorkerItem } from '@/interface'

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
      { title: 'Empresa', sortable: true, key: 'companiesWorker.name_company' },
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
      const { data } = await apolloClient.query({
        query: ALL_WORKERS,
        variables: {
          roles: 'Trabajador'
        }
      })
      const newWorkers = data.users.map((item: WorkerItem) => {
        return {
          ...item
        }
      })

      newWorkers.forEach((newItem: WorkerItem) => {
        const existingItem = this.items.find((item: WorkerItem) => item.id === newItem.id)
        if (!existingItem) {
          this.items.push(newItem)
        }
      })

      return this.items
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
      const observableQuery = apolloClient.subscribe({
        query: SUBCRIBE_WORKER
      })

      const subscription = observableQuery.subscribe({
        next: (result) => {
          const newWorkers = result.data?.newUser
          if (newWorkers) {
            this.updateItems([newWorkers])
          }
        },
        error(error: any) {
          console.log(error.message)
        }
      })
      return () => subscription.unsubscribe()
    },
    updateItems(newWorkers: WorkerItem[]) {
      const updatedItems = newWorkers.map((newWorker: WorkerItem) => {
        return {
          ...newWorker
        }
      })

      this.items = [...this.items, ...updatedItems]
    }
  }
})
