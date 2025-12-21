<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref<string | null>(null)

const router = useRouter()
const { login } = useAuth()

async function onSubmit() {
  error.value = null
  loading.value = true

  try {
    const user = await login(email.value, password.value)
    console.log(user)
    router.replace({ name: 'home' })
  } catch (err) {
    console.log(err)

    error.value = 'Credenciales inválidas'
  } finally {
    loading.value = false
  }
}
</script>
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <form
      @submit.prevent="onSubmit"
      class="w-full max-w-sm bg-white p-6 rounded-lg shadow-md flex flex-col gap-4"
    >
      <h1 class="text-2xl font-semibold text-center">IFT DB</h1>

      <div class="flex flex-col gap-1">
        <label for="user_email" class="text-sm font-medium">Email</label>
        <input
          id="user_email"
          type="email"
          v-model="email"
          required
          class="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div class="flex flex-col gap-1">
        <label for="user_password" class="text-sm font-medium">Password</label>
        <input
          id="user_password"
          type="password"
          v-model="password"
          minlength="8"
          required
          class="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <p v-if="error" class="text-sm text-red-600 text-center">
        {{ error }}
      </p>

      <button
        type="submit"
        :disabled="loading"
        class="mt-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ loading ? 'Ingresando...' : 'Login' }}
      </button>
    </form>
  </div>
</template>
