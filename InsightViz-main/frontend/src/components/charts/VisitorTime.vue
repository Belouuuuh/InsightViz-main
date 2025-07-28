<template>
  <div class="card">
    <h3 class="card-title">Visites par heure</h3>
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
  labels: ['6h', '9h', '12h', '15h', '18h', '21h'],
  datasets: [
    {
      label: 'Visiteurs',
      data: [20, 45, 30, 50, 70, 40],
      backgroundColor: '#4f46e5'
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
