import { setAuthToken, clearAuthToken, apiClient } from './client'
import type { UserLogin, UserCreate, UserSchema, LoginResponse } from '@/types/api'

export const authApi = {
  async login(credentials: UserLogin): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/auth/login', credentials)
    console.log(response)
    console.log(response.headers)
    console.log(response.data)

    // Extract token from response headers (Litestar JWT style)
    const token = response.headers['authorization']?.replace('Bearer ', '')
    if (token) {
      setAuthToken(token)
    }

    return response.data
  },

  async register(data: UserCreate): Promise<UserSchema> {
    const response = await apiClient.post<UserSchema>('/auth/register', data)
    return response.data
  },

  logout() {
    clearAuthToken()
  },
}
