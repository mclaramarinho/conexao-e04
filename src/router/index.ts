import { createRouter, createWebHistory } from 'vue-router'
import PublicView from '../views/PublicView.vue'
import { isLoggedIn } from '@/firebase/authorization'
import { useUserInfoStore } from '@/stores/userInfo'
import type { User } from 'firebase/auth'

const router = createRouter({
  history: createWebHistory(),
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
      meta: {requiresAuth: false},
      beforeEnter: (to, from, next) => {
        isLoggedIn().then(res => {
          if(res){
            next({name: 'retrieving-user-information', query: {redirect: 'admin-dashboard'}})
            return;
          }
        }).catch(err => {
          next() 
        })
      },
      component: () => import('../views/AdminLogin.vue')
    },
    {
      path: '/admin/create',
      name: 'admin-create',
      meta: {requiresAuth: false},
      beforeEnter: (to, from, next) => {
        isLoggedIn().then(res => {
          if(res){
            next({name: 'retrieving-user-information', query: {redirect: 'admin-dashboard'}})
            return;
          }
        }).catch(err => {
          next() 
        })
      },
      component: () => import('../views/AdminCreate.vue')
    },
    {
      path: '/admin/retrieving-user-information',
      name: 'retrieving-user-information',
      meta: {requiresAuth: false},
      
      component: () => import('../views/private/LoadingUserContent.vue'),
    },
    {
      path: '/admin/dashboard/:id',
      name: 'admin-dashboard',
      meta: {requiresAuth: true, avoid: false},
      component: () => import('../views/private/AdminDashboard.vue'),
      children: [
        {
          path: '/admin/dashboard/:id/eventos',
          name: 'admin-events',
          meta: {requiresAuth: true, avoid: false},
          component: () => import('../views/private/AdminDashboard.vue')
        },
        {
          path: '/admin/dashboard/:id/disciplinas',
          name: 'admin-classes',
          meta: {requiresAuth: true, avoid: false},
          component: () => import('../views/private/AdminDashboard.vue')
        },
        {
          path: '/admin/dashboard/:id/contatos',
          name: 'admin-important-contacts',
          meta: {requiresAuth: true, avoid: false},
          component: () => import('../views/private/AdminDashboard.vue')
        },
        {
          path: '/admin/dashboard/:id/faq',
          name: 'admin-faq',
          meta: {requiresAuth: true, avoid: false},
          component: () => import('../views/private/AdminDashboard.vue')
        },
        {
          path: '/admin/dashboard/:id/configuracoes',
          name: 'admin-settings',
          meta: {requiresAuth: true, avoid: false},
          component: () => import('../views/private/AdminDashboard.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {

  if(to.meta.requiresAuth){
    console.log(to.name);
    console.log(from.name);

    if(from.name === undefined){
      next({path: '/admin/retrieving-user-information', query: {redirect: to.name}})
    }else if(from.name !== 'retrieving-user-information'){
      next({path: '/admin/retrieving-user-information', query: {redirect: to.name}})
    }else{
      next()
    }
  }else{
      next()
  }
  
})




export default router
