import Vue from 'vue';
import VueRouter from 'vue-router';
import AboutPage from '@/Views/AboutPage/AboutPage';
import CompanyValuesPage from '@/Views/CompanyValuesPage/CompanyValuesPage';
import HomePage from '@/Views/HomePage/HomePage';
import ReportsPage from '@/Views/ReportsPage/ReportsPage';
import NotFoundPage from '@/Views/NotFoundPage/NotFoundPage';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/reports',
    name: 'ReportsPage',
    component: ReportsPage,
  },
  {
    path: '/about',
    name: 'AboutPage',
    component: AboutPage,
  },
  {
    path: '/company-values',
    name: 'CompanyValuesPage',
    component: CompanyValuesPage,
  },
  {
    path: '*',
    name: 'NotFoundPage',
    component: NotFoundPage,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
