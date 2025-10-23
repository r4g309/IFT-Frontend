import { apiClient } from './client'
import type {
  TableSchema,
  TableDetail,
  TableCreate,
  TableUpdate,
  TableBulkCreate,
  PaginatedResponse,
} from '@/types/api'

export const tablesApi = {
  async listByDatabase(
    databaseId: string,
    page = 1,
    pageSize = 10,
  ): Promise<PaginatedResponse<TableSchema>> {
    const response = await apiClient.get(`/tables/database/${databaseId}`, {
      params: { current_page: page, page_size: pageSize },
    })
    return response.data
  },

  async get(id: string, includeColumns = true): Promise<TableDetail> {
    const response = await apiClient.get(`/tables/${id}`, {
      params: { include_columns: includeColumns },
    })
    return response.data
  },

  async create(data: TableCreate): Promise<TableSchema> {
    const response = await apiClient.post('/tables/', data)
    return response.data
  },

  async createBulk(data: TableBulkCreate): Promise<TableSchema[]> {
    const response = await apiClient.post('/tables/bulk', data)
    return response.data
  },

  async update(id: string, data: TableUpdate): Promise<TableSchema> {
    const response = await apiClient.patch(`/tables/${id}`, data)
    return response.data
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/tables/${id}`)
  },

  async getStats(databaseId: string) {
    const response = await apiClient.get(`/tables/stats/database/${databaseId}`)
    return response.data
  },
}
