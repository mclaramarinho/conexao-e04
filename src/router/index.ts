import { createRouter, createWebHistory } from 'vue-router'
import PublicView from '../views/PublicView.vue'
import { isLoggedIn } from '@/firebase/authorization'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {path: '/', name: 'home', component: PublicView},
    {path: '/calendario', name: 'calendar', component: PublicView},
    {path: '/horario-de-aulas', name: 'class-schedule', component: PublicView},
    {path: '/contatos-importantes', name: 'important-contacts', component: PublicView},
    {path: '/faq', name: 'faq', component: PublicView},
    {path: '/admin/login', name: 'admin-login', meta: {requiresAuth: false},
    // TODO - REFACTOR - create a function to check if the user is logged in
      beforeEnter: (to, from, next) => {
        isLoggedIn().then(res => {
          if(res){
            next({name: 'retrieving-user-information', query: {redirect: 'admin-events'}})
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
      // TODO - REFACTOR - create a function to check if the user is logged in
      beforeEnter: (to, from, next) => {
        isLoggedIn().then(res => {
          if(res){
            next({name: 'retrieving-user-information', query: {redirect: 'admin-events'}})
            return;
          }
        }).catch(err => {
          next() 
        })
      },
      component: () => import('../views/AdminCreate.vue')
    },
    {path: '/admin/retrieving-user-information', name: 'retrieving-user-information',meta: {requiresAuth: false},
      component: () => import('../views/private/LoadingUserContent.vue'),
    },
    {path: '/admin/dashboard/:id', name: 'admin-dashboard', meta: {requiresAuth: true},
      children: [
        {path: '/admin/dashboard/:id/eventos', name: 'admin-events', meta: {requiresAuth: true},
          component: () => import('../views/private/AdminDashboard.vue')
        },
        {path: '/admin/dashboard/:id/disciplinas', name: 'admin-classes', meta: {requiresAuth: true},
          component: () => import('../views/private/AdminDashboard.vue')
        },
        {path: '/admin/dashboard/:id/contatos', name: 'admin-important-contacts', meta: {requiresAuth: true},
          component: () => import('../views/private/AdminDashboard.vue')
        },
        {path: '/admin/dashboard/:id/faq', name: 'admin-faq', meta: {requiresAuth: true},
          component: () => import('../views/private/AdminDashboard.vue')
        },
        {path: '/admin/dashboard/:id/configuracoes', name: 'admin-settings', meta: {requiresAuth: true},
          component: () => import('../views/private/AdminDashboard.vue')  
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth){
    if(from.name === undefined){
      next({path: '/admin/retrieving-user-information', query: {redirect: to.name}})
    }else if(from.name !== 'retrieving-user-information'){
      next({path: '/admin/retrieving-user-information', query: {redirect: to.name}})
    }else{
      // TODO - REFACTOR - stop calling next() twice
      next()
    }
  }else{
      next()
  }
})




export default router
 