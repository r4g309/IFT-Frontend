<script setup lang="ts">
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import type { DatabaseRead } from '@/types/database'

interface Props {
  database: DatabaseRead | null
  position: { x: number; y: number }
  canDelete: boolean
}

interface Emits {
  (e: 'close'): void
  (e: 'view', database: DatabaseRead): void
  (e: 'edit', database: DatabaseRead): void
  (e: 'delete', database: DatabaseRead): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const handleView = () => {
  if (props.database) {
    emit('view', props.database)
    emit('close')
  }
}

const handleEdit = () => {
  if (props.database) {
    emit('edit', props.database)
    emit('close')
  }
}

const handleDelete = () => {
  if (props.database) {
    emit('delete', props.database)
    emit('close')
  }
}
</script>

<template>
  <DropdownMenu :open="!!database" @update:open="(v) => !v && emit('close')">
    <DropdownMenuContent
      v-if="database"
      :style="{
        position: 'fixed',
        left: position.x + 'px',
        top: position.y + 'px',
      }"
    >
      <DropdownMenuItem @click="handleView"> Ver información </DropdownMenuItem>

      <DropdownMenuItem @click="handleEdit"> Editar </DropdownMenuItem>

      <DropdownMenuItem
        v-if="canDelete"
        class="text-red-600 focus:text-red-600"
        @click="handleDelete"
      >
        Eliminar
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
