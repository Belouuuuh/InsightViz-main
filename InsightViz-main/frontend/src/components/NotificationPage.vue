<template>
  <div class="notification-container">
    <!-- Barre de navigation avec notifications -->
    <nav class="notification-nav bg-white/80 backdrop-blur-lg border-b border-gray-200/60 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Titre -->
          <div class="flex items-center space-x-4">
            <h1 class="text-xl font-bold text-gray-900">Dashboard</h1>
          </div>
          
          <!-- Bouton notifications -->
          <div class="relative">
            <button
              @click="toggleNotifications"
              class="notification-btn relative p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-110"
              :class="{ 'bg-blue-50 text-blue-600': showNotifications }"
            >
              <!-- Icône de notification en SVG -->
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 6V8H20L19 12V22H17V16H15V22H13V12L12 8H11L10 12V22H8V16H6V22H4V12L3 8H2V6H21Z"/>
              </svg>
              
              <!-- Badge de notification -->
              <span 
                v-if="unreadCount > 0" 
                class="notification-badge absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse"
              >
                {{ unreadCount > 9 ? '9+' : unreadCount }}
              </span>
            </button>

            <!-- Panneau de notifications -->
            <Transition name="slide-fade">
              <div 
                v-if="showNotifications"
                class="notification-panel absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50"
                @click.stop
              >
                <!-- En-tête -->
                <div class="notification-header bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-3 text-white">
                  <div class="flex items-center justify-between">
                    <h3 class="font-semibold text-lg">Activité récente</h3>
                    <button
                      @click="markAllAsRead"
                      class="text-blue-100 hover:text-white text-sm font-medium transition-colors duration-200"
                      :disabled="loading"
                    >
                      Tout marquer lu
                    </button>
                  </div>
                </div>

                <!-- Liste des notifications -->
                <div class="notification-list max-h-80 overflow-y-auto">
                  <!-- État de chargement -->
                  <div v-if="loading" class="flex items-center justify-center p-8">
                    <div class="loading-spinner w-8 h-8 border-3 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
                  </div>

                  <!-- État d'erreur -->
                  <div v-else-if="error" class="p-4 text-center text-red-600">
                    <svg class="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <p class="text-sm">Erreur lors du chargement</p>
                    <button 
                      @click="fetchActivities" 
                      class="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Réessayer
                    </button>
                  </div>

                  <!-- Liste des activités -->
                  <div v-else-if="recentActivities.length > 0" class="divide-y divide-gray-100">
                    <div
                      v-for="activity in recentActivities"
                      :key="activity.id"
                      class="activity-item p-4 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 cursor-pointer transition-all duration-300 transform hover:translate-x-1"
                      :class="{ 'bg-blue-50/50': !activity.read }"
                      @click="markAsRead(activity.id)"
                    >
                      <div class="flex items-start space-x-3">
                        <!-- Icône avec animation -->
                        <div 
                          class="activity-icon flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                          :class="getIconClass(activity.type)"
                        >
                          <component :is="getIcon(activity.type)" class="w-5 h-5" />
                        </div>

                        <!-- Contenu -->
                        <div class="flex-1 min-w-0">
                          <p class="text-sm font-medium text-gray-900 leading-5">
                            {{ activity.text }}
                          </p>
                          <div class="mt-1 flex items-center space-x-2">
                            <time class="text-xs text-gray-500">{{ formatTime(activity.time) }}</time>
                            <span v-if="!activity.read" class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                          </div>
                        </div>

                        <!-- Actions -->
                        <div class="flex-shrink-0">
                          <button
                            @click.stop="dismissActivity(activity.id)"
                            class="opacity-0 group-hover:opacity-100 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-all duration-200"
                            title="Ignorer"
                          >
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- État vide -->
                  <div v-else class="p-8 text-center text-gray-500">
                    <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 6V8H20L19 12V22H17V16H15V22H13V12L12 8H11L10 12V22H8V16H6V22H4V12L3 8H2V6H21Z"/>
                    </svg>
                    <p class="text-sm">Aucune notification</p>
                  </div>
                </div>

                <!-- Pied de page -->
                <div class="notification-footer bg-gray-50 px-4 py-3 border-t border-gray-100">
                  <button
                    @click="showAllNotifications"
                    class="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                  >
                    Voir toutes les notifications
                  </button>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </nav>

    <!-- Overlay pour fermer le panneau -->
    <div 
      v-if="showNotifications"
      class="fixed inset-0 z-40"
      @click="showNotifications = false"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Types
interface Activity {
  id: number
  type: 'survey' | 'response' | 'user' | 'system'
  text: string
  time: string
  timestamp: number
  read: boolean
}

// État réactif
const showNotifications = ref(false)
const recentActivities = ref<Activity[]>([])
const loading = ref(false)
const error = ref(false)

// État calculé
const unreadCount = computed(() => 
  recentActivities.value.filter(activity => !activity.read).length
)

// Méthodes principales
const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value
  if (showNotifications.value && recentActivities.value.length === 0) {
    fetchActivities()
  }
}

// API simulée
const fetchActivities = async () => {
  loading.value = true
  error.value = false
  
  try {
    // Simulation d'une requête API
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const mockData: Activity[] = [
      {
        id: 1,
        type: 'survey',
        text: 'Nouvelle enquête "Satisfaction Client 2024" créée par Marie Dubois',
        time: '2 heures',
        timestamp: Date.now() - 2 * 60 * 60 * 1000,
        read: false
      },
      {
        id: 2,
        type: 'response',
        text: '15 nouvelles réponses reçues pour l\'enquête "Feedback Produit"',
        time: '3 heures',
        timestamp: Date.now() - 3 * 60 * 60 * 1000,
        read: false
      },
      {
        id: 3,
        type: 'user',
        text: 'Nouvel utilisateur Pierre Martin ajouté au système',
        time: '5 heures',
        timestamp: Date.now() - 5 * 60 * 60 * 1000,
        read: true
      },
      {
        id: 4,
        type: 'system',
        text: 'Mise à jour système terminée avec succès',
        time: '1 jour',
        timestamp: Date.now() - 24 * 60 * 60 * 1000,
        read: true
      }
    ]
    
    recentActivities.value = mockData
  } catch (err) {
    error.value = true
    console.error('Erreur lors du chargement des activités:', err)
  } finally {
    loading.value = false
  }
}

// Actions
const markAsRead = (id: number) => {
  const activity = recentActivities.value.find(a => a.id === id)
  if (activity) {
    activity.read = true
  }
}

const markAllAsRead = () => {
  recentActivities.value.forEach(activity => {
    activity.read = true
  })
}

const dismissActivity = (id: number) => {
  recentActivities.value = recentActivities.value.filter(a => a.id !== id)
}

const showAllNotifications = () => {
  showNotifications.value = false
  console.log('Affichage de toutes les notifications')
  // Ici on pourrait naviguer vers une page dédiée ou ouvrir un modal simple
}

// Utilitaires
const getIconClass = (type: string) => {
  const classes = {
    survey: 'bg-blue-100 text-blue-600 hover:bg-blue-200',
    response: 'bg-green-100 text-green-600 hover:bg-green-200',
    user: 'bg-purple-100 text-purple-600 hover:bg-purple-200',
    system: 'bg-orange-100 text-orange-600 hover:bg-orange-200'
  }
  return classes[type] || classes.system
}

const getIcon = (type: string) => {
  return type + '-icon'
}

const formatTime = (time: string) => {
  return `Il y a ${time}`
}

// Gestion des événements globaux
const handleClickOutside = (event: Event) => {
  const target = event.target as Element
  if (!target.closest('.notification-container')) {
    showNotifications.value = false
  }
}

// Cycle de vie
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  // Chargement initial des données
  fetchActivities()
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// Composants d'icônes
const SurveyIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
    </svg>
  `
}

const ResponseIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
    </svg>
  `
}

const UserIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
    </svg>
  `
}

const SystemIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
    </svg>
  `
}
</script>

<style scoped>
/* Transitions */
.slide-fade-enter-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 1, 0.5);
}

.slide-fade-enter-from {
  transform: translateY(-10px) scale(0.95);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateY(-5px) scale(0.98);
  opacity: 0;
}
/* Animations personnalisées */
@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0, 0, 0);
  }
  40%, 43% {
    transform: translate3d(0, -8px, 0);
  }
  70% {
    transform: translate3d(0, -4px, 0);
  }
  90% {
    transform: translate3d(0, -2px, 0);
  }
}

.notification-badge {
  animation: bounce 2s infinite;
}

/* Effet de backdrop blur pour les navigateurs qui ne le supportent pas */
@supports not (backdrop-filter: blur()) {
  .notification-nav {
    background-color: rgba(255, 255, 255, 0.95);
  }
}

/* Spinner de chargement */
.loading-spinner {
  border-width: 3px;
}

/* Scrollbar personnalisée */
.notification-list::-webkit-scrollbar {
  width: 4px;
}

.notification-list::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.notification-list::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 2px;
}

.notification-list::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Responsive design */
@media (max-width: 640px) {
  .notification-panel {
    width: calc(100vw - 2rem);
    right: -1rem;
  }
  
  .notification-nav {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

/* États de focus améliorés */
.notification-btn:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Animation des éléments d'activité */
.activity-item {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.activity-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);
  transition: left 0.5s;
}

.activity-item:hover::before {
  left: 100%;
}

/* Effet de groupe pour les boutons d'action */
.activity-item:hover .group-hover\:opacity-100 {
  opacity: 1;
}
</style>