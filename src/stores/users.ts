import { defineStore } from 'pinia'

export const useUserStore = defineStore('users', () => {
  const fields: Object = [
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
    { title: 'Rol', sortable: false, key: 'role' },
    { title: 'Correo electronico', sortable: false, key: 'email' },
    { title: 'Último acceso', sortable: false, key: 'access' },
    { title: 'Estado', key: 'state' },
    { title: 'Acciones', key: 'actions', sortable: false }
  ]

  const items: Object = [
    {
      id: 1,
      name: 'Frozen Yogurt',
      role: 'Administrador',
      email: 'talachero@gmail.com',
      access: '13-04-2023',
      state: 'Activo'
    },
    {
      id: 1,
      name: 'Frozen Yogurt',
      role: 'Administrador',
      email: 'talachero@gmail.com',
      access: '13-04-2023',
      state: 'Inactivo'
    },
    {
      id: 1,
      name: 'Frozen Yogurt',
      role: 'Administrador',
      email: 'talachero@gmail.com',
      access: '13-04-2023',
      state: 'Activo'
    },
    {
      id: 1,
      name: 'Frozen Yogurt',
      role: 'Administrador',
      email: 'talachero@gmail.com',
      access: '13-04-2023',
      state: 'Activo'
    },
    {
      id: 1,
      name: 'Frozen Yogurt',
      role: 'Administrador',
      email: 'talachero@gmail.com',
      access: '13-04-2023',
      state: 'Activo'
    },
    {
      id: 1,
      name: 'Frozen Yogurt',
      role: 'Administrador',
      email: 'talachero@gmail.com',
      access: '13-04-2023',
      state: 'Activo'
    }
  ]

  return { fields, items }
})
