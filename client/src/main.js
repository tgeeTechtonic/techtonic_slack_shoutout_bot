import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueApexCharts from 'vue-apexcharts';
import Vuetify from 'vuetify/lib';
import './assets/styles/normalize.css';

Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.component('apexchart', VueApexCharts);

const vuetify = new Vuetify({ });

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount('#app');
