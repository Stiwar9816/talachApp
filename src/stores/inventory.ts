import { defineStore } from 'pinia'
// Interface
import type { Field, InventoryItem } from '@/interface'

export const useInventoryStore = defineStore({
  id: 'inventory',
  state: () => ({
    fields: [
      {
        title: 'Nombre',
        sortable: false,
        key: 'name'
      },
      { title: 'Stock', key: 'stock' },
      { title: 'Descripción', key: 'description' },
      { title: 'Responsable', key: 'responsible' },
      { title: 'Acciones', align: 'center', key: 'actions', sortable: false }
    ] as Field[],
    items: [
      {
        name: 'Llanta 11.22.5 R',
        stock: 159,
        description: 'Pariatur consectetur ex deserunt reprehenderit elit elit incididunt.',
        responsible: 'Jhon doe'
      }, {
        name: 'Llanta 11.22.5 R',
        stock: 159,
        description: 'Pariatur consectetur ex deserunt reprehenderit elit elit incididunt.',
        responsible: 'Jhon doe'
      }, {
        name: 'Llanta 11.22.5 R',
        stock: 159,
        description: 'Pariatur consectetur ex deserunt reprehenderit elit elit incididunt.',
        responsible: 'Jhon doe'
      }, {
        name: 'Llanta 11.22.5 R',
        stock: 159,
        description: 'Pariatur consectetur ex deserunt reprehenderit elit elit incididunt.',
        responsible: 'Jhon doe'
      }, {
        name: 'Llanta 11.22.5 R',
        stock: 159,
        description: 'Pariatur consectetur ex deserunt reprehenderit elit elit incididunt.',
        responsible: 'Jhon doe'
      }, {
        name: 'Llanta 11.22.5 R',
        stock: 159,
        description: 'Pariatur consectetur ex deserunt reprehenderit elit elit incididunt.',
        responsible: 'Jhon doe'
      },
    ] as InventoryItem[]
  })

})
