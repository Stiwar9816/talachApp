import { defineStore } from 'pinia'
import type { Field, WorkerFields, WorkerItem } from '@/interface'
import apolloClient from '@/plugins/apollo'
import { ALL_WORKERS, CREATE_WORKER, SUBCRIBE_WORKER, UPDATE_WORKER } from '@/gql/workers'
import { ALL_COMPANIES_NAME } from '@/gql/company'
import { ref } from 'vue'

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
      { title: 'Empresa', sortable: true, key: 'companies' },
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
        query: ALL_WORKERS
      })

      const newWorkers = data.workers.map((item: WorkerItem) => {
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
    async createWorker(payload: WorkerItem, companies: string) {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_WORKER,
        variables: {
          createWorkerInput: payload,
          idCompany: companies
        }
      })
      const newWorkers = data.createWorker

      const existingItem = this.items.find((item: WorkerItem) => item.id === newWorkers.id)
      if (!existingItem) {
        this.items.push(newWorkers)
      }

      return this.items
    },
    async updateWorker(id: string, payload: WorkerItem) {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_WORKER,
        variables: {
          updateWorkerInput: { id, ...payload }
        }
      })
      this.items = this.items.map((item) => (item.id === id ? data.updatedWorker : item))
      return this.items
    },
    subcribeToWorkers() {
      const observableQuery = apolloClient.subscribe({
        query: SUBCRIBE_WORKER
      })

      const subscription = observableQuery.subscribe({
        next: (result) => {
          const newWorkers = result.data?.newWorker
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
