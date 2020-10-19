import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../Views/Home';
import Reports from '../Views/Reports';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/reports',
    name: 'Reports',
    component: Reports,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
