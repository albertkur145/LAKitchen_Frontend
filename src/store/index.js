import Vue from 'vue';
import Vuex from 'vuex';
import '@/api/mock';
import auth from './modules/auth';
import categories from './modules/user/categories';
import products from './modules/user/products';
import assessment from './modules/user/assessment';
import user from './modules/user/user';
import wishlist from './modules/user/wishlist';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    categories,
    products,
    assessment,
    user,
    wishlist,
  },
});
