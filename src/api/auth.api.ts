import { api } from './client.api'
import { setAuthTokens, clearAuth } from '@/stores/auth.runtime'

export interface User {
  id: string
  name: string
  email: string
  permissions: string[]
}

interface LoginResponse {
  access_token: string
  refresh_token: string
  token_type: string
  expires_in: number
  user: User
}

export async function login(email: string, password: string): Promise<User> {
  const res = await api.post<LoginResponse>('/auth/login/', {
    email,
    password,
  })

  const { access_token, refresh_token, user } = res.data

  setAuthTokens(access_token, refresh_token)

  return user
}

export async function getMe() {
  const res = await api.get('/auth/me/')
  return res
}

export function logout() {
  clearAuth()
}
