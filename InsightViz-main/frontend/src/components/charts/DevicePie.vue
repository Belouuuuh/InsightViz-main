<template>
  <div class="card">
    <h3 class="card-title">Appareils des visiteurs</h3>
    <Pie :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title, Tooltip, Legend, ArcElement
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

const chartData = {
  labels: ['Mobile', 'Desktop', 'Tablet'],
  datasets: [
    {
      label: 'Utilisateurs',
      data: [60, 30, 10],
      backgroundColor: ['#4f46e5', '#10b981', '#f59e0b'],
      hoverOffset: 8
    }
  ]
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom'
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
