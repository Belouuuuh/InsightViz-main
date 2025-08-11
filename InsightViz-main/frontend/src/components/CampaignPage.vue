<template>
  <div class="campaign-page">
    <div class="page-header">
      <h1 class="page-title">Gestion des Campagnes</h1>
      <p class="page-subtitle">Organisez et lancez vos campagnes d'enquêtes</p>
    </div>
    
    <DataTable
      title="Liste des Campagnes"
      add-button-text="Campagne"
      :columns="tableColumns"
      :data="campaigns"
      @add="addCampaign"
      @edit="editCampaign"
      @delete="deleteCampaign"
    />
    
    <!-- Modal d'ajout/édition -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">{{ isEditing ? 'Modifier' : 'Nouvelle' }} Campagne</h3>
          <button @click="closeModal" class="modal-close">
            <XMarkIcon class="close-icon" />
          </button>
        </div>
        
        <form @submit.prevent="saveCampaign" class="modal-body">
          <div class="form-group">
            <label class="form-label">Nom de la campagne</label>
            <input 
              v-model="campaignForm.name" 
              type="text" 
              class="form-input"
              placeholder="Ex: Campagne Satisfaction Q1"
              required
            />
          </div>
          
          <div class="form-group">
            <label class="form-label">Description</label>
            <textarea 
              v-model="campaignForm.description" 
              class="form-textarea"
              placeholder="Décrivez l'objectif de cette campagne..."
              rows="3"
            ></textarea>
          </div>
          
          <div class="form-group">
            <label class="form-label">Enquêtes associées</label>
            <div class="checkbox-group">
              <label v-for="survey in availableSurveys" :key="survey.id" class="checkbox-item">
                <input 
                  type="checkbox" 
                  :value="survey.id"
                  v-model="campaignForm.surveyIds"
                  class="checkbox-input"
                />
                <span class="checkbox-label">{{ survey.title }}</span>
              </label>
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Date de lancement</label>
              <input 
                v-model="campaignForm.launchDate" 
                type="date" 
                class="form-input"
                required
              />
            </div>
            
            <div class="form-group">
              <label class="form-label">Date de fin</label>
              <input 
                v-model="campaignForm.endDate" 
                type="date" 
                class="form-input"
                required
              />
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Budget (€)</label>
              <input 
                v-model="campaignForm.budget" 
                type="number" 
                class="form-input"
                min="0"
                step="100"
                placeholder="5000"
              />
            </div>
            
            <div class="form-group">
              <label class="form-label">Statut</label>
              <select v-model="campaignForm.status" class="form-input">
                <option value="Planifiée">Planifiée</option>
                <option value="Active">Active</option>
                <option value="Terminée">Terminée</option>
                <option value="Suspendue">Suspendue</option>
              </select>
            </div>
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
import DataTable from '../components/DataTable.vue'

interface Campaign {
  id: number
  name: string
  description: string
  launchDate: string
  endDate: string
  status: string
  budget: number
  surveysCount: number
  responses: number
}

const campaigns = ref<Campaign[]>([
  {
    id: 1,
    name: 'Campagne Satisfaction Q1',
    description: 'Campagne de satisfaction client pour le premier trimestre',
    launchDate: '2024-01-01',
    endDate: '2024-03-31',
    status: 'Terminée',
    budget: 5000,
    surveysCount: 2,
    responses: 334
  },
  {
    id: 2,
    name: 'Lancement Produit Beta',
    description: 'Collecte de retours sur le nouveau produit en version beta',
    launchDate: '2024-02-15',
    endDate: '2024-04-15',
    status: 'Active',
    budget: 8000,
    surveysCount: 1,
    responses: 89
  },
  {
    id: 3,
    name: 'Évaluation Interne 2024',
    description: 'Campagne d\'évaluation interne des processus',
    launchDate: '2024-03-01',
    endDate: '2024-05-01',
    status: 'Planifiée',
    budget: 3000,
    surveysCount: 3,
    responses: 0
  }
])

const availableSurveys = ref([
  { id: 1, title: 'Satisfaction Client Q1 2024' },
  { id: 2, title: 'Évaluation Produit Beta' },
  { id: 3, title: 'Enquête Employés 2024' },
  { id: 4, title: 'Feedback Service Client' }
])

const tableColumns = [
  { key: 'name', label: 'Nom' },
  { key: 'description', label: 'Description' },
  { key: 'launchDate', label: 'Date lancement' },
  { key: 'endDate', label: 'Date fin' },
  { key: 'status', label: 'Statut' },
  { key: 'budget', label: 'Budget (€)' },
  { key: 'responses', label: 'Réponses' }
]

const showModal = ref(false)
const isEditing = ref(false)
const editingId = ref<number | null>(null)

const campaignForm = reactive({
  name: '',
  description: '',
  launchDate: '',
  endDate: '',
  status: 'Planifiée',
  budget: 0,
  surveyIds: [] as number[]
})

const addCampaign = () => {
  resetForm()
  isEditing.value = false
  showModal.value = true
}

const editCampaign = (campaign: Campaign) => {
  campaignForm.name = campaign.name
  campaignForm.description = campaign.description
  campaignForm.launchDate = campaign.launchDate
  campaignForm.endDate = campaign.endDate
  campaignForm.status = campaign.status
  campaignForm.budget = campaign.budget
  campaignForm.surveyIds = [1, 2] // Exemple, à adapter selon vos données
  editingId.value = campaign.id
  isEditing.value = true
  showModal.value = true
}

const deleteCampaign = (campaign: Campaign) => {
  if (confirm(`Êtes-vous sûr de vouloir supprimer la campagne "${campaign.name}" ?`)) {
    campaigns.value = campaigns.value.filter(c => c.id !== campaign.id)
  }
}

const saveCampaign = () => {
  if (isEditing.value && editingId.value) {
    const index = campaigns.value.findIndex(c => c.id === editingId.value)
    if (index !== -1) {
      campaigns.value[index] = {
        ...campaigns.value[index],
        name: campaignForm.name,
        description: campaignForm.description,
        launchDate: campaignForm.launchDate,
        endDate: campaignForm.endDate,
        status: campaignForm.status,
        budget: campaignForm.budget,
        surveysCount: campaignForm.surveyIds.length
      }
    }
  } else {
    const newCampaign: Campaign = {
      id: Date.now(),
      name: campaignForm.name,
      description: campaignForm.description,
      launchDate: campaignForm.launchDate,
      endDate: campaignForm.endDate,
      status: campaignForm.status,
      budget: campaignForm.budget,
      surveysCount: campaignForm.surveyIds.length,
      responses: 0
    }
    campaigns.value.push(newCampaign)
  }
  closeModal()
}

const closeModal = () => {
  showModal.value = false
  resetForm()
}

const resetForm = () => {
  campaignForm.name = ''
  campaignForm.description = ''
  campaignForm.launchDate = ''
  campaignForm.endDate = ''
  campaignForm.status = 'Planifiée'
  campaignForm.budget = 0
  campaignForm.surveyIds = []
  editingId.value = null
}
</script>

<style scoped>
.campaign-page {
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
  max-width: 700px;
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

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 150px;
  overflow-y: auto;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background-color: #f9fafb;
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.checkbox-input {
  width: 16px;
  height: 16px;
  accent-color: #3b82f6;
}

.checkbox-label {
  font-size: 0.875rem;
  color: #374151;
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
  .campaign-page {
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