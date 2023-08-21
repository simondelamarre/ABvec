import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/ABLine',
    name: 'AbDistance',
    component: () => import(/* webpackChunkName: "AbDistance" */ '../views/AbDistance.vue')
  },
  {
    path: '/ABMathLine',
    name: 'AbVectorLineDistance',
    component: () => import(/* webpackChunkName: "AbVectorLineDistance" */ '../views/AbVectorLineDistance.vue')
  },
  {
    path: '/AcBMath',
    name: 'AcBMath',
    component: () => import(/* webpackChunkName: "AcBMath" */ '../views/AcBMath.vue')
  },
  {
    path: '/AcBCubicMath',
    name: 'AcBCubicMath',
    component: () => import(/* webpackChunkName: "AcBCubicMath" */ '../views/AcBCubicMath.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
