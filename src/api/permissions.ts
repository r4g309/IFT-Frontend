import { apiClient } from './client'
import type { AssignPermission, AssignPermissionGroup, RevokePermission } from '@/types/api'

export const permissionsApi = {
  async assign(data: AssignPermission) {
    const response = await apiClient.post('/permission/assign', data)
    return response.data
  },

  async assignGroup(data: AssignPermissionGroup) {
    const response = await apiClient.post('/permission/assign-group', data)
    return response.data
  },

  async revoke(data: RevokePermission) {
    const response = await apiClient.post('/permission/revoke', data)
    return response.data
  },

  async listAvailable() {
    const response = await apiClient.get('/permission/available')
    return response.data
  },

  async getUserPermissions(userId: string) {
    const response = await apiClient.get(`/permission/user/${userId}`)
    return response.data
  },
}
