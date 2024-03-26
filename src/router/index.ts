import { createRouter, createWebHistory } from 'vue-router';
import StatsPage from '../pages/StatsPage.vue'
import TasksPage from '../pages/TasksPage.vue'

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: StatsPage
        },
        {
            path: '/tasks',
            component: TasksPage
        },
    ]
})
