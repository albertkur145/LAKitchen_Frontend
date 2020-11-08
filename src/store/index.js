import Vue from 'vue';
import Vuex from 'vuex';
import '@/api/mock';
import categories from './modules/categories';
import products from './modules/products';
import assessment from './modules/assessment';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    categories,
    products,
    assessment,
  },
});
