import { defineStore } from 'pinia'
import apolloClient from '@/plugins/apollo'
// Gql
import { UPDATE_USER } from '@/gql/user'
// Interface
import type { Field, UserItem, UsersFields } from '@/interface'
// Utils
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
      if (error) throw new Error(`${error.message}`)

      return (this.items = users as UserItem[])
    },
    async createUser(payload: UserItem, idCompany?: string | null) {
      // console.log({ payload })

      const { data, error } = await supabase.auth.signUp({
        email: payload.email,
        password: 'Je123456.',
        options: {
          data: {
            fullName: payload.fullName,
            phone: payload.phone,
            roles: payload.roles,
            isActive: 'Innactivo',
            email: payload.email,
            idCompany
            // rfc: payload.rfc,
          }
        }
      })
      const { data: refres, error: invalid } = await supabase.auth.refreshSession()
      const { session, user } = refres
      console.log(invalid);
      console.log(session);
      console.log(user);
      // if (error) throw new Error(`${error.message}`)
      // else
      console.log(error)
      console.log(data)

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
