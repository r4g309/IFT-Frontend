import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { AuthUser } from '@/types/auth'
import { AppPermission } from '@/types/permissions'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<Omit<AuthUser, 'permissions'> | null>(null)
  const permissions = ref<Set<string>>(new Set())

  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => permissions.value.has(AppPermission.ADMIN_ALL))

  function setUser(newUser: AuthUser) {
    user.value = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    }
    permissions.value = new Set(newUser.permissions)
  }

  function clearUser() {
    user.value = null
    permissions.value.clear()
  }

  function hasPermission(permission: string | AppPermission): boolean {
    if (!user.value) return false
    if (isAdmin.value) return true
    return permissions.value.has(permission as string)
  }

  function hasAnyPermission(...perms: (string | AppPermission)[]): boolean {
    if (!user.value) return false
    if (isAdmin.value) return true
    return perms.some((p) => permissions.value.has(p as string))
  }

  function hasAllPermissions(...perms: (string | AppPermission)[]): boolean {
    if (!user.value) return false
    if (isAdmin.value) return true
    return perms.every((p) => permissions.value.has(p as string))
  }

  function can(resource: string, action: string): boolean {
    return hasPermission(`${resource}:${action}`)
  }

  return {
    user,
    permissions,
    isAuthenticated,
    isAdmin,
    setUser,
    clearUser,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    can,
  }
})
