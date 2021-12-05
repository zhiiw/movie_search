import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Index.vue') },
      { path: '/login', component: () => import('pages/Login.vue')},
      { path: '/search', component: () => import('src/pages/MovieDetails.vue')},

      { path: '/reg', component: () => import('pages/Register.vue')},],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;