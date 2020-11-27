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
  faMinus,
  faPlus,
  faCartPlus,
  faArrowLeft,
  faUserAlt,
  faEye,
  faEyeSlash,
  faTrash,
  faHome,
  faCommentDots,
  faPaperPlane,
  faRocket,
  faChevronUp,
  faHamburger,
  faFunnelDollar,
  faMoneyBillWave,
  faUser,
  faChartLine,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart, faCopyright } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import VueCurrencyFilter from 'vue-currency-filter';
import func from '@/function';
import cookies from 'vue-cookies';
import Chartkick from 'vue-chartkick';
import Chart from 'chart.js';
import App from './App.vue';
import router from './router';
import store from './store';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './scss/custom-breakpoint.scss';

Vue.config.productionTip = false;
Vue.prototype.$func = func;

Vue.use(BootstrapVue);
Vue.use(VueCurrencyFilter, {
  symbol: 'Rp.',
  thousandsSeparator: '.',
  symbolPosition: 'front',
});
Vue.use(cookies);
Vue.use(Chartkick.use(Chart));

library.add(faSearch, faShoppingCart, faBars, faCogs,
  faChevronDown, faQuestionCircle, faChevronRight,
  faIdCardAlt, faHeart, faBoxTissue, faSignOutAlt,
  faDotCircle, faTimes, faLock, faMailBulk, faStar,
  faEnvelope, faTty, faPlus, faMinus, farHeart, faCartPlus,
  faArrowLeft, faUserAlt, faEye, faEyeSlash, faTrash,
  faCopyright, faHome, faCommentDots, faPaperPlane,
  faRocket, faChevronUp, faHamburger, faFunnelDollar,
  faMoneyBillWave, faUser, faChartLine);
Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
