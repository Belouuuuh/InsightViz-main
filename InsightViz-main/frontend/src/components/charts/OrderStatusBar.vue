<template>
  <div class="card">
    <h3 class="card-title">État des requêtes</h3>
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title, Tooltip, Legend,
  BarElement, CategoryScale, LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const chartData = {
  labels: ['Traité', 'En attente', 'Refusé'],
  datasets: [
    {
      label: 'Requêtes',
      data: [80, 30, 10],
      backgroundColor: ['#10b981', '#f59e0b', '#ef4444']
    }
  ]
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  }
}
</script>

<style scoped>
.card {
  background: white;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  height: 100%;
}
.card-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}
</style>
