import moment from 'moment'
import { defineStore } from 'pinia'
// Interface
import type { Field, RatingFields, RatingItem } from '@/interface'
import { ALL_RATINGS } from '@/gql/rating'
import apolloClient from '@/plugins/apollo'

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
      { title: 'Usuario', sortable: false, key: 'user' },
      { title: 'Calidad', sortable: false, key: 'quality' },
      { title: 'Calificación', key: 'rank' },
      { title: 'Fecha de calificación', sortable: false, key: 'createdAt' }
    ] as Field[],
    items: [] as RatingItem[]
  }),
  actions: {
    async allRatings() {
      const { data } = await apolloClient.query({
        query: ALL_RATINGS
      })
      
      this.updateItems(data.scores)
      return this.items
    },
    updateItems(newItems: RatingItem[]) {
      this.items = newItems.map((item: RatingItem) => {
        return {
          ...item,
          createdAt: moment(item.createdAt).format('LLL') // Aquí defines el formato de fecha deseado
        };
      });
    }
  }
})
