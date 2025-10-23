import { apiClient } from './client'
import type {
  DatabaseSchema,
  DatabaseDetail,
  DatabaseCreate,
  DatabaseUpdate,
  PaginatedResponse,
} from '@/types/api'

export const databasesApi = {
  async list(page = 1, pageSize = 10): Promise<PaginatedResponse<DatabaseSchema>> {
    const response = await apiClient.get('/databases/', {
      params: { current_page: page, page_size: pageSize },
    })
    return response.data
  },

  async get(id: string): Promise<DatabaseDetail> {
    const response = await apiClient.get(`/databases/${id}`)
    return response.data
  },

  async create(data: DatabaseCreate): Promise<DatabaseSchema> {
    const response = await apiClient.post('/databases/', data)
    return response.data
  },

  async update(id: string, data: DatabaseUpdate): Promise<DatabaseSchema> {
    const response = await apiClient.patch(`/databases/${id}`, data)
    return response.data
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/databases/${id}`)
  },

  async getStats(): Promise<{ total_databases: number; active: boolean }> {
    const response = await apiClient.get('/databases/stats')
    return response.data
  },
}
