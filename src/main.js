import Vue from 'vue';
import './plugins/axios'
import App from './App.vue';
import router from './router';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

// Import Bootstrap and BootstrapVue CSS files
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

// Initialize $user on Vue prototype
Vue.prototype.$user = {
  type: null,
  status: null,
  name: null
};

Vue.config.productionTip = false;

Vue.filter('capitalize', function(value) {
  if (!value) {
    return '';
  }

  value = value.toString();

  return value.charAt(0).toUpperCase() + value.slice(1)
});

Vue.filter('formatDate', function(value) {
  if (value) {
    const date = new Date(value);
    return date.toLocaleDateString('en-GB'); // ili en-US za US format
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
