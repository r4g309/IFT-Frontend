import {
  clearAuth,
  enqueueRefresh,
  getAccessToken,
  getRefreshToken,
  isRefreshing,
  rejectRefreshQueue,
  resolveRefreshQueue,
  setAccessToken,
  setRefreshing,
} from '@/stores/auth.runtime'
import axios, {
  AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  type AxiosRequestConfig,
} from 'axios'

export const api: AxiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken()
  if (token && !config.url?.includes('/auth/refresh')) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export async function refreshAccessToken(): Promise<string> {
  // Is there already another request refreshing the token
  if (isRefreshing()) {
    // Store your resolve and reject in a queue
    return new Promise((resolve, reject) => {
      enqueueRefresh({ resolve, reject })
    })
  }

  setRefreshing(true)

  try {
    const { data } = await api.post(
      '/auth/refresh/',
      {
        refresh_token: getRefreshToken(),
      },
      {
        _skipAuthRefresh: true,
      } as AxiosRequestConfig,
    )

    const newToken = data.access_token
    resolveRefreshQueue(newToken)
    setAccessToken(newToken)

    return newToken
  } catch (err) {
    console.log('Limpiado hpta')
    rejectRefreshQueue(err)
    clearAuth()
    throw err
  } finally {
    setRefreshing(false)
  }
}

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean
      _skipAuthRefresh?: boolean
    }

    if (originalRequest._skipAuthRefresh) {
      return Promise.reject(error)
    }

    if (error.response?.status === 401 && !originalRequest._retry && getRefreshToken()) {
      originalRequest._retry = true

      const newToken = await refreshAccessToken()
      originalRequest.headers = {
        ...originalRequest.headers,
        Authorization: `Bearer ${newToken}`,
      }
      return api(originalRequest)
    }
    return Promise.reject(error)
  },
)
