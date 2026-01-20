import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import type { AppPermission } from '@/types/permissions'
import { useAuthStore } from '@/stores/auth.store'
import { useAuth } from '@/composables/useAuth'
import DatabaseView from '@/views/DatabaseView.vue'

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
      component: DatabaseView,
      meta: { requiresAuth: true },
    },
  ],
})

let isBootstrapped = false
let bootstrapPromise: Promise<void> | null = null

async function ensureBootstrapped() {
  if (isBootstrapped) return

  if (!bootstrapPromise) {
    bootstrapPromise = (async () => {
      const { bootstrapAuth } = useAuth()
      await bootstrapAuth()
      isBootstrapped = true
    })()
  }

  await bootstrapPromise
}

//  TODO: Remove the console.log
router.beforeEach(async (to, from, next) => {
  await ensureBootstrapped()

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
