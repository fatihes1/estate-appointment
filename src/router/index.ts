import { createWebHistory, createRouter } from 'vue-router'
import ContactPage from '@/components/pages/ContactPage.vue'
import AgentPage from '@/components/pages/AgentPage.vue'
import AppointmentPage from '@/components/pages/AppointmentPage.vue'
import DashboardPage from '@/components/pages/DashboardPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: DashboardPage,
  },
  {
    path: '/clients',
    name: 'Clients',
    component: ContactPage,
  },
  {
    path: '/agents',
    name: 'Agents',
    component: AgentPage,
  },
  {
    path: '/appointments',
    name: 'Appointments',
    component: AppointmentPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
