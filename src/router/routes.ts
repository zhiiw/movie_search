import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '/index', component: () => import('pages/Index.vue') },
      { path: '/', component: () => import('src/pages/login/Login.vue')},
      { path: '/search', component: () => import('src/pages/details/MovieDetails.vue')},
      { path: '/people', name:'people',component: () => import('src/pages/details/ActorDetails.vue')},
      { path: '/movies', name:'movie',component: () => import('src/pages/details/MovieDetails.vue')},
      { path: '/admin', component: () => import('src/pages/Admin/Admin.vue')},
      { path: '/history', component: () => import('pages/History.vue')},
      { path: '/reg', component: () => import('src/pages/login/Register.vue')},
      { path: '/adminPeople', component: () => import('src/pages/Admin/AdminForPeople.vue')},  
      { path: '/adminComment', component: () => import('src/pages/Admin/AdminForComments.vue')},
      { path: '/about', component: () => import('pages/About.vue') },],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
