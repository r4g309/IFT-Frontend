import { api } from "@/api/client.api"
import type { DatabaseReadResponse } from "@/types/database"
export const databaseApi = {

  async list(page: number = 1, pageSize: number = 10): Promise<DatabaseReadResponse> {
    const response = await api.get<DatabaseReadResponse>('/databases/', {
      params: {
        currentPage: page,
        pageSize: pageSize
      }
    })
    return response.data
  },
  async table(tableId: string, page: number = 1, pageSize: number = 10) {
    const response = await api.get(`/tables/database/${tableId}`, {
      params: {
        currentPage: page,
        pageSize: pageSize
      }
    })
    return response.data
  }
  ,
  async delete(id: string): Promise<void> {

  }

}
