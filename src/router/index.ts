import { createRouter, createWebHistory } from 'vue-router'
import PublicView from '../views/PublicView.vue'
import { isLoggedIn } from '@/firebase/authorization'
import { useNavigationHistory } from '@/stores/useNavigationHistory'
import { useUserInfoStore } from '@/stores/userInfo'
import type { IUser } from '@/interfaces/IUser'
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
      meta: {requiresAuth: false, avoid: true},
      component: () => import('../views/AdminLogin.vue')
    },
    {
      path: '/admin/create',
      name: 'admin-create',
      meta: {requiresAuth: false, avoid: true},
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
      meta: {requiresAuth: true},
      component: () => import('../views/private/AdminDashboard.vue'),
      children: [
        {
          path: '/admin/dashboard/:id/eventos',
          name: 'admin-events',
          meta: {requiresAuth: true},
          component: () => import('../views/private/AdminDashboard.vue')
        },
        {
          path: '/admin/dashboard/:id/disciplinas',
          name: 'admin-classes',
          meta: {requiresAuth: true},
          component: () => import('../views/private/AdminDashboard.vue')
        },
        {
          path: '/admin/dashboard/:id/contatos',
          name: 'admin-important-contacts',
          meta: {requiresAuth: true},
          component: () => import('../views/private/AdminDashboard.vue')
        },
        {
          path: '/admin/dashboard/:id/faq',
          name: 'admin-faq',
          meta: {requiresAuth: true},
          component: () => import('../views/private/AdminDashboard.vue')
        },
        {
          path: '/admin/dashboard/:id/configuracoes',
          name: 'admin-settings',
          meta: {requiresAuth: true},
          component: () => import('../views/private/AdminDashboard.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log("hahaa");

  if(to.meta.avoid){
    isLoggedIn().then(res => {
      if(res){
        next({name: 'retrieving-user-information', query: {redirect: 'admin-dashboard'}})
      }
    }).catch(err => {
      next() 
    })
  }else{

    let nextPath = "";
    if(to.meta.requiresAuth){
      console.log("hehe");

      isLoggedIn().then((loggedIn) => {
        if(loggedIn){
          console.log("loggedIn");
          
          //an user is logged in but another is stored
          if(useUserInfoStore().UID !== (loggedIn as User).uid){
            nextPath = '/admin/login'
          }
          //user is logged in and the same is stored
          else{
            nextPath = '/admin/retrieving-user-information'
          }
          console.log("nextPath", nextPath);
          console.log("from", from.path);
          
          if(from.path !== '/admin/retrieving-user-information'){
            
            if(nextPath === '/admin/retrieving-user-information'){
              next({path: nextPath, query: {redirect: to.name}})
            }else{
              next({path: nextPath})
            }
          }else{
            next()
          }
        }
      }).catch(err => {
        nextPath = '/admin/login'
        console.log("err");
        
        if(to.meta.requiresAuth){
          console.log("requiresAuth");
          next({path: nextPath})
        }
      })
    }else{
      next()
    }
  }
  
})




export default router
