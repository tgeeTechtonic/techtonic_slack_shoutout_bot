import Vue from 'vue';
import App from './App.vue';
import VueApexCharts from 'vue-apexcharts';
import Vuetify from 'vuetify/lib';
import './assets/styles/normalize.css';

import router from './router';
import store from './store/store';

import Amplify, * as AmplifyModules from 'aws-amplify';
import { AmplifyPlugin } from 'aws-amplify-vue';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);
Vue.use(AmplifyPlugin, AmplifyModules);

Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.component('apexchart', VueApexCharts);

const vuetify = new Vuetify({});

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
