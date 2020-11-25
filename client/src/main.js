import Vue from 'vue';
import App from './App.vue';
import VueApexCharts from 'vue-apexcharts';
import Vuetify from 'vuetify/lib';
import './assets/styles/normalize.css';

import router from './router';
import store from './store/store';

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
