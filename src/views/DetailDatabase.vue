<template>
  <div class="database-detail-page">
    <div class="container">
      <!-- Breadcrumb -->
      <div class="breadcrumb">
        <router-link to="/databases" class="breadcrumb-link">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Databases
        </router-link>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-current">{{ databaseDetail?.name || 'Cargando...' }}</span>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loading-state">
        <div class="loader"></div>
        <p>Cargando detalles...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error-state">
        <div class="error-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </div>
        <h3>Error al cargar la database</h3>
        <p>{{ error }}</p>
        <BaseButton variant="primary" @click="fetchDatabaseDetail"> Reintentar </BaseButton>
      </div>

      <!-- Content -->
      <div v-else-if="databaseDetail">
        <!-- Database Header Card -->
        <BaseCard variant="elevated" class="database-header-card">
          <div class="database-header">
            <div class="database-header-left">
              <div class="database-icon-large">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <ellipse cx="12" cy="5" rx="9" ry="3" />
                  <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                  <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                </svg>
              </div>
              <div class="database-info">
                <h1 class="database-name">{{ databaseDetail.name }}</h1>
                <div class="database-badges">
                  <BaseBadge :variant="getDatabaseTypeBadge(databaseDetail.type)" size="md">
                    {{ databaseDetail.type }}
                  </BaseBadge>
                  <BaseBadge variant="success" size="md" outlined> Activa </BaseBadge>
                </div>
              </div>
            </div>
            <div class="database-header-actions">
              <BaseButton variant="outline" size="md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                Editar
              </BaseButton>
              <BaseButton variant="primary" size="md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Nueva Tabla
              </BaseButton>
            </div>
          </div>

          <div class="database-details-grid">
            <div class="detail-item">
              <div class="detail-label">Host</div>
              <div class="detail-value">{{ databaseDetail.host }}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Puerto</div>
              <div class="detail-value">{{ databaseDetail.port }}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Creado</div>
              <div class="detail-value">{{ formatDate(databaseDetail.created_at) }}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Actualizado</div>
              <div class="detail-value">{{ formatDate(databaseDetail.updated_at) }}</div>
            </div>
          </div>

          <div v-if="databaseDetail.description" class="database-description">
            <h3>Descripción</h3>
            <p>{{ databaseDetail.description }}</p>
          </div>
        </BaseCard>

        <!-- Tables Section -->
        <div class="tables-section">
          <div class="tables-header">
            <div>
              <h2 class="tables-title">Tablas</h2>
              <p class="tables-subtitle">
                {{ databaseDetail.tables?.length || 0 }} tablas en esta database
              </p>
            </div>
            <BaseInput v-model="searchQuery" placeholder="Buscar tabla..." class="search-input">
              <template #prefix>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </template>
            </BaseInput>
          </div>

          <!-- Empty Tables State -->
          <div v-if="!databaseDetail.tables?.length" class="empty-tables">
            <div class="empty-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
            </div>
            <h3>No hay tablas</h3>
            <p>Esta database no tiene tablas aún. Crea la primera tabla para comenzar.</p>
            <BaseButton variant="primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Crear Primera Tabla
            </BaseButton>
          </div>

          <!-- Tables Grid -->
          <div v-else class="tables-grid">
            <div v-for="table in filteredTables" :key="table.id" class="table-card-wrapper">
              <BaseCard hoverable clickable class="table-card" @click="goToTableDetail(table.id)">
                <div class="table-card-header">
                  <div class="table-card-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <rect x="3" y="3" width="7" height="7" />
                      <rect x="14" y="3" width="7" height="7" />
                      <rect x="14" y="14" width="7" height="7" />
                      <rect x="3" y="14" width="7" height="7" />
                    </svg>
                  </div>
                  <div class="table-card-info">
                    <h3 class="table-name">{{ table.name }}</h3>
                    <BaseBadge :variant="table.is_active ? 'success' : 'error'" size="sm" outlined>
                      {{ table.is_active ? 'Activa' : 'Inactiva' }}
                    </BaseBadge>
                  </div>
                </div>

                <div v-if="table.description" class="table-description">
                  <p>{{ table.description }}</p>
                </div>
                <div v-else class="table-no-description">
                  <p>Sin descripción</p>
                </div>

                <div class="table-card-footer">
                  <BaseButton size="sm" variant="primary" @click.stop="goToTableDetail(table.id)">
                    Ver Columnas
                  </BaseButton>
                </div>
              </BaseCard>
            </div>
          </div>

          <!-- No Results -->
          <div v-if="searchQuery && !filteredTables.length" class="no-results">
            <p>No se encontraron tablas que coincidan con "{{ searchQuery }}"</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { databasesApi } from '@/api'
import type { DatabaseDetail } from '@/types/api'
import BaseCard from '@/ui/components/BaseCard.vue'
import BaseButton from '@/ui/components/BaseButton.vue'
import BaseBadge from '@/ui/components/BaseBadge.vue'
import BaseInput from '@/ui/components/BaseInput.vue'

const props = defineProps<{ id: string }>()
const router = useRouter()

// Estado
const databaseDetail = ref<DatabaseDetail | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)
const searchQuery = ref('')

// Fetch database detail
const fetchDatabaseDetail = async () => {
  loading.value = true
  error.value = null

  try {
    databaseDetail.value = await databasesApi.get(props.id)
  } catch (err: any) {
    error.value = err.message || 'Error al cargar los detalles de la database'
    console.error('Error fetching database detail:', err)
  } finally {
    loading.value = false
  }
}

// Filtrar tablas por búsqueda
const filteredTables = computed(() => {
  if (!databaseDetail.value?.tables) return []
  if (!searchQuery.value) return databaseDetail.value.tables

  const query = searchQuery.value.toLowerCase()
  return databaseDetail.value.tables.filter(
    (table) =>
      table.name.toLowerCase().includes(query) || table.description?.toLowerCase().includes(query),
  )
})

// Badge variant según el tipo
const getDatabaseTypeBadge = (type: string) => {
  const badges: Record<string, string> = {
    Oracle: 'error',
    PostgreSQL: 'primary',
    MySQL: 'secondary',
    MongoDB: 'success',
    Redis: 'warning',
    SQLite: 'info',
  }
  return badges[type] || 'default'
}

// Formatear fecha
const formatDate = (dateString: string) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)

  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// Navegar a detalle de tabla
const goToTableDetail = (tableId: string) => {
  router.push({ name: 'tableDetail', params: { id: tableId } })
}

// Cargar al montar
onMounted(() => {
  fetchDatabaseDetail()
})
</script>

<style scoped>
.database-detail-page {
  min-height: 100vh;
  padding: var(--space-8) 0;
  background: var(--gradient-dark);
}

/* Breadcrumb */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-6);
  font-size: var(--text-sm);
}

.breadcrumb-link {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--color-primary);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
  transition: color var(--transition-fast);
}

.breadcrumb-link:hover {
  color: var(--color-secondary);
}

.breadcrumb-separator {
  color: var(--text-tertiary);
}

.breadcrumb-current {
  color: var(--text-secondary);
  font-weight: var(--font-weight-medium);
}

/* Loading & Error States */
.loading-state,
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-16);
  text-align: center;
}

.loader {
  width: 48px;
  height: 48px;
  border: 4px solid var(--border-color);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-bottom: var(--space-4);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error-state h3 {
  color: var(--text-primary);
  margin-bottom: var(--space-2);
}

.error-state p {
  color: var(--text-secondary);
  margin-bottom: var(--space-6);
}

.error-icon {
  color: var(--error);
  margin-bottom: var(--space-4);
}

/* Database Header Card */
.database-header-card {
  margin-bottom: var(--space-8);
}

.database-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-6);
  margin-bottom: var(--space-6);
}

.database-header-left {
  display: flex;
  gap: var(--space-4);
  align-items: flex-start;
  flex: 1;
}

.database-icon-large {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background-color: var(--color-primary);
  border: var(--border-thick) solid var(--color-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  color: white;
  flex-shrink: 0;
}

.database-info {
  flex: 1;
}

.database-name {
  font-size: var(--text-4xl);
  color: var(--text-primary);
  text-shadow: 2px 2px 0 var(--shadow-color);
  margin: 0 0 var(--space-3) 0;
}

.database-badges {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
}

.database-header-actions {
  display: flex;
  gap: var(--space-3);
}

/* Database Details Grid */
.database-details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-4);
  padding: var(--space-4);
  background-color: var(--bg-tertiary);
  border: var(--border-normal) solid var(--border-color);
  border-radius: var(--radius-md);
  margin-bottom: var(--space-6);
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.detail-label {
  font-size: var(--text-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.detail-value {
  font-size: var(--text-base);
  font-family: var(--font-mono);
  color: var(--text-primary);
  font-weight: var(--font-weight-medium);
}

/* Database Description */
.database-description {
  padding: var(--space-4);
  background-color: var(--bg-tertiary);
  border-left: var(--border-thick) solid var(--color-primary);
  border-radius: var(--radius-md);
}

.database-description h3 {
  font-size: var(--text-lg);
  color: var(--text-primary);
  margin: 0 0 var(--space-2) 0;
}

.database-description p {
  font-size: var(--text-base);
  color: var(--text-secondary);
  margin: 0;
  line-height: var(--leading-relaxed);
}

/* Tables Section */
.tables-section {
  margin-top: var(--space-8);
}

.tables-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--space-6);
  gap: var(--space-6);
}

.tables-title {
  font-size: var(--text-3xl);
  color: var(--text-primary);
  margin: 0 0 var(--space-1) 0;
}

.tables-subtitle {
  font-size: var(--text-base);
  color: var(--text-tertiary);
  margin: 0;
}

.search-input {
  max-width: 300px;
}

/* Empty Tables State */
.empty-tables {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-16);
  text-align: center;
  background-color: var(--bg-secondary);
  border: var(--border-normal) dashed var(--border-color);
  border-radius: var(--radius-lg);
}

.empty-icon {
  color: var(--text-tertiary);
  margin-bottom: var(--space-4);
}

.empty-tables h3 {
  color: var(--text-primary);
  margin-bottom: var(--space-2);
}

.empty-tables p {
  color: var(--text-secondary);
  margin-bottom: var(--space-6);
}

/* Tables Grid */
.tables-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--space-4);
}

.table-card-wrapper {
  animation: slide-up 0.3s ease-out backwards;
}

.table-card-wrapper:nth-child(1) {
  animation-delay: 0.05s;
}
.table-card-wrapper:nth-child(2) {
  animation-delay: 0.1s;
}
.table-card-wrapper:nth-child(3) {
  animation-delay: 0.15s;
}

.table-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.table-card-header {
  display: flex;
  gap: var(--space-3);
  align-items: flex-start;
  margin-bottom: var(--space-4);
}

.table-card-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background-color: var(--bg-tertiary);
  border: var(--border-normal) solid var(--border-color);
  border-radius: var(--radius-md);
  color: var(--color-primary);
  flex-shrink: 0;
}

.table-card-info {
  flex: 1;
  min-width: 0;
}

.table-name {
  font-size: var(--text-lg);
  font-family: var(--font-mono);
  color: var(--text-primary);
  margin: 0 0 var(--space-2) 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.table-description {
  flex: 1;
  margin-bottom: var(--space-4);
}

.table-description p {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  margin: 0;
  line-height: var(--leading-normal);
}

.table-no-description {
  flex: 1;
  margin-bottom: var(--space-4);
}

.table-no-description p {
  font-size: var(--text-sm);
  color: var(--text-tertiary);
  font-style: italic;
  margin: 0;
}

.table-card-footer {
  margin-top: auto;
}

/* No Results */
.no-results {
  text-align: center;
  padding: var(--space-8);
  color: var(--text-tertiary);
}

/* Responsive */
@media (max-width: 768px) {
  .database-header {
    flex-direction: column;
  }

  .database-header-actions {
    width: 100%;
  }

  .database-header-actions button {
    flex: 1;
  }

  .tables-header {
    flex-direction: column;
  }

  .search-input {
    max-width: 100%;
  }

  .tables-grid {
    grid-template-columns: 1fr;
  }
}

/* Animations */
@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
