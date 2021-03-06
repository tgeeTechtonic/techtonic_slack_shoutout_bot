import Vue from 'vue';
import VueRouter from 'vue-router';
import AboutPage from '@/Views/AboutPage/AboutPage';
import CompanyValuesPage from '@/Views/CompanyValuesPage/CompanyValuesPage';
import HomePage from '@/Views/HomePage/HomePage';
import ReportsPage from '@/Views/ReportsPage/ReportsPage';
import AllShouts from '@/Views/ReportsPage/AllShouts';
import MonthlyReports from '@/Views/ReportsPage/MonthlyReports';
import UserReports from '@/Views/ReportsPage/UserReports';
import LoginPage from '@/Views/LoginPage/LoginPage';
import LogoutPage from '@/Views/LogoutPage/LogoutPage';
import NotFoundPage from '@/Views/NotFoundPage/NotFoundPage';
import store from '../store/store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'LoginPage',
    component: LoginPage,
  },
  {
    path: '/home',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/reports',
    name: 'ReportsPage',
    component: ReportsPage,
    children: [
      {
        path: 'monthly',
        name: 'MonthlyReports',
        component: MonthlyReports,
      },
      {
        path: 'users',
        name: 'User Reports',
        component: UserReports,
      },
      {
        path: 'all-shoutouts',
        name: 'All Shouts',
        component: AllShouts,
      },
    ],
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
    path: '/logout',
    name: 'LogoutPage',
    component: LogoutPage,
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

router.beforeEach((to, from, next) => {
  const notLoggedIn = to.name !== 'LoginPage' && !store.state.employee.firstName;

  if (notLoggedIn) next({ name: 'LoginPage' });
  else next();
});

export default router;
