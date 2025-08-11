<template>
  <div class="layout-container flex">
    <!-- === SIDEBAR === -->
    <div :class="['sidebar w-64 h-screen fixed z-50 bg-gray-900 text-white', { collapsed: isCollapsed }]">
      
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
        <div
          v-for="item in menuItems"
          :key="item.name"
          @click="changePage(item.name)"
          class="nav-item"
          :class="{ active: currentPage === item.name }"
        >
          <component :is="item.icon" class="nav-icon" />
          <span v-if="!isCollapsed" class="nav-text">{{ item.label }}</span>
          <div v-else class="tooltip">{{ item.label }}</div>
        </div>
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

    <!-- === CONTENU PRINCIPAL === -->
    <main class="main-content flex-1 ml-64 p-6">
      <!-- Profil Utilisateur -->
      <div v-if="currentPage === 'profil'" class="user-page">
        <div class="page-header">
          <h1 class="page-title">Profil Utilisateur</h1>
          <p class="page-subtitle">Gérez votre profil et consultez les membres de l'équipe</p>
        </div>

        <div class="content-grid">
          <div class="profile-card">
            <div class="profile-header">
              <div class="profile-avatar">
                <UserCircleIcon class="avatar-icon" />
              </div>
              <div class="profile-info">
                <h2 class="profile-name">{{ currentUser.name }}</h2>
                <p class="profile-role">{{ currentUser.role }}</p>
                <p class="profile-email">{{ currentUser.email }}</p>
              </div>
            </div>
            <div class="profile-stats">
              <div class="stat-item">
                <span class="stat-value">{{ userStats.surveys }}</span>
                <span class="stat-label">Enquêtes créées</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">{{ userStats.responses }}</span>
                <span class="stat-label">Réponses reçues</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">{{ userStats.campaigns }}</span>
                <span class="stat-label">Campagnes actives</span>
              </div>
            </div>
          </div>

          <div class="members-card">
            <div class="card-header">
              <h3 class="card-title">Membres de l'équipe</h3>
              <button @click="viewAllMembers" class="btn btn-secondary">
                Voir tous les membres
              </button>
            </div>
            <div class="members-list">
              <div v-for="member in teamMembers" :key="member.id" class="member-item">
                <div class="member-avatar">
                  <UserCircleIcon class="member-avatar-icon" />
                </div>
                <div class="member-info">
                  <h4 class="member-name">{{ member.name }}</h4>
                  <p class="member-role">{{ member.role }}</p>
                  <p class="member-department">{{ member.department }}</p>
                </div>
                <div class="member-status">
                  <span :class="['status-indicator', member.online ? 'online' : 'offline']"></span>
                  <span class="status-text">{{ member.online ? 'En ligne' : 'Hors ligne' }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pages dynamiques -->
      <SurveyPage v-else-if="currentPage === 'survey'" />
      <ResponsePage v-else-if="currentPage === 'response'" />
      <CampaignPage v-else-if="currentPage === 'campaign'" />
      <PersonPage v-else-if="currentPage === 'person'" />
    </main>
  </div>
</template>


<script setup lang="ts">
import SurveyPage from '../components/SurveyPage.vue'
import CampaignPage from '../components/CampaignPage.vue'
import PersonPage from '../components/PersonPage.vue'
import ResponsePage from '../components/ResponsePage.vue'
import {
  UserCircleIcon,
  UserIcon,
  ClipboardDocumentListIcon,
  ChatBubbleLeftRightIcon,
  MegaphoneIcon,
  UsersIcon
} from '@heroicons/vue/24/outline'
import { ref, onMounted, onUnmounted } from 'vue'

const isCollapsed = ref(false)
const currentPage = ref('profil')

const currentUser = ref({
  id: 1,
  name: 'Jean Dupont',
  role: 'Utilisateur',
  email: 'jean.dupont@insightviz.com'
})

const userStats = ref({
  surveys: 12,
  responses: 248,
  campaigns: 3
})

const teamMembers = ref([
  { id: 2, name: 'Marie Martin', role: 'Chef de projet', department: 'Marketing', online: true },
  { id: 3, name: 'Pierre Durand', role: 'Analyste', department: 'Ventes', online: false },
  { id: 4, name: 'Sophie Bernard', role: 'Responsable Support', department: 'Support', online: true }
])

const menuItems = [
  { name: 'profil', label: 'Utilisateur', icon: UserIcon },
  { name: 'person', label: 'Personne', icon: UsersIcon },
  { name: 'survey', label: 'Enquête', icon: ClipboardDocumentListIcon },
  { name: 'response', label: 'Réponse', icon: ChatBubbleLeftRightIcon },
  { name: 'campaign', label: 'Campagne', icon: MegaphoneIcon }
]

const changePage = (page: string) => {
  currentPage.value = page
}

const viewAllMembers = () => {
  console.log('Afficher tous les membres')
}

const handleResize = () => {
  isCollapsed.value = window.innerWidth <= 768
}

// Basculement sidebar
const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>


<style scoped>
.user-page {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
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

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.profile-card,
.members-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 2rem;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.profile-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-icon {
  width: 48px;
  height: 48px;
  color: white;
}

.profile-info h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.25rem 0;
}

.profile-role {
  color: #3b82f6;
  font-weight: 500;
  margin: 0 0 0.25rem 0;
}

.profile-email {
  color: #6b7280;
  margin: 0;
}

.profile-actions {
  margin-bottom: 2rem;
}

.profile-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
}

.stat-item {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: #3b82f6;
}

.stat-label {
  color: #6b7280;
  font-size: 0.875rem;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.members-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.member-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.member-item:hover {
  border-color: #3b82f6;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.1);
}

.member-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
}

.member-avatar-icon {
  width: 28px;
  height: 28px;
  color: #6b7280;
}

.member-info {
  flex: 1;
}

.member-name {
  font-weight: 500;
  color: #1f2937;
  margin: 0 0 0.25rem 0;
}

.member-role {
  color: #3b82f6;
  font-size: 0.875rem;
  margin: 0 0 0.25rem 0;
}

.member-department {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
}

.member-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.status-indicator.online {
  background-color: #10b981;
}

.status-indicator.offline {
  background-color: #6b7280;
}

.status-text {
  font-size: 0.875rem;
  color: #6b7280;
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

.btn-icon {
  width: 16px;
  height: 16px;
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
  max-width: 500px;
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

.form-label {
  display: block;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  transition: border-color 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.modal-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  margin-top: 2rem;
}

.layout-container {
  display: flex;
  min-height: 100vh;
}



@media (max-width: 768px) {
  .user-page {
    padding: 1rem;
  }
  
  .content-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .profile-card,
  .members-card {
    padding: 1.5rem;
  }
  
  .profile-header {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .profile-stats {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}



/*Sidebar*/
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

.sidebar-header {
  padding: 20px;
}
.sidebar-title {
  font-size: 1.25rem;
  font-weight: bold;
}
.sidebar-menu {
  list-style: none;
  padding: 0;
  margin: 0;
}
.sidebar-menu li {
  padding: 15px 20px;
  cursor: pointer;
  transition: background 0.2s;
}
.sidebar-menu li.active,
.sidebar-menu li:hover {
  background-color: #334155;
}
.sidebar-footer {
  padding: 15px 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-top: 1px solid #334155;
}
.footer-icon {
  width: 24px;
  height: 24px;
}
.user-info {
  display: flex;
  flex-direction: column;
}
.user-name {
  font-weight: 500;
  font-size: 14px;
}
.user-role {
  font-size: 12px;
  color: #cbd5e1;
}

.main-content {
  flex-grow: 1;
  padding: 30px;
  margin-left: 280px;
  transition: margin-left 0.3s ease;
}

.profile-info {
  display: flex;
  flex-direction: column;
}
.profile-name {
  font-weight: bold;
  font-size: 1.25rem;
}
.profile-role,
.profile-email {
  font-size: 14px;
  color: #475569;
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


.sidebar:not(.collapsed) .user-info {
  justify-content: flex-start;
}

.sidebar.collapsed ~ .main-content {
  margin-left: 70px;
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


.user-details {
  display: flex;
  flex-direction: column;
  transition: opacity 0.3s ease;
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

/* Responsive pour sidebar réduite */
@media (max-width: 768px) {
  .main-content {
    margin-left: 70px !important;
  }
}

</style>