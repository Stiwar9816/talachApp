import { defineStore } from 'pinia'
// Interface
import type { Field, Item } from '@/interface'

export const useUserStore = defineStore('users', () => {
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
    { title: 'Correo electronico', sortable: false, key: 'email' },
    { title: 'Rol', sortable: false, key: 'role' },
    { title: 'Estado', key: 'state' },
    { title: 'Acciones', key: 'actions', sortable: false }
  ]

  const items: Array<Item> = [
    {
      id: 1,
      name: 'Frozen Yogurt',
      phone: 3102786547,
      role: 'Administrador',
      email: 'talachero@gmail.com',
      state: 'Activo'
    },
    {
      id: 1,
      name: 'Frozen Yogurt',
      phone: 3102786547,
      role: 'Administrador',
      email: 'talachero@gmail.com',
      state: 'Inactivo'
    },
    {
      id: 1,
      name: 'Frozen Yogurt',
      phone: 3102786547,
      role: 'Administrador',
      email: 'talachero@gmail.com',
      state: 'Activo'
    },
    {
      id: 1,
      name: 'Frozen Yogurt',
      phone: 3102786547,
      role: 'Administrador',
      email: 'talachero@gmail.com',
      state: 'Activo'
    },
    {
      id: 1,
      name: 'Frozen Yogurt',
      phone: 3102786547,
      role: 'Administrador',
      email: 'talachero@gmail.com',
      state: 'Activo'
    },
    {
      id: 1,
      name: 'Frozen Yogurt',
      phone: 3102786547,
      role: 'Administrador',
      email: 'talachero@gmail.com',
      state: 'Activo'
    }
  ]

  return { fields, items }
})
