import axios from '@/config/axios';
import cookies from 'vue-cookies';

const data = {
  temp: {},
  wishlist: {},
};

const getters = {
  wishlist(state) {
    return state.wishlist;
  },
};

const mutations = {
  setTemporary(state, value) {
    state.temp = value;
  },

  setWishlist(state, value) {
    state.wishlist = value;
  },
};

const actions = {
  getAll({ commit }, payload) {
    return axios({
      method: 'get',
      url: '/wishlist',
      params: payload.params,
      data: {},
      headers: {
        Authorization: `Bearer ${cookies.get('user_token')}`,
      },
    })
      .then((res) => {
        commit('setWishlist', res.data.data);
        payload.resolve({ code: res.data.code });
      })
      .catch((err) => {
        payload.resolve({ code: err.response.status });
      });
  },

  saveProduct({ commit }, payload) {
    return axios({
      method: 'post',
      url: '/wishlist',
      data: payload.params,
      headers: {
        Authorization: `Bearer ${cookies.get('user_token')}`,
      },
    })
      .then((res) => {
        commit('setTemporary', null);
        payload.resolve({
          code: res.data.code,
          errors: res.data.errors,
        });
      })
      .catch((err) => {
        payload.resolve({ code: err.response.status });
      });
  },

  remove({ commit }, payload) {
    return axios({
      method: 'delete',
      url: '/wishlist',
      params: payload.params,
      data: {},
      headers: {
        Authorization: `Bearer ${cookies.get('user_token')}`,
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
