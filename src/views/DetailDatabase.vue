<script setup lang="ts">
import { databasesApi } from '@/api';
import type { DatabaseDetail } from '@/types/api';
import { onMounted, ref } from 'vue';

const { id } = defineProps<{ id: string }>()
const databaseDetail = ref<null | DatabaseDetail>(null)

onMounted(async () => {
  databaseDetail.value = await databasesApi.get(id)

})

</script>

<template>
  <h1>Database ID: {{ id }}</h1>
  <ul v-for="table in databaseDetail?.tables" :key="table.id">
    <div>
      <li>{{ table.name }} | {{ table.is_active }} | {{ table.description }}</li>
    </div>
    <br>
  </ul>

</template>
