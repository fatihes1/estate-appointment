import { createWebHistory, createRouter } from "vue-router";
import AppointmentPage from "../components/pages/AppointmentPage.vue";
import ContactPage from "../components/pages/ContactPage.vue";
import AgentPage from "../components/pages/AgentPage.vue";

const routes = [
    {
        path: "/",
        name: "Appointment",
        component: AppointmentPage,
    },
    {
        path: '/clients',
        name: 'Clients',
        component: ContactPage
    },
    {
        path: '/agents',
        name: 'Agents',
        component: AgentPage
    }
];


const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;