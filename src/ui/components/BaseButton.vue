<template>
  <button :class="buttonClasses" :disabled="disabled || loading" :type="type" @click="handleClick">
    <span v-if="loading" class="btn-loader"></span>
    <span :class="{ 'btn-content-loading': loading }">
      <slot></slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value:string) => ['primary', 'secondary', 'outline', 'ghost', 'danger'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value:string) => ['sm', 'md', 'lg'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'button'
  },
  fullWidth: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const buttonClasses = computed(() => {
  return [
    'btn',
    `btn-${props.variant}`,
    `btn-${props.size}`,
    {
      'btn-disabled': props.disabled,
      'btn-loading': props.loading,
      'btn-full': props.fullWidth
    }
  ]
})

const handleClick = (event:MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<style scoped>
.btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  font-family: var(--font-heading);
  font-weight: var(--font-weight-semibold);
  border: var(--border-normal) solid;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  white-space: nowrap;
  user-select: none;
}

/* Sizes */
.btn-sm {
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-sm);
  min-height: 36px;
}

.btn-md {
  padding: var(--space-3) var(--space-6);
  font-size: var(--text-base);
  min-height: 44px;
}

.btn-lg {
  padding: var(--space-4) var(--space-8);
  font-size: var(--text-lg);
  min-height: 52px;
}

.btn-full {
  width: 100%;
}

/* Variants */
.btn-primary {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: white;
}

.btn-primary:hover:not(.btn-disabled):not(.btn-loading) {
  background-color: var(--color-secondary);
  border-color: var(--color-secondary);
  transform: translate(-2px, -2px);
  box-shadow: 4px 4px 0 var(--shadow-color);
}

.btn-primary:active:not(.btn-disabled):not(.btn-loading) {
  transform: translate(0, 0);
  box-shadow: 2px 2px 0 var(--shadow-color);
}

.btn-secondary {
  background-color: var(--color-secondary);
  border-color: var(--color-secondary);
  color: white;
}

.btn-secondary:hover:not(.btn-disabled):not(.btn-loading) {
  background-color: var(--color-tertiary);
  border-color: var(--color-tertiary);
  transform: translate(-2px, -2px);
  box-shadow: 4px 4px 0 var(--shadow-color);
}

.btn-secondary:active:not(.btn-disabled):not(.btn-loading) {
  transform: translate(0, 0);
  box-shadow: 2px 2px 0 var(--shadow-color);
}

.btn-outline {
  background-color: transparent;
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.btn-outline:hover:not(.btn-disabled):not(.btn-loading) {
  background-color: var(--color-primary);
  color: white;
  transform: translate(-2px, -2px);
  box-shadow: 4px 4px 0 var(--shadow-color);
}

.btn-outline:active:not(.btn-disabled):not(.btn-loading) {
  transform: translate(0, 0);
  box-shadow: 2px 2px 0 var(--shadow-color);
}

.btn-ghost {
  background-color: var(--bg-secondary);
  border-color: var(--border-color);
  color: var(--text-primary);
}

.btn-ghost:hover:not(.btn-disabled):not(.btn-loading) {
  background-color: var(--bg-tertiary);
  border-color: var(--color-primary);
  transform: translate(-2px, -2px);
  box-shadow: 4px 4px 0 var(--shadow-color);
}

.btn-ghost:active:not(.btn-disabled):not(.btn-loading) {
  transform: translate(0, 0);
  box-shadow: 2px 2px 0 var(--shadow-color);
}

.btn-danger {
  background-color: var(--error);
  border-color: var(--error);
  color: white;
}

.btn-danger:hover:not(.btn-disabled):not(.btn-loading) {
  background-color: #DC2626;
  border-color: #DC2626;
  transform: translate(-2px, -2px);
  box-shadow: 4px 4px 0 var(--shadow-color);
}

.btn-danger:active:not(.btn-disabled):not(.btn-loading) {
  transform: translate(0, 0);
  box-shadow: 2px 2px 0 var(--shadow-color);
}

/* States */
.btn-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
}

.btn-loading {
  cursor: wait;
}

.btn-content-loading {
  opacity: 0.6;
}

/* Loader */
.btn-loader {
  position: absolute;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
