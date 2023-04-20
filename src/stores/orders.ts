import { defineStore } from 'pinia'
// Interface
import type { Field, Item } from '@/interface'

export const useOrdersStore = defineStore('orders', () => {
  const fields:Array<Field> = [
    {
      key: 'id',
      sortable: false,
      title: 'ID'
    },
    { key: 'user', sortable: false, title: 'Usuario' },
    { key: 'date', sortable: true, title: 'Fecha de servicio' },
    { key: 'talachero', sortable: false, title: 'Talachero' },
    { key: 'payment', sortable: false, title: 'Método de pago' },
    { key: 'total', sortable: false, title: 'Total' },
    { key: 'state', sortable: true, title: 'Estado' }
  ]
  const items:Array<Item> = [
    {
      id: 1,
      user: 'Frozen Yogurt',
      date: '13-04-2023',
      talachero: 'Frozen Yogurt',
      payment: 'Conekta',
      total: 1000,
      state: 'Creado'
    },
    {
      id: 1,
      user: 'Frozen Yogurt',
      date: '13-04-2023',
      talachero: 'Frozen Yogurt',
      payment: 'Conekta',
      total: 1000,
      state: 'Creado'
    },
    {
      id: 1,
      user: 'Frozen Yogurt',
      date: '13-04-2023',
      talachero: 'Frozen Yogurt',
      payment: 'Conekta',
      total: 1000,
      state: 'Creado'
    },
    {
      id: 1,
      user: 'Frozen Yogurt',
      date: '13-04-2023',
      talachero: 'Frozen Yogurt',
      payment: 'Conekta',
      total: 1000,
      state: 'Creado'
    },
    {
      id: 1,
      user: 'Frozen Yogurt',
      date: '13-04-2023',
      talachero: 'Frozen Yogurt',
      payment: 'Conekta',
      total: 1000,
      state: 'Creado'
    },
    {
      id: 1,
      user: 'Frozen Yogurt',
      date: '13-04-2023',
      talachero: 'Frozen Yogurt',
      payment: 'Conekta',
      total: 1000,
      state: 'Creado'
    },
    {
      id: 1,
      user: 'Frozen Yogurt',
      date: '13-04-2023',
      talachero: 'Frozen Yogurt',
      payment: 'Conekta',
      total: 1000,
      state: 'Creado'
    }
  ]
  return { fields, items }
})
