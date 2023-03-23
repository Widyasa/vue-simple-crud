import { createRouter, createWebHistory } from 'vue-router'
import TeamCreate from "@/views/TeamCreate.vue";
import teamEdit from "@/views/TeamEdit.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () =>import('../views/HomeView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/teams',
      name: 'teams',
      component: () => import('../views/TeamView.vue')
    },
    {
      path: '/teams/create',
      name: 'teamCreate',
      component: TeamCreate
    },
    {
      path: '/teams/edit/:id',
      name: 'teamEdit',
      component: teamEdit
    },
  ]
})

export default router
