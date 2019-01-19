import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import './plugins/vuetify';
import './plugins/vue-axios';
// <!-- ECHARTS_START -->
import './plugins/vue-echarts';
// <!-- ECHARTS_END -->
// <!-- GOOGLEMAPS_START -->
import './plugins/vue-google-maps';
// <!-- GOOGLEMAPS_END -->

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
