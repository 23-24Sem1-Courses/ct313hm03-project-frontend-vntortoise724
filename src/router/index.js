import { createWebHistory, createRouter } from "vue-router";
import GameStore from '@/views/GameStore.vue';
import UserList from '@/views/COGUserlist.vue';
import Error from '@/views/NotFound.vue';

const routes = [
    {
        path: '/games',
        name: 'gamestore',
        component: GameStore
    },

    {
        path: '/users',
        name: 'userlist',
        component:UserList,
    },

    {
        path: '/:pathMath(.*)*',
        name: 'notfound',
        component: Error,
    },

    {
        path: '/',
        name: 'register',
        component: () => import ('@/views/COGRegister.vue'),
    },

    {
        path: '/users/wishlist',
        name: 'wishlist',
        component: () => import ('@/views/COGWishlist.vue'),
    },

    {
        path: '/users/cart',
        name: 'cart',
        component: () => import('@/views/COGCart.vue'),
    },

    {
        path: '/users/:id',
        name: 'userInfo',
        component: () => import ('@/views/COGUser.vue'),
        props: (route) => ({ userId: route.params.id })
    },

    {
        path: '/users/login',
        name: 'login',
        component: () => import ('@/views/COGLogin.vue'),
    },

    {
        path: '/users/account',
        name: 'account',
        component: () => import ('@/views/COGUser.vue'),
    },

];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;