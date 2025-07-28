import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from '../components/Dashboard.vue'
import UserForm from '../components/UserForm.vue'
import EqueteForm from '../components/EnqueteForm.vue'
import ReponseForm from '../components/ReponseForm.vue'
import PersonneForm from '../components/PersonneForm.vue'
import CampagneForm from '../components/CampagneForm.vue'
import AdminDashBoard from '../components/AdminDashBoard.vue'

const routes = [
  { path: '/', name: 'Dashboard', component: Dashboard },
  {path: '/user', name: 'UserForm', component: UserForm },
  {path: '/equete', name: 'EqueteForm', component: EqueteForm },
  {path: '/reponse', name: 'ReponseForm', component: ReponseForm },
  {path: '/personne', name: 'PersonneForm', component: PersonneForm },
  {path: '/campagne/', name: 'CampagneForm', component: CampagneForm },
  {path: '/admin', name: 'AdminDashBoard', component: AdminDashBoard },



]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
