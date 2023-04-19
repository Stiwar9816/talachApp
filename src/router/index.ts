import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'
import InventoryView from '@/views/InventoryView.vue'
import OrdersView from '@/views/OrdersView.vue'
import PaymentView from '@/views/PaymentView.vue'
import RatingsView from '@/views/RatingsView.vue'
import UsersView from '@/views/UsersView.vue'
import ProductView from '@/views/ProductView.vue'
import ServiceView from '@/views/ServiceView.vue'
import CostsView from '@/views/CostsView.vue'
import ProfileView from '@/views/ProfileView.vue'

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
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: {
        layout: 'Dashboard',
      },
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: {
        layout: 'Dashboard',
      },
    },
    {
      path: '/inventory',
      name: 'inventory',
      component: InventoryView,
      meta: {
        layout: 'Dashboard',
      },
    },
    {
      path: '/orders',
      name: 'orders',
      component: OrdersView,
      meta: {
        layout: 'Dashboard',
      },
    },
    {
      path: '/payment',
      name: 'payment',
      component: PaymentView,
      meta: {
        layout: 'Dashboard',
      },
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: RatingsView,
      meta: {
        layout: 'Dashboard',
      },
    },
    {
      path: '/users',
      name: 'users',
      component: UsersView,
      meta: {
        layout: 'Dashboard',
      },
    },
    {
      path: '/products',
      name: 'products',
      component: ProductView,
      meta: {
        layout: 'Dashboard',
      },
    },
    {
      path: '/services',
      name: 'services',
      component: ServiceView,
      meta: {
        layout: 'Dashboard',
      },
    },
    {
      path: '/costs',
      name: 'costs',
      component: CostsView,
      meta: {
        layout: 'Dashboard',
      },
    }
  ]
})

export default router
