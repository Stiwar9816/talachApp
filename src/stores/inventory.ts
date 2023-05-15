import { defineStore } from 'pinia'
// Interface
import type { Field, Item } from '@/interface'

export const useInventoryStore = defineStore('inventory', () => {
  const fields: Array<Field> = [
    {
      title: 'Nombre',
      sortable: false,
      key: 'name'
    },
    { title: 'Stock', key: 'stock' },
    { title: 'Descripción', key: 'description' },
    { title: 'Responsable', key: 'responsible' },
    { title: 'Acciones', key: 'actions', sortable: false }
  ]

  const items: Array<Item> = [
    {
      name: 'Llanta 11.22.5 R',
      stock: 159,
      description: 'Pariatur consectetur ex deserunt reprehenderit elit elit incididunt.',
      responsible: 'Jhon doe'
    },
    {
      name: 'Llanta 11.24.5 R',
      stock: 159,
      description: 'Pariatur consectetur ex deserunt reprehenderit elit elit incididunt.',
      responsible: 'Jhon doe'
    },
    {
      name: 'Llanta 11.21.5 R',
      stock: 159,
      description: 'Pariatur consectetur ex deserunt reprehenderit elit elit incididunt.',
      responsible: 'Jhon doe'
    },
    {
      name: 'Llanta 11.20.5 R',
      stock: 159,
      description: 'Pariatur consectetur ex deserunt reprehenderit elit elit incididunt.',
      responsible: 'Jhon doe'
    },
    {
      name: 'Llanta 11.22.5 R',
      stock: 159,
      description: 'Pariatur consectetur ex deserunt reprehenderit elit elit incididunt.',
      responsible: 'Jhon doe'
    },
    {
      name: 'Llanta 11.22.5 R',
      stock: 159,
      description: 'Pariatur consectetur ex deserunt reprehenderit elit elit incididunt.',
      responsible: 'Jhon doe'
    },
    {
      name: 'Llanta 11.22.5 R',
      stock: 159,
      description: 'Pariatur consectetur ex deserunt reprehenderit elit elit incididunt.',
      responsible: 'Jhon doe'
    },
    {
      name: 'Llanta 11.22.5 R',
      stock: 159,
      description: 'Pariatur consectetur ex deserunt reprehenderit elit elit incididunt.',
      responsible: 'Jhon doe'
    },
    {
      name: 'Llanta 11.22.5 R',
      stock: 159,
      description: 'Pariatur consectetur ex deserunt reprehenderit elit elit incididunt.',
      responsible: 'Jhon doe'
    },
    {
      name: 'Llanta 11.22.5 R',
      stock: 159,
      description: 'Pariatur consectetur ex deserunt reprehenderit elit elit incididunt.',
      responsible: 'Jhon doe'
    },
  ]

  return { fields, items }
})
