<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const errorMessage = ref('')

const handleLogin = async () => {
  errorMessage.value = ''

  if (!email.value || !password.value) {
    errorMessage.value = 'Por favor completa todos los campos'
    return
  }

  try {
    await authStore.login({
      email: email.value,
      password: password.value,
    })

    // Redirigir al dashboard después del login
    router.push('/')
  } catch (error: any) {
    errorMessage.value = error.response?.data?.detail || 'Credenciales inválidas'
  }
}
</script>

<template>
  <div>
    <div>
      <h1>Iniciar Sesión</h1>

      <form @submit.prevent="handleLogin">
        <div>
          <label for="email">Email</label>
          <input id="email" v-model="email" type="email" placeholder="tu@email.com" required />
        </div>

        <div>
          <label for="password">Contraseña</label>
          <input id="password" v-model="password" type="password" placeholder="••••••••" required />
        </div>

        <div v-if="errorMessage">
          {{ errorMessage }}
        </div>

        <button type="submit" :disabled="authStore.loading">
          {{ authStore.loading ? 'Iniciando sesión...' : 'Iniciar Sesión' }}
        </button>
      </form>

      <!-- <p>
        ¿No tienes cuenta?
        <router-link to="/register">Regístrate aquí</router-link>
      </p> -->
    </div>
  </div>
</template>

<style scoped></style>
