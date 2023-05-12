import { LOGIN_MUTATION } from '@/gql/login'
import apolloClient from '@/plugins/apollo'
import router from '@/router'
import { defineStore } from 'pinia'

interface User {
  id?: number
  fullName: string
}

interface AuthState {
  token: string | null
  user: User | null
}

export const useAuthStore = defineStore({
  id: 'auth',
  state: (): AuthState => ({
    token: localStorage.getItem('token') || null,
    user: null
  }),
  getters: {
    isAuthenticated(state): boolean {
      return !!state.token
    }
  },
  actions: {
    async login(credentials: any) {
      const { data } = await apolloClient.mutate({
        mutation: LOGIN_MUTATION,
        variables: {
          signinInput: credentials
        }
      })
      const { user, token } = data.signin
      localStorage.setItem('token', token)
      localStorage.setItem('user', user.fullName)
      this.token = token
      this.user = user.fullName

      await apolloClient.resetStore()
    },
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.token = null
      this.user = null
      router.replace('/')
    }
  }
})
