import { createRouter, createWebHistory } from 'vue-router';

import Home from "../views/pages/Home.vue"
import Login from "../views/pages/Login.vue"
import Tournament from "../views/pages/Tournament.vue"

const routes = [
    { path: "/", component: Home },
    { path: "/login", component: Login },
    { path: "/tournament/:id", component: Article},

]

const router = createRouter({
    history: createWebHistory(),
    routes,
})


export default router;