import axios from '@/config/axios';
import cookies from 'vue-cookies';

const token = cookies.get('token');

const data = {
  temp: {},
  statusActive: {},
  statusFinished: {},
};

const getters = {
  orderStatusActive(state) {
    return state.statusActive;
  },

  orderStatusFinished(state) {
    return state.statusFinished;
  },
};

const mutations = {
  setTemporary(state, value) {
    state.temp = value;
  },

  setStatusActive(state, value) {
    state.statusActive = value;
  },

  setStatusFinished(state, value) {
    state.statusFinished = value;
  },
};

const actions = {
  getStatusActive({ commit }, payload) {
    return axios({
      method: 'get',
      url: '/admin/orderstatus/active',
      data: {},
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        commit('setStatusActive', res.data.data);
        payload.resolve({ code: res.data.code });
      })
      .catch((err) => {
        payload.resolve({ code: err.response.status });
      });
  },

  getStatusFinished({ commit }, payload) {
    return axios({
      method: 'get',
      url: '/admin/orderstatus/finished',
      data: {},
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        commit('setStatusFinished', res.data.data);
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

  getAllOrderNotPay({ commit }, payload) {
    return axios({
      method: 'get',
      url: '/admin/order/confirmation',
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

  getAllByNumberNotPay({ commit }, payload) {
    return axios({
      method: 'get',
      url: '/admin/order/search/confirmation',
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

  confirmOrder({ commit }, payload) {
    return axios({
      method: 'put',
      url: '/admin/order/confirmation',
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
