interface EnvConfig {
  apiBaseUrl: string
  isDevelopment: boolean
  isProduction: boolean
}

export const env: EnvConfig = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'backend.ift.dokploy.local',
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
}
