const router = new createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', component: Home },
      { path: '/about', component: About },
      { path: '/contact', component: Contact }
    ]
})