<template>
  <div class="data-table">
    <div class="table-header">
      <h3 class="table-title">{{ title }}</h3>
      <button 
        @click="$emit('add')"
        class="btn btn-primary"
      >
        <PlusIcon class="btn-icon" />
        Ajouter {{ addButtonText }}
      </button>
    </div>
    
    <div class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th v-for="column in columns" :key="column.key">
              {{ column.label }}
            </th>
            <th class="actions-column">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in data" :key="item.id" class="table-row">
            <td v-for="column in columns" :key="column.key">
              <span v-if="column.key === 'status'" 
                    :class="['status-badge', getStatusClass(item[column.key])]">
                {{ item[column.key] }}
              </span>
              <span v-else>{{ item[column.key] }}</span>
            </td>
            <td class="actions-cell">
              <div class="actions">
                <button 
                  @click="$emit('edit', item)"
                  class="action-btn edit-btn"
                  title="Modifier"
                >
                  <PencilIcon class="action-icon" />
                </button>
                <button 
                  @click="$emit('delete', item)"
                  class="action-btn delete-btn"
                  title="Supprimer"
                >
                  <TrashIcon class="action-icon" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/outline'

interface Column {
  key: string
  label: string
}

interface Props {
  title: string
  addButtonText: string
  columns: Column[]
  data: any[]
}

defineProps<Props>()
defineEmits(['add', 'edit', 'delete'])

const getStatusClass = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'actif':
    case 'active':
    case 'terminé':
    case 'completed':
      return 'status-success'
    case 'en cours':
    case 'in progress':
    case 'brouillon':
    case 'draft':
      return 'status-warning'
    case 'inactif':
    case 'inactive':
    case 'suspendu':
    case 'suspended':
      return 'status-error'
    default:
      return 'status-default'
  }
}
</script>

<style scoped>
.data-table {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.table-header {
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.table-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary {
  background-color: #3b82f6;
  color: white;
}

.btn-primary:hover {
  background-color: #2563eb;
  transform: translateY(-1px);
}

.btn-icon {
  width: 16px;
  height: 16px;
}

.table-container {
  overflow-x: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th {
  background-color: #f8fafc;
  padding: 1rem 1.5rem;
  text-align: left;
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
  border-bottom: 1px solid #e5e7eb;
}

.table td {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #f3f4f6;
  color: #4b5563;
}

.table-row:hover {
  background-color: #f9fafb;
}

.actions-column {
  width: 120px;
  text-align: center;
}

.actions-cell {
  text-align: center;
}

.actions {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.action-btn {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.edit-btn {
  background-color: #f3f4f6;
  color: #6b7280;
}

.edit-btn:hover {
  background-color: #3b82f6;
  color: white;
}

.delete-btn {
  background-color: #f3f4f6;
  color: #6b7280;
}

.delete-btn:hover {
  background-color: #ef4444;
  color: white;
}

.action-icon {
  width: 16px;
  height: 16px;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.status-success {
  background-color: #d1fae5;
  color: #065f46;
}

.status-warning {
  background-color: #fef3c7;
  color: #92400e;
}

.status-error {
  background-color: #fee2e2;
  color: #991b1b;
}

.status-default {
  background-color: #f3f4f6;
  color: #374151;
}

@media (max-width: 768px) {
  .table-header {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
  
  .table th,
  .table td {
    padding: 0.75rem 0.5rem;
    font-size: 0.8rem;
  }
  
  .actions {
    gap: 0.25rem;
  }
}

/* Responsive mobile */
@media (max-width: 768px) {
  .table thead {
    display: none;
  }

  .table tbody,
  .table tr,
  .table td {
    display: block;
    width: 100%;
  }

  .table td {
    text-align: left;
    position: relative;
    padding-left: 5%;
    white-space: normal;
    border-bottom: 1px solid #e5e7eb;
  }

  .table td::before {
    content: attr(data-label);
    position: absolute;
    left: 1rem;
    top: 1rem;
    font-weight: bold;
    text-align: left;
    white-space: nowrap;
    color: #6b7280;
  }

  .actions {
    justify-content: flex-end;
  }

  .actions-cell {
    padding-bottom: 1.5rem;
  }
}
</style>