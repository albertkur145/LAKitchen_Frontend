import Vue from 'vue';
import { BootstrapVue } from 'bootstrap-vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faSearch,
  faShoppingCart,
  faBars,
  faChevronDown,
  faQuestionCircle,
  faChevronRight,
  faIdCardAlt,
  faHeart,
  faBoxTissue,
  faSignOutAlt,
  faCogs,
  faDotCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import router from './router';
import store from './store';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);

library.add(faSearch, faShoppingCart, faBars, faCogs,
  faChevronDown, faQuestionCircle, faChevronRight,
  faIdCardAlt, faHeart, faBoxTissue, faSignOutAlt,
  faDotCircle);
Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
