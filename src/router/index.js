import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Wolves from '../views/Wolves.vue'
import Packs from '../views/Packs.vue'
import Wolf from '../views/Wolf.vue'
import Pack from '../views/Pack.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/wolves',
    name: 'wolves',
    component: Wolves
  },
  {
    path: '/packs',
    name: 'packs',
    component: Packs
  },
  {
    path: '/wolves/:id',
    name: 'wolf',
    component: Wolf,
    props: true
  },
  {
    path: '/packs/:id',
    name: 'pack',
    component: Pack,
    props: true
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
