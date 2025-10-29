<template>
  <div class="databases-page">
    <div class="container">
      <!-- Header Section -->
      <div class="page-header">
        <div class="page-header-content">
          <h1 class="page-title">Databases</h1>
        </div>
        <div class="page-header-actions">
          <BaseButton variant="primary" size="lg" @click="handleCreateDatabase">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Nueva Database
          </BaseButton>
        </div>
      </div>

      <!-- Error Banner -->
      <div v-if="error" class="error-banner">
        <div class="error-content">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
          <p>{{ error }}</p>
        </div>
        <BaseButton size="sm" variant="outline" @click="fetchDatabases"> Reintentar </BaseButton>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loading-state">
        <div class="loader"></div>
        <p>Cargando databases...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="!databases?.items?.length" class="empty-state">
        <h3>No hay databases disponibles</h3>
        <p>Crea tu primera database para comenzar</p>
        <BaseButton variant="primary" @click="handleCreateDatabase"> Crear Database </BaseButton>
      </div>

      <!-- Databases Grid -->
      <div v-else class="databases-grid">
        <div v-for="database in databases.items" :key="database.id" class="database-card-wrapper">
          <BaseCard hoverable clickable class="database-card" @click="showDBDetails(database.id)">
            <template #header>
              <div class="card-header">
                <div class="card-header-left">
                  <div class="card-header-info">
                    <h3 class="db-name">{{ database.name }}</h3>
                    <BaseBadge :variant="getDatabaseTypeBadge(database.type)" size="sm">
                      {{ database.type }}
                    </BaseBadge>
                  </div>
                </div>
              </div>
            </template>

            <div class="card-body">
              <div class="db-info-row">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path
                    d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
                  />
                </svg>
                <span class="db-info-label">Host:</span>
                <span class="db-info-value">{{ database.host }}</span>
              </div>

              <div class="db-info-row">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span class="db-info-label">Puerto:</span>
                <span class="db-info-value">{{ database.port }}</span>
              </div>

              <div v-if="database.description" class="db-description">
                <p>{{ database.description }}</p>
              </div>

              <div class="db-meta">
                <div class="db-meta-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>Creado: {{ formatDate(database.created_at) }}</span>
                </div>
                <div class="db-meta-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  <span>Actualizado: {{ formatDate(database.updated_at) }}</span>
                </div>
              </div>
            </div>

            <template #footer>
              <div class="card-footer">
                <BaseButton @click.stop="showDBDetails(database.id)" size="sm" variant="primary">
                  Ver Detalles
                </BaseButton>
                <BaseButton @click.stop="" size="sm" variant="outline">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"
                    />
                    <path d="m15 5 4 4" />
                  </svg>
                  Update
                </BaseButton>
              </div>
            </template>
          </BaseCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import BaseCard from '@/ui/components/BaseCard.vue'
import BaseButton from '@/ui/components/BaseButton.vue'
import BaseBadge from '@/ui/components/BaseBadge.vue'
// import api from '@/services/api'
import { databasesApi } from '@/api'
import type { DatabaseSchema, PaginatedResponse } from '@/types/api'

const router = useRouter()

// Estado
const databases = ref<null | PaginatedResponse<DatabaseSchema>>(null)
const loading = ref<boolean>(false)
const error = ref<null | string>(null)

const fetchDatabases = async () => {
  loading.value = true
  error.value = null

  try {
    const response = await databasesApi.list(1, 50)
    databases.value = response
  } catch (err: unknown) {
    if (err instanceof Error) {
      error.value = err.message || 'Error al cargar las databases'
    } else {
      console.error('Error fetching databases:', err)
    }
  } finally {
    loading.value = false
  }
}

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

// Formatear fecha ISO a formato legible
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

// Navegación a detalles
const showDBDetails = (databaseId: string) => {
  router.push({ name: 'databaseDetail', params: { id: databaseId } })
}

// Crear nueva database
const handleCreateDatabase = () => {
  router.push({ name: 'databaseCreate' })
}

// Cargar al montar
onMounted(() => {
  fetchDatabases()
})
</script>

<style scoped>
.databases-page {
  min-height: 100vh;
  padding: var(--space-8) 0;
  background: var(--gradient-dark);
}

/* Header */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--space-8);
  gap: var(--space-6);
}

.page-header-content {
  flex: 1;
}

.page-title {
  font-size: var(--text-5xl);
  color: var(--text-primary);
  text-shadow: 3px 3px 0 var(--shadow-color);
  margin: 0 0 var(--space-2) 0;
}

.page-subtitle {
  font-size: var(--text-lg);
  color: var(--text-secondary);
  margin: 0;
}

.page-header-actions {
  display: flex;
  gap: var(--space-3);
}

/* Error Banner */
.error-banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-4);
  margin-bottom: var(--space-6);
  background-color: rgba(239, 68, 68, 0.1);
  border: var(--border-normal) solid var(--error);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

.error-content {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  flex: 1;
}

.error-content svg {
  color: var(--error);
  flex-shrink: 0;
}

.error-content p {
  color: var(--error);
  margin: 0;
  font-weight: var(--font-weight-medium);
}

/* Stats Section */
.stats-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-4);
  margin-bottom: var(--space-8);
}

.stat-card {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-6);
  background-color: var(--bg-secondary);
  border: var(--border-normal) solid var(--border-color);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-fast);
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-primary);
}

.stat-content {
  text-align: center;
}

.stat-value {
  font-size: var(--text-4xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  line-height: 1;
  margin-bottom: var(--space-2);
}

.stat-label {
  font-size: var(--text-sm);
  color: var(--text-tertiary);
  font-weight: var(--font-weight-medium);
}

/* Loading & Empty States */
.loading-state,
.empty-state {
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

.empty-state h3 {
  color: var(--text-primary);
  margin-bottom: var(--space-2);
}

.empty-state p {
  color: var(--text-secondary);
  margin-bottom: var(--space-6);
}

/* Databases Grid */
.databases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: var(--space-6);
}

.database-card-wrapper {
  animation: slide-up 0.4s ease-out backwards;
}

.database-card-wrapper:nth-child(1) {
  animation-delay: 0.05s;
}
.database-card-wrapper:nth-child(2) {
  animation-delay: 0.1s;
}
.database-card-wrapper:nth-child(3) {
  animation-delay: 0.15s;
}
.database-card-wrapper:nth-child(4) {
  animation-delay: 0.2s;
}
.database-card-wrapper:nth-child(5) {
  animation-delay: 0.25s;
}
.database-card-wrapper:nth-child(6) {
  animation-delay: 0.3s;
}

.database-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all var(--transition-fast);
}

/* Card Header */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-3);
}

.card-header-left {
  display: flex;
  gap: var(--space-3);
  align-items: flex-start;
  flex: 1;
}

.card-header-info {
  flex: 1;
  min-width: 0;
}

.db-name {
  font-size: var(--text-xl);
  color: var(--text-primary);
  margin: 0 0 var(--space-2) 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Card Body */
.card-body {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.db-info-row {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

.db-info-row svg {
  color: var(--color-primary);
  flex-shrink: 0;
}

.db-info-label {
  font-weight: var(--font-weight-semibold);
  color: var(--text-tertiary);
}

.db-info-value {
  font-family: var(--font-mono);
  color: var(--text-primary);
}

.db-description {
  padding: var(--space-3);
  background-color: var(--bg-tertiary);
  border-left: var(--border-thick) solid var(--color-secondary);
  border-radius: var(--radius-sm);
  margin-top: var(--space-2);
}

.db-description p {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  margin: 0;
  line-height: var(--leading-normal);
}

.db-meta {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin-top: var(--space-2);
  padding-top: var(--space-3);
  border-top: var(--border-thin) solid var(--border-color);
}

.db-meta-item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-xs);
  color: var(--text-tertiary);
}

.db-meta-item svg {
  opacity: 0.6;
  flex-shrink: 0;
}

/* Card Footer */
.card-footer {
  display: flex;
  gap: var(--space-3);
}

.card-footer button {
  flex: 1;
}

/* Responsive */
@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
  }

  .page-title {
    font-size: var(--text-4xl);
  }

  .databases-grid {
    grid-template-columns: 1fr;
  }

  .stats-section {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 1200px) {
  .databases-grid {
    grid-template-columns: repeat(3, 1fr);
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
