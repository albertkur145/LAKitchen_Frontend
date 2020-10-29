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
  faTimes,
  faLock,
  faMailBulk,
  faStar,
  faEnvelope,
  faTty,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import VueCurrencyFilter from 'vue-currency-filter';
import App from './App.vue';
import router from './router';
import store from './store';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './scss/custom-breakpoint.scss';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(VueCurrencyFilter, {
  symbol: 'Rp.',
  thousandsSeparator: '.',
  symbolPosition: 'front',
});

library.add(faSearch, faShoppingCart, faBars, faCogs,
  faChevronDown, faQuestionCircle, faChevronRight,
  faIdCardAlt, faHeart, faBoxTissue, faSignOutAlt,
  faDotCircle, faTimes, faLock, faMailBulk, faStar,
  faEnvelope, faTty);
Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
