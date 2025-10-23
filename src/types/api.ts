// ==================== Base Types ====================
export interface BaseModel {
  id: string
  created_at: string
  updated_at: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  limit: number
  offset: number
}

// ==================== User & Auth ====================
export interface UserPermission {
  id: string
  permission: string
}

export interface UserBase {
  name: string
  email: string
}

export interface UserSchema extends UserBase, BaseModel {
  permissions: UserPermission[]
}

export interface UserCreate extends UserBase {
  password: string
}

export interface UserLogin {
  email: string
  password: string
}

export type LoginResponse = UserSchema

export type PermissionGroup = 'viewer' | 'editor' | 'admin'

export interface AssignPermission {
  user_id: string
  permission: string
}

export interface AssignPermissionGroup {
  user_id: string
  group: PermissionGroup
}

export interface RevokePermission {
  user_id: string
  permission: string
}

// ==================== Database ====================
export interface DatabaseBase {
  name: string
  type: string
  host: string
  port: number
  description?: string | null
}

export type DatabaseCreate = DatabaseBase

export interface DatabaseUpdate {
  name?: string
  type?: string
  host?: string
  port?: number
  description?: string | null
}

export interface DatabaseSchema extends DatabaseBase, BaseModel {}

export interface DatabaseDetail extends DatabaseSchema {
  tables: TableSchema[]
}

// ==================== Table ====================
export interface TableBase {
  name: string
  description?: string | null
  is_active: boolean
}

export interface TableCreate extends TableBase {
  database_id: string
}

export interface TableUpdate {
  name?: string
  description?: string | null
  is_active?: boolean
}

export interface TableSchema extends TableBase {
  id: string
  database_id: string
}

export interface TableDetail extends TableSchema {
  columns: ColumnSchema[]
}

export interface TableBulkCreate {
  database_id: string
  tables: TableBase[]
}

// ==================== Column ====================
export interface ColumnBase {
  name: string
  data_type: string
  description?: string | null
  is_nullable: boolean
  is_primary_key: boolean
  is_foreign_key: boolean
  is_unique: boolean
  is_indexed: boolean
}

export interface ColumnCreate extends ColumnBase {
  table_id: string
}

export interface ColumnUpdate {
  name?: string
  data_type?: string
  description?: string | null
  is_nullable?: boolean
  is_primary_key?: boolean
  is_foreign_key?: boolean
  is_unique?: boolean
  is_indexed?: boolean
}

export interface ColumnSchema extends ColumnBase {
  id: string
  table_id: string
}

export interface ColumnBulkCreate {
  table_id: string
  columns: ColumnBase[]
}

// ==================== Search ====================
export type EntityType = 'database' | 'table' | 'column'

export interface SearchResult {
  id: string
  type: EntityType
  name: string
  description?: string | null
  data_type?: string
  table?: {
    id: string
    name: string
  }
  database?: {
    id: string
    name: string
  }
  database_type?: string
}

export interface SearchResponse {
  query: string
  total: number
  count: number
  limit: number
  offset: number
  results: SearchResult[]
  filters: {
    types?: EntityType[] | null
    database_id?: string | null
    table_id?: string | null
    exact: boolean
  }
}

// ==================== Stats ====================
export interface DatabaseStats {
  total_databases: number
  active: boolean
}

export interface TableStats {
  total_tables: number
  active_tables: number
  inactive_tables: number
}

export interface ColumnStats {
  total_columns: number
  primary_keys: number
  foreign_keys: number
  nullable_columns: number
  unique_columns: number
  indexed_columns: number
  data_types: Record<string, number>
}

export interface SearchStats {
  total: number
  active: number
  by_type: Record<string, { total: number; active: number }>
  databases: number
  tables: number
  columns: number
}
