import { createRouter, createWebHistory } from 'vue-router'

// Pages générales
import Accueil from '../components/Acceuil.vue'
import Dashboard from '../components/Dashboard.vue'
import DataTable from '../components/DataTable.vue'

// Page admin
import EnqueteForm from '../components/EnqueteForm.vue'
import ReponseForm from '../components/ReponseForm.vue'
import PersonneForm from '../components/PersonneForm.vue'
import CampagneForm from '../components/CampagneForm.vue'

// Pages spéciales
import AdminDashBoard from '../components/AdminDashBoard.vue'
import NotificationPage from '../components/NotificationPage.vue'
import EmployeeScoring from '../components/EmployeeScoring.vue'

// Pages utilisateur avec sous-pages
import UserPage from '../components/UserPage.vue'
import SurveyPage from '../components/SurveyPage.vue'
import CampaignPage from '../components/CampaignPage.vue'
import PersonPage from '../components/PersonPage.vue'
import ResponsePage from '../components/ResponsePage.vue'


const routes = [
  // Pages principales
  { path: '/', name: 'Accueil', component: Accueil },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/DataTable', name: 'DataTable', component: DataTable },


  // Page admin
  { path: '/enquete', name: 'EnqueteForm', component: EnqueteForm },
  { path: '/reponse', name: 'ReponseForm', component: ReponseForm },
  { path: '/personne', name: 'PersonneForm', component: PersonneForm },
  { path: '/campagne', name: 'CampagneForm', component: CampagneForm },

  // Pages spéciales
  { path: '/admin', name: 'AdminDashBoard', component: AdminDashBoard,  meta: { requiresAuth: true, role: 'admin' } },
  { path: '/notification', name: 'NotificationPage', component: NotificationPage },
  { path: '/employee', name: 'EmployeeScoring', component: EmployeeScoring },
  
  // Pages utilisateur avec sous-routes
  {path: '/user', name: 'user', component: UserPage, meta: { requiresAuth: true, role: 'utilisateur' }},
  {path: '/survey', name: 'SurveyPage', component: SurveyPage },
  {path: '/response', name: 'ResponsePage', component: ResponsePage },
  {path: '/person', name: 'PersonPage', component: PersonPage },
  {path: '/campaign', name: 'CampaignPage', component: CampaignPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guard de navigation pour vérifier l'authentification et les rôles
router.beforeEach((to, from, next) => {
  const connectedUser = JSON.parse(
    localStorage.getItem('connectedUser') || 
    sessionStorage.getItem('connectedUser') || 
    'null'
  )

  if (to.meta.requiresAuth) {
    if (!connectedUser) {
      // Rediriger vers la page d'accueil si non connecté
      next('/')
      return
    }

    if (to.meta.role && connectedUser.role !== to.meta.role) {
      // Rediriger vers la page appropriée selon le rôle
      if (connectedUser.role === 'admin') {
        next('/admin')
      } else {
        next('/user')
      }
      return
    }
  }

  next()
})

export default router
