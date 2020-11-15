import axios from '@/config/axios';

const data = {
  temp: {},
  orders: {},
};

const getters = {
  orderList(state) {
    return state.orders;
  },
};

const mutations = {
  setTemporary(state, value) {
    state.temp = value;
  },

  setOrder(state, value) {
    state.orders = value;
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
};

export default {
  namespaced: true,
  state: data,
  getters,
  mutations,
  actions,
};
