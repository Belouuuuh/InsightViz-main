<template>
  <div class="persons">
    <div class="page-header">
      <h2>Gestion des Personnes</h2>
      <button @click="showAddForm = true" class="primary-btn">
        <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        Ajouter une personne
      </button>
    </div>

    <!-- Indicateur de chargement -->
    <div v-if="loading" class="loading-indicator">
      <div class="spinner"></div>
      <p>Chargement des données...</p>
    </div>

    <!-- Formulaire d'ajout/modification -->
    <div v-if="showAddForm" class="form-modal">
      <div class="form-container">
        <div class="form-header">
          <h3>{{ editingPerson ? 'Modifier la personne' : 'Nouvelle Personne' }}</h3>
          <button @click="closeForm" class="close-btn">&times;</button>
        </div>
        
        <form @submit.prevent="savePerson" class="person-form">
          <div class="form-grid">
            <div class="form-group">
              <label for="nom">Nom *</label>
              <input 
                id="nom" 
                v-model="personForm.nom" 
                type="text" 
                required 
                class="form-input"
                placeholder="Nom de famille"
              />
            </div>
            
            <div class="form-group">
              <label for="prenom">Prénom *</label>
              <input 
                id="prenom" 
                v-model="personForm.prenom" 
                type="text" 
                required 
                class="form-input"
                placeholder="Prénom"
              />
            </div>
            
            <div class="form-group">
              <label for="email">Email *</label>
              <input 
                id="email" 
                v-model="personForm.email" 
                type="email" 
                required 
                class="form-input"
                placeholder="exemple@email.com"
              />
            </div>
            
            <div class="form-group">
              <label for="telephone">Téléphone</label>
              <input 
                id="telephone" 
                v-model="personForm.telephone" 
                type="tel" 
                class="form-input"
                placeholder="+33 1 23 45 67 89"
              />
            </div>
            
            <div class="form-group">
              <label for="profession">Profession</label>
              <input 
                id="profession" 
                v-model="personForm.profession" 
                type="text" 
                class="form-input"
                placeholder="Titre du poste"
              />
            </div>
            
            <div class="form-group">
              <label for="entreprise">Entreprise</label>
              <input 
                id="entreprise" 
                v-model="personForm.entreprise" 
                type="text" 
                class="form-input"
                placeholder="Nom de l'entreprise"
              />
            </div>
            
            <div class="form-group">
              <label for="ville">Ville</label>
              <input 
                id="ville" 
                v-model="personForm.ville" 
                type="text" 
                class="form-input"
                placeholder="Ville de résidence"
              />
            </div>
            
            <div class="form-group">
              <label for="age">Âge</label>
              <input 
                id="age" 
                v-model="personForm.age" 
                type="number" 
                min="1" 
                max="120"
                class="form-input"
                placeholder="Âge"
              />
            </div>
            
            <div class="form-group">
              <label for="genre">Genre</label>
              <select id="genre" v-model="personForm.genre" class="form-select">
                <option value="">Sélectionner</option>
                <option value="Homme">Homme</option>
                <option value="Femme">Femme</option>
                <option value="Autre">Autre</option>
                <option value="Non spécifié">Préfère ne pas dire</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="segment">Segment client</label>
              <select id="segment" v-model="personForm.segment" class="form-select">
                <option value="">Sélectionner un segment</option>
                <option value="Prospect">Prospect</option>
                <option value="Client">Client actif</option>
                <option value="Client Premium">Client Premium</option>
                <option value="Ex-client">Ex-client</option>
                <option value="Partenaire">Partenaire</option>
              </select>
            </div>
            
            <div class="form-group form-group-full">
              <label for="notes">Notes</label>
              <textarea 
                id="notes" 
                v-model="personForm.notes" 
                class="form-textarea"
                rows="3"
                placeholder="Notes ou commentaires..."
              ></textarea>
            </div>
          </div>
          
          <div class="form-actions">
            <button type="button" @click="closeForm" class="secondary-btn">Annuler</button>
            <button type="submit" class="primary-btn" :disabled="saving">
              {{ saving ? 'Enregistrement...' : (editingPerson ? 'Modifier' : 'Ajouter') }}
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
          placeholder="Rechercher des personnes..."
          class="search-input"
        />
      </div>
      
      <div class="filters">
        <select v-model="segmentFilter" class="filter-select">
          <option value="">Tous les segments</option>
          <option value="Prospect">Prospect</option>
          <option value="Client">Client actif</option>
          <option value="Client Premium">Client Premium</option>
          <option value="Ex-client">Ex-client</option>
          <option value="Partenaire">Partenaire</option>
        </select>
        
        <select v-model="genreFilter" class="filter-select">
          <option value="">Tous les genres</option>
          <option value="Homme">Homme</option>
          <option value="Femme">Femme</option>
          <option value="Autre">Autre</option>
          <option value="Non spécifié">Non spécifié</option>
        </select>
      </div>
    </div>

    <!-- Tableau des personnes - Vue desktop -->
    <div class="table-container desktop-view" v-if="!loading">
      <table class="persons-table">
        <thead>
          <tr>
            <th>Nom complet</th>
            <th>Contact</th>
            <th>Profession</th>
            <th>Localisation</th>
            <th>Âge/Genre</th>
            <th>Segment</th>
            <th>Date d'ajout</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="person in filteredPersons" :key="person.id" class="table-row">
            <td>
              <div class="person-info">
                <div class="person-avatar">{{ getInitials(person.prenom) }}</div>
                <div>
                  <div class="person-name">{{ person.prenom }} {{ person.nom }}</div>
                  <div class="person-title">{{ person.entreprise || 'N/A' }}</div>
                </div>
              </div>
            </td>
            <td>
              <div class="contact-info">
                <div>{{ person.email }}</div>
                <div v-if="person.telephone" class="phone">{{ person.telephone }}</div>
              </div>
            </td>
            <td>{{ person.profession || 'N/A' }}</td>
            <td>{{ person.ville || 'N/A' }}</td>
            <td>
              <div class="demographics">
                <div v-if="person.age">{{ person.age }} ans</div>
                <div v-if="person.genre">{{ person.genre }}</div>
              </div>
            </td>
            <td>
              <span v-if="person.segment" class="segment-badge" :class="getSegmentClass(person.segment)">
                {{ person.segment }}
              </span>
              <span v-else class="no-segment">N/A</span>
            </td>
            <td>{{ person.dateAjout }}</td>
            <td>
              <div class="action-buttons">
                <button @click="editPerson(person)" class="action-btn edit" title="Modifier">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                </button>
                <button @click="deletePerson(person.id)" class="action-btn delete" title="Supprimer">
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

    <!-- Vue mobile - Cartes verticales -->
    <div class="mobile-view" v-if="!loading">
      <div v-for="person in filteredPersons" :key="person.id" class="person-card">
        <div class="card-header">
          <div class="person-info">
            <div class="person-avatar">{{ getInitials(person.prenom) }}</div>
            <div>
              <div class="person-name">{{ person.prenom }} {{ person.nom }}</div>
              <div class="person-title">{{ person.entreprise || 'N/A' }}</div>
            </div>
          </div>
          <div class="action-buttons">
            <button @click="editPerson(person)" class="action-btn edit" title="Modifier">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
            </button>
            <button @click="deletePerson(person.id)" class="action-btn delete" title="Supprimer">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <div class="card-content">
          <div class="card-row">
            <span class="card-label">Email:</span>
            <span class="card-value">{{ person.email }}</span>
          </div>
          
          <div v-if="person.telephone" class="card-row">
            <span class="card-label">Téléphone:</span>
            <span class="card-value">{{ person.telephone }}</span>
          </div>
          
          <div class="card-row">
            <span class="card-label">Profession:</span>
            <span class="card-value">{{ person.profession || 'N/A' }}</span>
          </div>
          
          <div class="card-row">
            <span class="card-label">Ville:</span>
            <span class="card-value">{{ person.ville || 'N/A' }}</span>
          </div>
          
          <div class="card-row">
            <span class="card-label">Âge/Genre:</span>
            <span class="card-value">
              <span v-if="person.age">{{ person.age }} ans</span>
              <span v-if="person.age && person.genre"> - </span>
              <span v-if="person.genre">{{ person.genre }}</span>
              <span v-if="!person.age && !person.genre">N/A</span>
            </span>
          </div>
          
          <div class="card-row">
            <span class="card-label">Segment:</span>
            <span class="card-value">
              <span v-if="person.segment" class="segment-badge" :class="getSegmentClass(person.segment)">
                {{ person.segment }}
              </span>
              <span v-else class="no-segment">N/A</span>
            </span>
          </div>
          
          <div class="card-row">
            <span class="card-label">Date d'ajout:</span>
            <span class="card-value">{{ person.dateAjout }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Message si aucune personne -->
    <div v-if="!loading && filteredPersons.length === 0" class="empty-state">
      <svg class="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
      </svg>
      <h3>Aucune personne trouvée</h3>
      <p>Aucune personne ne correspond à vos critères de recherche.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Person {
  id: number
  nom: string
  prenom: string
  email: string
  telephone: string
  profession: string
  entreprise: string
  ville: string
  age: number
  genre: string
  segment: string
  notes: string
  dateAjout: string
}

const showAddForm = ref(false)
const editingPerson = ref<Person | null>(null)
const searchQuery = ref('')
const segmentFilter = ref('')
const genreFilter = ref('')
const loading = ref(false)
const saving = ref(false)

const personForm = ref({
  nom: '',
  prenom: '',
  email: '',
  telephone: '',
  profession: '',
  entreprise: '',
  ville: '',
  age: 0,
  genre: '',
  segment: '',
  notes: ''
})

const persons = ref<Person[]>([])

// Simulation d'une API
const apiService = {
  async fetchPersons(): Promise<Person[]> {
    // Simulation d'un délai réseau
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return [
      {
        id: 1,
        nom: 'Durand',
        prenom: 'Claire',
        email: 'claire.durand@exemple.fr',
        telephone: '+33 1 23 45 67 89',
        profession: 'Directrice Marketing',
        entreprise: 'TechCorp',
        ville: 'Paris',
        age: 34,
        genre: 'Femme',
        segment: 'Client Premium',
        notes: 'Cliente très engagée, participe régulièrement aux enquêtes',
        dateAjout: '15/03/2024'
      },
      {
        id: 2,
        nom: 'Moreau',
        prenom: 'Jean',
        email: 'jean.moreau@exemple.fr',
        telephone: '+33 1 23 45 67 90',
        profession: 'Développeur Senior',
        entreprise: 'WebSolutions',
        ville: 'Lyon',
        age: 29,
        genre: 'Homme',
        segment: 'Client',
        notes: '',
        dateAjout: '20/03/2024'
      },
      {
        id: 3,
        nom: 'Petit',
        prenom: 'Sarah',
        email: 'sarah.petit@exemple.fr',
        telephone: '+33 1 23 45 67 91',
        profession: 'Chef de projet',
        entreprise: 'InnovateCorp',
        ville: 'Marseille',
        age: 31,
        genre: 'Femme',
        segment: 'Prospect',
        notes: 'Contact récent, intéressée par nos services',
        dateAjout: '25/03/2024'
      },
      {
        id: 4,
        nom: 'Robert',
        prenom: 'Michel',
        email: 'michel.robert@exemple.fr',
        telephone: '+33 1 23 45 67 92',
        profession: 'Consultant',
        entreprise: 'Freelance',
        ville: 'Toulouse',
        age: 45,
        genre: 'Homme',
        segment: 'Partenaire',
        notes: 'Partenaire de longue date, recommande nos services',
        dateAjout: '10/03/2024'
      },
      {
        id: 5,
        nom: 'Garcia',
        prenom: 'Maria',
        email: 'maria.garcia@exemple.fr',
        telephone: '',
        profession: 'UX Designer',
        entreprise: 'DesignStudio',
        ville: 'Nice',
        age: 27,
        genre: 'Femme',
        segment: 'Ex-client',
        notes: 'Ex-cliente, a exprimé des préoccupations sur le service',
        dateAjout: '05/03/2024'
      }
    ]
  },

  async createPerson(person: Omit<Person, 'id' | 'dateAjout'>): Promise<Person> {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return {
      ...person,
      id: Date.now(),
      dateAjout: new Date().toLocaleDateString('fr-FR')
    }
  },

  async updatePerson(id: number, person: Partial<Person>): Promise<Person> {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const existingPerson = persons.value.find(p => p.id === id)
    if (!existingPerson) {
      throw new Error('Personne non trouvée')
    }
    
    return { ...existingPerson, ...person }
  },

  async deletePerson(id: number): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300))
  }
}

const loadPersons = async () => {
  loading.value = true
  try {
    persons.value = await apiService.fetchPersons()
  } catch (error) {
    console.error('Erreur lors du chargement des personnes:', error)
  } finally {
    loading.value = false
  }
}

const filteredPersons = computed(() => {
  return persons.value.filter(person => {
    const matchesSearch = !searchQuery.value || 
      person.nom.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      person.prenom.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      person.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      person.entreprise.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      person.profession.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesSegment = !segmentFilter.value || person.segment === segmentFilter.value
    const matchesGenre = !genreFilter.value || person.genre === genreFilter.value
    
    return matchesSearch && matchesSegment && matchesGenre
  })
})

const getInitials = (prenom: string) => {
  return prenom ? prenom.charAt(0).toUpperCase() : '?'
}

const getSegmentClass = (segment: string) => {
  const classes: Record<string, string> = {
    'Prospect': 'prospect',
    'Client': 'client',
    'Client Premium': 'client-premium',
    'Ex-client': 'ex-client',
    'Partenaire': 'partenaire'
  }
  return classes[segment] || 'default'
}

const closeForm = () => {
  showAddForm.value = false
  editingPerson.value = null
  personForm.value = {
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    profession: '',
    entreprise: '',
    ville: '',
    age: 0,
    genre: '',
    segment: '',
    notes: ''
  }
}

const editPerson = (person: Person) => {
  editingPerson.value = person
  personForm.value = {
    nom: person.nom,
    prenom: person.prenom,
    email: person.email,
    telephone: person.telephone,
    profession: person.profession,
    entreprise: person.entreprise,
    ville: person.ville,
    age: person.age,
    genre: person.genre,
    segment: person.segment,
    notes: person.notes
  }
  showAddForm.value = true
}

const savePerson = async () => {
  saving.value = true
  
  try {
    if (editingPerson.value) {
      // Modifier la personne existante
      const updatedPerson = await apiService.updatePerson(editingPerson.value.id, personForm.value)
      const index = persons.value.findIndex(p => p.id === editingPerson.value!.id)
      if (index !== -1) {
        persons.value[index] = updatedPerson
      }
    } else {
      // Ajouter une nouvelle personne
      const newPerson = await apiService.createPerson(personForm.value)
      persons.value.push(newPerson)
    }
    
    closeForm()
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error)
    alert('Une erreur est survenue lors de la sauvegarde')
  } finally {
    saving.value = false
  }
}

const deletePerson = async (personId: number) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette personne ?')) {
    try {
      await apiService.deletePerson(personId)
      persons.value = persons.value.filter(p => p.id !== personId)
    } catch (error) {
      console.error('Erreur lors de la suppression:', error)
      alert('Une erreur est survenue lors de la suppression')
    }
  }
}

onMounted(() => {
  loadPersons()
})
</script>

<style scoped>
.persons {
  max-width: 1200px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
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
}

.primary-btn:hover:not(:disabled) {
  background-color: #2563eb;
}

.primary-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-icon {
  width: 18px;
  height: 18px;
}

.loading-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  color: #6b7280;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e5e7eb;
  border-top: 4px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
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
}

.close-btn:hover {
  background-color: #f3f4f6;
}

.person-form {
  padding: 1.5rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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
  min-height: 80px;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
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
  min-width: 300px;
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
}

.filter-select {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  min-width: 150px;
}

.table-container {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.persons-table {
  width: 100%;
  border-collapse: collapse;
}

.persons-table th {
  background-color: #f9fafb;
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #374151;
  border-bottom: 1px solid #e5e7eb;
}

.table-row {
  transition: background-color 0.2s;
}

.table-row:hover {
  background-color: #f9fafb;
}

.persons-table td {
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  vertical-align: middle;
}

.person-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.person-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1rem;
}

.person-name {
  font-weight: 500;
  color: #1f2937;
}

.person-title {
  font-size: 0.875rem;
  color: #6b7280;
}

.contact-info {
  font-size: 0.875rem;
}

.contact-info .phone {
  color: #6b7280;
  margin-top: 0.25rem;
}

.demographics {
  font-size: 0.875rem;
  color: #6b7280;
}

.segment-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
}

.segment-badge.prospect {
  background-color: #e0e7ff;
  color: #4338ca;
}

.segment-badge.client {
  background-color: #d1fae5;
  color: #059669;
}

.segment-badge.client-premium {
  background-color: #fef3c7;
  color: #d97706;
}

.segment-badge.ex-client {
  background-color: #fee2e2;
  color: #dc2626;
}

.segment-badge.partenaire {
  background-color: #ede9fe;
  color: #8b5cf6;
}

.no-segment {
  color: #6b7280;
  font-style: italic;
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

/* Vue mobile */
.mobile-view {
  display: none;
}

.person-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  overflow: hidden;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  background-color: #f9fafb;
}

.card-content {
  padding: 1rem;
}

.card-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
  gap: 1rem;
}

.card-row:last-child {
  margin-bottom: 0;
}

.card-label {
  font-weight: 500;
  color: #374151;
  min-width: 100px;
  flex-shrink: 0;
}

.card-value {
  color: #6b7280;
  text-align: right;
  flex: 1;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: #6b7280;
}

.empty-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 1rem;
  color: #d1d5db;
}

.empty-state h3 {
  margin: 0 0 0.5rem;
  color: #374151;
}

.empty-state p {
  margin: 0;
}

/* Media queries pour la responsivité */
@media (max-width: 1024px) {
  .page-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .search-filters {
    flex-direction: column;
  }
  
  .search-bar {
    min-width: auto;
  }
  
  .filters {
    flex-direction: column;
  }
  
  .filter-select {
    min-width: auto;
  }
}

@media (max-width: 768px) {
  .desktop-view {
    display: none !important;
  }
  
  .mobile-view {
    display: block !important;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .card-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
  
  .card-label {
    min-width: auto;
  }
  
  .card-value {
    text-align: left;
  }
}

@media (max-width: 480px) {
  .persons {
    padding: 0 1rem;
  }
  
  .page-header h2 {
    font-size: 1.5rem;
  }
  
  .primary-btn {
    width: 100%;
    justify-content: center;
  }
  
  .form-modal {
    padding: 0.5rem;
  }
  
  .form-container {
    max-height: 95vh;
  }
  
  .person-avatar {
    width: 32px;
    height: 32px;
    font-size: 0.875rem;
  }
}
</style>