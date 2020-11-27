import axios from '@/config/axios';
import cookies from 'vue-cookies';

const token = cookies.get('token');

const data = {
  data: {},
};

const getters = {
  dashboardData(state) {
    return state.data;
  },
};

const mutations = {
  setData(state, value) {
    state.data = value;
  },
};

const actions = {
  getAll({ commit }, payload) {
    return axios({
      method: 'get',
      url: '/admin/dashboard',
      params: payload.params,
      data: {},
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        commit('setData', res.data.data);
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
