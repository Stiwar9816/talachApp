import { defineStore } from 'pinia'
// Interface
import type { Field, UserItem, UsersFields, } from '@/interface'
import apolloClient from '@/plugins/apollo'
import { ALL_USERS, CREATE_USER, SUBSCRIBE_USER, UPDATE_USER } from '@/gql/user'

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
    items: [] as UserItem[]
  }),
  actions: {
    async allUsers() {
      const { data } = await apolloClient.query({
        query: ALL_USERS
      })

      const newItems = data.users.map((item: UserItem) => {
        return {
          ...item
        };
      });

      newItems.forEach((newItem: UserItem) => {
        const existingItem = this.items.find((item: UserItem) => item.id === newItem.id);
        if (!existingItem) {
          this.items.push(newItem);
        }
      });

      return this.items
    },
    async createUser(payload: UserItem) {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_USER,
        variables: {
          signupInput: payload
        }
      })
      const newUsers = data.signup.user;

      const existingItem = this.items.find((item: UserItem) => item.id === newUsers.id);
      if (!existingItem) {
        this.items.push(newUsers);
      }

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
      return this.items;
    },
    subscribeToUsers() {
      const observableQuery = apolloClient.subscribe({
        query: SUBSCRIBE_USER
      });

      const subscription = observableQuery.subscribe({
        next: (result) => {
          const newUsers = result.data?.newUser.user;
          if (newUsers) {
            this.updateItems([newUsers]);
          }
        },
        error(error: any) {
          console.log(error.message);
        }
      });
      return () => subscription.unsubscribe();
    },
    updateItems(newUsers: UserItem[]) {
      const updatedItems = newUsers.map((newUsers: UserItem) => {
        return {
          ...newUsers
        };
      });

      this.items = [...this.items, ...updatedItems];
    }
  }
})
