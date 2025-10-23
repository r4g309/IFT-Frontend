import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authApi } from '@/api'
import type { UserSchema, UserLogin, UserCreate } from '@/types/api'
import { AppPermission, parsePermission, type PermissionGroup } from '@/types/permissions'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  // State
  const user = ref<UserSchema | null>(null)
  const token = ref<string | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Computed
  const isAuthenticated = computed(() => !!token.value && !!user.value)

  const userPermissions = computed(() => user.value?.permissions.map((p) => p.permission) || [])

  const isAdmin = computed(() => userPermissions.value.includes(AppPermission.ADMIN_ALL))

  const userRole = computed((): PermissionGroup | null => {
    if (!user.value) return null

    if (isAdmin.value) return 'admin' as PermissionGroup

    const perms = userPermissions.value

    // Check if user has editor permissions
    const hasCreatePerms = perms.some((p) => p.includes(':create') || p.includes(':update'))

    if (hasCreatePerms) return 'editor' as PermissionGroup

    // Otherwise viewer
    return 'viewer' as PermissionGroup
  })

  // Permission checking methods
  const hasPermission = (permission: string | AppPermission): boolean => {
    if (!user.value) return false

    // Admin bypass
    if (isAdmin.value) return true

    return userPermissions.value.includes(permission as string)
  }

  const hasAnyPermission = (...permissions: (string | AppPermission)[]): boolean => {
    if (!user.value) return false

    // Admin bypass
    if (isAdmin.value) return true

    return permissions.some((p) => userPermissions.value.includes(p as string))
  }

  const hasAllPermissions = (...permissions: (string | AppPermission)[]): boolean => {
    if (!user.value) return false

    // Admin bypass
    if (isAdmin.value) return true

    return permissions.every((p) => userPermissions.value.includes(p as string))
  }

  const canCreate = (resource: string): boolean => {
    return hasPermission(`${resource}:create` as AppPermission)
  }

  const canRead = (resource: string): boolean => {
    return hasPermission(`${resource}:read` as AppPermission)
  }

  const canUpdate = (resource: string): boolean => {
    return hasPermission(`${resource}:update` as AppPermission)
  }

  const canDelete = (resource: string): boolean => {
    return hasPermission(`${resource}:delete` as AppPermission)
  }

  const canList = (resource: string): boolean => {
    return hasPermission(`${resource}:list` as AppPermission)
  }

  // Get permissions grouped by resource
  const permissionsByResource = computed(() => {
    const grouped: Record<string, string[]> = {}

    userPermissions.value.forEach((perm) => {
      const { resource, action } = parsePermission(perm)
      if (!grouped[resource]) {
        grouped[resource] = []
      }
      grouped[resource].push(action)
    })

    return grouped
  })

  // Actions
  const login = async (credentials: UserLogin) => {
    try {
      loading.value = true
      error.value = null

      const response = await authApi.login(credentials)

      const savedToken = localStorage.getItem('jwt_token')

      if (savedToken) {
        token.value = savedToken
        user.value = response
        localStorage.setItem('user', JSON.stringify(response))
      }

      return response
    } catch (err: any) {
      error.value = err.response?.data?.detail || 'Error al iniciar sesión'
      throw err
    } finally {
      loading.value = false
    }
  }

  const register = async (data: UserCreate) => {
    try {
      loading.value = true
      error.value = null

      const response = await authApi.register(data)
      return response
    } catch (err: any) {
      error.value = err.response?.data?.detail || 'Error al registrarse'
      throw err
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    authApi.logout()
    user.value = null
    token.value = null
    error.value = null
    router.push({ name: 'login' })
  }

  const initAuth = () => {
    const savedToken = localStorage.getItem('jwt_token')
    const savedUser = localStorage.getItem('user')

    if (savedToken && savedUser) {
      token.value = savedToken
      try {
        user.value = JSON.parse(savedUser)
      } catch (a) {
        logout()
      }
    }
  }

  return {
    // State
    user,
    token,
    loading,
    error,
    // Computed
    isAuthenticated,
    userPermissions,
    isAdmin,
    userRole,
    permissionsByResource,
    // Permission checks
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    canCreate,
    canRead,
    canUpdate,
    canDelete,
    canList,
    // Actions
    login,
    register,
    logout,
    initAuth,
  }
})
