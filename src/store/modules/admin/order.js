import axios from '@/config/axios';
import cookies from 'vue-cookies';

const token = cookies.get('token');

const data = {
  temp: {},
  statusActive: {},
  statusHistory: {},
  order: {},
};

const getters = {
  orderStatusActive(state) {
    return state.statusActive;
  },

  orderStatusHistory(state) {
    return state.statusHistory;
  },

  orderDetail(state) {
    return state.order;
  },
};

const mutations = {
  setTemporary(state, value) {
    state.temp = value;
  },

  setStatusActive(state, value) {
    state.statusActive = value;
  },

  setStatusHistory(state, value) {
    state.statusHistory = value;
  },

  setOrder(state, value) {
    state.order = value;
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

  getStatusHistory({ commit }, payload) {
    return axios({
      method: 'get',
      url: '/admin/orderstatus/history',
      data: {},
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        commit('setStatusHistory', res.data.data);
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
      url: '/admin/order/unprocessed',
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

  getAllOrderHistory({ commit }, payload) {
    return axios({
      method: 'get',
      url: '/admin/order/history',
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
        console.log(err);
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
      url: '/admin/order/search/unprocessed',
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

  getAllByNumberHistory({ commit }, payload) {
    return axios({
      method: 'get',
      url: '/admin/order/search/history',
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
      url: '/admin/order/unprocessed',
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

  getDetail({ commit }, payload) {
    return axios({
      method: 'get',
      url: '/admin/order/id',
      params: payload.params,
      data: {},
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        commit('setOrder', res.data.data);
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
