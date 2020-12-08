import axios from '@/config/axios';
import cookies from 'vue-cookies';

const token = cookies.get('token');

const data = {
  temp: {},
  status: {},
};

const getters = {
  orderStatus(state) {
    return state.status;
  },
};

const mutations = {
  setTemporary(state, value) {
    state.temp = value;
  },

  setStatus(state, value) {
    state.status = value;
  },
};

const actions = {
  getStatus({ commit }, payload) {
    return axios({
      method: 'get',
      url: '/admin/orderstatus',
      data: {},
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        commit('setStatus', res.data.data);
        payload.resolve({ code: res.data.code });
      })
      .catch((err) => {
        payload.resolve({ code: err.response.status });
      });
  },

  getAllOrder({ commit }, payload) {
    return axios({
      method: 'get',
      url: '/admin/order',
      params: payload.params,
      data: {},
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        commit('setTemporary', null);
        payload.resolve({
          code: res.data.code,
          data: res.data.data,
          paging: res.data.paging,
        });
      })
      .catch((err) => {
        payload.resolve({ code: err.response.status });
      });
  },

  getAllOrderByStatus({ commit }, payload) {
    return axios({
      method: 'get',
      url: '/admin/order/status',
      params: payload.params,
      data: {},
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        commit('setTemporary', null);
        payload.resolve({
          code: res.data.code,
          data: res.data.data,
          paging: res.data.paging,
        });
      })
      .catch((err) => {
        payload.resolve({ code: err.response.status });
      });
  },

  getAllByNumber({ commit }, payload) {
    return axios({
      method: 'get',
      url: '/admin/order/search',
      params: payload.params,
      data: {},
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        commit('setTemporary', null);
        payload.resolve({
          code: res.data.code,
          data: res.data.data,
          paging: res.data.paging,
        });
      })
      .catch((err) => {
        payload.resolve({ code: err.response.status });
      });
  },

  updateStatus({ commit }, payload) {
    return axios({
      method: 'put',
      url: '/admin/order',
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
