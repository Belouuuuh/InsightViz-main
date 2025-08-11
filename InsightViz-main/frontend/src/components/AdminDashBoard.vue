<template>
  <div class="dashboard">
    <!-- Sidebar -->
    <aside class="sidebar" :class="{ 'sidebar-collapsed': isSidebarCollapsed }">
      <!-- Logo -->
      <div class="sidebar-header">
        <div class="logo">
          <svg class="logo-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 3v18h18"/>
            <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
          </svg>
          <span class="logo-text">InsightViz</span>
        </div>
        
      </div>

      <!-- Admin Profile -->
      <div class="admin-profile">
        <div class="profile-avatar">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </div>
        <div class="profile-info">
          <div class="profile-name">Admin User</div>
          <div class="profile-role">Administrateur</div>
        </div>
        <button class="logout-btn" title="Déconnexion">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16,17 21,12 16,7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
        </button>
      </div>

      <!-- Navigation Menu -->
      <nav class="sidebar-nav">
        <ul class="nav-list">
          <li class="nav-item">
            <button 
              class="nav-link" 
              :class="{ active: currentPage === 'dashboard' }"
              @click="changePage('dashboard')"
            >
              <svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="7" height="7"/>
                <rect x="14" y="3" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/>
              </svg>
              <span class="nav-text">Dashboard</span>
            </button>
          </li>
          <li class="nav-item">
            <button 
              class="nav-link" 
              :class="{ active: currentPage === 'utilisateur' }"
              @click="changePage('utilisateur')"
            >
              <svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              <span class="nav-text">Utilisateur</span>
            </button>
            <button 
              class="nav-link" 
              :class="{ active: currentPage === 'personne' }"
              @click="changePage('personne')"
            >
              <svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
                <path d="M12 11h4"/>
                <path d="M12 16h4"/>
                <path d="M8 11h.01"/>
                <path d="M8 16h.01"/>
              </svg>
              <span class="nav-text">Associer</span>
            </button>
          </li>
          <li class="nav-item">
            <button 
              class="nav-link" 
              :class="{ active: currentPage === 'enquete' }"
              @click="changePage('enquete')"
            >
              <svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10,9 9,9 8,9"/>
              </svg>
              <span class="nav-text">Enquête</span>
            </button>
          </li>
          <li class="nav-item">
            <button 
              class="nav-link" 
              :class="{ active: currentPage === 'reponse' }"
              @click="changePage('reponse')"
            >
              <svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                <line x1="9" y1="9" x2="15" y2="9"/>
                <line x1="9" y1="13" x2="15" y2="13"/>
              </svg>
              <span class="nav-text">Réponse</span>
            </button>
          </li>
          <li class="nav-item">
            <button 
              class="nav-link" 
              :class="{ active: currentPage === 'campagne' }"
              @click="changePage('campagne')"
            >
              <svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
              </svg>
              <span class="nav-text">Campagne</span>
            </button>
          </li>
          <li class="nav-item">
            
          </li>
          <li class="nav-item">
            <button 
              class="nav-link" 
              :class="{ active: currentPage === 'notification' }"
              @click="changePage('notification')"
            >
              <svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <span class="nav-text">Notification</span>
            </button>
          </li>
          <li class="nav-item">

          </li>
          <li class="nav-item">
            <button 
              class="nav-link" 
              :class="{ active: currentPage === 'scoring' }"
              @click="changePage('scoring')"
            >
              <svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 3v18h18"/>
                <path d="M7 12l3-3 3 3 5-5"/>
                <circle cx="7" cy="12" r="1"/>
                <circle cx="10" cy="9" r="1"/>
                <circle cx="13" cy="12" r="1"/>
                <circle cx="18" cy="7" r="1"/>
              </svg>
              <span class="nav-text">Scoring</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="main-content">
      <!-- Dashboard Content -->
        <!-- Toggle Button (fixed on main window) -->
    <button class="sidebar-toggle-main" @click="toggleSidebar" title="Toggle Sidebar">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="3" y1="6" x2="21" y2="6"/>
        <line x1="3" y1="12" x2="21" y2="12"/>
        <line x1="3" y1="18" x2="21" y2="18"/>
      </svg>
    </button>
      <div v-if="currentPage === 'dashboard'">
        <!-- Header -->
        <header class="dashboard-header">
          <div class="header-content">
            <div class="header-title">
              <h1>Tableau de bord</h1>
              <p>Vue d'ensemble de vos données InsightViz</p>
            </div>
            <div class="search-container">
              <div class="search-box">
                <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                </svg>
                <input type="text" placeholder="Rechercher..." v-model="searchQuery" />
              </div>
            </div>
          </div>
        </header>

        <!-- Stats Cards -->
        <section class="stats-section">
          <div class="stats-grid">
            <div class="stat-card" v-for="stat in statsData" :key="stat.id">
              <div class="stat-icon" :style="{ backgroundColor: stat.bgColor }">
                <svg width="24" height="24" viewBox="0 0 24 24" v-html="stat.icon"></svg>
              </div>
              <div class="stat-content">
                <div class="stat-number">{{ stat.value }}</div>
                <div class="stat-label">{{ stat.label }}</div>
                <div class="stat-change" :class="stat.changeClass">{{ stat.change }}</div>
              </div>
            </div>
          </div>
        </section>

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

      <!-- Conditional Pages from Image -->
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
      <div v-else-if="currentPage === 'scoring'">
        <EmployeeScoring />
      </div>
    </div>
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
import EmployeeScoring from './EmployeeScoring.vue'


Chart.register(...registerables)

const router = useRouter()
const sidebarOpen = ref(false)
const currentPage = ref('dashboard')
const profileMenuOpen = ref(false)
const notificationOpen = ref(false)
const showUserInfo = ref(false)
const searchQuery = ref('')
const activeMenu = ref('dashboard')
const isSidebarCollapsed = ref(false)

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}

const setActiveMenu = (menu: string) => {
  activeMenu.value = menu
  // Ici vous pourrez ajouter la logique de navigation
  console.log(`Navigation vers: ${menu}`)
}

// Responsive sidebar handling
const handleResize = () => {
  if (window.innerWidth <= 768) {
    isSidebarCollapsed.value = true
  } else {
    isSidebarCollapsed.value = false
  }
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

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
.dashboard {
  display: flex;
  min-height: 100vh;
  background-color: #f8fafc;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Sidebar Styles */
.sidebar {
  width: 280px;
  background-color: #1e293b;
  color: white;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 1000;
  transition: width 0.3s ease, transform 0.3s ease;
  overflow-y: auto;
}

.sidebar-collapsed {
  width: 80px;
}

.sidebar-header {
  padding: 1.5rem 1rem;
  border-bottom: 1px solid #334155;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-icon {
  color: #3b82f6;
  flex-shrink: 0;
}

.logo-text {
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  transition: opacity 0.3s ease;
}

.sidebar-collapsed .logo-text {
  opacity: 0;
  width: 0;
  overflow: hidden;
}

.sidebar-toggle {
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: color 0.2s;
}

.sidebar-toggle:hover {
  color: white;
}

.sidebar-toggle-main {
  position: fixed;
  top: 1rem;
  right: 0;
  z-index: 1001;
  background: transparent;
  border: none;
  color: rgb(18, 16, 16);
  cursor: pointer;
  padding: 0.75rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(50, 42, 188, 0.15);
  transition: all 0.2s;
  
}

.sidebar-toggle-main:hover {
  background: #334155;
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(221, 214, 214, 0.2);
}


.admin-profile {
  padding: 1rem;
  border-bottom: 1px solid #334155;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.profile-avatar {
  width: 40px;
  height: 40px;
  background-color: #3b82f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.profile-info {
  flex: 1;
  min-width: 0;
  transition: opacity 0.3s ease;
}

.sidebar-collapsed .profile-info {
  opacity: 0;
  width: 0;
  overflow: hidden;
}

.profile-name {
  font-weight: 600;
  font-size: 0.875rem;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.profile-role {
  font-size: 0.75rem;
  color: #94a3b8;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.logout-btn {
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: color 0.2s, background-color 0.2s;
  flex-shrink: 0;
}

.logout-btn:hover {
  color: #ef4444;
  background-color: rgba(239, 68, 68, 0.1);
}

.sidebar-nav {
  flex: 1;
  padding: 1rem 0;
}

.nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  margin-bottom: 0.25rem;
}

.nav-link {
  width: 100%;
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;
  transition: all 0.2s;
  text-align: left;
}

.nav-link:hover {
  background-color: #334155;
  color: white;
}

.nav-link.active {
  background-color: #3b82f6;
  color: white;
}

.nav-icon {
  flex-shrink: 0;
}

.nav-text {
  transition: opacity 0.3s ease;
  white-space: nowrap;
}

.sidebar-collapsed .nav-text {
  opacity: 0;
  width: 0;
  overflow: hidden;
}

/* Main Content */
.main-content {
  flex: 1;
  margin-left: 280px;
  transition: margin-left 0.3s ease;
}

.sidebar-collapsed + .main-content {
  margin-left: 80px;
}

.dashboard-header {
  background-color: white;
  border-bottom: 1px solid #e2e8f0;
  padding: 2rem 2rem 1.5rem;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.header-title h1 {
  font-size: 2rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 0.5rem 0;
}

.header-title p {
  color: #64748b;
  font-size: 1rem;
  margin: 0;
}

.search-container {
  min-width: 300px;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 12px;
  color: #9ca3af;
  z-index: 1;
}

.search-box input {
  width: 100%;
  padding: 10px 12px 10px 40px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  background-color: white;
  outline: none;
  transition: border-color 0.2s;
}

.search-box input:focus {
  border-color: #3b82f6;
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
  .main-content {
    margin-left: 280px;
  }
  
  .sidebar-collapsed + .main-content {
    margin-left: 80px;
  }
  
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
  .sidebar {
    transform: translateX(-100%);
    width: 280px;
  }
  
  .sidebar:not(.sidebar-collapsed) {
    transform: translateX(0);
  }
  
  .main-content {
    margin-left: 0;
  }
  
  .sidebar-collapsed + .main-content {
    margin-left: 0;
  }
  
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
  .sidebar {
    width: 100%;
  }
  
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