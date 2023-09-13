import { LOGIN_MUTATION, RESET_PASSWORD, RESET_PASSWORD_AUTH } from '@/gql/login'
import apolloClient from '@/plugins/apollo'
import type { AuthState } from '@/interface'
import router from '@/router'
import { defineStore } from 'pinia'
import type { SigninInput } from '../interface/auth';
import { supabase } from '@/utils/conexion-supabase'

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
    async login({ email, password}: SigninInput) {
      const { data , error} = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        console.log(error);
      }else{
        console.log(data);
      }
      // const { user, token } = data.signin
      // sessionStorage.setItem('token', token)
      // this.token = token
      // await apolloClient.resetStore()
      // return user
    },
    logout() {
      sessionStorage.removeItem('token')
      this.token = null
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
