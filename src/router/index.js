import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const Home = () => import(/* webpackChunkName: "p-home" */ '../pages/user/Home.vue');
const DetailProduct = () => import(/* webpackChunkName: "p-detailProduct" */ '../pages/user/DetailProduct.vue');
const Assessment = () => import(/* webpackChunkName: "p-assessment" */ '../pages/user/Assessment.vue');
const ProductSearch = () => import(/* webpackChunkName: "p-productSearch" */ '../pages/user/ProductSearch.vue');
const Login = () => import(/* webpackChunkName: "p-login" */ '../pages/user/Login.vue');
const Register = () => import(/* webpackChunkName: "p-register" */ '../pages/user/Register.vue');
const Profile = () => import(/* webpackChunkName: "p-profile" */ '../pages/user/Profile.vue');
const Wishlist = () => import(/* webpackChunkName: "p-wishlist" */ '../pages/user/Wishlist.vue');
const Order = () => import(/* webpackChunkName: "p-order" */ '../pages/user/Order.vue');
const ChangePassword = () => import(/* webpackChunkName: "p-changePassword" */ '../pages/user/ChangePassword.vue');
const DetailOrder = () => import(/* webpackChunkName: "p-detailOrder" */ '../pages/user/DetailOrder.vue');
const OrderAssessment = () => import(/* webpackChunkName: "p-orderAssessment" */ '../pages/user/OrderAssessment.vue');
const UserAssessment = () => import(/* webpackChunkName: "p-userAssessment" */ '../pages/user/UserAssessment.vue');
const Cart = () => import(/* webpackChunkName: "p-cart" */ '../pages/user/Cart.vue');
const Payment = () => import(/* webpackChunkName: "p-payment" */ '../pages/user/Payment.vue');
const AdminLogin = () => import(/* webpackChunkName: "p-adminLogin" */ '../pages/admin/Login.vue');

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/product/:id',
    name: 'DetailProduct',
    component: DetailProduct,
  },
  {
    path: '/product/assessment/:id',
    name: 'Assessment',
    component: Assessment,
  },
  {
    path: '/product/:type/:value',
    name: 'ProductSearch',
    component: ProductSearch,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/wishlist',
    name: 'Wishlist',
    component: Wishlist,
  },
  {
    path: '/order',
    name: 'Order',
    component: Order,
  },
  {
    path: '/changepassword',
    name: 'changepassword',
    component: ChangePassword,
  },
  {
    path: '/order/:number',
    name: 'DetailOrder',
    component: DetailOrder,
  },
  {
    path: '/order/:number/assessment',
    name: 'OrderAssessment',
    component: OrderAssessment,
  },
  {
    path: '/order/:number/assessment/:id',
    name: 'UserAssessment',
    component: UserAssessment,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
  },
  {
    path: '/payment',
    name: 'Payment',
    component: Payment,
  },
  {
    path: '/cpanel',
    name: 'AdminLogin',
    component: AdminLogin,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
});

export default router;
