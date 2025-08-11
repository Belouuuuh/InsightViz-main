<template>
  <div class="employee-scoring">
    <!-- En-tête avec statistiques -->
    <div class="header">
      <h1>Scoring des Employés</h1>
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-number">{{ totalSurveys }}</div>
          <div class="stat-label">Enquêtes Créées</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">{{ totalResponses }}</div>
          <div class="stat-label">Réponses Reçues</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">{{ totalActiveCampaigns }}</div>
          <div class="stat-label">Campagnes Actives</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">{{ filteredEmployees.length }}</div>
          <div class="stat-label">Employés Actifs</div>
        </div>
      </div>
    </div>

    <!-- Barre de recherche -->
    <div class="search-container">
      <div class="search-box">
        <input 
          v-model="searchTerm" 
          type="text" 
          placeholder="Rechercher un employé (nom, email, poste...)"
          class="search-input"
        />
        <span class="search-icon">🔍</span>
      </div>
    </div>

    <!-- Contrôles de pagination -->
    <div class="controls">
      <div class="results-info">
        Affichage {{ startIndex + 1 }}-{{ Math.min(endIndex, filteredEmployees.length) }} sur {{ filteredEmployees.length }} employés
      </div>
      <div class="items-per-page">
        <label>
          Afficher:
          <select v-model="itemsPerPage" @change="currentPage = 1">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </label>
      </div>
    </div>

    <!-- Tableau / Liste -->
    <div class="table-container">
      <table class="employees-table">
        <thead>
          <tr>
            <th @click="sortBy('name')" class="sortable">
              Nom 
              <span class="sort-icon" :class="getSortIcon('name')">⬍</span>
            </th>
            <th @click="sortBy('role')" class="sortable">
              Rôle 
              <span class="sort-icon" :class="getSortIcon('role')">⬍</span>
            </th>
            <th @click="sortBy('position')" class="sortable">
              Poste 
              <span class="sort-icon" :class="getSortIcon('position')">⬍</span>
            </th>
            <th @click="sortBy('email')" class="sortable">
              Email 
              <span class="sort-icon" :class="getSortIcon('email')">⬍</span>
            </th>
            <th @click="sortBy('surveysCreated')" class="sortable">
              Enquêtes 
              <span class="sort-icon" :class="getSortIcon('surveysCreated')">⬍</span>
            </th>
            <th @click="sortBy('responsesReceived')" class="sortable">
              Réponses 
              <span class="sort-icon" :class="getSortIcon('responsesReceived')">⬍</span>
            </th>
            <th @click="sortBy('activeCampaigns')" class="sortable">
              Campagnes 
              <span class="sort-icon" :class="getSortIcon('activeCampaigns')">⬍</span>
            </th>
            <th @click="sortBy('score')" class="sortable">
              Score 
              <span class="sort-icon" :class="getSortIcon('score')">⬍</span>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="employee in paginatedEmployees" :key="employee.id" class="employee-row">
            <td data-label="Nom" class="name-cell">
              <div class="employee-info">
                <div class="avatar">{{ employee.name.charAt(0) }}</div>
                <span class="name">{{ employee.name }}</span>
              </div>
            </td>
            <td data-label="Rôle">{{ employee.role }}</td>
            <td data-label="Poste">{{ employee.position }}</td>
            <td data-label="Email" class="email-cell">{{ employee.email }}</td>
            <td data-label="Enquêtes">{{ employee.surveysCreated }}</td>
            <td data-label="Réponses">{{ employee.responsesReceived }}</td>
            <td data-label="Campagnes">{{ employee.activeCampaigns }}</td>
            <td data-label="Score" class="score-cell">
              <span class="score-badge" :class="getScoreClass(employee.score)">
                {{ employee.score }}%
              </span>
            </td>
            <td data-label="Actions" class="actions-cell">
              <button class="action-btn view-btn" @click="viewDetails(employee)">
                👁️ Voir
              </button>
              <button class="action-btn edit-btn" @click="editEmployee(employee)">
                ✏️ Modifier
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="pagination" v-if="totalPages > 1">
      <button 
        @click="changePage(currentPage - 1)" 
        :disabled="currentPage === 1"
        class="page-btn"
      >
        ← Précédent
      </button>
      
      <div class="page-numbers">
        <button 
          v-for="page in visiblePages" 
          :key="page"
          @click="changePage(page)"
          :class="['page-btn', { active: page === currentPage }]"
        >
          {{ page }}
        </button>
      </div>
      
      <button 
        @click="changePage(currentPage + 1)" 
        :disabled="currentPage === totalPages"
        class="page-btn"
      >
        Suivant →
      </button>
    </div>

    <!-- Liste des employés en bas -->
    <div class="employee-summary">
      <h3>Résumé des Employés</h3>
      <div class="employee-cards">
        <div v-for="employee in filteredEmployees.slice(0, 6)" :key="employee.id" class="employee-card">
          <div class="card-header">
            <div class="avatar large">{{ employee.name.charAt(0) }}</div>
            <div class="card-info">
              <h4>{{ employee.name }}</h4>
              <p>{{ employee.position }}</p>
            </div>
            <div class="card-score" :class="getScoreClass(employee.score)">
              {{ employee.score }}%
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Employee {
  id: number
  name: string
  role: string
  position: string
  email: string
  surveysCreated: number
  responsesReceived: number
  activeCampaigns: number
  score: number
}

// État réactif
const searchTerm = ref('')
const sortColumn = ref('score')
const sortDirection = ref<'asc' | 'desc'>('desc')
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Données mockées des employés
const employees = ref<Employee[]>([
  {
    id: 1,
    name: 'Marie Dubois',
    role: 'Administrateur',
    position: 'Chef de Projet',
    email: 'marie.dubois@entreprise.com',
    surveysCreated: 12,
    responsesReceived: 156,
    activeCampaigns: 3,
    score: 92
  },
  {
    id: 2,
    name: 'Pierre Martin',
    role: 'Utilisateur',
    position: 'Développeur Senior',
    email: 'pierre.martin@entreprise.com',
    surveysCreated: 8,
    responsesReceived: 89,
    activeCampaigns: 2,
    score: 78
  },
  {
    id: 3,
    name: 'Sophie Leclerc',
    role: 'Modérateur',
    position: 'Responsable RH',
    email: 'sophie.leclerc@entreprise.com',
    surveysCreated: 15,
    responsesReceived: 203,
    activeCampaigns: 4,
    score: 95
  },
  {
    id: 4,
    name: 'Jean Durand',
    role: 'Utilisateur',
    position: 'Analyste',
    email: 'jean.durand@entreprise.com',
    surveysCreated: 5,
    responsesReceived: 42,
    activeCampaigns: 1,
    score: 65
  },
  {
    id: 5,
    name: 'Emma Rodriguez',
    role: 'Administrateur',
    position: 'Directrice Marketing',
    email: 'emma.rodriguez@entreprise.com',
    surveysCreated: 20,
    responsesReceived: 267,
    activeCampaigns: 5,
    score: 98
  },
  {
    id: 6,
    name: 'Lucas Bernard',
    role: 'Utilisateur',
    position: 'Designer UX',
    email: 'lucas.bernard@entreprise.com',
    surveysCreated: 7,
    responsesReceived: 73,
    activeCampaigns: 2,
    score: 71
  },
  {
    id: 7,
    name: 'Camille Moreau',
    role: 'Modérateur',
    position: 'Chef d\'équipe',
    email: 'camille.moreau@entreprise.com',
    surveysCreated: 11,
    responsesReceived: 134,
    activeCampaigns: 3,
    score: 86
  },
  {
    id: 8,
    name: 'Thomas Roux',
    role: 'Utilisateur',
    position: 'Développeur Junior',
    email: 'thomas.roux@entreprise.com',
    surveysCreated: 3,
    responsesReceived: 28,
    activeCampaigns: 1,
    score: 58
  },
  {
    id: 9,
    name: 'Julie Blanc',
    role: 'Administrateur',
    position: 'Responsable Qualité',
    email: 'julie.blanc@entreprise.com',
    surveysCreated: 14,
    responsesReceived: 178,
    activeCampaigns: 4,
    score: 89
  },
  {
    id: 10,
    name: 'Antoine Petit',
    role: 'Utilisateur',
    position: 'Commercial',
    email: 'antoine.petit@entreprise.com',
    surveysCreated: 6,
    responsesReceived: 54,
    activeCampaigns: 2,
    score: 69
  }
])

// Données calculées
const filteredEmployees = computed(() => {
  let filtered = employees.value

  // Filtrage par terme de recherche
  if (searchTerm.value) {
    const term = searchTerm.value.toLowerCase()
    filtered = filtered.filter(employee =>
      employee.name.toLowerCase().includes(term) ||
      employee.email.toLowerCase().includes(term) ||
      employee.position.toLowerCase().includes(term) ||
      employee.role.toLowerCase().includes(term)
    )
  }

  // Tri
  filtered.sort((a, b) => {
    const aVal = a[sortColumn.value as keyof Employee]
    const bVal = b[sortColumn.value as keyof Employee]
    
    let comparison = 0
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      comparison = aVal.localeCompare(bVal)
    } else {
      comparison = (aVal as number) - (bVal as number)
    }
    
    return sortDirection.value === 'asc' ? comparison : -comparison
  })

  return filtered
})

const totalPages = computed(() => Math.ceil(filteredEmployees.value.length / itemsPerPage.value))
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value)
const endIndex = computed(() => startIndex.value + itemsPerPage.value)

const paginatedEmployees = computed(() => 
  filteredEmployees.value.slice(startIndex.value, endIndex.value)
)

const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, start + 4)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

// Statistiques globales
const totalSurveys = computed(() => 
  employees.value.reduce((sum, emp) => sum + emp.surveysCreated, 0)
)

const totalResponses = computed(() => 
  employees.value.reduce((sum, emp) => sum + emp.responsesReceived, 0)
)

const totalActiveCampaigns = computed(() => 
  employees.value.reduce((sum, emp) => sum + emp.activeCampaigns, 0)
)

// Méthodes
const sortBy = (column: string) => {
  if (sortColumn.value === column) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortColumn.value = column
    sortDirection.value = 'desc'
  }
}

const getSortIcon = (column: string) => {
  if (sortColumn.value !== column) return ''
  return sortDirection.value === 'asc' ? 'asc' : 'desc'
}

const getScoreClass = (score: number) => {
  if (score >= 85) return 'excellent'
  if (score >= 70) return 'good'
  if (score >= 55) return 'average'
  return 'poor'
}

const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const viewDetails = (employee: Employee) => {
  alert(`Voir les détails de ${employee.name}`)
}

const editEmployee = (employee: Employee) => {
  alert(`Modifier ${employee.name}`)
}

// Remise à zéro de la page lors du changement de recherche
const resetPage = () => {
  currentPage.value = 1
}

// Watcher pour la recherche
import { watch } from 'vue'
watch(searchTerm, resetPage)
</script>

<style scoped>
.employee-scoring {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f8fafc;
  min-height: 100vh;
}

.header {
  margin-bottom: 2rem;
}

.header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 1.5rem 0;
  text-align: center;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2563eb;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  color: #64748b;
  font-weight: 500;
}

.search-container {
  margin-bottom: 1.5rem;
}

.search-box {
  position: relative;
  max-width: 500px;
  margin: 0 auto;
}

.search-input {
  width: 100%;
  padding: 1rem 3rem 1rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s ease;
  background: white;
}

.search-input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.search-icon {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
  color: #64748b;
}

.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.results-info {
  color: #64748b;
  font-size: 0.9rem;
}

.items-per-page label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #64748b;
}

.items-per-page select {
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: white;
}

.table-container {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.employees-table {
  width: 100%;
  border-collapse: collapse;
}

.employees-table th {
  background: #f8fafc;
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #374151;
  border-bottom: 2px solid #e5e7eb;
  position: sticky;
  top: 0;
}

.employees-table th.sortable {
  cursor: pointer;
  user-select: none;
  position: relative;
}

.employees-table th.sortable:hover {
  background: #e2e8f0;
}

.sort-icon {
  margin-left: 0.5rem;
  font-size: 0.8rem;
  opacity: 0.5;
  transition: opacity 0.2s ease;
}

.sort-icon.asc::after {
  content: '↑';
  opacity: 1;
}

.sort-icon.desc::after {
  content: '↓';
  opacity: 1;
}

.employees-table td {
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  vertical-align: middle;
}

.employee-row:hover {
  background-color: #f8fafc;
}

.name-cell .employee-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #2563eb, #3b82f6);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1rem;
}

.avatar.large {
  width: 50px;
  height: 50px;
  font-size: 1.2rem;
}

.name {
  font-weight: 600;
  color: #1e293b;
}

.email-cell {
  color: #2563eb;
  font-size: 0.9rem;
}

.score-cell {
  text-align: center;
}

.score-badge {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
  display: inline-block;
  min-width: 60px;
  text-align: center;
}

.score-badge.excellent {
  background-color: #dcfce7;
  color: #166534;
}

.score-badge.good {
  background-color: #dbeafe;
  color: #1d4ed8;
}

.score-badge.average {
  background-color: #fed7aa;
  color: #ea580c;
}

.score-badge.poor {
  background-color: #fecaca;
  color: #dc2626;
}

.actions-cell {
  text-align: center;
}

.action-btn {
  padding: 0.5rem 1rem;
  margin: 0 0.25rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s ease;
}

.view-btn {
  background-color: #e0f2fe;
  color: #0369a1;
}

.view-btn:hover {
  background-color: #bae6fd;
}

.edit-btn {
  background-color: #f0fdf4;
  color: #166534;
}

.edit-btn:hover {
  background-color: #dcfce7;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 2rem 0;
}

.page-btn {
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  background: white;
  color: #374151;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.page-btn:hover:not(:disabled) {
  background-color: #f8fafc;
  border-color: #2563eb;
}

.page-btn.active {
  background-color: #2563eb;
  color: white;
  border-color: #2563eb;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
  gap: 0.5rem;
}

.employee-summary {
  margin-top: 3rem;
}

.employee-summary h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1.5rem;
  text-align: center;
}

.employee-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

.employee-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.employee-card:hover {
  transform: translateY(-2px);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.card-info {
  flex: 1;
}

.card-info h4 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
}

.card-info p {
  margin: 0.25rem 0 0 0;
  color: #64748b;
  font-size: 0.9rem;
}

.card-score {
  font-weight: 700;
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  min-width: 60px;
  text-align: center;
}

/* Responsive Design */
@media (max-width: 768px) {
  .employee-scoring {
    padding: 1rem;
  }

  .header h1 {
    font-size: 2rem;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .stat-card {
    padding: 1rem;
  }

  .stat-number {
    font-size: 2rem;
  }

  .controls {
    flex-direction: column;
    align-items: stretch;
  }

  /* Transformation en liste verticale sur mobile */
  .employees-table,
  .employees-table thead,
  .employees-table tbody,
  .employees-table th,
  .employees-table td,
  .employees-table tr {
    display: block;
  }

  .employees-table thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  .employee-row {
    background: white;
    margin-bottom: 1rem;
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .employees-table td {
    border: none;
    padding: 0.5rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .employees-table td:before {
    content: attr(data-label) ": ";
    font-weight: 600;
    color: #374151;
    flex: 0 0 auto;
    margin-right: 1rem;
  }

  .name-cell:before {
    display: none;
  }

  .name-cell .employee-info {
    width: 100%;
    justify-content: flex-start;
  }

  .actions-cell {
    text-align: left;
  }

  .action-btn {
    margin: 0.25rem 0.5rem 0.25rem 0;
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
  }

  .employee-cards {
    grid-template-columns: 1fr;
  }

  .pagination {
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .page-numbers {
    order: -1;
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .search-input {
    font-size: 16px; /* Évite le zoom sur iOS */
  }

  .employees-table td {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }

  .employees-table td:before {
    margin-right: 0;
  }
}
</style>