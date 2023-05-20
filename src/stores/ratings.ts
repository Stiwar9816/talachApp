import { defineStore } from 'pinia'
// Interface
import type { Field, Item } from '@/interface'

export const useRatingsStore = defineStore({
  id: 'ratings',
  state: ()=>({
    fields: [
      {
        title: 'ID',
        align: 'start',
        sortable: false,
        key: 'id'
      },
      { title: 'Usuario', sortable: false, key: 'user' },
      { title: 'Calidad', sortable: false, key: 'quality' },
      { title: 'Calificación', key: 'rating' },
      { title: 'Fecha de calificación', key: 'date' }
    ] as Field[],
    items: [
      {
        id: 1,
        user: 'Frozen Yogurt',
        quality: 'Frozen Yogurt',
        rating: 3,
        date: '13-04-2023'
      },
      {
        id: 1,
        user: 'Frozen Yogurt',
        quality: 'Frozen Yogurt',
        rating: 1,
        date: '13-04-2023'
      },
      {
        id: 1,
        user: 'Frozen Yogurt',
        quality: 'Frozen Yogurt',
        rating: 3.5,
        date: '13-04-2023'
      },
      {
        id: 1,
        user: 'Frozen Yogurt',
        quality: 'Frozen Yogurt',
        rating: 5,
        date: '13-04-2023'
      },
      {
        id: 1,
        user: 'Frozen Yogurt',
        quality: 'Frozen Yogurt',
        rating: 4.5,
        date: '13-04-2023'
      },
      {
        id: 1,
        user: 'Frozen Yogurt',
        quality: 'Frozen Yogurt',
        rating: 2,
        date: '13-04-2023'
      },
      {
        id: 1,
        user: 'Frozen Yogurt',
        quality: 'Frozen Yogurt',
        rating: 1.5,
        date: '13-04-2023'
      }
    ] as Item[]
  })
})
