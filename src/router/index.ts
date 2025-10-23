import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: { requiresAuth: false },
  },
  // {
  //   path: '/register',
  //   name: 'Register',
  //   component: () => import('@/views/Register.vue'),
  //   meta: { requiresAuth: false },
  // },
  {
    path: '/',
    name: 'dashboard',
    component: () => import('@/views/DashboardView.vue'),
    meta: { requiresAuth: true },
  },
  // {
  //   path: '/databases',
  //   name: 'Databases',
  //   component: () => import('@/views/Databases.vue'),
  //   meta: {
  //     requiresAuth: true,
  //     permission: 'database:list',
  //   },
  // },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Navigation Guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // Si la ruta requiere autenticación
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
    return
  }

  // Si ya está autenticado y va a login, redirigir al dashboard
  if (to.path === '/login' && authStore.isAuthenticated) {
    next('/')
    return
  }

  // Verificar permisos específicos
  if (to.meta.permission && !authStore.hasPermission(to.meta.permission as string)) {
    // Puedes redirigir a una página de "sin permisos" o al dashboard
    alert('No tienes permisos para acceder a esta página')
    next('/')
    return
  }

  next()
})

export default router
