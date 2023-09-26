import { defineStore } from 'pinia'
import apolloClient from '@/plugins/apollo'
// Gql
import { CREATE_USER, UPDATE_USER } from '@/gql/user'
// Interface
import type { Field, UserItem, UsersFields } from '@/interface'
import { supabase } from '@/utils'

export const useUserStore = defineStore({
  id: 'users',
  state: (): UsersFields => ({
    fields: [
      { title: 'Nombre', sortable: false, key: 'fullName' },
      { title: 'RFC', sortable: false, key: 'rfc' },
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
      const ROLES = ['Administrador', 'Talachero', 'Usuario']
      // Obtén la lista completa de usuarios registrados
      let { data: users, error } = await supabase.rpc('list_users', { role: ROLES })
      if (error) {
        throw new Error(`${error.message}`)
      }
      return (this.items = users as UserItem[])
    },
    async createUser(payload: UserItem, idCompany?: string | null) {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_USER,
        variables: {
          signupInput: payload,
          idCompany
        }
      })
      const newUsers = data.signup.user

      const existingItem = this.items.find((item: UserItem) => item.id === newUsers.id)
      if (!existingItem) {
        this.items.push(newUsers)
      }

      return this.items
    },
    async updateUser(id: string, payload: UserItem) {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_USER,
        variables: {
          updateUserInput: { id, ...payload }
        }
      })
      this.items = this.items.map((item) => (item.id === id ? data.updateUser : item))
      return this.items
    }
  }
})
