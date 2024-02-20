import { createRouter, createWebHistory } from 'vue-router'
import PublicView from '../views/PublicView.vue'
import { isLoggedIn } from '@/firebase/authorization'
import { useNavigationHistory } from '@/stores/useNavigationHistory'

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
            useNavigationHistory().setPreviousRoute('/admin/login');
            next({name: 'retrieving-user-information'})
          }
        }).catch((error) => {
          next()
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
          }else{
            next({name: 'retrieving-user-information'})
          }
        }).catch((error) => {
          next({name: 'admin-login'})
        })
      },
      component: () => import('../views/private/AdminDashboard.vue'),
      children: [
        {
          path: '/admin/dashboard/:id/eventos',
          name: 'admin-calendar',
          component: () => import('../views/private/AdminDashboard.vue')
        },
        {
          path: '/admin/dashboard/:id/disciplinas',
          name: 'admin-class-schedule',
          component: () => import('../views/private/AdminDashboard.vue')
        },
        {
          path: '/admin/dashboard/:id/contatos',
          name: 'admin-important-contacts',
          component: () => import('../views/private/AdminDashboard.vue')
        },
        {
          path: '/admin/dashboard/:id/faq',
          name: 'admin-faq',
          component: () => import('../views/private/AdminDashboard.vue')
        },
        {
          path: '/admin/dashboard/:id/configuracoes',
          name: 'admin-settings',
          component: () => import('../views/private/AdminDashboard.vue')
        }
      ]
    }
  ]
})

export default router
