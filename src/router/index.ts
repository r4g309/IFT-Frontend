import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { AppPermission } from '@/types/permissions'
import DetailDatabase from '@/views/DetailDatabase.vue'

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
    meta: {
      requiresAuth: true,
      //permission:[AppPermission.ADMIN_ALL]
    },
  },
  {
    path: '/databases/:id',
    name: 'databaseDetail',
    props:true,
    component: DetailDatabase
  }
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
  const requiresAuth = to.meta?.requiresAuth
  const permissions = to.meta?.permission as AppPermission[] | undefined

  if (!requiresAuth) {
    return next()
  }

  if (!authStore.isAuthenticated) {
    return next('/login')
  }

  if (to.path === '/login') {
    return next('/')
  }

  if (permissions && !authStore.hasAnyPermission(...permissions)) {
    console.warn(`Acceso denegado: faltan permisos (${permissions.join(', ')})`)
    return next('/')
  }

  next()
})

export default router
