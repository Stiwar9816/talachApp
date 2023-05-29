import { defineStore } from 'pinia'
// Interface
import type { Field, Item } from '@/interface'
import apolloClient from '@/plugins/apollo';
import { ALL_RATINGS } from '@/gql/rating';

export const useRatingsStore = defineStore({
  id: 'ratings',
  state: () => ({
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
      { title: 'Fecha de calificación', key: 'createdAt' }
    ] as Field[],
    items: [] as Item[],
    cache: {} as Record<string, Item[]>
  }),
  actions: {
    async allRatings(){
      if(this.cache.allRatings){
        this.items = this.cache.allRatings
        return this.items;
      }
      const {data} = await apolloClient.query({
        query: ALL_RATINGS
      })
      this.items = data.scores

      this.cache.allRatings = this.items
      return this.items
    }
  }
})
