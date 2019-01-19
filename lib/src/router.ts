import Vue from 'vue';
import Router from 'vue-router';
// <!-- LOGIN_START -->
import store from '@/store/index';
// <!-- LOGIN_END -->

import HomeView from '@/views/HomeView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import ExampleView from '@/views/ExampleView.vue';
// <!-- PATCHNOTES_START -->
import PatchNotesView from '@/views/PatchNotesView.vue';
// <!-- PATCHNOTES_END -->
// <!-- LOGIN_START -->
import LoginView from '@/views/LoginView.vue';
// <!-- LOGIN_END -->

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // <!-- LOGIN_START -->
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresAuth: false },
    },
    // <!-- LOGIN_END -->
    {
      path: '/',
      name: 'home',
      component: HomeView,
      // <!-- LOGIN_START -->
      meta: { requiresAuth: true },
      // <!-- LOGIN_END -->
    },
    {
      path: '/example',
      name: 'example',
      component: ExampleView,
      // <!-- LOGIN_START -->
      meta: { requiresAuth: true },
      // <!-- LOGIN_END -->
    },
    // <!-- PATCHNOTES_START -->
    {
      path: '/patch-notes',
      name: 'patch-notes',
      component: PatchNotesView,
      // <!-- LOGIN_START -->
      meta: { requiresAuth: true },
      // <!-- LOGIN_END -->
    },
    // <!-- PATCHNOTES_END -->
    {
      path: '*',
      component: NotFoundView,
      // <!-- LOGIN_START -->
      meta: { requiresAuth: true },
      // <!-- LOGIN_END -->
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
});

// <!-- LOGIN_START -->
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (store.state.LoginModule.isLoggedIn) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});
// <!-- LOGIN_END -->

export default router;
