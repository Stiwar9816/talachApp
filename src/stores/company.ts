import { defineStore } from 'pinia'
// Interface
import type { Field, Item } from '@/interface'

export const useCompanyStore = defineStore('company', () => {
  const fields: Array<Field> = [
    {
      title: 'ID',
      sortable: false,
      key: 'id'
    },
    {
      title: 'Nombre',
      sortable: false,
      key: 'name'
    },
    { title: 'Teléfono', sortable: false, key: 'phone' },
    { title: 'Nombre Comercial', sortable: false, key: 'bussiness_name' },
    { title: 'Dirección', sortable: false, key: 'address' },
    { title: 'Estado', sortable: false, key: 'departament' },
    { title: 'Ciudad', sortable: false, key: 'city' },
    { title: 'Codigo Postal', sortable: false, key: 'postal_code' },
    { title: 'Activo', key: 'state' },
    { title: 'Acciones', key: 'actions', sortable: false }
  ]

  const items: Array<Item> = [
    {
      id: 1,
      name: 'Frozen Yogurt',
      phone: 312005473,
      bussiness_name: 'Talachero test',
      address: 'Puebla',
      departament: 'CDMX',
      city: 'CDMX',
      postal_code: 270002,
      state: 'Activo'
    },
    {
      id: 2,
      name: 'Frozen Yogurt 9',
      phone: 312005473,
      bussiness_name: 'Talachero test',
      address: 'Puebla',
      departament: 'CDMX',
      city: 'CDMX',
      postal_code: 270002,
      state: 'Activo'
    },
    {
      id: 3,
      name: 'Frozen Yogurt 1',
      phone: 312005473,
      bussiness_name: 'Talachero test',
      address: 'Puebla',
      departament: 'CDMX',
      city: 'CDMX',
      postal_code: 270002,
      state: 'Activo'
    },
    {
      id: 4,
      name: 'Frozen Yogurt 6',
      phone: 312005473,
      bussiness_name: 'Talachero test',
      address: 'Puebla',
      departament: 'CDMX',
      city: 'CDMX',
      postal_code: 270002,
      state: 'Activo'
    },
    {
      id: 5,
      name: 'Frozen Yogurt 3',
      phone: 312005473,
      bussiness_name: 'Talachero test',
      address: 'Puebla',
      departament: 'CDMX',
      city: 'CDMX',
      postal_code: 270002,
      state: 'Activo'
    },

  ]

  return { fields, items }
})
