import { defineStore } from 'pinia'
// Interface
import type { Routes } from '@/interface'
import { ref } from 'vue'

export const useLayoutStore = defineStore('layout', () => {
  const nameProfile = ref<String | null>(localStorage.getItem('user'))
  const imageProfile: string = 'mdi-account-circle'
  const drawer: boolean = true
  const rail: boolean = false
  const prices: Array<Routes> = [
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
  const routes: Array<Routes> = [
    {
      name: 'Inicio',
      icon: 'mdi-home-account',
      route: '/home'
    },
    {
      name: 'Empresas',
      icon: 'mdi-domain',
      route: '/companies'
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
