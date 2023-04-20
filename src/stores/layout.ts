import { defineStore } from 'pinia'
// Interface
import type { Route } from '@/interface'

export const useLayoutStore = defineStore('layout', () => {
  const nameProfile: string = 'Jhon doe'
  const imageProfile: string = 'mdi-account-circle'
  const drawer: boolean = true
  const rail: boolean = false
  const prices: Array<Route> = [
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
  const routes: Array<Route> = [
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
