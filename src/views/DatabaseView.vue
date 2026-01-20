<script setup lang="ts">
import { onMounted, ref, watch, computed } from 'vue'
import { Pagination, PaginationContent, PaginationItem } from '@/components/ui/pagination'
import { useAuthStore } from '../stores/auth.store'
import { useDatabases } from '@/composables/useDatabases'
import { useConfirm } from '@/composables/useConfirm'
import type { DatabaseRead } from '@/types/database'
import { AppPermission } from '@/types/permissions'
import DatabaseListItem from '@/components/database/DatabaseListItem.vue'
import DatabaseContextMenu from '@/components/database/DatabaseContextMenu.vue'
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import TableView from './TableView.vue'

const { hasPermission } = useAuthStore()
const { databaseList, isLoading, error, fetchDatabases, deleteDatabase } = useDatabases()
const { confirm } = useConfirm()

const TOTAL_PER_PAGE = 10
const totalValues = ref(0)
const currentPage = ref(1)
const selectedDatabaseId = ref<string | null>(null)
const contextDb = ref<DatabaseRead | null>(null)
const contextMenuPosition = ref({ x: 0, y: 0 })

const canDelete = computed(() => hasPermission(AppPermission.DATABASE_DELETE))

const selectedDatabase = computed(() => {
  if (!selectedDatabaseId.value || !databaseList.value?.items) return null
  return databaseList.value.items.find((db) => db.id === selectedDatabaseId.value) || null
})

const getData = async () => {
  const response = await fetchDatabases(currentPage.value, TOTAL_PER_PAGE)
  if (response) {
    totalValues.value = response.total
  }
}

onMounted(getData)
watch(currentPage, getData)

const onSelect = (db: DatabaseRead) => {
  selectedDatabaseId.value = db.id
}

const openContextMenu = (event: MouseEvent, db: DatabaseRead) => {
  contextDb.value = db
  contextMenuPosition.value = {
    x: event.clientX,
    y: event.clientY,
  }
}

const closeContextMenu = () => {
  contextDb.value = null
}

const onView = (db: DatabaseRead) => {
  console.log('View database:', db)
}

const onEdit = (db: DatabaseRead) => {
  console.log('Edit database:', db)
}

const onDelete = async (db: DatabaseRead) => {
  const confirmed = await confirm({
    title: '¿Eliminar base de datos?',
    message: `¿Estás seguro de que deseas eliminar "${db.name}"? Esta acción no se puede deshacer.`,
    confirmText: 'Eliminar',
    cancelText: 'Cancelar',
  })

  if (confirmed) {
    const success = await deleteDatabase(db.id)
    if (success) {
      if (selectedDatabaseId.value === db.id) {
        selectedDatabaseId.value = null
      }
      await getData()
    }
  }
}
</script>

<template>
  <div class="flex h-screen">
    <aside class="w-80 shrink-0 border-r bg-white flex flex-col">
      <div class="flex-1 overflow-y-auto p-4">
        <div v-if="isLoading" class="flex items-center justify-center p-8">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>

        <div v-else-if="error" class="p-4 text-sm text-red-600 bg-red-50 rounded-lg">
          {{ error }}
          <button class="mt-2 text-xs underline hover:no-underline" @click="getData">
            Intentar de nuevo
          </button>
        </div>

        <div
          v-else-if="!databaseList?.items?.length"
          class="p-8 text-center text-sm text-muted-foreground"
        >
          <div class="mb-2">No hay bases de datos disponibles</div>
          <button class="text-xs text-primary underline hover:no-underline" @click="getData">
            Recargar
          </button>
        </div>

        <div v-else class="space-y-3">
          <DatabaseListItem
            v-for="database in databaseList.items"
            :key="database.id"
            :database="database"
            :is-selected="database.id === selectedDatabaseId"
            @select="onSelect"
            @contextmenu="openContextMenu"
          />
        </div>
      </div>

      <div class="border-t p-3">
        <Pagination
          v-model:page="currentPage"
          :items-per-page="TOTAL_PER_PAGE"
          :total="totalValues"
          :disabled="isLoading"
        >
          <PaginationContent v-slot="{ items }">
            <template v-for="(item, index) in items" :key="index">
              <PaginationItem
                v-if="item.type === 'page'"
                :value="item.value"
                :is-active="item.value === currentPage"
              >
                {{ item.value }}
              </PaginationItem>
            </template>
          </PaginationContent>
        </Pagination>
      </div>
    </aside>

    <main class="flex-1 p-6 bg-muted/30">
      <div v-if="selectedDatabase" class="space-y-4">
        <TableView :database="selectedDatabase" />
        <!-- <div>
          <h2 class="text-2xl font-semibold mb-2">{{ selectedDatabase.name }}</h2>
          <p class="text-sm text-muted-foreground">
            {{ selectedDatabase.description || 'Sin descripción' }}
          </p>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="p-4 bg-white rounded-lg border">
            <div class="text-sm font-medium text-muted-foreground mb-1">Tipo</div>
            <div class="text-lg">{{ selectedDatabase.type }}</div>
          </div>

          <div class="p-4 bg-white rounded-lg border">
            <div class="text-sm font-medium text-muted-foreground mb-1">Host</div>
            <div class="text-lg">{{ selectedDatabase.host }}</div>
          </div>

          <div class="p-4 bg-white rounded-lg border">
            <div class="text-sm font-medium text-muted-foreground mb-1">Puerto</div>
            <div class="text-lg">{{ selectedDatabase.port }}</div>
          </div>

          <div class="p-4 bg-white rounded-lg border">
            <div class="text-sm font-medium text-muted-foreground mb-1">Base de datos</div>
            <div class="text-lg">{{ selectedDatabase.name || 'N/A' }}</div>
          </div>
        </div> -->
      </div>

      <div v-else class="flex items-center justify-center h-full">
        <div class="text-center text-muted-foreground">
          <div class="text-lg mb-2">Ninguna base de datos seleccionada</div>
          <div class="text-sm">Selecciona una base de datos de la lista para ver sus detalles</div>
        </div>
      </div>
    </main>
  </div>

  <!-- Menú contextual -->
  <DatabaseContextMenu
    :database="contextDb"
    :position="contextMenuPosition"
    :can-delete="canDelete"
    @close="closeContextMenu"
    @view="onView"
    @edit="onEdit"
    @delete="onDelete"
  />

  <!-- Diálogo de confirmación -->
  <ConfirmDialog />
</template>
