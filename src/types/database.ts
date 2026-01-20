import type { PaginatedResponse } from "@/types/pagination";

export interface DatabaseRead {
  id: string;
  name: string;
  type: string;
  host: string;
  port: number;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export type DatabaseReadResponse = PaginatedResponse<DatabaseRead>
