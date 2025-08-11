<template>
  <div class="charts-row">
    <!-- Graphique 1 : Barres -->
    <div class="chart-container">
      <div class="chart-header">
        <h3 class="chart-title">Évolution des données</h3>
        <div class="chart-legend">
          <div class="legend-item">
            <div class="legend-color transporteurs"></div>
            <span>Transporteurs</span>
          </div>
          <div class="legend-item">
            <div class="legend-color expediteurs"></div>
            <span>Expéditeurs</span>
          </div>
        </div>
      </div>

      <div class="chart">
        <div class="chart-y-axis">
          <div v-for="value in gridLines" :key="value" class="y-axis-label">
            {{ value }}
          </div>
        </div>

        <div class="chart-area">
          <div class="chart-grid">
            <div 
              v-for="(value, index) in gridLines" 
              :key="value" 
              class="grid-line" 
              :style="{ top: `${(index / (gridLines.length - 1)) * 100}%` }"
            ></div>
          </div>

          <div class="chart-bars">
            <div 
              v-for="(data, index) in chartData" 
              :key="index"
              class="bar-group"
            >
              <div class="bar-pair">
                <div 
                  class="chart-bar transporteurs" 
                  :style="{ height: `${(data.transporteurs / maxValue) * 100}%` }"
                >
                  <div class="bar-value">{{ data.transporteurs }}</div>
                </div>
                <div 
                  class="chart-bar expediteurs" 
                  :style="{ height: `${(data.expediteurs / maxValue) * 100}%` }"
                >
                  <div class="bar-value">{{ data.expediteurs }}</div>
                </div>
              </div>
            </div>
          </div>

          <div class="chart-labels">
            <div 
              v-for="(data, index) in chartData" 
              :key="index"
              class="chart-label"
            >
              {{ data.label }}
            </div>
          </div>
        </div>
      </div>

      <div class="chart-period">
        <button 
          v-for="period in chartPeriods" 
          :key="period.value"
          @click="selectedPeriod = period.value"
          class="period-btn"
          :class="{ active: selectedPeriod === period.value }"
        >
          {{ period.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChartComponent',
  data() {
    return {
      selectedPeriod: '2024',
      chartPeriods: [
        { value: '2023', label: '2023' },
        { value: '2024', label: '2024' },
        { value: '6m', label: '6 mois' },
        { value: '3m', label: '3 mois' }
      ],
      chartData: [
        { label: 'Jan', transporteurs: 20, expediteurs: 12 },
        { label: 'Feb', transporteurs: 26, expediteurs: 24 },
        { label: 'Mar', transporteurs: 22, expediteurs: 22 },
        { label: 'May', transporteurs: 48, expediteurs: 47 },
        { label: 'Ven', transporteurs: 68, expediteurs: 30 },
        { label: 'Jul', transporteurs: 65, expediteurs: 12 },
        { label: 'Sep', transporteurs: 22, expediteurs: 5 }
      ],
      maxValue: 80,
      gridLines: [80, 60, 40, 20, 0]
    }
  }
}
</script>

<style scoped>
.charts-row {
  display: flex;
  justify-content: center;
  padding: 20px;
  background-color: #f8f9fa;
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

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;
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

.chart {
  display: flex;
  height: 350px;
  margin-bottom: 20px;
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

.chart-bars {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  height: calc(100% - 40px);
  position: relative;
  z-index: 2;
  padding: 0 20px;
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
  min-height: 2px;
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  transition: opacity 0.2s ease;
}

.chart-bar:hover {
  opacity: 0.8;
}

.chart-bar.transporteurs {
  background-color: #1e40af;
}

.chart-bar.expediteurs {
  background-color: #60a5fa;
}

.bar-value {
  font-size: 12px;
  font-weight: 500;
  color: #374151;
  position: absolute;
  top: -18px;
  white-space: nowrap;
}

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
</style>