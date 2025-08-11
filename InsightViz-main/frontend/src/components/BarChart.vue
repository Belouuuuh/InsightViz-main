<template>
  <div class="bar-chart-container w-full h-64 relative">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Chart from 'chart.js/auto'

const canvasRef = ref(null)

onMounted(() => {
  const ctx = canvasRef.value.getContext('2d')

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
      datasets: [
        {
          label: 'Transporteur',
          data: [12, 19, 3, 5, 2, 3, 9],
          backgroundColor: '#4F46E5' // bleu foncé
        },
        {
          label: 'Expéditeur',
          data: [5, 10, 13, 8, 12, 7, 4],
          backgroundColor: '#22C55E' // vert
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Évaluation hebdomadaire des Transporteurs et Expéditeurs',
          font: { size: 16 }
        },
        legend: {
          position: 'bottom'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 5
          }
        }
      }
    }
  })
})
</script>

<style scoped>
.bar-chart-container {
  position: relative;
}
</style>
