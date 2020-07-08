import Vue from 'vue';
import App from './App.vue';
import WooUI from '../components/index';

Vue.use(WooUI);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('#app');
