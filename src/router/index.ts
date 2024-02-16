import { createRouter, createWebHistory } from 'vue-router'
import PublicView from '../views/PublicView.vue'
import { isLoggedIn } from '@/firebase/authorization'

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
    },
    {
      path: '/admin/login',
      name: 'admin-login',
      beforeEnter: (to, from, next) => {
        isLoggedIn().then((loggedIn) => {
          if(loggedIn){
            console.log(loggedIn);
            
              next({name: 'retrieving-user-information'})
          } else {
            next()
          }
        })
      },
      component: () => import('../views/AdminLogin.vue')
    },
    {
      path: '/admin/create',
      name: 'admin-create',
      component: () => import('../views/AdminCreate.vue')
    },
    {
      path: '/admin/retrieving-user-information',
      name: 'retrieving-user-information',
      component: () => import('../views/private/LoadingUserContent.vue'),
    },
    {
      path: '/admin/dashboard/:id',
      name: 'admin-dashboard',
      beforeEnter: (to, from, next) => {
        isLoggedIn().then((loggedIn) => {
          if(loggedIn){
            next()
          } else {
            next({name: 'admin-login'})
          }
        })
      },
      component: () => import('../views/private/AdminDashboard.vue'),
      children: [
        {
          path: 'calendario',
          name: 'admin-calendar',
          component: () => import('../views/private/AdminDashboard.vue')
        },
        {
          path: 'horario-de-aulas',
          name: 'admin-class-schedule',
          component: () => import('../views/private/AdminDashboard.vue')
        },
        {
          path: 'contatos-importantes',
          name: 'admin-important-contacts',
          component: () => import('../views/private/AdminDashboard.vue')
        },
        {
          path: 'faq',
          name: 'admin-faq',
          component: () => import('../views/private/AdminDashboard.vue')
        },
        {
          path: 'configuracoes',
          name: 'admin-settings',
          component: () => import('../views/private/AdminDashboard.vue')
        }
      ]
    }
  ]
})

export default router
