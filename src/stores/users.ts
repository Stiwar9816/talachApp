import { defineStore } from 'pinia'
// Interface
import type { Field, UserItem, UsersFields, } from '@/interface'
import apolloClient from '@/plugins/apollo'
import { ALL_USERS, CREATE_USER, UPDATE_USER } from '@/gql/user'

export const useUserStore = defineStore({
  id: 'users',
  state: (): UsersFields => ({
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
    items: [] as UserItem[],
    cache: {} as Record<string, UserItem[]>
  }),
  actions: {
    async allUsers() {
      if (this.cache.allUser) {
        // Devolver datos almacenados en caché si están disponibles
        this.items = this.cache.allUser;
        return this.items;
      }
      const { data } = await apolloClient.query({
        query: ALL_USERS
      })
      this.items = data.users
      // Guardar en caché los datos obtenidos
      this.cache.allUser = this.items;
      return this.items
    },
    async createUser(payload: UserItem) {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_USER,
        variables: {
          signupInput: payload
        }
      })
      this.items = [...this.items, data.signup.user]
      this.cache.allUser = this.items; // Actualizar caché
      return this.items;
    },
    async updateUser(id: number, payload: UserItem) {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_USER,
        variables: {
          updateUserInput: { id, ...payload }
        }
      })
      this.items = this.items.map(item => item.id === id ? data.updateUser : item)
      this.cache.allUser = this.items; // Actualizar caché
      return this.items;
    }
  }
})
