import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { AppPermission, Resource, Action } from '@/types/permissions'

export const usePermissions = () => {
  const authStore = useAuthStore()

  // Database permissions
  const canCreateDatabase = computed(() => authStore.hasPermission(AppPermission.DATABASE_CREATE))
  const canReadDatabase = computed(() => authStore.hasPermission(AppPermission.DATABASE_READ))
  const canUpdateDatabase = computed(() => authStore.hasPermission(AppPermission.DATABASE_UPDATE))
  const canDeleteDatabase = computed(() => authStore.hasPermission(AppPermission.DATABASE_DELETE))
  const canListDatabases = computed(() => authStore.hasPermission(AppPermission.DATABASE_LIST))

  // Table permissions
  const canCreateTable = computed(() => authStore.hasPermission(AppPermission.TABLE_CREATE))
  const canReadTable = computed(() => authStore.hasPermission(AppPermission.TABLE_READ))
  const canUpdateTable = computed(() => authStore.hasPermission(AppPermission.TABLE_UPDATE))
  const canDeleteTable = computed(() => authStore.hasPermission(AppPermission.TABLE_DELETE))
  const canListTables = computed(() => authStore.hasPermission(AppPermission.TABLE_LIST))

  // Column permissions
  const canCreateColumn = computed(() => authStore.hasPermission(AppPermission.COLUMN_CREATE))
  const canReadColumn = computed(() => authStore.hasPermission(AppPermission.COLUMN_READ))
  const canUpdateColumn = computed(() => authStore.hasPermission(AppPermission.COLUMN_UPDATE))
  const canDeleteColumn = computed(() => authStore.hasPermission(AppPermission.COLUMN_DELETE))
  const canListColumns = computed(() => authStore.hasPermission(AppPermission.COLUMN_LIST))

  // User permissions
  const canManageUsers = computed(() =>
    authStore.hasAnyPermission(
      AppPermission.USER_CREATE,
      AppPermission.USER_UPDATE,
      AppPermission.USER_DELETE,
    ),
  )

  // Permission management
  const canManagePermissions = computed(() =>
    authStore.hasAnyPermission(AppPermission.PERMISSION_ASSIGN, AppPermission.PERMISSION_REVOKE),
  )

  // Generic resource check
  const can = (resource: Resource, action: Action): boolean => {
    return authStore.hasPermission(`${resource}:${action}`)
  }

  return {
    // Database
    canCreateDatabase,
    canReadDatabase,
    canUpdateDatabase,
    canDeleteDatabase,
    canListDatabases,
    // Table
    canCreateTable,
    canReadTable,
    canUpdateTable,
    canDeleteTable,
    canListTables,
    // Column
    canCreateColumn,
    canReadColumn,
    canUpdateColumn,
    canDeleteColumn,
    canListColumns,
    // Others
    canManageUsers,
    canManagePermissions,
    // Generic
    can,
    // Re-export from store
    isAdmin: authStore.isAdmin,
    userRole: authStore.userRole,
  }
}
