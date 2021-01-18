import Vue from 'vue';
import Vuex from 'vuex';
// import '@/api/mock';
import auth from './modules/auth';
import categories from './modules/user/categories';
import products from './modules/user/products';
import assessment from './modules/user/assessment';
import user from './modules/user/user';
import wishlist from './modules/user/wishlist';
import order from './modules/user/order';
import cart from './modules/user/cart';
import adDashboard from './modules/admin/dashboard';
import adProduct from './modules/admin/product';
import adReport from './modules/admin/report';
import adAssessment from './modules/admin/assessment';
import adOrder from './modules/admin/order';
import adUserStatus from './modules/admin/userstatus';
import adUser from './modules/admin/user';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    categories,
    products,
    assessment,
    user,
    wishlist,
    order,
    cart,
    adDashboard,
    adProduct,
    adReport,
    adAssessment,
    adOrder,
    adUserStatus,
    adUser,
  },
});
