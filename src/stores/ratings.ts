import moment from 'moment'
import { defineStore } from 'pinia'
// Interface
import type { Field, RatingFields, RatingItem } from '@/interface'
// Utils
import { supabase, transformServices, updateItems } from '@/utils'

export const useRatingsStore = defineStore({
  id: 'ratings',
  state: (): RatingFields => ({
    fields: [
      { title: 'Usuario', sortable: false, key: 'client' },
      { title: 'Talachero', sortable: false, key: 'mechanic' },
      { title: 'Calidad del servicio', sortable: false, key: 'description' },
      { title: 'Calificación usuario', key: 'calificationClient' },
      { title: 'Calificación talachero', key: 'calificationMechanic' },
      { title: 'Reporte servicio 1', key: 'imageReport' },
      { title: 'Reporte servicio 2', key: 'imageReport2' },
      { title: 'Fecha de calificación', sortable: false, key: 'created_at' }
    ] as Field[],
    items: [] as RatingItem[]
  }),
  actions: {
    async allRatings() {
      let { data: scores, error } = await supabase.rpc('list_scores')

      if (error) throw new Error(`${error.message}`)
      // Iterar sobre los objetos de scores y formatear la fecha
      const ScoreFormatted = scores.map((score: RatingItem) => {
        return {
          ...score,
          created_at: moment(score.created_at).format('LLL'),
          imageReport: score.imageReport,
          imageReport2: score.imageReport2
        }
      })

      const files = scores.map((score: RatingItem) => ({
        image: score.imageReport || 'no-results.png',
        image2: score.imageReport2 || 'no-results.png'
      }))

      const dataTransform = await transformServices(files)
      // Actualizar los objetos originales con las URLs firmadas
      this.items = ScoreFormatted.map((score: RatingItem, index: number) => {
        return {
          ...score,
          imageReport: dataTransform[index].image,
          imageReport2: dataTransform[index].image2
        }
      })
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
