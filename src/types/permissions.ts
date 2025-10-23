export enum Resource {
  DATABASE = 'database',
  TABLE = 'table',
  COLUMN = 'column',
  USER = 'user',
  PERMISSION = 'permission',
}

export enum Action {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  ASSIGN = 'assign',
  REVOKE = 'revoke',
}

export enum AppPermission {
  // Database permissions
  DATABASE_CREATE = 'database:create',
  DATABASE_READ = 'database:read',
  DATABASE_UPDATE = 'database:update',
  DATABASE_DELETE = 'database:delete',
  DATABASE_LIST = 'database:list',

  // Table permissions
  TABLE_CREATE = 'table:create',
  TABLE_READ = 'table:read',
  TABLE_UPDATE = 'table:update',
  TABLE_DELETE = 'table:delete',
  TABLE_LIST = 'table:list',

  // Column permissions
  COLUMN_CREATE = 'column:create',
  COLUMN_READ = 'column:read',
  COLUMN_UPDATE = 'column:update',
  COLUMN_DELETE = 'column:delete',
  COLUMN_LIST = 'column:list',

  // User permissions
  USER_CREATE = 'user:create',
  USER_READ = 'user:read',
  USER_UPDATE = 'user:update',
  USER_DELETE = 'user:delete',
  USER_LIST = 'user:list',

  // Permission management
  PERMISSION_ASSIGN = 'permission:assign',
  PERMISSION_REVOKE = 'permission:revoke',
  PERMISSION_LIST = 'permission:list',

  // Admin - super permission
  ADMIN_ALL = 'admin:all',
}

export enum PermissionGroup {
  VIEWER = 'viewer',
  EDITOR = 'editor',
  ADMIN = 'admin',
}

export const PERMISSION_GROUPS: Record<PermissionGroup, AppPermission[]> = {
  [PermissionGroup.VIEWER]: [
    AppPermission.DATABASE_READ,
    AppPermission.DATABASE_LIST,
    AppPermission.TABLE_READ,
    AppPermission.TABLE_LIST,
    AppPermission.COLUMN_LIST,
    AppPermission.COLUMN_READ,
  ],
  [PermissionGroup.EDITOR]: [
    // DATABASE
    AppPermission.DATABASE_READ,
    AppPermission.DATABASE_LIST,
    AppPermission.DATABASE_CREATE,
    AppPermission.DATABASE_UPDATE,
    // TABLE
    AppPermission.TABLE_READ,
    AppPermission.TABLE_LIST,
    AppPermission.TABLE_CREATE,
    AppPermission.TABLE_UPDATE,
    // COLUMN
    AppPermission.COLUMN_READ,
    AppPermission.COLUMN_LIST,
    AppPermission.COLUMN_CREATE,
    AppPermission.COLUMN_UPDATE,
  ],
  [PermissionGroup.ADMIN]: [AppPermission.ADMIN_ALL],
}

// Helper functions
export const getPermissionsForGroup = (group: PermissionGroup): string[] => {
  return PERMISSION_GROUPS[group].map((p) => p as string)
}

export const getAllPermissions = (): string[] => {
  return Object.values(AppPermission)
}

export const getPermissionsByResource = (resource: Resource): AppPermission[] => {
  return Object.values(AppPermission).filter((perm) => perm.startsWith(resource))
}

export const fromResourceAction = (resource: Resource, action: Action): AppPermission => {
  const permStr = `${resource}:${action}` as AppPermission

  if (!Object.values(AppPermission).includes(permStr)) {
    throw new Error(`Permission not defined: ${permStr}`)
  }

  return permStr
}

export const parsePermission = (permission: string): { resource: string; action: string } => {
  const [resource = '', action = ''] = permission.split(':')
  return { resource, action }
}
