<template>
  <div class="dashboard full-screen">
    <header class="dashboard-header">
      <h1>Tableau de bord InsightViz</h1>
      <p>Bienvenue, {{ user.name }}</p>
    </header>

    <section class="stats-cards">
      <div class="card" v-for="(value, key) in cards" :key="key">
        <h3>{{ key }}</h3>
        <p>{{ value }}</p>
      </div>
    </section>

    <section class="charts">
      <div class="chart-wrapper">
        <canvas id="enqueteChart"></canvas>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from 'vue'
import axios from '../axios'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const user = reactive({
  name: 'Administrateur',
})

const cards = reactive({
  Enquêtes: 0,
  Réponses: 0,
  Campagnes: 0,
  Utilisateurs: 0
})

const stats = reactive({
  months: [],
  enquetesMonthly: [],
  reponsesMonthly: [],
  campagnesMonthly: [],
  utilisateursMonthly: []
})

let chartInstance = null

const renderChart = () => {
  if (chartInstance) chartInstance.destroy()

  const ctx = document.getElementById('enqueteChart')?.getContext('2d')
  if (!ctx) return

  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: stats.months,
      datasets: [
        {
          label: 'Enquêtes',
          data: stats.enquetesMonthly,
          borderColor: '#2980b9',
          fill: false
        },
        {
          label: 'Réponses',
          data: stats.reponsesMonthly,
          borderColor: '#27ae60',
          fill: false
        },
        {
          label: 'Campagnes',
          data: stats.campagnesMonthly,
          borderColor: '#f39c12',
          fill: false
        },
        {
          label: 'Utilisateurs',
          data: stats.utilisateursMonthly,
          borderColor: '#c0392b',
          fill: false
        }
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
    Object.assign(cards, {
      Enquêtes: data.enquetes,
      Réponses: data.reponses,
      Campagnes: data.campagnes,
      Utilisateurs: data.utilisateurs
    })
    Object.assign(stats, data)
  } catch (error) {
    // Données factices si l'API échoue
    Object.assign(cards, {
      Enquêtes: 42,
      Réponses: 180,
      Campagnes: 6,
      Utilisateurs: 85
    })
    Object.assign(stats, {
      months: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
      enquetesMonthly: [2,4,3,5,6,4,7,5,3,4,2,7],
      reponsesMonthly: [5,8,6,10,9,7,12,9,8,7,5,10],
      campagnesMonthly: [1,1,0,2,1,0,2,1,1,1,0,2],
      utilisateursMonthly: [7,10,8,12,11,9,15,12,10,9,8,13]
    })
  }
  await nextTick()
  renderChart()
}

onMounted(() => {
  fetchStats()
})
</script>

<style scoped>
.dashboard {
  padding: 2rem;
  font-family: 'Segoe UI', sans-serif;
  background-color: #f4f6f8;
  min-height: 100vh;
}

.full-screen {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.dashboard-header {
  text-align: center;
  margin-bottom: 2rem;
}

.dashboard-header h1 {
  font-size: 2rem;
  color: #2c3e50;
}

.stats-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.card {
  background-color: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  text-align: center;
  transition: transform 0.2s ease-in-out;
}
.card:hover {
  transform: translateY(-5px);
}
.card h3 {
  color: #34495e;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}
.card p {
  font-size: 1.4rem;
  color: #2c3e50;
  font-weight: bold;
}

.charts {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: white;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.chart-wrapper {
  position: relative;
  height: 400px;
}

canvas {
  width: 100% !important;
  height: 100% !important;
}
</style>
