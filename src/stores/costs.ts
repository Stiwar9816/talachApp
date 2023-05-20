import { defineStore } from 'pinia'
// Interface
import type { Field, Item, PriceItem } from '@/interface'

export const useCostsStore = defineStore({
  id:'costs',
  state: ()=>({
    fields:  [
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
      },{
        id: 159,
        name: 'Frozen Yogurt',
        price: 6.0
      },{
        id: 159,
        name: 'Frozen Yogurt',
        price: 6.0
      },{
        id: 159,
        name: 'Frozen Yogurt',
        price: 6.0
      },{
        id: 159,
        name: 'Frozen Yogurt',
        price: 6.0
      },{
        id: 159,
        name: 'Frozen Yogurt',
        price: 6.0
      },
    ] as PriceItem[]
  })
})
