import moment from 'moment'
import { defineStore } from 'pinia'
// Interface
import type { Field, RatingFields, RatingItem } from '@/interface'
import { supabase, updateItems } from '@/utils'

export const useRatingsStore = defineStore({
  id: 'ratings',
  state: (): RatingFields => ({
    fields: [
      {
        title: 'ID',
        align: 'start',
        sortable: false,
        key: 'id'
      },
      { title: 'Usuario', sortable: false, key: 'client' },
      { title: 'Calidad del servicio', sortable: false, key: 'quality' },
      { title: 'Calificación usuario', key: 'rankClient' },
      { title: 'Calificación talachero', key: 'rankTalachero' },
      { title: 'Fecha de calificación', sortable: false, key: 'created_at' }
    ] as Field[],
    items: [] as RatingItem[]
  }),
  actions: {
    async allRatings() {
      let { data: scores, error } = await supabase.rpc('LIST_SCORES')
      
      if (error) {
        throw new Error(`${error.message}`)
      }
      // Iterar sobre los objetos de scores y formatear la fecha
      const ScoreFormatted = scores.map((score: RatingItem) => {
        return {
          ...score,
          created_at: moment(score.created_at).format('LLL')
        }
      })

      this.items = ScoreFormatted as RatingItem[]

      return this.items
    },
    subscribeToRatings() {
      return supabase
        .channel('custom-all-channel')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'scores' }, (payload) => {
          updateItems([payload.new], this.items)
        })
        .subscribe()
    }
  }
})