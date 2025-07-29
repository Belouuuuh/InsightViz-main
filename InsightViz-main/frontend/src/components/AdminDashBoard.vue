<template>
  <div class="admin-layout" :class="{ 'sidebar-open': sidebarOpen }">
    <!-- SIDEBAR -->
    <aside class="sidebar">
      <h2 class="logo">InsightViz</h2>

    <!-- PROFIL + MENU -->
<div class="profile-section" @click="toggleProfileMenu" tabindex="0" @blur="closeProfileMenu">
  <!-- AVATAR -->
  <img :src="user.avatar" alt="Avatar" class="avatar" />

  <!-- INFO -->
  <div class="user-info">
    <p class="user-name">{{ user.name }}</p>
    <small class="user-role">{{ user.role }}</small>
  </div>

  <!-- MENU PROFIL AVEC NOTIFICATION -->
  <div v-if="profileMenuOpen" class="profile-menu" @mousedown.prevent>
    <button @click="changePage('profil')">Profil</button>

    <!-- NOTIFICATION (remplace Paramètres) -->
    <button @click.stop="toggleNotification">
      <font-awesome-icon icon="bell" class="notification-icon" />
      Notifications
    </button>

    <!-- DROPDOWN NOTIFICATION -->
    <div v-if="notificationOpen" class="notification-dropdown" @mousedown.prevent>
      <p class="notif-text">Pas de nouvelles notifications.</p>
    </div>

    <button class="logout-btn" @click="logout">Déconnexion</button>
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
    <font-awesome-icon icon="user-check" /> Personne
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

    <!-- RECHERCHE -->
    <div class="search-bar">
      <div class="search-wrapper">
        <font-awesome-icon icon="search" class="icon-search" />
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Rechercher..."
          class="search-input"
        />
      </div>
    </div>
  </div>

  <!-- KPI Section -->
  <div class="kpi-row">
    <div class="kpi-card"><h3>{{ stats.enquetes }}</h3><p>Enquêtes</p></div>
    <div class="kpi-card"><h3>{{ stats.reponses }}</h3><p>Réponses</p></div>
    <div class="kpi-card"><h3>{{ stats.campagnes }}</h3><p>Campagnes</p></div>
    <div class="kpi-card"><h3>{{ stats.utilisateurs }}</h3><p>Utilisateurs</p></div>
  </div>

  <div class="chart-wrapper">
    <canvas id="enqueteChart"></canvas>
  </div>
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
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import axios from '../axios'
import { Chart, registerables } from 'chart.js'
import EnqueteForm from './EnqueteForm.vue'
import UserForm from './UserForm.vue'
import ReponseForm from './ReponseForm.vue'
import CampagneForm from './CampagneForm.vue'
import PersonneForm from './PersonneForm.vue'

Chart.register(...registerables)

const router = useRouter()
const sidebarOpen = ref(false)
const currentPage = ref('dashboard')
const profileMenuOpen = ref(false)

const user = reactive({
  name: 'Mara',
  avatar: 'https://i.pravatar.cc/40',
  role: 'Admin'
})

const changePage = (page) => {
  currentPage.value = page
  profileMenuOpen.value = false
}

const toggleProfileMenu = () => {
  profileMenuOpen.value = !profileMenuOpen.value
}
const closeProfileMenu = () => {
  profileMenuOpen.value = false
}

const logout = () => {
  localStorage.clear()
  sessionStorage.clear()
  router.push({ name: 'Login' })
}

const stats = reactive({
  enquetes: 0,
  reponses: 0,
  campagnes: 0,
  utilisateurs: 0,
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
      enquetes: 42,
      reponses: 180,
      campagnes: 6,
      utilisateurs: 85,
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
  background: linear-gradient(135deg, #372d67 0%, #6a11cb 60%, #2575fc 100%);
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

/* KPI ROW */
.kpi-row {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
  flex-wrap: nowrap;
}
.kpi-card {
  flex: 1;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  padding: 1.5rem;
  text-align: center;
}
.kpi-card h3 {
  margin: 0;
  font-size: 2.4rem;
  color: #6a11cb;
}
.kpi-card p {
  margin-top: 0.35rem;
  font-weight: 600;
  color: #555;
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
}
.chart-wrapper canvas {
  width: 100% !important;
  height: 100% !important;
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

.notification-badge {
  position: absolute;
  top: -3px;
  right: -3px;
  background: red;
  width: 8px;
  height: 8px;
  border-radius: 50%;
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


</style>


