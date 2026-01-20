<script setup lang="ts">
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import type { DatabaseRead } from '@/types/database'

interface Props {
  database: DatabaseRead
  isSelected: boolean
}

interface Emits {
  (e: 'select', database: DatabaseRead): void
  (e: 'contextmenu', event: MouseEvent, database: DatabaseRead): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const dateFormatter = new Intl.DateTimeFormat('es-ES', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})

const formatDate = (value: string) => {
  return dateFormatter.format(new Date(value))
}

const handleClick = () => {
  emit('select', defineProps<Props>().database)
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    emit('select', defineProps<Props>().database)
  }
}
</script>

<template>
  <div
    role="button"
    tabindex="0"
    class="rounded-lg border p-3 transition select-none cursor-pointer hover:bg-muted/50"
    :class="{
      'bg-muted border-primary': isSelected,
    }"
    :aria-selected="isSelected"
    @click="emit('select', database)"
    @keydown.enter="emit('select', database)"
    @keydown.space.prevent="emit('select', database)"
    @contextmenu.prevent="emit('contextmenu', $event, database)"
  >
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger as-child>
          <div class="space-y-1">
            <div class="font-medium truncate">
              {{ database.name }}
            </div>

            <div class="text-xs text-muted-foreground">
              {{ database.type }} · {{ database.host }}:{{ database.port }}
            </div>
          </div>
        </TooltipTrigger>

        <TooltipContent side="right" class="max-w-xs">
          <div class="space-y-1 text-sm">
            <div><b>Type:</b> {{ database.type }}</div>
            <div><b>Host:</b> {{ database.host }}</div>
            <div><b>Port:</b> {{ database.port }}</div>

            <div v-if="database.description"><b>Description:</b> {{ database.description }}</div>

            <div class="pt-1 text-xs text-muted-foreground">
              <div>Created: {{ formatDate(database.created_at) }}</div>
              <div>Updated: {{ formatDate(database.updated_at) }}</div>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>
</template>
