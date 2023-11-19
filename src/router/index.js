import { createWebHistory, createRouter } from "vue-router";
import GameStore from '@/views/GameStore.vue';
import Error from '@/views/NotFound.vue';

const routes = [
    {
        path: '/',
        name: 'gamestore',
        component: GameStore,
    },

    {
        path: '/:pathMath(.*)*',
        name: 'notfound',
        component: Error,
    },

    {
        path: '/users/register',
        name: 'register',
        component: () => import ('@/views/COGRegister.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;