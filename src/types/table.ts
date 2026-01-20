import type { PaginatedResponse } from "./pagination"

export interface TableRead {
  name: string
  description: string
  is_active: boolean
  id: string
  database_id: string
  created_at: string
  updated_at: string
}


export type TableReadResponse = PaginatedResponse<TableRead>
