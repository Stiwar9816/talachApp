import { defineStore } from 'pinia'
// Interface
import type { Field, RatingFields, RatingItem } from '@/interface'
import apolloClient from '@/plugins/apollo'
import { ALL_RATINGS } from '@/gql/rating'
import moment from 'moment'

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
      { title: 'Usuario', sortable: false, key: 'user.fullName' },
      { title: 'Calidad', sortable: false, key: 'quality' },
      { title: 'Calificación', key: 'rank' },
      { title: 'Fecha de calificación', sortable: false, key: 'createdAt' }
    ] as Field[],
    items: [] as RatingItem[],
    cache: {} as Record<string, RatingItem[]>
  }),
  actions: {
    async allRatings() {
      if (this.cache.allRatings) {
        this.items = this.cache.allRatings
        return this.items;
      }
      const { data } = await apolloClient.query({
        query: ALL_RATINGS
      })
      this.items = data.scores.map((item: RatingItem) => {
        return {
          ...item,
          createdAt: moment(item.createdAt).format('LLL') // Aquí defines el formato de fecha deseado
        };
      });
      this.cache.allRatings = this.items
      return this.items
    }
  }
})
