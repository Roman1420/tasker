import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import StatsPage from './pages/StatsPage.vue'
import TasksPage from './pages/TasksPage.vue'

const app = createApp(App)

const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', component: StatsPage },
      { path: '/tasks', component: TasksPage },
    //   { path: '/contact', component: Contact }
    ]
})

app.use(router)
app.mount('#app')
