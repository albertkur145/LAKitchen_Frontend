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
const AdLogin = () => import(/* webpackChunkName: "p-adminLogin" */ '../pages/admin/Login.vue');
const AdTemplate = () => import(/* webpackChunkName: "p-adminTemplate" */ '../pages/admin/TemplateLayout.vue');
const AdDashboard = () => import(/* webpackChunkName: "c-adminDashboard" */ '../components/admin/Dashboard.vue');
const AdSalesToday = () => import(/* webpackChunkName: "c-adminSalesToday" */ '../components/admin/SalesToday.vue');
const AdProduct = () => import(/* webpackChunkName: "c-adminProduct" */ '../components/admin/Product.vue');
const AdProductForm = () => import(/* webpackChunkName: "c-adminProductForm" */ '../components/admin/ProductForm.vue');
const AdProductBestSelling = () => import(/* webpackChunkName: "c-adminProductBestSelling" */ '../components/admin/BestSellingProduct.vue');
const AdProductFavorite = () => import(/* webpackChunkName: "c-adminProductFavorite" */ '../components/admin/FavoriteProduct.vue');
const AdProductAssessment = () => import(/* webpackChunkName: "c-adminProductAssessment" */ '../components/admin/AssessmentProduct.vue');
const AdProductAssessmentDetail = () => import(/* webpackChunkName: "c-adminProductAssessmentDetail" */ '../components/admin/AssessmentProductDetail.vue');
const AdOrder = () => import(/* webpackChunkName: "c-adminOrder" */ '../components/admin/Order.vue');
const AdOrderConfirm = () => import(/* webpackChunkName: "c-adminOrderConfirm" */ '../components/admin/OrderConfirm.vue');
const AdOrderHistory = () => import(/* webpackChunkName: "c-adminOrderHistory" */ '../components/admin/OrderHistory.vue');
const AdOrderDetail = () => import(/* webpackChunkName: "c-adminOrderDetail" */ '../components/admin/OrderDetail.vue');
const AdCustomer = () => import(/* webpackChunkName: "c-adminCustomer" */ '../components/admin/Customer.vue');
const AdEmployee = () => import(/* webpackChunkName: "c-adminEmployee" */ '../components/admin/Employee.vue');
const AdUserForm = () => import(/* webpackChunkName: "c-adminUserForm" */ '../components/admin/UserForm.vue');
const AdReportIncome = () => import(/* webpackChunkName: "c-adminReportIncome" */ '../components/admin/ReportIncome.vue');
const CSChatApp = () => import(/* webpackChunkName: "p-csChatApp" */ '../pages/cs/ChatApp.vue');
const UserActivation = () => import(/* webpackChunkName: "p-userActivation" */ '../pages/UserActivation.vue');

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
    component: AdLogin,
  },
  {
    path: '/admin',
    component: AdTemplate,
    children: [
      {
        path: '',
        name: 'AdminDashboard',
        component: AdDashboard,
      },
      {
        path: 'sales/today',
        name: 'AdminSalesToday',
        component: AdSalesToday,
      },
      {
        path: 'product',
        name: 'AdminProduct',
        component: AdProduct,
      },
      {
        path: 'product/form/:id?',
        name: 'AdminProductForm',
        component: AdProductForm,
      },
      {
        path: 'product/bestselling',
        name: 'AdminProductBestSelling',
        component: AdProductBestSelling,
      },
      {
        path: 'product/favorite',
        name: 'AdminProductFavorite',
        component: AdProductFavorite,
      },
      {
        path: 'product/assessment',
        name: 'AdminProductAssessment',
        component: AdProductAssessment,
      },
      {
        path: 'product/assessment/:id',
        name: 'AdminProductAssessmentDetail',
        component: AdProductAssessmentDetail,
      },
      {
        path: 'order',
        name: 'AdminOrder',
        component: AdOrder,
      },
      {
        path: 'order/confirm',
        name: 'AdminOrderConfirm',
        component: AdOrderConfirm,
      },
      {
        path: 'order/history',
        name: 'AdminOrderHistory',
        component: AdOrderHistory,
      },
      {
        path: 'order/:orderNumber',
        name: 'AdminOrderDetail',
        props: true,
        component: AdOrderDetail,
      },
      {
        path: 'customer',
        name: 'AdminCustomer',
        component: AdCustomer,
      },
      {
        path: 'employee',
        name: 'AdminEmployee',
        component: AdEmployee,
      },
      {
        path: 'employee/form/:id?',
        name: 'AdminUserForm',
        component: AdUserForm,
      },
      {
        path: 'report/income',
        name: 'AdminReportIncome',
        component: AdReportIncome,
      },
    ],
  },
  {
    path: '/cs',
    name: 'CSChatApp',
    component: CSChatApp,
  },
  {
    path: '/user/activation/:email/:password',
    name: 'UserActivation',
    component: UserActivation,
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
