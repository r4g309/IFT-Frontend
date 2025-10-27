<script setup lang="ts">
import {reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import BaseInput from '@/ui/components/BaseInput.vue'
import BaseButton from '@/ui/components/BaseButton.vue'

const router = useRouter()
const authStore = useAuthStore()


const formData = reactive({
  email: '',
  password: '',
  remember: false
})

const errors = reactive({
  email: '',
  password: ''
})


const validateForm = () => {
  let isValid = true

  // Reset errors
  errors.email = ''
  errors.password = ''

  // Validate email
  if (!formData.email) {
    errors.email = 'El email es requerido'
    isValid = false
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = 'Email inválido'
    isValid = false
  }

  // Validate password
  if (!formData.password) {
    errors.password = 'La contraseña es requerida'
    isValid = false
  } else if (formData.password.length < 8) {
    errors.password = 'La contraseña debe tener al menos 8 caracteres'
    isValid = false
  }

  return isValid
}




const handleLogin = async () => {
  if (!validateForm()) return
  try {
    await authStore.login({
      email: formData.email,
      password: formData.password,
    })
    // Redirigir al dashboard después del login
    router.push('/')
  } catch (error: any) {
    authStore.error =   error.response?.data?.detail || 'Credenciales inválidas'
  }
}
</script>

<template>
  <div class="login-page">
      <div class="login-card">
        <div class="login-header">
          <div class="login-logo">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
          </div>
          <h1 class="login-title">Bienvenido a IFT</h1>
          <p class="login-subtitle">Inicia sesión para acceder a tu diccionario de bases de datos</p>
        </div>

        <form @submit.prevent="handleLogin" class="login-form">
          <BaseInput v-model="formData.email" type="email" label="Email" placeholder="tu@email.com"
            :error="errors.email" required />

          <BaseInput v-model="formData.password" type="password" label="Contraseña" placeholder="••••••••"
            :error="errors.password" required />

          <div class="login-options">
            <label class="checkbox-label">
              <input type="checkbox" v-model="formData.remember" class="checkbox">
              <span>Recordarme</span>
            </label>
            <a href="#" class="forgot-link">¿Olvidaste tu contraseña?</a>
          </div>

          <BaseButton type="submit" variant="primary" size="lg" :loading="authStore.loading" full-width>
            Iniciar Sesión
          </BaseButton>

          <div class="login-divider">
            <span>o</span>
          </div>

          <BaseButton variant="outline" size="lg" full-width @click="handleLogin">
            Crear cuenta nueva
          </BaseButton>
        </form>
      </div>
    </div>
</template>

<style scoped>
.login-page {
  min-height: calc(100vh - 120px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-8) var(--space-4);
  background: var(--gradient-dark);
}


.login-card {
  background-color: var(--bg-secondary);
  border: var(--border-normal) solid var(--border-color);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl);
  padding: var(--space-8);
}

.login-header {
  text-align: center;
  margin-bottom: var(--space-8);
}

.login-logo {
  display: inline-flex;
  padding: var(--space-4);
  background-color: var(--color-primary);
  border: var(--border-thick) solid var(--color-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  color: white;
  margin-bottom: var(--space-4);
}

.login-title {
  font-size: var(--text-3xl);
  color: var(--text-primary);
  margin-bottom: var(--space-2);
  text-shadow: 2px 2px 0 var(--shadow-color);
}

.login-subtitle {
  font-size: var(--text-base);
  color: var(--text-secondary);
  margin: 0;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.login-options {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: var(--text-secondary);
  cursor: pointer;
}

.checkbox {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.forgot-link {
  font-size: var(--text-sm);
  color: var(--color-primary);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
}

.forgot-link:hover {
  color: var(--color-secondary);
  text-decoration: underline;
}

.login-divider {
  position: relative;
  text-align: center;
  margin: var(--space-4) 0;
}

.login-divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background-color: var(--border-color);
}

.login-divider span {
  position: relative;
  padding: 0 var(--space-4);
  background-color: var(--bg-secondary);
  color: var(--text-tertiary);
  font-size: var(--text-sm);
}

.login-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.login-info h3 {
  color: var(--color-primary);
  margin-bottom: var(--space-4);
}

.login-info p {
  color: var(--text-secondary);
  line-height: var(--leading-relaxed);
}

.info-features {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin-top: var(--space-4);
}

.info-feature {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  color: var(--color-primary);
  font-weight: var(--font-weight-medium);
}

@media (max-width: 968px) {
  .login-container {
    grid-template-columns: 1fr;
  }

  .login-info {
    order: -1;
  }
}

@media (max-width: 640px) {
  .login-card {
    padding: var(--space-6);
  }

  .login-options {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
