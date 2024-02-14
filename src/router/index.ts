import { createRouter, createWebHistory } from 'vue-router'
import PublicView from '../views/PublicView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: PublicView
    },
    {
      path: '/calendario',
      name: 'calendar',
      component: PublicView
    },
    {
      path: '/horario-de-aulas',
      name: 'class-schedule',
      component: PublicView
    },
    {
      path: '/contatos-importantes',
      name: 'important-contacts',
      component: PublicView
    },
    {
      path: '/faq',
      name: 'faq',
      component: PublicView
    }
  ]
})

export default router
