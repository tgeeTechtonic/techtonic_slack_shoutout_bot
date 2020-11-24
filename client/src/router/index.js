import Vue from 'vue';
import VueRouter from 'vue-router';
import About from '../Views/About/About';
import CompanyValues from '../Views/CompanyValues/CompanyValues';
import Home from '../Views/Home/Home';
import Reports from '../Views/Reports/Reports';

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
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/company-values',
    name: 'CompanyValues',
    component: CompanyValues,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
