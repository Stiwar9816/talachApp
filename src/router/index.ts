import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'
import InventoryView from '@/views/InventoryView.vue'
import OrdersView from '@/views/OrdersView.vue'
import RatingsView from '@/views/RatingsView.vue'
import UsersView from '@/views/UsersView.vue'
import ProductView from '@/views/ProductView.vue'
import ServiceView from '@/views/ServiceView.vue'
import CostsView from '@/views/CostsView.vue'
import ProfileView from '@/views/ProfileView.vue'
import CompanyView from '@/views/CompanyView.vue'
import { requiredAuth, useGuard } from '@/middleware/auth'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: ' login',
      component: LoginView,
      meta: {
        layout: 'Default',
      },
      beforeEnter: useGuard
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: {
        layout: 'Dashboard',
        requireAuth: true
      },
      beforeEnter: requiredAuth

    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: {
        layout: 'Dashboard',
        requireAuth: true
      },
      beforeEnter: requiredAuth
    },
    {
      path: '/companies',
      name: 'companies',
      component: CompanyView,
      meta: {
        layout: 'Dashboard',
        requireAuth: true
      },
      beforeEnter: requiredAuth
    },
    {
      path: '/inventory',
      name: 'inventory',
      component: InventoryView,
      meta: {
        layout: 'Dashboard',
        requireAuth: true
      },
      beforeEnter: requiredAuth
    },
    {
      path: '/orders',
      name: 'orders',
      component: OrdersView,
      meta: {
        layout: 'Dashboard',
        requireAuth: true
      },
      beforeEnter: requiredAuth
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: RatingsView,
      meta: {
        layout: 'Dashboard',
        requireAuth: true
      },
      beforeEnter: requiredAuth
    },
    {
      path: '/users',
      name: 'users',
      component: UsersView,
      meta: {
        layout: 'Dashboard',
        requireAuth: true
      },
      beforeEnter: requiredAuth
    },
    {
      path: '/products',
      name: 'products',
      component: ProductView,
      meta: {
        layout: 'Dashboard',
        requireAuth: true
      },
      beforeEnter: requiredAuth
    },
    {
      path: '/services',
      name: 'services',
      component: ServiceView,
      meta: {
        layout: 'Dashboard',
        requireAuth: true
      },
      beforeEnter: requiredAuth
    },
    {
      path: '/costs',
      name: 'costs',
      component: CostsView,
      meta: {
        layout: 'Dashboard',
        requireAuth: true
      },
      beforeEnter: requiredAuth
    }
  ]
})


export default router
