import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Vote from '@/views/Vote.vue';
import Candidates from '@/views/Candidates.vue';
import Results from '@/views/Results.vue';
import Login from '@/views/Login.vue';

const routes = [
  {
    path: '/',
    component: Login
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/vote',
    name: 'Vote',
    component: Vote,
    meta: { requiresAuth: true }
  },
  {
    path: '/candidates',
    name: 'Candidates',
    component: Candidates,
    meta: { requiresAuth: true } 
  },
  {
    path: '/results',
    name: 'Results',
    component: Results,
    meta: { requiresAuth: true } 
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated'); 

  if (to.path === '/login' && isAuthenticated) {
    next('/home'); 
  } else if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
