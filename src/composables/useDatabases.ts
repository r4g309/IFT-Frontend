import { ref } from 'vue'
import { databaseApi } from '@/api/database.api'
import type { DatabaseReadResponse } from '@/types/database'

export const useDatabases = () => {
  const databaseList = ref<DatabaseReadResponse | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const fetchDatabases = async (page: number, perPage: number) => {
    try {
      isLoading.value = true
      error.value = null
      const response = await databaseApi.list(page, perPage)
      databaseList.value = response
      return response
    } catch (e) {
      error.value = 'Error al cargar las bases de datos'
      console.error('Error fetching databases:', e)
      throw e
    } finally {
      isLoading.value = false
    }
  }

  const deleteDatabase = async (id: string) => {
    try {
      await databaseApi.delete(id)
      return true
    } catch (e) {
      error.value = 'Error al eliminar la base de datos'
      console.error('Error deleting database:', e)
      return false
    }
  }

  return {
    databaseList,
    isLoading,
    error,
    fetchDatabases,
    deleteDatabase
  }
}
