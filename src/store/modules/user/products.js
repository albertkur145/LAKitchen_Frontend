import axios from '@/config/axios';
import cookies from 'vue-cookies';

const token = cookies.get('token');

const data = {
  temp: {},
  product: {},
  productsOrder: [],
};

const getters = {
  productDetail(state) {
    return state.product;
  },

  productOrderList(state) {
    return state.productsOrder;
  },
};

const mutations = {
  setTemporary(state, value) {
    state.temp = value;
  },

  setProduct(state, value) {
    state.product = value;
  },

  setProductOrder(state, value) {
    state.productsOrder = value;
  },
};

const actions = {
  getByCategory({ commit }, payload) {
    return axios({
      method: 'get',
      url: '/product/category',
      params: payload.params,
      data: {},
    })
      .then((res) => {
        commit('setTemporary', null);
        payload.resolve({
          code: res.data.code,
          data: res.data.data,
        });
      })
      .catch((err) => {
        payload.resolve({ code: err.response.status });
      });
  },

  getBySubCategory({ commit }, payload) {
    return axios({
      method: 'get',
      url: '/product/subcategory',
      params: payload.params,
      data: {},
    })
      .then((res) => {
        commit('setTemporary', null);
        payload.resolve({
          code: res.data.code,
          data: res.data.data,
        });
      })
      .catch((err) => {
        payload.resolve({ code: err.response.status });
      });
  },

  getById({ commit }, payload) {
    return axios({
      method: 'get',
      url: '/product/id',
      params: payload.params,
      data: {},
    })
      .then((res) => {
        commit('setProduct', res.data.data);
        payload.resolve({ code: res.data.code });
      })
      .catch((err) => {
        payload.resolve({ code: err.response.status });
      });
  },

  getByName({ commit }, payload) {
    return axios({
      method: 'get',
      url: '/product/name',
      params: payload.params,
      data: {},
    })
      .then((res) => {
        commit('setTemporary', null);
        payload.resolve({
          code: res.data.code,
          data: res.data.data,
        });
      })
      .catch((err) => {
        payload.resolve({ code: err.response.status });
      });
  },

  incrementSeen({ commit }, payload) {
    return axios({
      method: 'put',
      url: '/product/seen',
      data: payload.params,
    })
      .then((res) => {
        commit('setTemporary', null);
        payload.resolve({ code: res.data.code });
      })
      .catch((err) => {
        payload.resolve({ code: err.response.status });
      });
  },

  getByOrderNumber({ commit }, payload) {
    return axios({
      method: 'get',
      url: '/product/order',
      params: payload.params,
      data: {},
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        commit('setProductOrder', res.data.data);
        payload.resolve({ code: res.data.code });
      })
      .catch((err) => {
        payload.resolve({ code: err.response.status });
      });
  },

  getByPrice({ commit }, payload) {
    return axios({
      method: 'get',
      url: '/product/price',
      params: payload.params,
      data: {},
    })
      .then((res) => {
        commit('setTemporary', null);
        payload.resolve({
          code: res.data.code,
          data: res.data.data,
        });
      })
      .catch((err) => {
        payload.resolve({ code: err.response.status });
      });
  },

  getByRating({ commit }, payload) {
    return axios({
      method: 'get',
      url: '/product/rating',
      data: {},
    })
      .then((res) => {
        commit('setTemporary', null);
        payload.resolve({
          code: res.data.code,
          data: res.data.data,
        });
      })
      .catch((err) => {
        payload.resolve({ code: err.response.status });
      });
  },
};

export default {
  namespaced: true,
  state: data,
  getters,
  mutations,
  actions,
};
