
import { tableApi } from '@/api/table.api'
import { type TableReadResponse } from '@/types/table'
import { ref } from 'vue'

export const useTables = () => {
  const tableList = ref<TableReadResponse | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const fetchTablesByDB = async (databaseId: string, page: number, perPage: number) => {
    try {
      isLoading.value = true
      error.value = null
      const response = await tableApi.list(databaseId, page, perPage)
      tableList.value = response
      return response
    } catch (e) {
      error.value = 'Error al cargar las bases de datos'
      console.error('Error fetching databases:', e)
      throw e
    } finally {
      isLoading.value = false
    }
  }



  return {
    tableList,
    isLoading,
    error,
    fetchTablesByDB,
  }
}
