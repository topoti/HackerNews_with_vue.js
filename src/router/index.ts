import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AboutView from '@/views/AboutView.vue'
import Jobs from '@/views/Jobs.vue'
import NotFound from '@/views/NotFound.vue'
import StoryView from '@/views/StoryView.vue'
import UserView from '@/views/UserView.vue'
import BestStories from '@/views/BestStories.vue'
import NewStories from '@/views/NewStories.vue'
import AskStories from '@/views/AskStories.vue'
import CommentView from '@/views/CommentView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/story/:id',
      name: 'StoryView',
      component: StoryView
    },
    {
      path: '/user/:id',
      name: 'UserView',
      component: UserView
    },
    {
      path: '/item/:id',
      name: 'CommentView',
      component: CommentView
    },
    {
      path: '/best',
      name: 'BestStories',
      component: BestStories
    },
    {
      path: '/new',
      name: 'NewStories',
      component: NewStories
    },
    {
      path: '/ask',
      name: 'AskStories',
      component: AskStories
    },
    {
      path: '/about',
      name: 'About',
      component: AboutView
    },
    {
      path: '/jobs',
      name: 'Jobs',
      component: Jobs
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFound
    }
  ],
})

export default router
