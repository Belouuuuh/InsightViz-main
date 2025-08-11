<template>
  <div class="users">
    <div class="page-header">
      <h2>Gestion des Utilisateurs</h2>
      <button @click="showAddForm = true" class="primary-btn">
        <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        Ajouter un utilisateur
      </button>
    </div>

    <!-- Formulaire d'ajout/modification -->
    <div v-if="showAddForm" class="form-modal">
      <div class="form-container">
        <div class="form-header">
          <h3>{{ editingUser ? 'Modifier l\'utilisateur' : 'Nouvel Utilisateur' }}</h3>
          <button @click="closeForm" class="close-btn">&times;</button>
        </div>
        
        <form @submit.prevent="saveUser" class="user-form">
          <div class="form-grid">
            <div class="form-group">
              <label for="nom">Nom *</label>
              <input 
                id="nom" 
                v-model="userForm.nom" 
                type="text" 
                required 
                class="form-input"
                placeholder="Entrez le nom"
              />
            </div>
            
            <div class="form-group">
              <label for="prenom">Prénom *</label>
              <input 
                id="prenom" 
                v-model="userForm.prenom" 
                type="text" 
                required 
                class="form-input"
                placeholder="Entrez le prénom"
              />
            </div>
            
            <div class="form-group">
              <label for="email">Email *</label>
              <input 
                id="email" 
                v-model="userForm.email" 
                type="email" 
                required 
                class="form-input"
                placeholder="exemple@email.com"
              />
            </div>
            
            <div class="form-group">
              <label for="role">Rôle *</label>
              <select id="role" v-model="userForm.role" required class="form-select">
                <option value="">Sélectionner un rôle</option>
                <option value="Admin">Administrateur</option>
                <option value="Manager">Manager</option>
                <option value="User">Utilisateur</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="departement">Département</label>
              <input 
                id="departement" 
                v-model="userForm.departement" 
                type="text" 
                class="form-input"
                placeholder="Département"
              />
            </div>
            
            <div class="form-group">
              <label for="telephone">Téléphone</label>
              <input 
                id="telephone" 
                v-model="userForm.telephone" 
                type="tel" 
                class="form-input"
                placeholder="+33 1 23 45 67 89"
              />
            </div>
          </div>
          
          <div class="form-actions">
            <button type="button" @click="closeForm" class="secondary-btn">Annuler</button>
            <button type="submit" class="primary-btn">
              {{ editingUser ? 'Modifier' : 'Ajouter' }}
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
          placeholder="Rechercher des utilisateurs..."
          class="search-input"
        />
      </div>
      
      <div class="filters">
        <select v-model="roleFilter" class="filter-select">
          <option value="">Tous les rôles</option>
          <option value="Admin">Administrateur</option>
          <option value="Manager">Manager</option>
          <option value="User">Utilisateur</option>
        </select>
      </div>
    </div>

    <!-- Vue Desktop: Tableau des utilisateurs -->
    <div class="table-container desktop-view">
      <table class="users-table">
        <thead>
          <tr>
            <th>Nom complet</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Département</th>
            <th>Date d'ajout</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user.id" class="table-row">
            <td>
              <div class="user-info">
                <div class="user-avatar">{{ getUserInitial(user.prenom) }}</div>
                <div>
                  <div class="user-name">{{ user.prenom }} {{ user.nom }}</div>
                  <div class="user-title">{{ user.telephone || 'N/A' }}</div>
                </div>
              </div>
            </td>
            <td>{{ user.email }}</td>
            <td>
              <span class="role-badge" :class="user.role.toLowerCase()">
                {{ user.role }}
              </span>
            </td>
            <td>{{ user.departement || 'N/A' }}</td>
            <td>{{ user.dateAjout }}</td>
            <td>
              <span class="status-badge" :class="user.statut.toLowerCase()">
                {{ user.statut }}
              </span>
            </td>
            <td>
              <div class="action-buttons">
                <button 
                  @click="editUser(user)" 
                  class="action-btn edit" 
                  :class="{ disabled: !canEditUser(user) }"
                  :disabled="!canEditUser(user)"
                  title="Modifier"
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                </button>
                <button @click="deleteUser(user.id)" class="action-btn delete" title="Supprimer">
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

    <!-- Vue Mobile: Cartes verticales -->
    <div class="cards-container mobile-view">
      <div v-for="user in filteredUsers" :key="user.id" class="user-card">
        <div class="card-header">
          <div class="user-info">
            <div class="user-avatar">{{ getUserInitial(user.prenom) }}</div>
            <div>
              <div class="user-name">{{ user.prenom }} {{ user.nom }}</div>
              <div class="user-email">{{ user.email }}</div>
            </div>
          </div>
          <div class="action-buttons">
            <button 
              @click="editUser(user)" 
              class="action-btn edit" 
              :class="{ disabled: !canEditUser(user) }"
              :disabled="!canEditUser(user)"
              title="Modifier"
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
            </button>
            <button @click="deleteUser(user.id)" class="action-btn delete" title="Supprimer">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <div class="card-body">
          <div class="card-field">
            <span class="field-label">Rôle:</span>
            <span class="role-badge" :class="user.role.toLowerCase()">
              {{ user.role }}
            </span>
          </div>
          
          <div class="card-field">
            <span class="field-label">Département:</span>
            <span class="field-value">{{ user.departement || 'N/A' }}</span>
          </div>
          
          <div class="card-field">
            <span class="field-label">Téléphone:</span>
            <span class="field-value">{{ user.telephone || 'N/A' }}</span>
          </div>
          
          <div class="card-field">
            <span class="field-label">Date d'ajout:</span>
            <span class="field-value">{{ user.dateAjout }}</span>
          </div>
          
          <div class="card-field">
            <span class="field-label">Statut:</span>
            <span class="status-badge" :class="user.statut.toLowerCase()">
              {{ user.statut }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Message de chargement -->
    <div v-if="loading" class="loading-message">
      <div class="spinner"></div>
      <p>Chargement des utilisateurs...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface User {
  id: number
  nom: string
  prenom: string
  email: string
  role: string
  departement: string
  telephone: string
  dateAjout: string
  statut: string
}

// États du composant
const showAddForm = ref(false)
const editingUser = ref<User | null>(null)
const searchQuery = ref('')
const roleFilter = ref('')
const loading = ref(false)

// Utilisateur actuellement connecté (admin)
const currentUser = ref({
  id: 1,
  nom: 'Mara',
  prenom: 'Finaritra',
  email: 'marafinaritra@gmail.com'
})

// Formulaire utilisateur
const userForm = ref({
  nom: '',
  prenom: '',
  email: '',
  role: '',
  departement: '',
  telephone: ''
})

// Liste des utilisateurs
const users = ref<User[]>([])

// ===== SIMULATION D'APPELS API =====

/**
 * Récupère la liste des utilisateurs depuis l'API
 * TODO: Remplacer par un vrai appel API
 * Exemple: await fetch('/api/users', { headers: { Authorization: `Bearer ${token}` } })
 */
const fetchUsers = async (): Promise<User[]> => {
  loading.value = true
  
  try {
    // Simulation d'un délai d'API
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // TODO: Remplacer par un vrai appel API
    // const response = await fetch('/api/users', {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${localStorage.getItem('token')}`
    //   }
    // })
    // 
    // if (!response.ok) {
    //   throw new Error('Erreur lors de la récupération des utilisateurs')
    // }
    // 
    // const data = await response.json()
    // return data.users
    
    // Données simulées pour le développement
    return [
      {
        id: 1,
        nom: 'Mara',
        prenom: 'Finaritra',
        email: 'marafinaritra@gmail.com',
        role: 'Admin',
        departement: 'IT',
        telephone: '+33 1 23 45 67 89',
        dateAjout: '15/03/2024',
        statut: 'Actif'
      },
      {
        id: 2,
        nom: 'Martin',
        prenom: 'Pierre',
        email: 'pierre.martin@exemple.fr',
        role: 'Manager',
        departement: 'Marketing',
        telephone: '+33 1 23 45 67 90',
        dateAjout: '20/03/2024',
        statut: 'Actif'
      },
      {
        id: 3,
        nom: 'Laurent',
        prenom: 'Sophie',
        email: 'sophie.laurent@exemple.fr',
        role: 'User',
        departement: 'Ventes',
        telephone: '+33 1 23 45 67 91',
        dateAjout: '25/03/2024',
        statut: 'Inactif'
      }
    ]
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error)
    // TODO: Gérer l'erreur (notification, message d'erreur, etc.)
    return []
  } finally {
    loading.value = false
  }
}

/**
 * Crée un nouvel utilisateur via l'API
 * TODO: Remplacer par un vrai appel API
 */
const createUser = async (userData: Omit<User, 'id' | 'dateAjout' | 'statut'>): Promise<User> => {
  // TODO: Remplacer par un vrai appel API
  // const response = await fetch('/api/users', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${localStorage.getItem('token')}`
  //   },
  //   body: JSON.stringify(userData)
  // })
  // 
  // if (!response.ok) {
  //   throw new Error('Erreur lors de la création de l\'utilisateur')
  // }
  // 
  // return await response.json()
  
  // Simulation pour le développement
  const newUser: User = {
    id: Date.now(),
    ...userData,
    dateAjout: new Date().toLocaleDateString('fr-FR'),
    statut: 'Actif'
  }
  
  return newUser
}

/**
 * Met à jour un utilisateur via l'API
 * TODO: Remplacer par un vrai appel API
 */
const updateUser = async (userId: number, userData: Partial<User>): Promise<User> => {
  // TODO: Remplacer par un vrai appel API
  // const response = await fetch(`/api/users/${userId}`, {
  //   method: 'PUT',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${localStorage.getItem('token')}`
  //   },
  //   body: JSON.stringify(userData)
  // })
  // 
  // if (!response.ok) {
  //   throw new Error('Erreur lors de la modification de l\'utilisateur')
  // }
  // 
  // return await response.json()
  
  // Simulation pour le développement
  const existingUser = users.value.find(u => u.id === userId)
  if (!existingUser) {
    throw new Error('Utilisateur non trouvé')
  }
  
  return { ...existingUser, ...userData }
}

/**
 * Supprime un utilisateur via l'API
 * TODO: Remplacer par un vrai appel API
 */
const deleteUserApi = async (userId: number): Promise<void> => {
  // TODO: Remplacer par un vrai appel API
  // const response = await fetch(`/api/users/${userId}`, {
  //   method: 'DELETE',
  //   headers: {
  //     'Authorization': `Bearer ${localStorage.getItem('token')}`
  //   }
  // })
  // 
  // if (!response.ok) {
  //   throw new Error('Erreur lors de la suppression de l\'utilisateur')
  // }
  
  // Simulation pour le développement
  console.log(`Utilisateur ${userId} supprimé avec succès`)
}

// ===== FONCTIONS UTILITAIRES =====

/**
 * Retourne la première lettre du prénom pour l'avatar
 */
const getUserInitial = (prenom: string): string => {
  return prenom ? prenom.charAt(0).toUpperCase() : '?'
}

/**
 * Vérifie si l'utilisateur connecté peut modifier cet utilisateur
 * Seul l'utilisateur peut modifier son propre profil
 */
const canEditUser = (user: User): boolean => {
  return user.id === currentUser.value.id
}

// ===== COMPUTED PROPERTIES =====

const filteredUsers = computed(() => {
  return users.value.filter(user => {
    const matchesSearch = !searchQuery.value || 
      user.nom.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.prenom.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesRole = !roleFilter.value || user.role === roleFilter.value
    
    return matchesSearch && matchesRole
  })
})

// ===== GESTION DU FORMULAIRE =====

const closeForm = () => {
  showAddForm.value = false
  editingUser.value = null
  userForm.value = {
    nom: '',
    prenom: '',
    email: '',
    role: '',
    departement: '',
    telephone: ''
  }
}

const editUser = (user: User) => {
  // Vérifier les permissions avant d'autoriser la modification
  if (!canEditUser(user)) {
    alert('Vous ne pouvez modifier que votre propre profil.')
    return
  }
  
  editingUser.value = user
  userForm.value = {
    nom: user.nom,
    prenom: user.prenom,
    email: user.email,
    role: user.role,
    departement: user.departement,
    telephone: user.telephone
  }
  showAddForm.value = true
}

const saveUser = async () => {
  try {
    if (editingUser.value) {
      // Modifier l'utilisateur existant
      const updatedUser = await updateUser(editingUser.value.id, userForm.value)
      const index = users.value.findIndex(u => u.id === editingUser.value!.id)
      if (index !== -1) {
        users.value[index] = updatedUser
      }
    } else {
      // Ajouter un nouvel utilisateur
      const newUser = await createUser(userForm.value)
      users.value.push(newUser)
    }
    
    closeForm()
    // TODO: Afficher un message de succès
    console.log('Utilisateur sauvegardé avec succès')
    
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error)
    // TODO: Afficher un message d'erreur à l'utilisateur
    alert('Une erreur est survenue lors de la sauvegarde')
  }
}

const deleteUser = async (userId: number) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
    try {
      await deleteUserApi(userId)
      users.value = users.value.filter(u => u.id !== userId)
      // TODO: Afficher un message de succès
      console.log('Utilisateur supprimé avec succès')
      
    } catch (error) {
      console.error('Erreur lors de la suppression:', error)
      // TODO: Afficher un message d'erreur à l'utilisateur
      alert('Une erreur est survenue lors de la suppression')
    }
  }
}

// ===== LIFECYCLE HOOKS =====

onMounted(async () => {
  // Charger les utilisateurs au montage du composant
  users.value = await fetchUsers()
})
</script>

<style scoped>
/* ===== Général ===== */
body {
  overflow-x: hidden;
}

.users {
  max-width: 100%;
  width: 100%;
  padding: 1rem;
  overflow-x: hidden;
  box-sizing: border-box;
}

/* ===== Header ===== */
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
}

/* ===== Loading ===== */
.loading-message {
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
  border: 4px solid #f3f4f6;
  border-top: 4px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* ===== Modal Formulaire ===== */
.form-modal {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
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
  max-width: 600px;
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

/* ===== Formulaire ===== */
.user-form {
  padding: 1.5rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
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

.form-input,
.form-select {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  width: 100%;
  transition: border-color 0.2s;
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
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
}

.secondary-btn:hover {
  background-color: #e5e7eb;
}

/* ===== Recherche & Filtres ===== */
.search-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
}

.search-bar {
  position: relative;
  flex: 1;
  min-width: 260px;
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
  flex-wrap: wrap;
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

/* ===== Vue Desktop (Tableau) ===== */
.desktop-view {
  display: block;
}

.mobile-view {
  display: none;
}

.table-container {
  background: white;
  border-radius: 12px;
  overflow-x: auto;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  width: 100%;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
  table-layout: auto;
}

.users-table th {
  background-color: #f9fafb;
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #374151;
  border-bottom: 1px solid #e5e7eb;
}

.users-table td {
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  vertical-align: middle;
}

.table-row {
  transition: background-color 0.2s;
}

.table-row:hover {
  background-color: #f9fafb;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #3b82f6;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.1rem;
}

.user-name {
  font-weight: 500;
  color: #1f2937;
}

.user-title {
  font-size: 0.875rem;
  color: #6b7280;
}

/* ===== Vue Mobile (Cartes) ===== */
.cards-container {
  display: grid;
  gap: 1rem;
}

.user-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.card-header .user-avatar {
  width: 48px;
  height: 48px;
  font-size: 1.2rem;
}

.user-email {
  font-size: 0.875rem;
  color: #6b7280;
}

.card-body {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.card-field {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.field-label {
  font-weight: 500;
  color: #374151;
  font-size: 0.875rem;
}

.field-value {
  color: #6b7280;
  font-size: 0.875rem;
}

/* ===== Badges ===== */
.role-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
}

.role-badge.admin {
  background-color: #fee2e2;
  color: #dc2626;
}

.role-badge.manager {
  background-color: #fef3c7;
  color: #d97706;
}

.role-badge.user {
  background-color: #e0e7ff;
  color: #4338ca;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
}

.status-badge.actif {
  background-color: #d1fae5;
  color: #059669;
}

.status-badge.inactif {
  background-color: #fee2e2;
  color: #dc2626;
}

/* ===== Actions ===== */
.action-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.action-btn {
  padding: 0.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
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

.action-btn.edit:hover:not(.disabled) {
  background-color: #bfdbfe;
}

.action-btn.edit.disabled {
  background-color: #f3f4f6;
  color: #9ca3af;
  cursor: not-allowed;
  filter: blur(0.5px);
  opacity: 0.6;
}

.action-btn.delete {
  background-color: #fee2e2;
  color: #dc2626;
}

.action-btn.delete:hover {
  background-color: #fecaca;
}

/* ===== Responsive Styles ===== */
@media (max-width: 1024px) {
  .form-grid {
    grid-template-columns: 1fr;
  }

  .form-container {
    max-height: 95vh;
  }

  .form-actions {
    flex-direction: column;
    gap: 0.5rem;
    align-items: stretch;
  }

  .search-filters {
    flex-direction: column;
    align-items: stretch;
  }

  .filters {
    flex-direction: column;
    align-items: stretch;
  }
}

@media (max-width: 768px) {
  /* Basculer vers la vue mobile */
  .desktop-view {
    display: none;
  }

  .mobile-view {
    display: block;
  }

  .page-header {
    flex-direction: column;
    align-items: stretch;
  }

  .primary-btn,
  .secondary-btn {
    width: 100%;
    justify-content: center;
  }

  .form-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .search-bar {
    min-width: 100%;
  }

  .filter-select {
    width: 100%;
  }

  .form-input,
  .form-select {
    font-size: 0.95rem;
  }

  .card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .card-header .user-info {
    width: 100%;
  }

  .card-header .action-buttons {
    width: 100%;
    justify-content: flex-end;
  }
}

@media (max-width: 480px) {
  .users {
    padding: 0.5rem;
  }

  .page-header h2 {
    font-size: 1.5rem;
  }

  .user-card {
    margin: 0 -0.5rem;
  }

  .action-btn svg {
    width: 14px;
    height: 14px;
  }
}
</style>