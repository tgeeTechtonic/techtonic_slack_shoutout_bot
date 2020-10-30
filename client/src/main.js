import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import VueApexCharts from 'vue-apexcharts';

Vue.config.productionTip = false;

Vue.component('apexchart', VueApexCharts);

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount('#app');
