import { createRouter, createWebHistory } from 'vue-router'
import type { ListKind } from '@/types/hn'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    kind?: ListKind
  }
}

const ListView = () => import('@/views/ListView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, top: 8 }
    return { top: 0 }
  },
  routes: [
    { path: '/', name: 'home', component: ListView, meta: { kind: 'top' } },
    { path: '/news', name: 'news', component: ListView, meta: { kind: 'top' } },
    { path: '/newest', name: 'newest', component: ListView, meta: { kind: 'new', title: 'New Links' } },
    { path: '/best', name: 'best', component: ListView, meta: { kind: 'best', title: 'Top Links' } },
    { path: '/ask', name: 'ask', component: ListView, meta: { kind: 'ask', title: 'Ask' } },
    { path: '/show', name: 'show', component: ListView, meta: { kind: 'show', title: 'Show' } },
    { path: '/jobs', name: 'jobs', component: ListView, meta: { kind: 'job', title: 'Jobs' } },
    { path: '/item', name: 'item', component: () => import('@/views/ItemView.vue') },
    { path: '/user', name: 'user', component: () => import('@/views/UserView.vue') },

    // Paths used by earlier versions of this app.
    { path: '/new', redirect: '/newest' },
    { path: '/item/:id', redirect: (to) => ({ path: '/item', query: { id: to.params.id } }) },
    { path: '/story/:id', redirect: (to) => ({ path: '/item', query: { id: to.params.id } }) },
    { path: '/user/:id', redirect: (to) => ({ path: '/user', query: { id: to.params.id } }) },

    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: () => import('@/views/NotFound.vue'),
      meta: { title: 'Not Found' },
    },
  ],
})

router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} | Hacker News` : 'Hacker News'
})

export default router
