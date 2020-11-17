import axios from '@/config/axios';

const data = {
  temp: {},
  orders: {},
  order: {},
};

const getters = {
  orderList(state) {
    return state.orders;
  },

  detailOrder(state) {
    return state.order;
  },
};

const mutations = {
  setTemporary(state, value) {
    state.temp = value;
  },

  setOrder(state, value) {
    state.orders = value;
  },

  setDetailOrder(state, value) {
    state.order = value;
  },
};

const actions = {
  getOrder({ commit }, payload) {
    return axios({
      method: 'get',
      url: '/order',
      params: payload.params,
      data: {},
    })
      .then((res) => {
        commit('setOrder', res.data.data);
        payload.resolve({ code: res.data.code });
      })
      .catch((err) => {
        payload.resolve({ code: err.response.status });
      });
  },

  getById({ commit }, payload) {
    return axios({
      method: 'get',
      url: '/order/id',
      params: payload.params,
      data: {},
    })
      .then((res) => {
        commit('setDetailOrder', res.data.data);
        payload.resolve({ code: res.data.code });
      })
      .catch((err) => {
        payload.resolve({ code: err.response.status });
      });
  },

  cancel({ commit }, payload) {
    return axios({
      method: 'delete',
      url: '/order',
      params: payload.params,
      data: {},
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
