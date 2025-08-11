<template>
  <div class="response-page">
    <div class="page-header">
      <h1 class="page-title">Gestion des Réponses</h1>
      <p class="page-subtitle">Analysez et gérez les réponses aux enquêtes</p>
    </div>
    
    <DataTable
      title="Liste des Réponses"
      add-button-text="Réponse"
      :columns="tableColumns"
      :data="responses"
      @add="addResponse"
      @edit="editResponse"
      @delete="deleteResponse"
    />
    
    <!-- Modal d'ajout/édition -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">{{ isEditing ? 'Modifier' : 'Nouvelle' }} Réponse</h3>
          <button @click="closeModal" class="modal-close">
            <XMarkIcon class="close-icon" />
          </button>
        </div>
        
        <form @submit.prevent="saveResponse" class="modal-body">
          <div class="form-group">
            <label class="form-label">Enquête associée</label>
            <select v-model="responseForm.surveyId" class="form-input" required>
              <option value="">Sélectionner une enquête</option>
              <option v-for="survey in availableSurveys" :key="survey.id" :value="survey.id">
                {{ survey.title }}
              </option>
            </select>
          </div>
          
          <div class="form-group">
            <label class="form-label">Email du répondant</label>
            <input 
              v-model="responseForm.respondentEmail" 
              type="email" 
              class="form-input"
              placeholder="exemple@email.com"
              required
            />
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Note globale</label>
              <select v-model="responseForm.rating" class="form-input" required>
                <option value="">Sélectionner</option>
                <option value="1">1 - Très insatisfait</option>
                <option value="2">2 - Insatisfait</option>
                <option value="3">3 - Neutre</option>
                <option value="4">4 - Satisfait</option>
                <option value="5">5 - Très satisfait</option>
              </select>
            </div>
            
            <div class="form-group">
              <label class="form-label">Statut</label>
              <select v-model="responseForm.status" class="form-input">
                <option value="En cours">En cours</option>
                <option value="Terminé">Terminé</option>
                <option value="Abandonné">Abandonné</option>
              </select>
            </div>
          </div>
          
          <div class="form-group">
            <label class="form-label">Commentaires</label>
            <textarea 
              v-model="responseForm.comments" 
              class="form-textarea"
              placeholder="Commentaires du répondant..."
              rows="4"
            ></textarea>
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

interface Response {
  id: number
  surveyTitle: string
  respondentEmail: string
  rating: number
  status: string
  submittedAt: string
  comments: string
}

const responses = ref<Response[]>([
  {
    id: 1,
    surveyTitle: 'Satisfaction Client Q1 2024',
    respondentEmail: 'client1@example.com',
    rating: 4,
    status: 'Terminé',
    submittedAt: '2024-01-15',
    comments: 'Très bon service, quelques améliorations possibles.'
  },
  {
    id: 2,
    surveyTitle: 'Évaluation Produit Beta',
    respondentEmail: 'testeur@example.com',
    rating: 5,
    status: 'Terminé',
    submittedAt: '2024-02-20',
    comments: 'Excellent produit, interface intuitive.'
  },
  {
    id: 3,
    surveyTitle: 'Satisfaction Client Q1 2024',
    respondentEmail: 'client2@example.com',
    rating: 3,
    status: 'En cours',
    submittedAt: '2024-01-22',
    comments: 'Correct mais peut mieux faire.'
  }
])

const availableSurveys = ref([
  { id: 1, title: 'Satisfaction Client Q1 2024' },
  { id: 2, title: 'Évaluation Produit Beta' },
  { id: 3, title: 'Enquête Employés 2024' }
])

const tableColumns = [
  { key: 'surveyTitle', label: 'Enquête' },
  { key: 'respondentEmail', label: 'Répondant' },
  { key: 'rating', label: 'Note' },
  { key: 'status', label: 'Statut' },
  { key: 'submittedAt', label: 'Date soumission' },
  { key: 'comments', label: 'Commentaires' }
]

const showModal = ref(false)
const isEditing = ref(false)
const editingId = ref<number | null>(null)

const responseForm = reactive({
  surveyId: '',
  respondentEmail: '',
  rating: '',
  status: 'En cours',
  comments: ''
})

const addResponse = () => {
  resetForm()
  isEditing.value = false
  showModal.value = true
}

const editResponse = (response: Response) => {
  const survey = availableSurveys.value.find(s => s.title === response.surveyTitle)
  responseForm.surveyId = survey ? survey.id.toString() : ''
  responseForm.respondentEmail = response.respondentEmail
  responseForm.rating = response.rating.toString()
  responseForm.status = response.status
  responseForm.comments = response.comments
  editingId.value = response.id
  isEditing.value = true
  showModal.value = true
}

const deleteResponse = (response: Response) => {
  if (confirm(`Êtes-vous sûr de vouloir supprimer cette réponse ?`)) {
    responses.value = responses.value.filter(r => r.id !== response.id)
  }
}

const saveResponse = () => {
  const selectedSurvey = availableSurveys.value.find(s => s.id.toString() === responseForm.surveyId)
  
  if (isEditing.value && editingId.value) {
    const index = responses.value.findIndex(r => r.id === editingId.value)
    if (index !== -1) {
      responses.value[index] = {
        ...responses.value[index],
        surveyTitle: selectedSurvey?.title || '',
        respondentEmail: responseForm.respondentEmail,
        rating: parseInt(responseForm.rating),
        status: responseForm.status,
        comments: responseForm.comments
      }
    }
  } else {
    const newResponse: Response = {
      id: Date.now(),
      surveyTitle: selectedSurvey?.title || '',
      respondentEmail: responseForm.respondentEmail,
      rating: parseInt(responseForm.rating),
      status: responseForm.status,
      submittedAt: new Date().toISOString().split('T')[0],
      comments: responseForm.comments
    }
    responses.value.push(newResponse)
  }
  closeModal()
}

const closeModal = () => {
  showModal.value = false
  resetForm()
}

const resetForm = () => {
  responseForm.surveyId = ''
  responseForm.respondentEmail = ''
  responseForm.rating = ''
  responseForm.status = 'En cours'
  responseForm.comments = ''
  editingId.value = null
}
</script>

<style scoped>
.response-page {
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
  min-height: 100px;
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
  .response-page {
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