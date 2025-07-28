<template>
  <div class="stat-card">
    <div class="icon" :style="{ backgroundColor: iconBg }">
      <i :class="icon"></i>
    </div>
    <div class="info">
      <h4>{{ title }}</h4>
      <p>{{ value }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  value: String,
  icon: String,
  iconBg: String
})
</script>

<style scoped>
.stat-card {
  display: flex;
  align-items: center;
  background: white;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
}
.icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
}
.info h4 {
  font-size: 1rem;
  font-weight: 600;
}
.info p {
  font-size: 1.2rem;
  font-weight: bold;
}
</style>
