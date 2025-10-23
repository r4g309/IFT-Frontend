import { apiClient } from './client'
import type {
  ColumnSchema,
  ColumnCreate,
  ColumnUpdate,
  ColumnBulkCreate,
  PaginatedResponse,
} from '@/types/api'

export const columnsApi = {
  async listByTable(
    tableId: string,
    page = 1,
    pageSize = 10,
  ): Promise<PaginatedResponse<ColumnSchema>> {
    const response = await apiClient.get(`/columns/table/${tableId}`, {
      params: { current_page: page, page_size: pageSize },
    })
    return response.data
  },

  async get(id: string): Promise<ColumnSchema> {
    const response = await apiClient.get(`/columns/${id}`)
    return response.data
  },

  async create(data: ColumnCreate): Promise<ColumnSchema> {
    const response = await apiClient.post('/columns/', data)
    return response.data
  },

  async createBulk(data: ColumnBulkCreate): Promise<ColumnSchema[]> {
    const response = await apiClient.post('/columns/bulk', data)
    return response.data
  },

  async update(id: string, data: ColumnUpdate): Promise<ColumnSchema> {
    const response = await apiClient.patch(`/columns/${id}`, data)
    return response.data
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/columns/${id}`)
  },

  async getStats(tableId: string) {
    const response = await apiClient.get(`/columns/stats/table/${tableId}`)
    return response.data
  },
}
