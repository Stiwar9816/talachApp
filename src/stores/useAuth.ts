import { LOGIN_MUTATION, RESET_PASSWORD, RESET_PASSWORD_AUTH } from '@/gql/login'
import apolloClient from '@/plugins/apollo'
import type { AuthState } from '@/interface'
import router from '@/router'
import { defineStore } from 'pinia'
import type { SigninInput } from '../interface/auth'
import { supabase } from '@/utils'
import { ref } from 'vue'

export const useAuthStore = defineStore({
  id: 'auth',
  state: (): AuthState => ({
    token: sessionStorage.getItem('token') || null
  }),
  getters: {
    isAuthenticated(state): boolean {
      return !!state.token
    }
  },
  actions: {
    async login({ email, password }: SigninInput) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        })
        const { user, session } = data
        
        const tokenSupa = session?.access_token

        if (error) {
          throw new Error(error.message)
        } else {
          sessionStorage.setItem('token', tokenSupa!)
          this.token = tokenSupa!
          return user
        }
      } catch (error: any) {
        throw new Error('Error desconocido al iniciar sesión', error.message)
      }
    },
    async logout() {
      try {
        const { error } = await supabase.auth.signOut()

        if (error) {
          console.error(error.message)
        } else {
          sessionStorage.removeItem('token')
          this.token = null
          router.replace('/')
        }
      } catch (error: any) {
        console.error('Error desconocido al salir de la sesión', error.message)
      }
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
