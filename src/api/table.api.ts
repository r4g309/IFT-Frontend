
import { api } from "@/api/client.api"
import type { TableReadResponse } from "@/types/table"
// import type { DatabaseReadResponse } from "@/types/database"




export const tableApi = {

  async list(database_id: string, page: number = 1, pageSize: number = 10): Promise<TableReadResponse> {
    const response = await api.get(`/tables/database/${database_id}`, {
      params: {
        currentPage: page,
        pageSize: pageSize
      }
    })
    return response.data
  }
}
