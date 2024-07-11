import { createWebHistory, createRouter } from "vue-router";
import AppointmentPage from "../components/pages/AppointmentPage.vue";
import ContactPage from "../components/pages/ContactPage.vue";

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
    }
];


const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;