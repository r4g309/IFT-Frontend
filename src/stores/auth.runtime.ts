export interface RefreshResolver {
  resolve: (token: string) => void
  reject: (err: unknown) => void
}

interface AuthRuntimeState {
  accessToken: string | null
  refreshToken: string | null
  isRefreshing: boolean
  refreshQueue: RefreshResolver[]
}

const REFRESH_TOKEN_KEY = 'refresh_token'

const state: AuthRuntimeState = {
  accessToken: null,
  refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY),
  isRefreshing: false,
  refreshQueue: [],
}

// getters
export function getAccessToken() {
  return state.accessToken
}

export function getRefreshToken() {
  return state.refreshToken
}

export function isRefreshing() {
  return state.isRefreshing
}

// setters
export function setRefreshing(value: boolean) {
  state.isRefreshing = value
}

export function setAccessToken(token: string) {
  state.accessToken = token
}

// refresh queue
export function enqueueRefresh(resolver: RefreshResolver) {
  state.refreshQueue.push(resolver)
}

export function resolveRefreshQueue(token: string) {
  state.refreshQueue.forEach((p) => p.resolve(token))
  state.refreshQueue = []
}

export function rejectRefreshQueue(err: unknown) {
  state.refreshQueue.forEach((p) => p.reject(err))
  state.refreshQueue = []
}

// auth
export function setAuthTokens(access: string, refresh: string) {
  state.accessToken = access
  state.refreshToken = refresh
  localStorage.setItem(REFRESH_TOKEN_KEY, refresh)
}

export function clearAuth() {
  state.accessToken = null
  state.refreshToken = null
  state.isRefreshing = false
  state.refreshQueue = []
  localStorage.removeItem(REFRESH_TOKEN_KEY)
}
