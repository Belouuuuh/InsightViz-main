<template>
  <div class="campaigns">
    <div class="page-header">
      <h2>Gestion des Campagnes</h2>
      <button @click="showCreateForm = true" class="primary-btn">
        <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        <span class="btn-text">Créer une campagne</span>
      </button>
    </div>

    <!-- Formulaire de création/modification -->
    <div v-if="showCreateForm" class="form-modal">
      <div class="form-container">
        <div class="form-header">
          <h3>{{ editingCampaign ? 'Modifier la campagne' : 'Nouvelle Campagne' }}</h3>
          <button @click="closeForm" class="close-btn">&times;</button>
        </div>
        
        <form @submit.prevent="saveCampaign" class="campaign-form">
          <div class="form-grid">
            <div class="form-group">
              <label for="nom">Nom de la campagne *</label>
              <input 
                id="nom" 
                v-model="campaignForm.nom" 
                type="text" 
                required 
                class="form-input"
                placeholder="Entrez le nom de la campagne"
              />
            </div>
            
            <div class="form-group">
              <label for="type">Type de campagne *</label>
              <select id="type" v-model="campaignForm.type" required class="form-select">
                <option value="">Sélectionner un type</option>
                <option value="Satisfaction">Satisfaction Client</option>
                <option value="Market Research">Étude de marché</option>
                <option value="Product Feedback">Feedback Produit</option>
                <option value="Employee Survey">Enquête Employés</option>
                <option value="Brand Awareness">Notoriété de marque</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="dateDebut">Date de début</label>
              <input 
                id="dateDebut" 
                v-model="campaignForm.dateDebut" 
                type="date" 
                class="form-input"
              />
            </div>
            
            <div class="form-group">
              <label for="dateFin">Date de fin</label>
              <input 
                id="dateFin" 
                v-model="campaignForm.dateFin" 
                type="date" 
                class="form-input"
              />
            </div>
            
            <div class="form-group form-group-full">
              <label for="description">Description</label>
              <textarea 
                id="description" 
                v-model="campaignForm.description" 
                class="form-textarea"
                rows="4"
                placeholder="Description détaillée de la campagne..."
              ></textarea>
            </div>
            
            <div class="form-group">
              <label for="budget">Budget (€)</label>
              <input 
                id="budget" 
                v-model="campaignForm.budget" 
                type="number" 
                min="0" 
                step="100"
                class="form-input"
                placeholder="0"
              />
            </div>
            
            <div class="form-group">
              <label for="cibleAudience">Cible d'audience</label>
              <input 
                id="cibleAudience" 
                v-model="campaignForm.cibleAudience" 
                type="text" 
                class="form-input"
                placeholder="Ex: Clients existants, 25-45 ans"
              />
            </div>
            
            <div class="form-group">
              <label for="responsable">Responsable</label>
              <select id="responsable" v-model="campaignForm.responsable" class="form-select">
                <option value="">Sélectionner un responsable</option>
                <option value="Marie Dubois">Marie Dubois</option>
                <option value="Pierre Martin">Pierre Martin</option>
                <option value="Sophie Laurent">Sophie Laurent</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="statut">Statut</label>
              <select id="statut" v-model="campaignForm.statut" class="form-select">
                <option value="Planifiée">Planifiée</option>
                <option value="En cours">En cours</option>
                <option value="Terminée">Terminée</option>
                <option value="Suspendue">Suspendue</option>
              </select>
            </div>
          </div>
          
          <div class="form-actions">
            <button type="button" @click="closeForm" class="secondary-btn">Annuler</button>
            <button type="submit" class="primary-btn">
              {{ editingCampaign ? 'Modifier' : 'Créer' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Barre de recherche et filtres -->
    <div class="search-filters">
      <div class="search-bar">
        <svg class="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Rechercher des campagnes..."
          class="search-input"
        />
      </div>
      
      <div class="filters">
        <select v-model="typeFilter" class="filter-select">
          <option value="">Tous les types</option>
          <option value="Satisfaction">Satisfaction Client</option>
          <option value="Market Research">Étude de marché</option>
          <option value="Product Feedback">Feedback Produit</option>
          <option value="Employee Survey">Enquête Employés</option>
          <option value="Brand Awareness">Notoriété de marque</option>
        </select>
        
        <select v-model="statusFilter" class="filter-select">
          <option value="">Tous les statuts</option>
          <option value="Planifiée">Planifiée</option>
          <option value="En cours">En cours</option>
          <option value="Terminée">Terminée</option>
          <option value="Suspendue">Suspendue</option>
        </select>
      </div>
    </div>

    <!-- Version desktop : Tableau des campagnes -->
    <div class="desktop-view">
      <div class="table-container">
        <table class="campaigns-table">
          <thead>
            <tr>
              <th>Nom de la campagne</th>
              <th>Type</th>
              <th>Période</th>
              <th>Responsable</th>
              <th>Budget</th>
              <th>Statut</th>
              <th>Enquêtes liées</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="campaign in filteredCampaigns" :key="campaign.id" class="table-row">
              <td>
                <div class="campaign-info">
                  <h4>{{ campaign.nom }}</h4>
                  <p v-if="campaign.description">{{ campaign.description }}</p>
                </div>
              </td>
              <td>
                <span class="type-badge" :class="getTypeBadgeClass(campaign.type)">
                  {{ campaign.type }}
                </span>
              </td>
              <td>
                <div class="period-info">
                  <div v-if="campaign.dateDebut">
                    <strong>Début:</strong> {{ formatDate(campaign.dateDebut) }}
                  </div>
                  <div v-if="campaign.dateFin">
                    <strong>Fin:</strong> {{ formatDate(campaign.dateFin) }}
                  </div>
                  <div v-if="!campaign.dateDebut && !campaign.dateFin" class="no-period">
                    Non définie
                  </div>
                </div>
              </td>
              <td>{{ campaign.responsable || 'Non assigné' }}</td>
              <td>
                <span v-if="campaign.budget" class="budget">{{ formatBudget(campaign.budget) }} €</span>
                <span v-else class="no-budget">N/A</span>
              </td>
              <td>
                <span class="status-badge" :class="campaign.statut.toLowerCase().replace(' ', '-')">
                  {{ campaign.statut }}
                </span>
              </td>
              <td>{{ campaign.enquetesLiees }}</td>
              <td>
                <div class="action-buttons">
                  <button @click="editCampaign(campaign)" class="action-btn edit" title="Modifier">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </button>
                  <button @click="deleteCampaign(campaign.id)" class="action-btn delete" title="Supprimer">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Version mobile : Cartes -->
    <div class="mobile-view">
      <div class="campaigns-cards">
        <div v-for="campaign in filteredCampaigns" :key="campaign.id" class="campaign-card">
          <div class="card-header">
            <div class="campaign-info">
              <h4>{{ campaign.nom }}</h4>
              <span class="type-badge" :class="getTypeBadgeClass(campaign.type)">
                {{ campaign.type }}
              </span>
            </div>
            <div class="card-actions">
              <button @click="editCampaign(campaign)" class="action-btn edit" title="Modifier">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
              </button>
              <button @click="deleteCampaign(campaign.id)" class="action-btn delete" title="Supprimer">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>
            </div>
          </div>
          
          <div class="card-content">
            <div v-if="campaign.description" class="campaign-description">
              {{ campaign.description }}
            </div>
            
            <div class="card-details">
              <div class="detail-item">
                <span class="detail-label">Période:</span>
                <div class="period-info">
                  <div v-if="campaign.dateDebut">
                    <strong>Début:</strong> {{ formatDate(campaign.dateDebut) }}
                  </div>
                  <div v-if="campaign.dateFin">
                    <strong>Fin:</strong> {{ formatDate(campaign.dateFin) }}
                  </div>
                  <div v-if="!campaign.dateDebut && !campaign.dateFin" class="no-period">
                    Non définie
                  </div>
                </div>
              </div>
              
              <div class="detail-item">
                <span class="detail-label">Responsable:</span>
                <span class="detail-value">{{ campaign.responsable || 'Non assigné' }}</span>
              </div>
              
              <div class="detail-item">
                <span class="detail-label">Budget:</span>
                <span v-if="campaign.budget" class="budget detail-value">{{ formatBudget(campaign.budget) }} €</span>
                <span v-else class="no-budget detail-value">N/A</span>
              </div>
              
              <div class="detail-item">
                <span class="detail-label">Statut:</span>
                <span class="status-badge" :class="campaign.statut.toLowerCase().replace(' ', '-')">
                  {{ campaign.statut }}
                </span>
              </div>
              
              <div class="detail-item">
                <span class="detail-label">Enquêtes liées:</span>
                <span class="detail-value">{{ campaign.enquetesLiees }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Campaign {
  id: number
  nom: string
  type: string
  description: string
  dateDebut: string
  dateFin: string
  budget: number
  cibleAudience: string
  responsable: string
  statut: string
  enquetesLiees: number
  dateCreation: string
}

const showCreateForm = ref(false)
const editingCampaign = ref<Campaign | null>(null)
const searchQuery = ref('')
const typeFilter = ref('')
const statusFilter = ref('')

const campaignForm = ref({
  nom: '',
  type: '',
  description: '',
  dateDebut: '',
  dateFin: '',
  budget: 0,
  cibleAudience: '',
  responsable: '',
  statut: 'Planifiée'
})

const campaigns = ref<Campaign[]>([
  {
    id: 1,
    nom: 'Satisfaction Client 2024',
    type: 'Satisfaction',
    description: 'Campagne annuelle pour mesurer la satisfaction des clients',
    dateDebut: '2024-03-01',
    dateFin: '2024-03-31',
    budget: 5000,
    cibleAudience: 'Clients existants',
    responsable: 'Marie Dubois',
    statut: 'En cours',
    enquetesLiees: 3,
    dateCreation: '15/02/2024'
  },
  {
    id: 2,
    nom: 'Étude de marché Q1',
    type: 'Market Research',
    description: 'Analyse du marché pour le premier trimestre',
    dateDebut: '2024-04-01',
    dateFin: '2024-04-30',
    budget: 8000,
    cibleAudience: 'Prospects potentiels',
    responsable: 'Pierre Martin',
    statut: 'Planifiée',
    enquetesLiees: 1,
    dateCreation: '20/02/2024'
  },
  {
    id: 3,
    nom: 'Feedback Nouveau Produit',
    type: 'Product Feedback',
    description: 'Collecte de retours sur le nouveau produit lancé',
    dateDebut: '2024-02-01',
    dateFin: '2024-02-28',
    budget: 3000,
    cibleAudience: 'Utilisateurs beta',
    responsable: 'Sophie Laurent',
    statut: 'Terminée',
    enquetesLiees: 2,
    dateCreation: '25/01/2024'
  },
  {
    id: 4,
    nom: 'Enquête Employés 2024',
    type: 'Employee Survey',
    description: 'Évaluation du climat social et de la satisfaction des employés',
    dateDebut: '2024-05-01',
    dateFin: '2024-05-15',
    budget: 2000,
    cibleAudience: 'Tous les employés',
    responsable: 'Marie Dubois',
    statut: 'Planifiée',
    enquetesLiees: 0,
    dateCreation: '10/03/2024'
  }
])

const filteredCampaigns = computed(() => {
  return campaigns.value.filter(campaign => {
    const matchesSearch = !searchQuery.value || 
      campaign.nom.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      campaign.responsable.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesType = !typeFilter.value || campaign.type === typeFilter.value
    const matchesStatus = !statusFilter.value || campaign.statut === statusFilter.value
    
    return matchesSearch && matchesType && matchesStatus
  })
})

const getTypeBadgeClass = (type: string) => {
  const classes: Record<string, string> = {
    'Satisfaction': 'satisfaction',
    'Market Research': 'market-research',
    'Product Feedback': 'product-feedback',
    'Employee Survey': 'employee-survey',
    'Brand Awareness': 'brand-awareness'
  }
  return classes[type] || 'default'
}

const formatDate = (dateString: string) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('fr-FR')
}

const formatBudget = (budget: number) => {
  return new Intl.NumberFormat('fr-FR').format(budget)
}

const closeForm = () => {
  showCreateForm.value = false
  editingCampaign.value = null
  campaignForm.value = {
    nom: '',
    type: '',
    description: '',
    dateDebut: '',
    dateFin: '',
    budget: 0,
    cibleAudience: '',
    responsable: '',
    statut: 'Planifiée'
  }
}

const editCampaign = (campaign: Campaign) => {
  editingCampaign.value = campaign
  campaignForm.value = {
    nom: campaign.nom,
    type: campaign.type,
    description: campaign.description,
    dateDebut: campaign.dateDebut,
    dateFin: campaign.dateFin,
    budget: campaign.budget,
    cibleAudience: campaign.cibleAudience,
    responsable: campaign.responsable,
    statut: campaign.statut
  }
  showCreateForm.value = true
}

const saveCampaign = () => {
  if (editingCampaign.value) {
    // Modifier la campagne existante
    const index = campaigns.value.findIndex(c => c.id === editingCampaign.value!.id)
    if (index !== -1) {
      campaigns.value[index] = {
        ...campaigns.value[index],
        ...campaignForm.value
      }
    }
  } else {
    // Ajouter une nouvelle campagne
    const newCampaign: Campaign = {
      id: Date.now(),
      ...campaignForm.value,
      enquetesLiees: 0,
      dateCreation: new Date().toLocaleDateString('fr-FR')
    }
    campaigns.value.push(newCampaign)
  }
  
  closeForm()
}

const deleteCampaign = (campaignId: number) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette campagne ?')) {
    campaigns.value = campaigns.value.filter(c => c.id !== campaignId)
  }
}
</script>

<style scoped>
.campaigns {
  max-width: 1200px;
  padding: 1rem;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.page-header h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.primary-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  white-space: nowrap;
}

.primary-btn:hover {
  background-color: #2563eb;
}

.btn-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.form-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding: 1rem;
}

.form-container {
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.form-header h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6b7280;
  padding: 0.25rem;
  border-radius: 4px;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background-color: #f3f4f6;
}

.campaign-form {
  padding: 1.5rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.form-group-full {
  grid-column: 1 / -1;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 500;
  color: #374151;
}

.form-input, .form-select, .form-textarea {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-input:focus, .form-select:focus, .form-textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
  flex-wrap: wrap;
}

.secondary-btn {
  padding: 0.75rem 1.5rem;
  background-color: #f3f4f6;
  color: #374151;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  white-space: nowrap;
}

.secondary-btn:hover {
  background-color: #e5e7eb;
}

.search-filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.search-bar {
  position: relative;
  flex: 1;
  min-width: 280px;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: #6b7280;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
}

.search-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.filters {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.filter-select {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  min-width: 150px;
}

/* Version Desktop */
.desktop-view {
  display: block;
}

.mobile-view {
  display: none;
}

.table-container {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  overflow-x: auto;
}

.campaigns-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 1000px;
}

.campaigns-table th {
  background-color: #f9fafb;
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #374151;
  border-bottom: 1px solid #e5e7eb;
  white-space: nowrap;
}

.table-row {
  transition: background-color 0.2s;
}

.table-row:hover {
  background-color: #f9fafb;
}

.campaigns-table td {
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  vertical-align: middle;
}

.campaign-info h4 {
  margin: 0 0 0.25rem 0;
  font-weight: 600;
  color: #1f2937;
}

.campaign-info p {
  margin: 0;
  font-size: 0.875rem;
  color: #6b7280;
}

/* Version Mobile - Cartes */
.campaigns-cards {
  display: grid;
  gap: 1rem;
}

.campaign-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  gap: 1rem;
}

.card-header .campaign-info {
  flex: 1;
}

.card-header .campaign-info h4 {
  margin: 0 0 0.5rem 0;
  font-weight: 600;
  color: #1f2937;
  font-size: 1.125rem;
}

.card-actions {
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
}

.campaign-description {
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.card-details {
  display: grid;
  gap: 0.75rem;
}

.detail-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.detail-label {
  font-weight: 500;
  color: #374151;
  min-width: 80px;
  flex-shrink: 0;
}

.detail-value {
  color: #6b7280;
}

/* Badges et statuts */
.type-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  display: inline-block;
}

.type-badge.satisfaction {
  background-color: #d1fae5;
  color: #059669;
}

.type-badge.market-research {
  background-color: #dbeafe;
  color: #3b82f6;
}

.type-badge.product-feedback {
  background-color: #fef3c7;
  color: #d97706;
}

.type-badge.employee-survey {
  background-color: #ede9fe;
  color: #8b5cf6;
}

.type-badge.brand-awareness {
  background-color: #fce7f3;
  color: #ec4899;
}

.type-badge.default {
  background-color: #f3f4f6;
  color: #374151;
}

.period-info {
  font-size: 0.875rem;
}

.period-info div {
  margin-bottom: 0.25rem;
}

.period-info strong {
  color: #374151;
}

.no-period {
  color: #6b7280;
  font-style: italic;
}

.budget {
  font-weight: 600;
  color: #059669;
}

.no-budget {
  color: #6b7280;
  font-style: italic;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  display: inline-block;
}

.status-badge.planifiée {
  background-color: #e0e7ff;
  color: #4338ca;
}

.status-badge.en-cours {
  background-color: #d1fae5;
  color: #059669;
}

.status-badge.terminée {
  background-color: #f3f4f6;
  color: #374151;
}

.status-badge.suspendue {
  background-color: #fef3c7;
  color: #d97706;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  padding: 0.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-btn svg {
  width: 16px;
  height: 16px;
}

.action-btn.edit {
  background-color: #dbeafe;
  color: #3b82f6;
}

.action-btn.edit:hover {
  background-color: #bfdbfe;
}

.action-btn.delete {
  background-color: #fee2e2;
  color: #dc2626;
}

.action-btn.delete:hover {
  background-color: #fecaca;
}

/* Media Queries pour la responsivité */
@media (max-width: 1024px) {
  .campaigns {
    padding: 0.5rem;
  }
  
  .page-header h2 {
    font-size: 1.75rem;
  }
  
  .search-bar {
    min-width: 240px;
  }
  
  .form-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}

@media (max-width: 768px) {
  .campaigns {
    padding: 0.5rem;
  }

  .page-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .page-header h2 {
    font-size: 1.5rem;
    text-align: center;
  }
  
  .primary-btn {
    justify-content: center;
  }
  
  .btn-text {
    display: none;
  }
  
  .search-filters {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .search-bar {
    min-width: auto;
  }
  
  .filters {
    justify-content: stretch;
  }
  
  .filter-select {
    flex: 1;
    min-width: auto;
  }
  
  .form-container {
    margin: 0.5rem;
    max-height: calc(100vh - 1rem);
  }
  
  .form-header {
    padding: 1rem;
  }
  
  .campaign-form {
    padding: 1rem;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .form-actions {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .form-actions button {
    width: 100%;
  }

  /* Basculer vers la vue mobile */
  .desktop-view {
    display: none;
  }
  
  .mobile-view {
    display: block;
  }
  
  .card-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .card-actions {
    align-self: flex-end;
    margin-top: 0.5rem;
  }
}

@media (max-width: 480px) {
  .campaigns {
    padding: 0.25rem;
  }
  
  .page-header h2 {
    font-size: 1.25rem;
  }
  
  .campaign-card {
    padding: 1rem;
  }
  
  .detail-item {
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .detail-label {
    min-width: auto;
    font-size: 0.875rem;
  }
  
  .form-modal {
    padding: 0;
  }
  
  .form-container {
    margin: 0;
    border-radius: 0;
    height: 100vh;
  }
}
</style>