import { defineStore } from 'pinia'
// Interface
import type { Field, UserItem, } from '@/interface'
import apolloClient from '@/plugins/apollo'
import { ALL_USERS } from '@/gql/user'

export const useUserStore = defineStore({
  id: 'users',
  state: () => ({
    fields: [
      {
        title: 'ID',
        sortable: false,
        key: 'id'
      },
      {
        title: 'Nombre',
        sortable: false,
        key: 'fullName'
      },
      { title: 'Teléfono', sortable: false, key: 'phone' },
      { title: 'Correo electronico', sortable: false, key: 'email' },
      { title: 'Rol', sortable: false, key: 'roles' },
      { title: 'Estado', key: 'isActive' },
      { title: 'Acciones', align: 'center', key: 'actions', sortable: false }
    ] as Field[],
    items: [] as UserItem[]
  }),
  actions: {
    async allUsers() {
      const { data } = await apolloClient.query({
        query: ALL_USERS
      })
      this.items = data.users
      return this.items
    },
  }
})
