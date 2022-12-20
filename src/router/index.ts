import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import CatalogView from '../views/CatalogView.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import LoginLayout from '@/layouts/LoginLayout.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'catalog',
    component: CatalogView,
    meta: {
      layout: DefaultLayout
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue'),
    meta: {
      layout: LoginLayout
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  const isLoggedIn = localStorage.getItem('user') || ''
  const isCurrentPath = to.name === 'login'

  if(!isLoggedIn && !isCurrentPath) {
    return {name: 'login'}
  }
  if(isLoggedIn && isCurrentPath) {
    router.push('/')
  }
  
})
export default router
