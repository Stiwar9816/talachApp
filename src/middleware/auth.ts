import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '@/stores/useAuth'

export const requiredAuth = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): void => {
  if (to.matched.some((record) => record.meta.requireAuth)) {
    const authStore = useAuthStore()
    if (!authStore.isAuthenticated) {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    next()
  }
}

export const useGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): void => {
  const authStore = useAuthStore()
  if (authStore.isAuthenticated) {
    next({ path: '/home' })
  } else {
    next()
  }
}
