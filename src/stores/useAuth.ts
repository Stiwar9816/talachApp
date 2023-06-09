import { LOGIN_MUTATION, RESET_PASSWORD, RESET_PASSWORD_AUTH } from '@/gql/login'
import apolloClient from '@/plugins/apollo'
import type { AuthState } from '@/interface'
import router from '@/router'
import { defineStore } from 'pinia'

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
    async login(credentials: AuthState) {
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
      return user
    },
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.token = null
      this.user = null
      router.replace('/')
    },
    async resetPassword(email: string) {
      const { data } = await apolloClient.mutate({
        mutation: RESET_PASSWORD,
        variables: {
          resetPassword: email
        }
      })
      return data
    },
    async resetPasswordAuth(password: string) {
      const { data } = await apolloClient.mutate({
        mutation: RESET_PASSWORD_AUTH,
        variables: {
          newPassword: password
        }
      })
      return data
    }
  }
})
