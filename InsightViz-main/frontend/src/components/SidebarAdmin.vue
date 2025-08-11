<template>
  <div class="sidebar">
    <div class="logo-container">
      <h1 class="logo">InsightViz</h1>
    </div>
    
    <nav class="nav-menu">
      <router-link
        v-for="item in menuItems"
        :key="item.name"
        :to="item.path"
        class="nav-item"
        :class="{ 'active': $route.path === item.path }"
      >
        <component :is="item.icon" class="nav-icon" />
        <span class="nav-text">{{ item.name }}</span>
      </router-link>
    </nav>

    <div class="user-section">
      <div class="user-profile">
        <div class="user-avatar">
          <UserIcon class="avatar-icon" />
        </div>
        <div class="user-info">
          <p class="user-name">{{ currentUser.name }}</p>
          <p class="user-role">{{ currentUser.role }}</p>
        </div>
      </div>
      
      <button @click="showMembers = !showMembers" class="members-btn">
        <UsersIcon class="btn-icon" />
        Voir membres
      </button>
    </div>

    <!-- Modal des membres -->
    <div v-if="showMembers" class="modal-overlay" @click="showMembers = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Membres de l'équipe</h3>
          <button @click="showMembers = false" class="close-btn">
            <XMarkIcon class="close-icon" />
          </button>
        </div>
        <div class="members-list">
          <div v-for="member in teamMembers" :key="member.id" class="member-item">
            <div class="member-avatar">
              <UserIcon class="avatar-icon" />
            </div>
            <div class="member-info">
              <p class="member-name">{{ member.name }}</p>
              <p class="member-role">{{ member.role }}</p>
              <p class="member-email">{{ member.email }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { UserIcon, UsersIcon, XMarkIcon, HomeIcon, DocumentTextIcon, ChatBubbleLeftRightIcon, SpeakerWaveIcon, UserGroupIcon } from '@heroicons/vue/24/outline'

const showMembers = ref(false)

const currentUser = {
  name: 'Marie Dubois',
  role: 'Administrateur',
  email: 'marie.dubois@insightviz.com'
}

const teamMembers = [
  { id: 1, name: 'Marie Dubois', role: 'Administrateur', email: 'marie.dubois@insightviz.com' },
  { id: 2, name: 'Jean Martin', role: 'Analyste', email: 'jean.martin@insightviz.com' },
  { id: 3, name: 'Sophie Laurent', role: 'Gestionnaire', email: 'sophie.laurent@insightviz.com' },
  { id: 4, name: 'Pierre Durand', role: 'Consultant', email: 'pierre.durand@insightviz.com' }
]

const menuItems = [
  { name: 'Utilisateur', path: '/user', icon: UserIcon },
  { name: 'Enquête', path: '/survey', icon: DocumentTextIcon },
  { name: 'Réponse', path: '/response', icon: ChatBubbleLeftRightIcon },
  { name: 'Campagne', path: '/campaign', icon: SpeakerWaveIcon },
  { name: 'Personne', path: '/person', icon: UserGroupIcon }
]
</script>

<style scoped>
.sidebar {
  width: 280px;
  height: 100vh;
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
  color: white;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.1);
}

.logo-container {
  padding: 2rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo {
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(45deg, #ffffff, #e0e7ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-menu {
  flex: 1;
  padding: 2rem 0;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 0.875rem 1.5rem;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border-left-color: #fbbf24;
}

.nav-item.active {
  background: rgba(255, 255, 255, 0.15);
  color: white;
  border-left-color: #10b981;
}

.nav-icon {
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.75rem;
}

.nav-text {
  font-weight: 500;
}

.user-section {
  padding: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.user-profile {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  rounded: 0.5rem;
  border-radius: 0.5rem;
}

.user-avatar {
  width: 2.5rem;
  height: 2.5rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.75rem;
}

.avatar-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.user-info {
  flex: 1;
}

.user-name {
  font-weight: 600;
  margin: 0;
  font-size: 0.875rem;
}

.user-role {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

.members-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.members-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.btn-icon {
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  color: #1f2937;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: background 0.2s;
}

.close-btn:hover {
  background: #f3f4f6;
}

.close-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.members-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.member-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 0.5rem;
}

.member-avatar {
  width: 2.5rem;
  height: 2.5rem;
  background: #e5e7eb;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
}

.member-info {
  flex: 1;
}

.member-name {
  font-weight: 600;
  margin: 0 0 0.25rem 0;
}

.member-role {
  color: #6b7280;
  margin: 0 0 0.25rem 0;
  font-size: 0.875rem;
}

.member-email {
  color: #9ca3af;
  margin: 0;
  font-size: 0.75rem;
}
</style>



<template>
  <div class="person-page">
    <div class="page-header">
      <h1 class="page-title">Gestion des Personnes</h1>
      <p class="page-subtitle">Gérez les contacts et participants à vos enquêtes</p>
    </div>
    
    <!-- Barre de recherche -->
    <div class="search-section">
      <div class="search-container">
        <MagnifyingGlassIcon class="search-icon" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Rechercher par nom, email ou entreprise..."
          class="search-input"
        />
      </div>
      <div class="filters">
        <select v-model="statusFilter" class="filter-select">
          <option value="">Tous les statuts</option>
          <option value="Actif">Actif</option>
          <option value="Inactif">Inactif</option>
        </select>
        <select v-model="departmentFilter" class="filter-select">
          <option value="">Tous les départements</option>
          <option value="Marketing">Marketing</option>
          <option value="Ventes">Ventes</option>
          <option value="Support">Support</option>
          <option value="RH">RH</option>
        </select>
      </div>
    </div>
    
    <DataTable
      title="Liste des Personnes"
      add-button-text="Personne"
      :columns="tableColumns"
      :data="filteredPersons"
      @add="addPerson"
      @edit="editPerson"
      @delete="deletePerson"
    />
    
    <!-- Modal d'ajout/édition -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">{{ isEditing ? 'Modifier' : 'Nouvelle' }} Personne</h3>
          <button @click="closeModal" class="modal-close">
            <XMarkIcon class="close-icon" />
          </button>
        </div>
        
        <form @submit.prevent="savePerson" class="modal-body">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Prénom</label>
              <input 
                v-model="personForm.firstName" 
                type="text" 
                class="form-input"
                placeholder="Jean"
                required
              />
            </div>
            
            <div class="form-group">
              <label class="form-label">Nom</label>
              <input 
                v-model="personForm.lastName" 
                type="text" 
                class="form-input"
                placeholder="Dupont"
                required
              />
            </div>
          </div>
          
          <div class="form-group">
            <label class="form-label">Email</label>
            <input 
              v-model="personForm.email" 
              type="email" 
              class="form-input"
              placeholder="jean.dupont@example.com"
              required
            />
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Téléphone</label>
              <input 
                v-model="personForm.phone" 
                type="tel" 
                class="form-input"
                placeholder="+33 6 12 34 56 78"
              />
            </div>
            
            <div class="form-group">
              <label class="form-label">Poste</label>
              <input 
                v-model="personForm.position" 
                type="text" 
                class="form-input"
                placeholder="Responsable Marketing"
              />
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Entreprise</label>
              <input 
                v-model="personForm.company" 
                type="text" 
                class="form-input"
                placeholder="InsightViz Inc."
              />
            </div>
            
            <div class="form-group">
              <label class="form-label">Département</label>
              <select v-model="personForm.department" class="form-input">
                <option value="">Sélectionner</option>
                <option value="Marketing">Marketing</option>
                <option value="Ventes">Ventes</option>
                <option value="Support">Support</option>
                <option value="RH">RH</option>
                <option value="Développement">Développement</option>
              </select>
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Ville</label>
              <input 
                v-model="personForm.city" 
                type="text" 
                class="form-input"
                placeholder="Paris"
              />
            </div>
            
            <div class="form-group">
              <label class="form-label">Statut</label>
              <select v-model="personForm.status" class="form-input">
                <option value="Actif">Actif</option>
                <option value="Inactif">Inactif</option>
              </select>
            </div>
          </div>
          
          <div class="form-group">
            <label class="form-label">Notes</label>
            <textarea 
              v-model="personForm.notes" 
              class="form-textarea"
              placeholder="Notes ou commentaires sur cette personne..."
              rows="3"
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
import { ref, reactive, computed } from 'vue'
import { XMarkIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import DataTable from '../components/DataTable.vue'

interface Person {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  position: string
  company: string
  department: string
  city: string
  status: string
  notes: string
}

const persons = ref<Person[]>([
  {
    id: 1,
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@example.com',
    phone: '+33 6 12 34 56 78',
    position: 'Responsable Marketing',
    company: 'TechCorp',
    department: 'Marketing',
    city: 'Paris',
    status: 'Actif',
    notes: 'Client fidèle depuis 2 ans'
  },
  {
    id: 2,
    firstName: 'Marie',
    lastName: 'Martin',
    email: 'marie.martin@example.com',
    phone: '+33 6 98 76 54 32',
    position: 'Chef de projet',
    company: 'InnovateLab',
    department: 'Ventes',
    city: 'Lyon',
    status: 'Actif',
    notes: 'Très active dans les enquêtes'
  },
  {
    id: 3,
    firstName: 'Pierre',
    lastName: 'Durand',
    email: 'pierre.durand@example.com',
    phone: '+33 6 11 22 33 44',
    position: 'Analyste',
    company: 'DataViz Solutions',
    department: 'Support',
    city: 'Marseille',
    status: 'Inactif',
    notes: 'N\'a pas répondu aux dernières enquêtes'
  },
  {
    id: 4,
    firstName: 'Sophie',
    lastName: 'Bernard',
    email: 'sophie.bernard@example.com',
    phone: '+33 6 55 66 77 88',
    position: 'RH Manager',
    company: 'HumanFirst',
    department: 'RH',
    city: 'Toulouse',
    status: 'Actif',
    notes: 'Participe régulièrement aux enquêtes internes'
  }
])

const searchQuery = ref('')
const statusFilter = ref('')
const departmentFilter = ref('')

const tableColumns = [
  { key: 'firstName', label: 'Prénom' },
  { key: 'lastName', label: 'Nom' },
  { key: 'email', label: 'Email' },
  { key: 'position', label: 'Poste' },
  { key: 'company', label: 'Entreprise' },
  { key: 'department', label: 'Département' },
  { key: 'city', label: 'Ville' },
  { key: 'status', label: 'Statut' }
]

const filteredPersons = computed(() => {
  let filtered = persons.value

  // Filtrage par recherche
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(person => 
      person.firstName.toLowerCase().includes(query) ||
      person.lastName.toLowerCase().includes(query) ||
      person.email.toLowerCase().includes(query) ||
      person.company.toLowerCase().includes(query)
    )
  }

  // Filtrage par statut
  if (statusFilter.value) {
    filtered = filtered.filter(person => person.status === statusFilter.value)
  }

  // Filtrage par département
  if (departmentFilter.value) {
    filtered = filtered.filter(person => person.department === departmentFilter.value)
  }

  return filtered
})

const showModal = ref(false)
const isEditing = ref(false)
const editingId = ref<number | null>(null)

const personForm = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  position: '',
  company: '',
  department: '',
  city: '',
  status: 'Actif',
  notes: ''
})

const addPerson = () => {
  resetForm()
  isEditing.value = false
  showModal.value = true
}

const editPerson = (person: Person) => {
  personForm.firstName = person.firstName
  personForm.lastName = person.lastName
  personForm.email = person.email
  personForm.phone = person.phone
  personForm.position = person.position
  personForm.company = person.company
  personForm.department = person.department
  personForm.city = person.city
  personForm.status = person.status
  personForm.notes = person.notes
  editingId.value = person.id
  isEditing.value = true
  showModal.value = true
}

const deletePerson = (person: Person) => {
  if (confirm(`Êtes-vous sûr de vouloir supprimer ${person.firstName} ${person.lastName} ?`)) {
    persons.value = persons.value.filter(p => p.id !== person.id)
  }
}

const savePerson = () => {
  if (isEditing.value && editingId.value) {
    const index = persons.value.findIndex(p => p.id === editingId.value)
    if (index !== -1) {
      persons.value[index] = {
        ...persons.value[index],
        firstName: personForm.firstName,
        lastName: personForm.lastName,
        email: personForm.email,
        phone: personForm.phone,
        position: personForm.position,
        company: personForm.company,
        department: personForm.department,
        city: personForm.city,
        status: personForm.status,
        notes: personForm.notes
      }
    }
  } else {
    const newPerson: Person = {
      id: Date.now(),
      firstName: personForm.firstName,
      lastName: personForm.lastName,
      email: personForm.email,
      phone: personForm.phone,
      position: personForm.position,
      company: personForm.company,
      department: personForm.department,
      city: personForm.city,
      status: personForm.status,
      notes: personForm.notes
    }
    persons.value.push(newPerson)
  }
  closeModal()
}

const closeModal = () => {
  showModal.value = false
  resetForm()
}

const resetForm = () => {
  personForm.firstName = ''
  personForm.lastName = ''
  personForm.email = ''
  personForm.phone = ''
  personForm.position = ''
  personForm.company = ''
  personForm.department = ''
  personForm.city = ''
  personForm.status = 'Actif'
  personForm.notes = ''
  editingId.value = null
}
</script>

<style scoped>
.person-page {
  padding: 2rem;
  margin-left: 55px;
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

.search-section {
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
  align-items: center;
}

.search-container {
  position: relative;
  flex: 1;
  max-width: 400px;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: #9ca3af;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.875rem;
  transition: border-color 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.filters {
  display: flex;
  gap: 1rem;
}

.filter-select {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.875rem;
  background-color: white;
  min-width: 150px;
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
  max-width: 800px;
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
  .person-page {
    padding: 1rem;
  }
  
  .search-section {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filters {
    flex-direction: column;
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