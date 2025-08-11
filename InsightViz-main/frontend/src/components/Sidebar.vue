<template>
  <div :class="['sidebar', { collapsed: isCollapsed }]">
    <!-- Toggle button -->
    <button @click="toggleSidebar" class="sidebar-toggle">
      <Bars3Icon v-if="!isCollapsed" class="toggle-icon" />
      <XMarkIcon v-else class="toggle-icon" />
    </button>

    <!-- Logo Section -->
    <div class="logo-section">
      <div class="logo">
        <svg class="logo-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
        </svg>
        <span v-if="!isCollapsed" class="logo-text">InsightViz</span>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="navigation">
      <router-link
        v-for="item in menuItems"
        :key="item.name"
        :to="item.path"
        class="nav-item"
        :class="{ active: $route.path === item.path }"
      >
        <component :is="item.icon" class="nav-icon" />
        <span v-if="!isCollapsed" class="nav-text">{{ item.label }}</span>
        <div v-else class="tooltip">{{ item.label }}</div>
      </router-link>
    </nav>

    <!-- Footer / User Info -->
    <div class="sidebar-footer">
      <div class="user-info">
        <div class="user-avatar">
          <UserCircleIcon class="avatar-icon" />
        </div>
        <div v-if="!isCollapsed" class="user-details">
          <span class="user-name">{{ currentUser.name }}</span>
          <span class="user-role">{{ currentUser.role }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import {
  UserCircleIcon,
  UserIcon,
  ClipboardDocumentListIcon,
  ChatBubbleLeftRightIcon,
  MegaphoneIcon,
  UsersIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/vue/24/outline'

// État pour le repli/déploiement de la sidebar
const isCollapsed = ref(false)

// Informations utilisateur fictives
const currentUser = ref({
  name: 'Jean Dupont',
  role: 'Utilisateur'
})

// Menu de navigation
const menuItems = [
  { name: 'user', path: '/user', label: 'Utilisateur', icon: UserIcon },
  { name: 'survey', path: '/survey', label: 'Enquête', icon: ClipboardDocumentListIcon },
  { name: 'response', path: '/reponse', label: 'Réponse', icon: ChatBubbleLeftRightIcon },
  { name: 'campaign', path: '/campagne', label: 'Campagne', icon: MegaphoneIcon },
  { name: 'person', path: '/personne', label: 'Personne', icon: UsersIcon }
]

// Basculement sidebar
const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}

// Gestion du responsive
const handleResize = () => {
  isCollapsed.value = window.innerWidth <= 768
}

// Gestion des événements au montage
onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>


<style scoped>
.sidebar {
  width: 280px;
  height: 100vh;
  background: linear-gradient(180deg, #1e293b 0%, #334155 100%);
  color: white;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.1);
  transition: width 0.3s ease;
}

.sidebar.collapsed {
  width: 70px;
}

.sidebar-toggle {
  position: absolute;
  top: 1rem;
  right: -15px;
  width: 30px;
  height: 30px;
  background-color: #3b82f6;
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
  z-index: 1001;
}

.sidebar-toggle:hover {
  background-color: #2563eb;
  transform: scale(1.1);
}

.toggle-icon {
  width: 16px;
  height: 16px;
}

.logo-section {
  padding: 2rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  justify-content: center;
}

.sidebar:not(.collapsed) .logo {
  justify-content: flex-start;
}

.logo-icon {
  width: 32px;
  height: 32px;
  color: #3b82f6;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  transition: opacity 0.3s ease;
}

.navigation {
  flex: 1;
  padding: 1.5rem 0;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1.5rem;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
  position: relative;
}

.sidebar.collapsed .nav-item {
  justify-content: center;
  padding: 0.875rem 0.5rem;
}

.nav-item:hover {
  background-color: rgba(255, 255, 255, 0.05);
  color: white;
  border-left-color: #3b82f6;
}

.nav-item.active {
  background-color: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
  border-left-color: #3b82f6;
  font-weight: 500;
}

.nav-icon {
  width: 20px;
  height: 20px;
}

.nav-text {
  font-size: 0.95rem;
  transition: opacity 0.3s ease;
}

.tooltip {
  position: absolute;
  left: 70px;
  background-color: #1f2937;
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  font-size: 0.875rem;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
  z-index: 1002;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.tooltip::before {
  content: '';
  position: absolute;
  left: -5px;
  top: 50%;
  transform: translateY(-50%);
  border: 5px solid transparent;
  border-right-color: #1f2937;
}

.sidebar.collapsed .nav-item:hover .tooltip {
  opacity: 1;
  visibility: visible;
}

.sidebar-footer {
  padding: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  justify-content: center;
}

.sidebar:not(.collapsed) .user-info {
  justify-content: flex-start;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(59, 130, 246, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-icon {
  width: 24px;
  height: 24px;
  color: #3b82f6;
}

.user-details {
  display: flex;
  flex-direction: column;
  transition: opacity 0.3s ease;
}

.user-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: white;
}

.user-role {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .sidebar-toggle {
    display: flex;
  }
}

@media (min-width: 1025px) {
  .sidebar-toggle {
    display: none;
  }
}

/* Responsive : si sidebar replié */
@media (max-width: 768px) {
  .user-page {
    margin-left: 70px;
  }
}
</style>



<template>
  <div class="survey-page">
    <div class="page-header">
      <h1 class="page-title">Gestion des Enquêtes</h1>
      <p class="page-subtitle">Créez et gérez vos enquêtes de satisfaction</p>
    </div>

    <DataTable
      title="Liste des Enquêtes"
      add-button-text="Nouvelle Enquête"
      :columns="tableColumns"
      :data="surveys"
      @add="addSurvey"
      @edit="editSurvey"
      @delete="deleteSurvey"
    />

    <!-- Modal d'ajout/édition -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">{{ isEditing ? 'Modifier' : 'Nouvelle' }} Enquête</h3>
          <button @click="closeModal" class="modal-close">
            <XMarkIcon class="close-icon" />
          </button>
        </div>

        <form @submit.prevent="saveSurvey" class="modal-body">
          <div class="form-group">
            <label class="form-label">Titre de l'enquête</label>
            <input
              v-model="surveyForm.title"
              type="text"
              class="form-input"
              placeholder="Ex: Satisfaction client Q1 2024"
              required
            />
          </div>

          <div class="form-group">
            <label class="form-label">Description</label>
            <textarea
              v-model="surveyForm.description"
              class="form-textarea"
              placeholder="Décrivez l'objectif de cette enquête..."
              rows="3"
            ></textarea>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Date de début</label>
              <input
                v-model="surveyForm.startDate"
                type="date"
                class="form-input"
                required
              />
            </div>

            <div class="form-group">
              <label class="form-label">Date de fin</label>
              <input
                v-model="surveyForm.endDate"
                type="date"
                class="form-input"
                required
              />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Statut</label>
            <select v-model="surveyForm.status" class="form-input">
              <option value="Brouillon">Brouillon</option>
              <option value="Actif">Actif</option>
              <option value="Terminé">Terminé</option>
              <option value="Suspendu">Suspendu</option>
            </select>
          </div>

          <div class="modal-actions">
            <button type="button" @click="closeModal" class="btn btn-secondary">
              Annuler
            </button>
            <button type="submit" class="btn btn-primary">
              {{ isEditing ? 'Mettre à jour' : 'Créer' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import DataTable from '@/components/DataTable.vue'

interface Survey {
  id: number
  title: string
  description: string
  startDate: string
  endDate: string
  status: string
  responses: number
}

const surveys = ref<Survey[]>([
  {
    id: 1,
    title: 'Satisfaction Client Q1 2024',
    description: 'Enquête trimestrielle de satisfaction client',
    startDate: '2024-01-01',
    endDate: '2024-03-31',
    status: 'Terminé',
    responses: 245
  },
  {
    id: 2,
    title: 'Évaluation Produit Beta',
    description: 'Retours sur la version beta du nouveau produit',
    startDate: '2024-02-15',
    endDate: '2024-03-15',
    status: 'Actif',
    responses: 89
  },
  {
    id: 3,
    title: 'Enquête Employés 2024',
    description: 'Satisfaction et engagement des employés',
    startDate: '2024-03-01',
    endDate: '2024-04-01',
    status: 'Brouillon',
    responses: 0
  }
])

const tableColumns = [
  { key: 'title', label: 'Titre' },
  { key: 'description', label: 'Description' },
  { key: 'startDate', label: 'Date début' },
  { key: 'endDate', label: 'Date fin' },
  { key: 'status', label: 'Statut' },
  { key: 'responses', label: 'Réponses' }
]

const showModal = ref(false)
const isEditing = ref(false)
const editingId = ref<number | null>(null)

const surveyForm = reactive({
  title: '',
  description: '',
  startDate: '',
  endDate: '',
  status: 'Brouillon'
})

const addSurvey = () => {
  resetForm()
  isEditing.value = false
  showModal.value = true
}

const editSurvey = (survey: Survey) => {
  surveyForm.title = survey.title
  surveyForm.description = survey.description
  surveyForm.startDate = survey.startDate
  surveyForm.endDate = survey.endDate
  surveyForm.status = survey.status
  editingId.value = survey.id
  isEditing.value = true
  showModal.value = true
}

const deleteSurvey = (survey: Survey) => {
  if (confirm(`Êtes-vous sûr de vouloir supprimer l'enquête "${survey.title}" ?`)) {
    surveys.value = surveys.value.filter(s => s.id !== survey.id)
  }
}

const saveSurvey = () => {
  if (isEditing.value && editingId.value !== null) {
    const index = surveys.value.findIndex(s => s.id === editingId.value)
    if (index !== -1) {
      surveys.value[index] = {
        ...surveys.value[index],
        title: surveyForm.title,
        description: surveyForm.description,
        startDate: surveyForm.startDate,
        endDate: surveyForm.endDate,
        status: surveyForm.status
      }
    }
  } else {
    const newSurvey: Survey = {
      id: Date.now(),
      title: surveyForm.title,
      description: surveyForm.description,
      startDate: surveyForm.startDate,
      endDate: surveyForm.endDate,
      status: surveyForm.status,
      responses: 0
    }
    surveys.value.push(newSurvey)
  }
  closeModal()
}

const closeModal = () => {
  showModal.value = false
  resetForm()
}

const resetForm = () => {
  surveyForm.title = ''
  surveyForm.description = ''
  surveyForm.startDate = ''
  surveyForm.endDate = ''
  surveyForm.status = 'Brouillon'
  editingId.value = null
}
</script>



<style scoped>
.survey-page {
  padding: 2rem;
}

.page-header {
  margin-bottom: 2rem;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
}

.page-subtitle {
  color: #6b7280;
  font-size: 1rem;
  margin: 0;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
}

.close-icon {
  width: 20px;
  height: 20px;
  color: #6b7280;
}

.modal-body {
  padding: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-label {
  display: block;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  transition: border-color 0.2s ease;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

.modal-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  margin-top: 2rem;
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
}

.btn-secondary {
  background-color: #f3f4f6;
  color: #374151;
}

.btn-secondary:hover {
  background-color: #e5e7eb;
}

@media (max-width: 768px) {
  .survey-page {
    padding: 1rem;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .modal {
    width: 95%;
  }
  
  .modal-body {
    padding: 1.5rem;
  }
}
</style>