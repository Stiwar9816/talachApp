import { defineStore } from 'pinia'
// Interface
import type { Routes } from '@/interface'
import { computed, ref } from 'vue'
import { extractFullNameFromToken } from '@/utils'

export const useLayoutStore = defineStore('layout', () => {
  const token = ref<string | null>(sessionStorage.getItem('token'))
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
  const companies: Array<Routes> = [
    {
      name: 'Empresas',
      icon: 'mdi-city',
      route: '/companies'
    },
    {
      name: 'Trabajadores',
      icon: 'mdi-account-network',
      route: '/workers'
    }
  ]
  const routes: Array<Routes> = [
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

  const nameProfile = computed(() => extractFullNameFromToken(token.value) || '')

  return { drawer, rail, routes, prices, companies, nameProfile, imageProfile }
})
