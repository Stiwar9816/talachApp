import { defineStore } from 'pinia'
// Interface
import type { Field, UserItem, UsersFields } from '@/interface'
// Utils
import { randomNonce, randomPassword, supabase } from '@/utils'

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
      const ROLES = ['Administrador', 'Usuario']
      const rolesArray = payload.roles?.split(',') || []

      payload.isActive = rolesArray.some((role) => ROLES.includes(role)) ? 'Activo' : 'Inactivo'

      const { data, error } = await supabase.auth.admin.createUser({
        email: payload.email,
        password: randomPassword(),
        nonce: randomNonce(),
        user_metadata: {
          fullName: payload.fullName,
          password: randomPassword(),
          phone: payload.phone,
          roles: payload.roles,
          isActive: payload.isActive,
          email: payload.email,
          rfc: payload.rfc,
          idCompany
        }
      })

      if (error) throw new Error(`${error.message}`)
      console.log(data)

      return this.items
    },
    async updateUser(id: string, payload: UserItem) {}
  }
})
