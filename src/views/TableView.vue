<script setup lang="ts">
import { useTables } from '@/composables/useTables'
import type { DatabaseRead } from '@/types/database'
// import { onMounted, watch } from 'vue'
import { onMounted, toRefs, watch } from 'vue'

interface Props {
  database: DatabaseRead
}

const { tableList, fetchTablesByDB, error, isLoading } = useTables()

const props = defineProps<Props>()
const { database } = toRefs(props)

watch(
  database,
  // (newVal, oldVal) => { console.log('Database cambió', newVal) },
  async () => {
    console.log('New value', database)
    const { id } = database.value
    const data = await fetchTablesByDB(id, 1, 10)
    console.log(data)
  },
  // { deep: true },
)

onMounted(async () => {
  const { id } = props.database
  const data = await fetchTablesByDB(id, 1, 10)
  console.log(data)
})
</script>
<template>
  <div>
    <div v-if="isLoading" class="flex items-center justify-center p-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
    <div v-else-if="error" class="p-4 text-sm text-red-600 bg-red-50 rounded-lg">
      {{ error }}
      <button class="mt-2 text-xs underline hover:no-underline" disabled>Intentar de nuevo</button>
    </div>
    <!-- <p>{{ database.name }}</p> -->
    <div v-else-if="!tableList?.items?.length">No data</div>
    <div v-else>
      <div v-for="item in tableList.items" :key="item.id">
        <!-- {{ item.database_id }} -->
        {{ item.name }}
        {{ item.is_active }}
        {{ item.description }}
        {{ item.created_at }}
        {{ item.updated_at }}
        <br />
        <br />
        <br />
      </div>
    </div>
  </div>
</template>
