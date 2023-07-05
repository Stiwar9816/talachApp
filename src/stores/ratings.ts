import moment from 'moment'
import { defineStore } from 'pinia'
// Interface
import type { Field, RatingFields, RatingItem } from '@/interface'
import { ALL_RATINGS, SUBSCRIBE_SCORE } from '@/gql/rating'
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

      const newItems = data.scores.map((item: RatingItem) => {
        return {
          ...item,
          createdAt: moment(item.createdAt).format('LLL')
        };
      });

      newItems.forEach((newItem: RatingItem) => {
        const existingItem = this.items.find((item: RatingItem) => item.id === newItem.id);
        if (!existingItem) {
          this.items.push(newItem);
        }
      });
      return this.items
    },
    subscribeToRatings() {
      const observableQuery = apolloClient.subscribe({
        query: SUBSCRIBE_SCORE
      });

      const subscription = observableQuery.subscribe({
        next: (result) => {
          const newRating = result.data?.newScore;
          if (newRating) {
            this.updateItems([newRating]);
          }
        },
        error(error: any) {
          console.log(error.message);
        }
      });
      return () => subscription.unsubscribe();
    },
    updateItems(newRatings: RatingItem[]) {
      const updatedItems = newRatings.map((newRating: RatingItem) => {
        return {
          ...newRating,
          createdAt: moment(newRating.createdAt).format('LLL')
        };
      });

      this.items = [...this.items, ...updatedItems];
    }
  }
})
