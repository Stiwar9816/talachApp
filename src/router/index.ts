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
      path:'/',
      name:' login',
      component: LoginView
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/inventory',
      name: 'inventory',
      component: InventoryView
    },
    {
      path: '/orders',
      name: 'orders',
      component: OrdersView
    },
    {
      path: '/payment',
      name: 'payment',
      component: PaymentView
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: RatingsView
    },
    {
      path: '/users',
      name: 'users',
      component: UsersView
    },
    {
      path: '/products',
      name: 'products',
      component: ProductView
    },
    {
      path: '/services',
      name: 'services',
      component: ServiceView
    },
    {
      path: '/costs',
      name: 'costs',
      component: CostsView
    }
  ]
})

export default router
