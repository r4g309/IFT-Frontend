<template>
  <div :class="cardClasses" @click="handleClick">
    <div v-if="$slots.header || title" class="card-header">
      <slot name="header">
        <h3 class="card-title">{{ title }}</h3>
      </slot>
    </div>

    <div class="card-body">
      <slot></slot>
    </div>

    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'elevated', 'flat'].includes(value)
  },
  hoverable: {
    type: Boolean,
    default: false
  },
  clickable: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const cardClasses = computed(() => {
  return [
    'card',
    `card-${props.variant}`,
    {
      'card-hoverable': props.hoverable,
      'card-clickable': props.clickable
    }
  ]
})

const handleClick = (event) => {
  if (props.clickable) {
    emit('click', event)
  }
}
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  background-color: var(--bg-secondary);
  border: var(--border-normal) solid var(--border-color);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all var(--transition-fast);
}

.card-default {
  box-shadow: var(--shadow-md);
}

.card-elevated {
  box-shadow: var(--shadow-lg);
}

.card-flat {
  box-shadow: none;
}

.card-hoverable:hover {
  transform: translate(-2px, -2px);
  box-shadow: 4px 4px 0 var(--shadow-color);
  border-color: var(--color-primary);
}

.card-clickable {
  cursor: pointer;
}

.card-clickable:active {
  transform: translate(0, 0);
  box-shadow: 2px 2px 0 var(--shadow-color);
}

.card-header {
  padding: var(--space-4) var(--space-6);
  border-bottom: var(--border-normal) solid var(--border-color);
  background-color: var(--bg-tertiary);
}

.card-title {
  margin: 0;
  font-size: var(--text-lg);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
}

.card-body {
  padding: var(--space-6);
  flex: 1;
}

.card-footer {
  padding: var(--space-4) var(--space-6);
  border-top: var(--border-normal) solid var(--border-color);
  background-color: var(--bg-tertiary);
}

@media (max-width: 768px) {

  .card-header,
  .card-footer {
    padding: var(--space-3) var(--space-4);
  }

  .card-body {
    padding: var(--space-4);
  }
}
</style>
