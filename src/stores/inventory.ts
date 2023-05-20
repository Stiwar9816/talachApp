import { defineStore } from 'pinia'
// Interface
import type { Field, InventoryItem } from '@/interface'
import apolloClient from '@/plugins/apollo'

export const useInventoryStore = defineStore({
  id:'inventory',
  state: ()=>({
    fields: [
      {
        title: 'Nombre',
        sortable: false,
        key: 'name'
      },
      { title: 'Stock', key: 'stock' },
      { title: 'Descripción', key: 'description' },
      { title: 'Responsable', key: 'responsible' },
      { title: 'Acciones', key: 'actions', sortable: false }
    ] as Field[], 
    items: [] as InventoryItem[]
  }),
  actions:{
    // async createInventory(payload: InventoryItem){
    //   const {data}= await apolloClient.mutate()
    // }
  }

})
