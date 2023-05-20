import { defineStore } from 'pinia'
// Interface
import type { Field, Item } from '@/interface'

export const useServiceStore = defineStore({
  id: 'service',
  state: () => ({
    fields: [
      { title: 'ID', sortable: false, key: 'id' },
      {
        title: 'Nombre',
        sortable: false,
        key: 'name'
      },
      { title: 'Precio', align: 'center', key: 'price' },
      { title: 'Acciones', sortable: false, key: 'actions' }
    ] as Field[],

    items: [
      {
        id: 159,
        name: 'Frozen Yogurt',
        price: 6.0
      },
      {
        id: 237,
        name: 'Ice cream sandwich',
        price: 9.0
      },
      {
        id: 262,
        name: 'Eclair',
        price: 16.0
      },
      {
        id: 305,
        name: 'Cupcake',
        price: 3.7
      },
      {
        id: 356,
        name: 'Gingerbread',
        price: 16.0
      },
      {
        id: 375,
        name: 'Jelly bean',
        price: 0.0
      },
      {
        id: 392,
        name: 'Lollipop',
        price: 0.2
      },
      {
        id: 408,
        name: 'Honeycomb',
        price: 3.2
      },
      {
        id: 452,
        name: 'Donut',
        price: 25.0
      },
      {
        id: 518,
        name: 'KitKat',
        price: 26.0
      }
    ] as Item[]
  })
})
