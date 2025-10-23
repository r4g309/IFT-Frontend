<script setup lang="ts">
// import { usePermissions } from '@/composables/usePermissions'
// import { Resource, Action, AppPermission } from '@/types/permissions'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
// const perms = usePermissions()
// console.log(perms.canCreateDatabase) // true/false
// console.log(perms.isAdmin) // true/false
// console.log(perms.userRole) // 'admin' | 'editor' | 'viewer'

// // Generic check
// const canDoSomething = perms.can(Resource.DATABASE, Action.CREATE)

// console.log({
//   canDoSomething,
// })
// // Check specific permission
// if (authStore.hasPermission(AppPermission.DATABASE_CREATE)) {
//   console.log('Can create databases!')
// }

// // Check multiple permissions (ANY)
// if (authStore.hasAnyPermission(AppPermission.DATABASE_CREATE, AppPermission.TABLE_CREATE)) {
//   console.log('Can create databases OR tables!')
// }

// // Check multiple permissions (ALL)
// if (authStore.hasAllPermissions(AppPermission.DATABASE_READ, AppPermission.TABLE_READ)) {
//   console.log('Can read both databases AND tables!')
// }

// // Resource-based checks
// if (authStore.canCreate('database')) {
//   console.log('Can create databases!')
// }

// // View all user permissions grouped by resource
// console.log(authStore.permissionsByResource.value)
// Output: { database: ['create', 'read', 'update'], table: ['list'] }
const userLogout = () => authStore.logout()
</script>

<template>
  <h1>Hello world from Dashboard</h1>
  <button @click="userLogout()">Logout</button>
</template>
