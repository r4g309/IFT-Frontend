<template>
  <div class="input-wrapper">
    <label v-if="label" :for="inputId" class="input-label">
      {{ label }}
      <span v-if="required" class="input-required">*</span>
    </label>

    <div class="input-container">
      <input :id="inputId" :type="type" :value="modelValue" :placeholder="placeholder" :disabled="disabled"
        :required="required" :class="inputClasses" @input="handleInput" @blur="handleBlur" @focus="handleFocus" />

      <span v-if="error" class="input-icon input-icon-error">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </span>
    </div>

    <p v-if="error" class="input-error-message">{{ error }}</p>
    <p v-else-if="hint" class="input-hint">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  },
  hint: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
  id: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'blur', 'focus'])

const isFocused = ref(false)

const inputId = computed(() => props.id || `input-${Math.random().toString(36).substr(2, 9)}`)

const inputClasses = computed(() => {
  return [
    'input',
    {
      'input-error': props.error,
      'input-disabled': props.disabled,
      'input-focused': isFocused.value
    }
  ]
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement | null
  if (!target) return
  emit('update:modelValue', target.value)
}

const handleBlur = (event:FocusEvent) => {
  isFocused.value = false
  emit('blur', event)
}

const handleFocus = (event:FocusEvent) => {
  isFocused.value = true
  emit('focus', event)
}
</script>

<style scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  width: 100%;
}

.input-label {
  font-size: var(--text-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
}

.input-required {
  color: var(--error);
  margin-left: var(--space-1);
}

.input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  font-family: var(--font-body);
  font-size: var(--text-base);
  color: var(--text-primary);
  background-color: var(--bg-secondary);
  border: var(--border-normal) solid var(--border-color);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-fast);
  min-height: 44px;
}

.input::placeholder {
  color: var(--text-tertiary);
}

.input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(29, 78, 216, 0.1);
  transform: translate(-1px, -1px);
}

.input:hover:not(.input-disabled):not(:focus) {
  border-color: var(--color-secondary);
}

.input-error {
  border-color: var(--error);
  background-color: rgba(239, 68, 68, 0.05);
}

.input-error:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.input-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: var(--bg-tertiary);
}

.input-icon {
  position: absolute;
  right: var(--space-3);
  display: flex;
  align-items: center;
  pointer-events: none;
}

.input-icon-error {
  color: var(--error);
}

.input-error-message {
  font-size: var(--text-sm);
  color: var(--error);
  margin: 0;
}

.input-hint {
  font-size: var(--text-sm);
  color: var(--text-tertiary);
  margin: 0;
}
</style>
