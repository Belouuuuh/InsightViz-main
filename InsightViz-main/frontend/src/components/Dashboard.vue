<template>
  <div class="admin-layout" :class="{ 'sidebar-open': sidebarOpen }">
    <!-- SIDEBAR -->
    <aside class="sidebar">
      <h2 class="logo">InsightViz</h2>

      <!-- PROFIL + MENU -->
      <div class="profile-section" @click="toggleProfileMenu" tabindex="0" @blur="closeProfileMenu" style="position: relative;">
        <div class="avatar-wrapper" style="position: relative; display: inline-block;">
          <img :src="user.avatar" alt="Avatar" class="avatar" />
          <span v-if="notificationCount > 0" class="notification-badge avatar-badge">{{ notificationCount }}</span>
        </div>

        <div class="user-info">
          <p class="user-name">{{ user.name }}</p>
          <small class="user-role">{{ user.role }}</small>
        </div>

        <!-- MENU PROFIL -->
        <div v-if="profileMenuOpen" class="profile-menu" @mousedown.prevent>
          <button @click.stop="showUserInfo = true">
            <font-awesome-icon icon="user" class="menu-icon" />
            Profil
          </button>
          <button @click.stop="changePage('notification')" class="notification-btn" style="position: relative;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <font-awesome-icon icon="bell" class="menu-icon" />
              Notifications
            </div>
            <span v-if="notificationCount > 0" class="notification-badge">{{ notificationCount }}</span>
          </button>
          <button class="logout-btn" @click="logout">
            <font-awesome-icon icon="sign-out-alt" class="menu-icon" />
            Déconnexion
          </button>
        </div>

        <div v-if="showUserInfo" class="user-card" @mousedown.prevent>
          <h3>Informations Utilisateur</h3>
          <p><strong>Nom :</strong> {{ user.name }}</p>
          <p><strong>Rôle :</strong> {{ user.role }}</p>
          <p><strong>Email :</strong> {{ user.email || 'non défini' }}</p>
          <button class="close-btn" @click.stop="showUserInfo = false">Fermer</button>
        </div>
      </div>

      <!-- BOUTONS PARAMÈTRE -->
      <div class="param-buttons">
        <button @click="changePage('dashboard')">
          <font-awesome-icon icon="chart-line" /> Dashboard
        </button>
        <button @click="changePage('utilisateur')">
          <font-awesome-icon icon="user" /> Utilisateur
        </button>
        <button @click="changePage('enquete')">
          <font-awesome-icon icon="clipboard-list" /> Enquête
        </button>
        <button @click="changePage('reponse')">
          <font-awesome-icon icon="check-circle" /> Réponse
        </button>
        <button @click="changePage('campagne')">
          <font-awesome-icon icon="bullhorn" /> Campagne
        </button>
        <button @click="changePage('personne')">
          <font-awesome-icon icon="user-friends" /> Associer
        </button>
        <button @click="changePage('scoring')">
          <font-awesome-icon icon="star" /> Scoring
        </button>
      </div>
    </aside>

    <!-- BOUTON MENU MOBILE -->
    <button class="sidebar-toggle" @click="sidebarOpen = !sidebarOpen" aria-label="Menu">☰</button>

    <!-- CONTENU PRINCIPAL -->
    <main class="content">
      <!-- DASHBOARD -->
      <div v-if="currentPage === 'dashboard'">
        <div class="dash-title-bar">
          <h2 class="dash-title">Tableau de bord</h2>
          <div class="search-bar">
            <div class="search-wrapper">
              <font-awesome-icon icon="search" class="icon-search" />
              <input type="text" v-model="searchQuery" placeholder="Rechercher..." class="search-input" />
            </div>
          </div>
        </div>

        <div class="dashboard-header">
          <p>Vue d'ensemble de vos données InsightViz</p>
        </div>

        <!-- KPI Section -->
        <div class="stats-grid">
          <!-- Carte 1 -->
          <div class="stat-card">
            <div class="stat-icon surveys">
              <!-- SVG Enquêtes -->
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
              <!-- (SVG content here) -->
            </div>
            <div class="stat-content">
              <h3>{{ stats.surveys }}</h3>
              <p>Enquêtes</p>
              <span class="stat-change positive">+12% ce mois</span>
            </div>
          </div>

          <!-- Carte 2 -->
          <div class="stat-card">
            <div class="stat-icon responses">
              <!-- SVG Réponses -->
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
            </div>
            <div class="stat-content">
              <h3>{{ stats.responses }}</h3>
              <p>Réponses</p>
              <span class="stat-change positive">+28% ce mois</span>
            </div>
          </div>

          <!-- Carte 3 -->
          <div class="stat-card">
            <div class="stat-icon campaigns">
              <!-- SVG Campagnes -->
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
            </div>
            <div class="stat-content">
              <h3>{{ stats.campaigns }}</h3>
              <p>Campagnes</p>
              <span class="stat-change neutral">Stable</span>
            </div>
          </div>

          <!-- Carte 4 -->
          <div class="stat-card">
            <div class="stat-icon users">
              <!-- SVG Utilisateurs -->
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
      </svg>
            </div>
            <div class="stat-content">
              <h3>{{ stats.users }}</h3>
              <p>Utilisateurs</p>
              <span class="stat-change positive">+5% ce mois</span>
            </div>
          </div>
        </div>

        <!-- Charts Section -->
    <section class="charts-section">
      <div class="charts-grid">
        <!-- Bar Chart -->
        <div class="chart-container">
          <h3>Évaluation des données</h3>
          <div class="chart-legend">
            <div class="legend-item">
              <span class="legend-color" style="background-color: #1e40af;"></span>
              <span>Transporteurs</span>
            </div>
            <div class="legend-item">
              <span class="legend-color" style="background-color: #93c5fd;"></span>
              <span>Expéditeurs</span>
            </div>
          </div>
          <div class="bar-chart">
            <div class="chart-y-axis">
              <span>80</span>
              <span>60</span>
              <span>40</span>
              <span>20</span>
              <span>0</span>
            </div>
            <div class="chart-bars">
              <div class="bar-group" v-for="month in barChartData" :key="month.month">
                <div class="bars">
                  <div class="bar transporteurs" :style="{ height: month.transporteurs + 'px' }">
                    <span class="bar-value">{{ Math.round(month.transporteurs * 80 / 80) }}</span>
                  </div>
                  <div class="bar expediteurs" :style="{ height: month.expediteurs + 'px' }">
                    <span class="bar-value">{{ Math.round(month.expediteurs * 80 / 80) }}</span>
                  </div>
                </div>
                <span class="month-label">{{ month.month }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Line Chart -->
        <div class="chart-container">
          <h3>Statistiques globales</h3>
          <div class="chart-legend horizontal">
            <div class="legend-item">
              <span class="legend-color" style="background-color: #7c3aed;"></span>
              <span>Enquêtes</span>
            </div>
            <div class="legend-item">
              <span class="legend-color" style="background-color: #f59e0b;"></span>
              <span>Réponses</span>
            </div>
            <div class="legend-item">
              <span class="legend-color" style="background-color: #10b981;"></span>
              <span>Campagnes</span>
            </div>
            <div class="legend-item">
              <span class="legend-color" style="background-color: #ef4444;"></span>
              <span>Utilisateurs</span>
            </div>
          </div>
          <div class="line-chart">
            <div class="chart-y-axis">
              <span>16</span>
              <span>14</span>
              <span>12</span>
              <span>10</span>
              <span>8</span>
              <span>6</span>
              <span>4</span>
              <span>2</span>
              <span>0</span>
            </div>
            <div class="chart-area">
              <svg class="line-chart-svg" viewBox="0 0 400 200" preserveAspectRatio="none">
                <!-- Grid lines -->
                <g class="grid-lines">
                  <line v-for="i in 9" :key="'h-' + i" x1="0" :y1="i * 22" x2="400" :y2="i * 22" stroke="#e5e7eb" stroke-width="1"/>
                  <line v-for="i in 12" :key="'v-' + i" :x1="i * 33.33" y1="0" :x2="i * 33.33" y2="200" stroke="#e5e7eb" stroke-width="1"/>
                </g>
                
                <!-- Lines -->
                <polyline 
                  class="chart-line enquetes" 
                  :points="generateLinePoints(lineChartData.enquetes)"
                  fill="none" 
                  stroke="#7c3aed" 
                  stroke-width="2"
                />
                <polyline 
                  class="chart-line reponses" 
                  :points="generateLinePoints(lineChartData.reponses)"
                  fill="none" 
                  stroke="#f59e0b" 
                  stroke-width="2"
                />
                <polyline 
                  class="chart-line campagnes" 
                  :points="generateLinePoints(lineChartData.campagnes)"
                  fill="none" 
                  stroke="#10b981" 
                  stroke-width="2"
                />
                <polyline 
                  class="chart-line utilisateurs" 
                  :points="generateLinePoints(lineChartData.utilisateurs)"
                  fill="none" 
                  stroke="#ef4444" 
                  stroke-width="2"
                />
                
                <!-- Points -->
                <g v-for="(point, index) in lineChartData.enquetes" :key="'e-' + index">
                  <circle :cx="index * 33.33 + 16.67" :cy="200 - (point * 12.5)" r="3" fill="#7c3aed"/>
                </g>
                <g v-for="(point, index) in lineChartData.reponses" :key="'r-' + index">
                  <circle :cx="index * 33.33 + 16.67" :cy="200 - (point * 12.5)" r="3" fill="#f59e0b"/>
                </g>
                <g v-for="(point, index) in lineChartData.campagnes" :key="'c-' + index">
                  <circle :cx="index * 33.33 + 16.67" :cy="200 - (point * 12.5)" r="3" fill="#10b981"/>
                </g>
                <g v-for="(point, index) in lineChartData.utilisateurs" :key="'u-' + index">
                  <circle :cx="index * 33.33 + 16.67" :cy="200 - (point * 12.5)" r="3" fill="#ef4444"/>
                </g>
              </svg>
              <div class="chart-x-labels">
                <span v-for="month in months" :key="month">{{ month }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>

      <!-- AUTRES PAGES -->
      <div v-else-if="currentPage === 'enquete'">
        <EnqueteForm />
      </div>
      <div v-else-if="currentPage === 'utilisateur'">
        <UserForm />
      </div>
      <div v-else-if="currentPage === 'reponse'">
        <ReponseForm />
      </div>
      <div v-else-if="currentPage === 'campagne'">
        <CampagneForm />
      </div>
      <div v-else-if="currentPage === 'personne'">
        <PersonneForm />
      </div>
      <div v-else-if="currentPage === 'notification'">
        <NotificationPage />
      </div>
    </main>
  </div>
</template>


<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import axios from '../axios'
import { Chart, registerables } from 'chart.js'
import EnqueteForm from './EnqueteForm.vue'
import UserForm from './UserForm.vue'
import ReponseForm from './ReponseForm.vue'
import CampagneForm from './CampagneForm.vue'
import PersonneForm from './PersonneForm.vue'
import NotificationPage from './NotificationPage.vue'


Chart.register(...registerables)

const router = useRouter()
const sidebarOpen = ref(false)
const currentPage = ref('dashboard')
const profileMenuOpen = ref(false)
const notificationOpen = ref(false)
const showUserInfo = ref(false)

const user = reactive({
  name: 'Mara',
  avatar: 'src/assets/IMG_6557.jpg',
  role: 'Admin',
  email: 'mara@example.com'
})


const changePage = (page) => {
  currentPage.value = page
  profileMenuOpen.value = false
  showUserInfo.value = false
  notificationOpen.value = false
}

const toggleProfileMenu = () => {
  profileMenuOpen.value = !profileMenuOpen.value
  if (!profileMenuOpen.value) {
    showUserInfo.value = false
    notificationOpen.value = false
  }
}

const closeProfileMenu = () => {
  profileMenuOpen.value = false
  showUserInfo.value = false
  notificationOpen.value = false
}

const toggleNotification = () => {
  notificationOpen.value = !notificationOpen.value
  if (notificationOpen.value) {
    showUserInfo.value = false
  }
}

const logout = () => {
  localStorage.clear()
  sessionStorage.clear()
  router.push({ name: 'Login' })
}

const stats = reactive({
  surveys: 0,
  responses: 0,
  campaigns: 0,
  users: 0,
  months: [],
  enquetesMonthly: [],
  reponsesMonthly: [],
  campagnesMonthly: [],
  utilisateursMonthly: []
})

let chartInstance = null

const renderChart = () => {
  if (chartInstance) chartInstance.destroy()
  const ctx = document.getElementById('enqueteChart').getContext('2d')
  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: stats.months,
      datasets: [
        { label: 'Enquêtes', data: stats.enquetesMonthly, borderColor: '#6a11cb', fill: false, tension: 0.35 },
        { label: 'Réponses', data: stats.reponsesMonthly, borderColor: '#f39c12', fill: false, tension: 0.35 },
        { label: 'Campagnes', data: stats.campagnesMonthly, borderColor: '#27ae60', fill: false, tension: 0.35 },
        { label: 'Utilisateurs', data: stats.utilisateursMonthly, borderColor: '#c0392b', fill: false, tension: 0.35 }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top' },
        tooltip: { enabled: true }
      }
    }
  })
}

const fetchStats = async () => {
  try {
    const { data } = await axios.get('/api/backoffice/stats')
    Object.assign(stats, data)
  } catch (error) {
    console.error("Erreur lors du chargement des stats:", error)
    Object.assign(stats, {
      surveys: 24,
      responses: 1847,
      campaigns: 8,
      users: 156,
      months: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
      enquetesMonthly: [2,4,3,5,6,4,7,5,3,4,2,7],
      reponsesMonthly: [5,8,6,10,9,7,12,9,8,7,5,10],
      campagnesMonthly: [1,1,0,2,1,0,2,1,1,1,0,2],
      utilisateursMonthly: [7,10,8,12,11,9,15,12,10,9,8,13]
    })
  }
  renderChart()
}

// Nom du composant (facultatif en <script setup>)
const selectedPeriod = ref('2024')

const chartPeriods = ref([
  { value: '2023', label: '2023' },
  { value: '2024', label: '2024' },
  { value: '6m', label: '6 mois' },
  { value: '3m', label: '3 mois' }
])

const chartData = ref([
  { label: 'Jan', transporteurs: 20, expediteurs: 12 },
  { label: 'Feb', transporteurs: 26, expediteurs: 24 },
  { label: 'Mar', transporteurs: 22, expediteurs: 22 },
  { label: 'May', transporteurs: 48, expediteurs: 47 },
  { label: 'Ven', transporteurs: 68, expediteurs: 30 },
  { label: 'Jul', transporteurs: 65, expediteurs: 12 },
  { label: 'Sep', transporteurs: 22, expediteurs: 5 }
])

const maxValue = ref(80)
const gridLines = ref([80, 60, 40, 20, 0])




watch(currentPage, (newPage) => {
  if (newPage === 'dashboard') {
    fetchStats()
  } else {
    if (chartInstance) {
      chartInstance.destroy()
      chartInstance = null
    }
  }
})

onMounted(() => {
  if (currentPage.value === 'dashboard') {
    fetchStats()
  }
})


onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy()
    chartInstance = null
  }
})


const statsData = [
  {
    id: 1,
    value: '24',
    label: 'Enquêtes',
    change: '+12% ce mois',
    changeClass: 'positive',
    bgColor: '#dbeafe',
    icon: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z"/>'
  },
  {
    id: 2,
    value: '1847',
    label: 'Réponses',
    change: '+28% ce mois',
    changeClass: 'positive',
    bgColor: '#dcfce7',
    icon: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>'
  },
  {
    id: 3,
    value: '8',
    label: 'Campagnes',
    change: 'Stable',
    changeClass: 'stable',
    bgColor: '#fef3c7',
    icon: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>'
  },
  {
    id: 4,
    value: '156',
    label: 'Utilisateurs',
    change: '+5% ce mois',
    changeClass: 'positive',
    bgColor: '#e9d5ff',
    icon: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z"/>'
  }
]

const barChartData = [
  { month: 'Jan', transporteurs: 25, expediteurs: 20 },
  { month: 'Feb', transporteurs: 32, expediteurs: 30 },
  { month: 'Mar', transporteurs: 28, expediteurs: 28 },
  { month: 'May', transporteurs: 60, expediteurs: 58 },
  { month: 'Ven', transporteurs: 88, expediteurs: 40 },
  { month: 'Jul', transporteurs: 82, expediteurs: 16 },
  { month: 'Sep', transporteurs: 30, expediteurs: 6 }
]

const lineChartData = {
  enquetes: [2, 4, 3, 5, 4, 7, 3, 4, 2, 7, 2, 7],
  reponses: [5, 8, 6, 10, 9, 12, 9, 7, 5, 10, 5, 10],
  campagnes: [1, 1, 2, 1, 0, 2, 1, 1, 1, 2, 1, 2],
  utilisateurs: [8, 10, 8, 12, 11, 15, 10, 9, 8, 13, 10, 13]
}

const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc']

const generateLinePoints = (data: number[]) => {
  return data.map((point, index) => 
    `${index * 33.33 + 16.67},${200 - (point * 12.5)}`
  ).join(' ')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');

.admin-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
  font-family: 'Poppins', sans-serif;
}

/* SIDEBAR */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 260px;
  height: 100vh;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: linear-gradient(180deg, #1e293b 0%, #334155 100%);
  color: #fff;
  box-shadow: 2px 0 10px rgba(0,0,0,0.15);
  transition: transform 0.3s ease;
  z-index: 10;
}


.logo {
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
}

/* PROFILE SECTION */
.profile-section {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(255,255,255,0.2);
  cursor: pointer;
  position: relative;
  user-select: none;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #fff;
}
.user-info {
  color: #fff;
}
.user-name {
  font-weight: 600;
  margin: 0;
}
.user-role {
  font-size: 0.8rem;
  opacity: 0.7;
}

/* PROFILE MENU */
.profile-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: #fff;
  color: #6a11cb;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.15);
  margin-top: 0.4rem;
  min-width: 160px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 20;
}

.menu-icon {
  margin-right: 0.5rem;
}

.profile-menu button {
  background: transparent;
  border: none;
  text-align: left;
  padding: 0.6rem 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
  color: #6a11cb;

  display: flex;               /* pour aligner icône + texte */
  align-items: center;
  gap: 0.5rem;                 /* elanelana kely */
  font-size: 0.95rem;
}

.profile-menu button:hover {
  background-color: #f0eaff;
}

.profile-menu .notification-icon {
  font-size: 1rem;
  color: #6a11cb; /* mitovy amin’ny texte */
}

/* LOGOUT BUTTON */
.logout-btn {
  background: #ff4d4f !important;
  color: #fff !important;
  font-weight: 600 !important;
  border: none !important;
  border-radius: 0 0 8px 8px !important;
  cursor: pointer !important;
  padding: 0.6rem 1rem !important;
  transition: background 0.2s ease !important;
}
.logout-btn:hover {
  background-color: #ff2e30 !important;
}

/* PARAM BUTTONS */
.param-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 20px 10px;
}


.param-buttons button {
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: none;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 6px;
  transition: background 0.2s ease;
}

.param-buttons button:hover {
  background-color: rgba(255, 255, 255, 0.15);
}

.param-buttons i {
  font-size: 1.2rem;
}

/* CONTENT */
.content {
  margin-left: 260px;
  height: 100vh;
  overflow-y: auto;
  background: #f9f9fe;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  transition: margin-left 0.3s ease;
}


/* CHART WRAPPER */
.chart-wrapper {
  flex: 1;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  padding: 1rem;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  height: 390px;
}
.chart-wrapper canvas {
  width: 100% !important;
  height: 95% !important;
}

/* TOGGLE SIDEBAR BUTTON */
.sidebar-toggle {
  display: none;
  position: fixed;
  top: 1rem;
  left: 1rem;
  background: rgba(255,255,255,0.85);
  color: #6a11cb;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 0.9rem;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  z-index: 999;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: background 0.2s ease, transform 0.2s ease;
}
.sidebar-toggle:hover {
  background: #fff;
  transform: scale(1.05);
}

/* RESPONSIVE */
@media (max-width: 900px) {
  .sidebar {
    transform: translateX(-100%);
  }
  .admin-layout.sidebar-open .sidebar {
    transform: translateX(0);
  }
  .content {
    margin-left: 0;
  }
  .sidebar-toggle {
    display: block;
  }
  .kpi-row {
    flex-wrap: wrap;
  }
  .kpi-card {
    flex: 1 1 45%;
    margin-bottom: 1rem;
  }
}
@media (max-width: 480px) {
  .kpi-card {
    flex: 1 1 100%;
  }
}

/* Container de titre sy recherche amin'ny laharana iray */
.dash-title-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px; /* ↓ Espace ambany ahena */
  padding: 5px 0;       /* ↓ Padding ambony sy ambany kely fotsiny */
}

/* Ny barre de recherche dia mandeha amin'ny ilany havanana */
.search-bar {
  display: flex;
  justify-content: flex-end;
}

.search-wrapper {
  position: relative;
  width: 250px;
}

.search-input {
  width: 100%;
  padding: 8px 8px 8px 32px;
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: 14px;
  color: #333;
}

.icon-search {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  color: #333;
  pointer-events: none;
}

.notification-wrapper {
  position: relative;
  margin-left: auto;
  margin-right: 0.5rem;
  cursor: pointer;
}

.notification-icon {
  font-size: 1.3rem;
  color: white;
}


.notification-dropdown {
  position: absolute;
  top: 120%;
  right: 0;
  background: #fff;
  color: #333;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.15);
  width: 220px;
  padding: 0.8rem;
  z-index: 30;
}

.notif-text {
  margin: 0;
  font-size: 0.9rem;
  text-align: center;
  color: #666;
}

.user-card {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 0.5rem;
  background-color: #fff;
  color: #333;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  width: 240px;
  z-index: 50;
}

.user-card h3 {
  margin-top: 0;
  font-size: 1rem;
  color: #6a11cb;
}

.user-card p {
  margin: 0.3rem 0;
  font-size: 0.9rem;
}

.close-btn {
  margin-top: 1rem;
  padding: 6px 12px;
  background-color: #6a11cb;
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.close-btn:hover {
  background-color: #4b0cb5;
}

/* Badge notification sur l’avatar */
.avatar-wrapper {
  position: relative;
  display: inline-block;
}

.avatar-badge {
  position: absolute;
  top: -6px;
  right: -6px;
  background: red;
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0;
  border-radius: 9999px;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  line-height: 1;
  user-select: none;
  box-shadow: 0 0 2px rgba(0,0,0,0.3);
  pointer-events: none;
}

.notification-btn {
  width: 100%;
  background: transparent;
  border: none;
  padding: 0.6rem 1rem;
  font-weight: 600;
  color: #6a11cb;
  cursor: pointer;
  border-radius: 0;
  transition: background 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.notification-btn:hover {
  background-color: #f0eaff;
}

.notification-badge {
  background: red;
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 9999px;
  min-width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  user-select: none;
  box-shadow: 0 0 2px rgba(0,0,0,0.3);
  pointer-events: none;
}

.dashboard {
  max-width: 1200px;
}

.dashboard-header {
  margin-bottom: 2rem;
}

.dashboard-header h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
}

.dashboard-header p {
  color: #6b7280;
  font-size: 1.1rem;
  margin: 0;
}

.stat-icon.surveys {
  background-color: #dbeafe;
  color: #3b82f6;
}

.stat-icon.responses {
  background-color: #d1fae5;
  color: #10b981;
}

.stat-icon.campaigns {
  background-color: #fef3c7;
  color: #f59e0b;
}

.stat-icon.users {
  background-color: #ede9fe;
  color: #8b5cf6;
}

@media (max-width: 767px) {
  .chart-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .chart-bars {
    gap: 0.5rem;
  }
  
  .chart-labels {
    gap: 0.5rem;
  }
}

.charts {
  display: flex;
  justify-content: flex-start; /* force à gauche */
  align-items: flex-start;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.15);
}

.stat-icon {
  width: 60px;
  height: 60px;
  margin-right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: #f0f0f0;
  flex-shrink: 0;
}


.stat-icon svg {
  width: 28px;
  height: 28px;
  stroke: #333;
}


.stat-content h3 {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.25rem 0;
}

.stat-content p {
  margin: 3px 0;
  font-size: 0.9em;
  color: #666;
}


.stat-change {
  font-size: 0.8em;
  font-weight: bold;
}


.stat-change.positive {
  color: #28a745;
}


.stat-change.neutral {
  color: #6c757d;
}

.stat-change.negative {
  color: #dc3545;
}

/* Responsive */
@media (max-width: 600px) {
  .stat-card {
    flex-direction: column;
    text-align: center;
  }

  .stat-icon {
    margin-right: 0;
    margin-bottom: 10px;
  }
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  padding: 20px;
}

.stat-card {
  background: #ffffff;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  transition: transform 0.2s ease;
}

.chart-container,
.chart-wrapper {
  flex: 1;
  background: white;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  height: 390px;
}

.chart-container canvas {
  width: 100% !important;
  height: 0px !important; /* Ajuste selon ton besoin */
  display: block;
  margin-bottom: 0rem;
}

.chart-header h3 {
  font-size: 1rem;
  margin: rem;
}


/* Responsive (mobile) */
@media (max-width: 768px) {
  .chart-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .chart-period {
    justify-content: flex-start;
  }

  .period-btn {
    padding: 0.2rem 0.4rem;
    font-size: 0.7rem;
  }
}



.charts-row {
  display: flex;
  justify-content: center;
  padding: 20px;
  background-color: #f8f9fa;
  gap: 1.5rem;
}

.chart-container {
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  width: 100%;
  max-width: 800px;
}

/* Header du graphique ou barre bleu */
.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.chart-title {
  font-size: 20px;
  font-weight: 600;
  color: #2d3748;
  margin: 0;
}

.chart-legend {
  display: flex;
  gap: 24px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #4a5568;
}

.legend-color {
  width: 14px;
  height: 14px;
  border-radius: 50%;
}

.legend-color.transporteurs {
  background-color: #1e40af;
}

.legend-color.expediteurs {
  background-color: #60a5fa;
}


/* Graphique en barres */
.chart {
  display: flex;
  height: 350px;
  margin-bottom: 20px;
  /*flex-direction: column;*/
}


.chart-y-axis {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 40px;
  height: 100%;
  padding-right: 12px;
  padding-top: 10px;
  padding-bottom: 40px;
}

.y-axis-label {
  font-size: 13px;
  color: #6b7280;
  text-align: right;
  line-height: 1;
}

.chart-area {
  flex: 1;
  position: relative;
  padding-top: 10px;
  padding-bottom: 40px;
}

.chart-grid {
  position: absolute;
  top: 10px;
  left: 0;
  right: 0;
  bottom: 40px;
}

.grid-line {
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background-color: #e5e7eb;
}

/*mahakasika ilay barre blue*/
.chart-bars {
  flex: 1;
  display: flex;
  align-items: end;
  gap: rem;
  padding: 0 20px;
  height: 100px; /* fixe la hauteur max des barres */
}

.bar-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  max-width: 80px;
}

.bar-pair {
  display: flex;
  gap: 2px;
  align-items: flex-end;
  height: 100%;
  justify-content: center;
}

.chart-bar {
  width: 24px;
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  transition: opacity 0.2s ease;
  border-radius: 4px 4px 0 0;
  min-height: 70px; /*haavo ny barre*/
}


.chart-bar:hover {
  opacity: 0.5;
}

.chart-bar.transporteurs {
  background-color: #1e40af;
}

.chart-bar.expediteurs {
  background-color: #048ae4;
}

/*nombre barre*/
.bar-value {
  font-size: 12px;
  font-weight: 500;
  color: #374151;
  position: absolute;
  top: -1.5rem;
  white-space: nowrap;
  transform: translateX(-50%);
  left: 50%;
}

/* jan-sep  */
.chart-labels {
  display: flex;
  justify-content: space-around;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 20px;
}


.chart-label {
  font-size: 13px;
  color: #6b7280;
  font-weight: 500;
  text-align: center;
  flex: 1;
  max-width: 80px;
}

/*bouton period*/
.chart-period {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
}

.period-btn {
  padding: 8px 16px;
  border: 1px solid #d1d5db;
  background: white;
  border-radius: 6px;
  font-size: 14px;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s ease;
}

.period-btn:hover {
  background: #f9fafb;
  border-color: #9ca3af;
}

.period-btn.active {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

/* Responsive design */
@media (max-width: 768px) {
  .chart-container {
    padding: 16px;
  }
  
  .chart-header {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
  
  .chart-legend {
    justify-content: center;
  }
  
  .chart {
    height: 280px;
  }
  
  .bar-group {
    max-width: 60px;
  }
  
  .chart-bar {
    width: 20px;
  }
}

@media (max-width: 480px) {
  .chart-title {
    font-size: 18px;
  }
  
  .period-btn {
    padding: 6px 12px;
    font-size: 12px;
  }
  
  .chart {
    height: 250px;
  }
  
  .bar-group {
    max-width: 50px;
  }
  
  .chart-bar {
    width: 18px;
  }
  
  .bar-value {
    font-size: 11px;
  }
}

.stats-section {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: transform 0.2s, box-shadow 0.2s;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.1);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-icon svg {
  color: #4b5563;
}

.stat-content {
  flex: 1;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  line-height: 1;
}

.stat-label {
  color: #64748b;
  font-size: 0.875rem;
  margin: 0.25rem 0;
}

.stat-change {
  font-size: 0.75rem;
  font-weight: 500;
}

.stat-change.positive {
  color: #059669;
}

.stat-change.stable {
  color: #64748b;
}

.charts-section {
  padding: 0 2rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.charts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.chart-container {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.chart-container h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 1rem 0;
}

.chart-legend {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.chart-legend.horizontal {
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #64748b;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

.bar-chart {
  display: flex;
  gap: 1rem;
}

.chart-y-axis {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 200px;
  font-size: 0.75rem;
  color: #9ca3af;
  padding-right: 0.5rem;
}

.chart-bars {
  display: flex;
  align-items: end;
  gap: 1rem;
  height: 200px;
  flex: 1;
  border-left: 1px solid #e5e7eb;
  padding-left: 1rem;
}

.bar-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.bars {
  display: flex;
  align-items: end;
  gap: 4px;
  height: 180px;
}

.bar {
  width: 20px;
  border-radius: 2px 2px 0 0;
  position: relative;
  min-height: 8px;
  transition: opacity 0.2s;
}

.bar:hover {
  opacity: 0.8;
}

.bar.transporteurs {
  background-color: #1e40af;
}

.bar.expediteurs {
  background-color: #93c5fd;
}

.bar-value {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.75rem;
  color: #4b5563;
  font-weight: 500;
}

.month-label {
  font-size: 0.75rem;
  color: #9ca3af;
}

.line-chart {
  display: flex;
  gap: 1rem;
}

.chart-area {
  flex: 1;
  position: relative;
}

.line-chart-svg {
  width: 100%;
  height: 200px;
  border-left: 1px solid #e5e7eb;
}

.grid-lines line {
  opacity: 0.3;
}

.chart-line {
  stroke-linecap: round;
  stroke-linejoin: round;
}

.chart-x-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: #9ca3af;
  padding-left: 16.67px;
  padding-right: 16.67px;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .charts-grid {
    grid-template-columns: 1fr;
  }
  
  .header-content {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .search-container {
    min-width: auto;
  }
}

@media (max-width: 768px) {
  .dashboard-header {
    padding: 1.5rem 1rem 1rem;
  }
  
  .stats-section,
  .charts-section {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .stat-card {
    flex-direction: column;
    text-align: center;
    gap: 0.75rem;
  }
  
  .chart-legend.horizontal {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .chart-bars {
    gap: 0.5rem;
  }
  
  .bar {
    width: 16px;
  }
  
  .bar-group {
    gap: 0.25rem;
  }
  
  .chart-container {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .header-title h1 {
    font-size: 1.5rem;
  }
  
  .stat-number {
    font-size: 1.75rem;
  }
  
  .chart-bars {
    gap: 0.25rem;
  }
  
  .bar {
    width: 12px;
  }
  
  .chart-x-labels {
    font-size: 0.625rem;
  }
}
</style>

