<template>
  <span :class="badgeClasses">
    <slot></slot>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (value) =>
      ['default', 'primary', 'secondary', 'success', 'warning', 'error', 'info'].includes(value),
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
  outlined: {
    type: Boolean,
    default: false,
  },
})

const badgeClasses = computed(() => {
  return [
    'badge',
    `badge-${props.variant}`,
    `badge-${props.size}`,
    {
      'badge-outlined': props.outlined,
    },
  ]
})
</script>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-heading);
  font-weight: var(--font-weight-semibold);
  border: var(--border-normal) solid;
  border-radius: var(--radius-md);
  white-space: nowrap;
  transition: all var(--transition-fast);
}

/* Sizes */
.badge-sm {
  padding: var(--space-1) var(--space-2);
  font-size: var(--text-xs);
}

.badge-md {
  padding: var(--space-1) var(--space-3);
  font-size: var(--text-sm);
}

.badge-lg {
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-base);
}

/* Variants - Filled */
.badge-default {
  background-color: var(--bg-tertiary);
  border-color: var(--border-color);
  color: var(--text-primary);
}

.badge-primary {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: white;
}

.badge-secondary {
  background-color: var(--color-secondary);
  border-color: var(--color-secondary);
  color: white;
}

.badge-success {
  background-color: var(--success);
  border-color: var(--success);
  color: white;
}

.badge-warning {
  background-color: var(--warning);
  border-color: var(--warning);
  color: white;
}

.badge-error {
  background-color: var(--error);
  border-color: var(--error);
  color: white;
}

.badge-info {
  background-color: var(--info);
  border-color: var(--info);
  color: white;
}

/* Outlined variants */
.badge-outlined.badge-default {
  background-color: transparent;
  border-color: var(--border-color);
  color: var(--text-primary);
}

.badge-outlined.badge-primary {
  background-color: transparent;
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.badge-outlined.badge-secondary {
  background-color: transparent;
  border-color: var(--color-secondary);
  color: var(--color-secondary);
}

.badge-outlined.badge-success {
  background-color: transparent;
  border-color: var(--success);
  color: var(--success);
}

.badge-outlined.badge-warning {
  background-color: transparent;
  border-color: var(--warning);
  color: var(--warning);
}

.badge-outlined.badge-error {
  background-color: transparent;
  border-color: var(--error);
  color: var(--error);
}

.badge-outlined.badge-info {
  background-color: transparent;
  border-color: var(--info);
  color: var(--info);
}
</style>
