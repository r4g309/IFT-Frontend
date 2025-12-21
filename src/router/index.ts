import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'
import type { AppPermission } from '@/types/permissions'
import { useAuthStore } from '@/stores/auth.store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const requiresAuth = to.meta?.requiresAuth
  const permissions = to.meta?.permission as AppPermission[] | undefined

  if (to.path === '/login' && authStore.isAuthenticated) {
    console.log('Usuario autenticado intentando ir a /login → redirigiendo a /')
    return next('/')
  }

  if (!requiresAuth) {
    return next()
  }

  if (!authStore.isAuthenticated) {
    console.log('Ruta protegida y usuario no autenticado → redirigiendo a /login')
    return next('/login')
  }

  if (permissions && !authStore.hasAnyPermission(...permissions)) {
    console.warn(`Acceso denegado: faltan permisos (${permissions.join(', ')})`)
    return next('/')
  }
  next()
})

export default router
