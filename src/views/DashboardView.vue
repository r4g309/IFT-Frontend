<script setup lang="ts">
// import { usePermissions } from '@/composables/usePermissions'
// import { Resource, Action, AppPermission } from '@/types/permissions'
import { databasesApi } from '@/api'
import type { DatabaseSchema } from '@/types/api'
import { onMounted, ref } from 'vue'
import type { PaginatedResponse } from '../types/api';
import { useRouter } from 'vue-router';
import BaseButton from '@/ui/components/BaseButton.vue';
import BaseCard from '@/ui/components/BaseCard.vue';

const databases = ref<null | PaginatedResponse<DatabaseSchema>>(null)
const router = useRouter()
onMounted(async () => {
  databases.value = await databasesApi.list()
})

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
const showDBDetails = (databaseId: string) => {
  router.push({ name: 'databaseDetail', params: { id: databaseId } })
}
</script>

<template>
  <div class="db-page">
    <h3>Databases</h3>

    <div class="container">
      <div v-for="database in databases?.items" :key="database.id" class="showcase-group">
        <BaseCard hoverable class="card">
          <template #header>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <h3 style="margin: 0;">{{ database.name }}</h3>
              <!-- <BaseBadge variant="success"></BaseBadge> -->
            </div>
          </template>

          <div style="display: flex; flex-direction: column; gap: var(--space-3);">
            <div><strong>Type:</strong> {{ database.type }}</div>
            <div><strong>Host:</strong> {{ database.host }}</div>
            <!-- <div><strong>Tables:</strong> 24</div> -->
          </div>

          <template #footer>
            <div style="display: flex; gap: var(--space-3);">
              <BaseButton @click="showDBDetails(database.id)" size="sm" variant="primary">View Details</BaseButton>
              <!-- <BaseButton size="sm" variant="outline">Export</BaseButton> -->
            </div>
          </template>
        </BaseCard>
      </div>
    </div>
    <!-- <h1>Hello world from Dashboard</h1>
    <li v-for="db in databases?.items" :key="db.id">
      <p>{{ db.name }}</p>
      <p>{{ db.description }}</p>
      <p>{{ db.created_at }}</p>
      <p>{{ db.updated_at }}</p>
      <button @click="onDbClick(db.id)">See Details</button>
    </li> -->
  </div>
</template>

<style scoped>

.db-page {
  height: 100dvh;
  padding: var(--space-8) var(--space-4);
  background: var(--gradient-dark);
}

/* .container {
  display: flex;

} */

.card {
  margin-bottom: 16px;
  margin-left: 16px;
  max-width: 70dvw;
}
</style>
