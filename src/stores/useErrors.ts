import { defineStore } from 'pinia'

interface ErrorState {
  message: string | null
  category?: any
  fields?: { input: Record<string, string> } | {}
}

export const useErrorsStore = defineStore({
  id: 'errors',
  state: (): ErrorState => ({
    message: null,
    category: null,
    fields: { input: {} }
  }),

})
