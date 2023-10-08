import router from '@/router'
import { defineStore } from 'pinia'
import { randomNonce, supabase } from '@/utils'
import type { AuthState, SigninInput } from '@/interface'

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
      const {
        data: { user, session },
        error
      } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      const tokenSupa = session?.access_token

      if (error) {
        throw new Error(error.message)
      } else {
        sessionStorage.setItem('token', tokenSupa!)
        this.token = tokenSupa!
        return user
      }
    },
    async logout() {
      const { error } = await supabase.auth.signOut()

      if (error) {
        throw new Error(error.message)
      } else {
        sessionStorage.removeItem('token')
        this.token = null
        router.replace('/')
      }
    },
    async resetPasswordForEmail(email: string) {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${import.meta.env.BASE_URL}/update-password`
      })
      if (error) throw new Error(`${error.message}`)
    },
    async updatePassword(password: string) {
      const { error } = await supabase.auth.updateUser({
        password: password
      })
      if (error) throw new Error(`${error.message}`)
    },
    async updatePasswordAuth(password: string) {
      const { error } = await supabase.auth.updateUser({
        password: password,
        nonce: randomNonce()
      })
      if (error) throw new Error(`${error.message}`)
    }
  }
})
