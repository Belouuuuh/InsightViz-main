<template>
  <header class="flex items-center justify-between bg-white shadow px-6 py-4 sticky top-0 z-40">
    <!-- Hamburger Button pour mobile -->
    <button
      @click="$emit('toggleSidebar')"
      class="text-gray-700 md:hidden focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
      aria-label="Toggle sidebar"
    >
      <svg
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
    </button>

    <div class="text-xl font-bold text-indigo-700">InsightViz</div>

    <div>
      <!-- Place pour bouton profil ou autre actions -->
      <slot></slot>
    </div>
  </header>
</template>

<script setup>
// Pas de logique interne nécessaire ici
</script>

<style scoped>
/* Juste un peu de style simple */
</style>
