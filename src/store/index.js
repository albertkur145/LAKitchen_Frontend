import Vue from 'vue';
import Vuex from 'vuex';
import '@/api/mock';
import categories from './modules/user/categories';
import products from './modules/user/products';
import assessment from './modules/user/assessment';
import auth from './modules/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    categories,
    products,
    assessment,
    auth,
  },
});
