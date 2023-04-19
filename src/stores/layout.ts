import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', () => {
  const nameProfile: String = 'Jhon doe'
  const imageProfile = 'mdi-account-circle'
  const drawer = true
  const rail = true
  const prices = [
    {
      name: 'Productos',
      icon: 'mdi-package-variant-closed',
      route: '/products'
    },
    {
      name: 'Servicios',
      icon: 'mdi-face-agent',
      route: '/services'
    },
    {
      name: 'Costos Fijos',
      icon: 'mdi-cash-lock',
      route: '/costs'
    }
  ]
  const routes = [
    {
      name: 'Inicio',
      icon: 'mdi-home-account',
      route: '/home'
    },
    {
      name: 'Inventario',
      icon: 'mdi-package-variant-closed-plus',
      route: '/inventory'
    },
    {
      name: 'Pedidos',
      icon: 'mdi-order-bool-descending-variant',
      route: '/orders'
    },
    {
      name: 'Pagos',
      icon: 'mdi-account-cash',
      route: '/payment'
    },
    {
      name: 'Calificaciones',
      icon: 'mdi-account-star',
      route: '/ratings'
    },
    {
      name: 'Usuarios',
      icon: 'mdi-account-group',
      route: '/users'
    }
  ]
  return { drawer, rail, routes, prices, nameProfile, imageProfile }
})
