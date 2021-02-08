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
// import { Cache } from 'aws-amplify';
// import { Auth } from 'aws-amplify';

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

router.beforeResolve(async (to, from, next) => {
  // const { attributes } = await Auth.currentAuthenticatedUser();
  // console.log('_', to, from, next);
  // console.log('asddas', attributes);
  console.log('before resolves', to, from, next);
});


router.beforeEach(async (to, from, next) => {
  // let notLoggedIn = true;
  // try {
  //   const { attributes } = await Auth.currentAuthenticatedUser();
  //   console.log('asddas', attributes);
  //   if (attributes.email) {
  //     await this.$store.dispatch('doLogin', 'bob');
  //     // this.$router.push('/home');
  //   }
  //   notLoggedIn = false;
  // } catch (error) {
  //   console.log(error);
  //   notLoggedIn = true;
  // }

  // const { attributes } = await Auth.currentAuthenticatedUser();
  // console.log('asddas', attributes);
  // if (attributes.email) {
  //   await this.$store.dispatch('doLogin', 'bob');
  //   this.$router.push('/home');
  // }
  console.log('before each');

  const notLoggedIn =
    to.name !== 'LoginPage' && !store.state.employee.firstName;

  if (notLoggedIn) next({ name: 'LoginPage' });
  else next();
});

export default router;
