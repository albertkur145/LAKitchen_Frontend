import axios from '@/config/axios';
import cookies from 'vue-cookies';

const token = cookies.get('token');

const data = {
  temp: {},
  cart: {},
  count: {},
};

const getters = {
  userCart(state) {
    return state.cart;
  },

  countUserCart(state) {
    return state.count;
  },
};

const mutations = {
  setTemporary(state, value) {
    state.temp = value;
  },

  setCart(state, value) {
    state.cart = value;
  },

  setCount(state, value) {
    state.count = value;
  },
};

const actions = {
  getAll({ commit }, payload) {
    return axios({
      method: 'get',
      url: '/cart',
      params: payload.params,
      data: {},
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        commit('setCart', res.data.data);
        payload.resolve({ code: res.data.code });
      })
      .catch((err) => {
        payload.resolve({ code: err.response.status });
      });
  },

  countCart({ commit }, payload) {
    return axios({
      method: 'get',
      url: '/cart/count',
      params: payload.params,
      data: {},
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        commit('setCount', res.data.data);
        payload.resolve({ code: res.data.code });
      })
      .catch((err) => {
        payload.resolve({ code: err.response.status });
      });
  },

  remove({ commit }, payload) {
    return axios({
      method: 'delete',
      url: '/cart',
      params: payload.params,
      data: {},
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        commit('setTemporary', null);
        payload.resolve({ code: res.data.code });
      })
      .catch((err) => {
        payload.resolve({ code: err.response.status });
      });
  },

  update({ commit }, payload) {
    return axios({
      method: 'put',
      url: '/cart',
      data: payload.params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        commit('setTemporary', null);
        payload.resolve({ code: res.data.code });
      })
      .catch((err) => {
        payload.resolve({ code: err.response.status });
      });
  },

  addCart({ commit }, payload) {
    return axios({
      method: 'post',
      url: '/cart',
      data: payload.params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        commit('setTemporary', null);
        payload.resolve({ code: res.data.code });
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
