import { useAuthStore } from '@/stores/auth.store'
import * as authService from '@/api/auth.api'
import { clearAuth, getRefreshToken } from '@/stores/auth.runtime'
import { useRouter } from 'vue-router'
import { refreshAccessToken } from '@/api/client.api'

export function useAuth() {
  const authStore = useAuthStore()
  const router = useRouter()

  async function login(email: string, password: string) {
    const user = await authService.login(email, password)
    authStore.user = user
    return user
  }

  async function bootstrapAuth() {
    const refreshToken = getRefreshToken()
    if (!refreshToken) return

    try {
      await refreshAccessToken()
      const { data } = await authService.getMe()
      const authStore = useAuthStore()
      authStore.setUser(data)
    } catch {
      authStore?.$reset?.()
    }
  }

  function logout() {
    clearAuth()
    authStore.user = null
    router.replace({ name: 'login' })
  }

  return {
    login,
    logout,
    bootstrapAuth,
  }
}
