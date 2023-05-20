import { defineStore } from 'pinia'
import type { ErrorState } from '@/interface'

export const useErrorsStore = defineStore({
  id: 'errors',
  state: (): ErrorState => ({
    message: null,
    category: null,
    fields: { input: {} }
  }),

})
