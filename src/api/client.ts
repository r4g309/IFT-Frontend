import axios, { AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

// Request interceptor - Add JWT token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('jwt_token')

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

// Response interceptor - Handle errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      const status = error.response.status

      switch (status) {
        case 401:
          // Unauthorized - Clear token and redirect to login
          localStorage.removeItem('jwt_token')
          localStorage.removeItem('user')
          window.location.href = '/login'
          break

        case 403:
          // Forbidden - Permission denied
          console.error('Permission denied:', error.response.data)
          break

        case 404:
          // Not found
          console.error('Resource not found:', error.response.data)
          break

        case 422:
          // Validation error
          console.error('Validation error:', error.response.data)
          break

        case 500:
          // Server error
          console.error('Server error:', error.response.data)
          break
      }
    } else if (error.request) {
      // Request made but no response
      console.error('No response from server')
    } else {
      // Error setting up request
      console.error('Request error:', error.message)
    }

    return Promise.reject(error)
  },
)

// Helper function to set token
export const setAuthToken = (token: string) => {
  localStorage.setItem('jwt_token', token)
}

// Helper function to clear token
export const clearAuthToken = () => {
  localStorage.removeItem('jwt_token')
  localStorage.removeItem('user')
}

// Helper function to get token
export const getAuthToken = (): string | null => {
  return localStorage.getItem('jwt_token')
}
