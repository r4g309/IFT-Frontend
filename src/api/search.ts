import { apiClient } from './client'
import type { SearchResponse, SearchResult } from '@/types/api'

export type EntityType = 'database' | 'table' | 'column'

export const searchApi = {
  async search(
    query: string,
    options?: {
      types?: EntityType[]
      databaseId?: string
      tableId?: string
      limit?: number
      offset?: number
      exact?: boolean
    },
  ): Promise<SearchResponse> {
    const response = await apiClient.get('/search/', {
      params: {
        q: query,
        type: options?.types,
        database_id: options?.databaseId,
        table_id: options?.tableId,
        limit: options?.limit || 50,
        offset: options?.offset || 0,
        exact: options?.exact || false,
      },
    })
    return response.data
  },

  async autocomplete(
    query: string,
    options?: {
      types?: EntityType[]
      databaseId?: string
      limit?: number
    },
  ): Promise<{ query: string; suggestions: string[]; count: number }> {
    const response = await apiClient.get('/search/autocomplete', {
      params: {
        q: query,
        type: options?.types,
        database_id: options?.databaseId,
        limit: options?.limit || 10,
      },
    })
    return response.data
  },

  async suggest(
    query: string,
    options?: {
      types?: EntityType[]
      limit?: number
    },
  ): Promise<{ query: string; suggestions: SearchResult[]; count: number }> {
    const response = await apiClient.get('/search/suggest', {
      params: {
        q: query,
        type: options?.types,
        limit: options?.limit || 5,
      },
    })
    return response.data
  },

  async getStats() {
    const response = await apiClient.get('/search/stats')
    return response.data
  },
}
