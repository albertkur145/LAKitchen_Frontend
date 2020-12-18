import axios from '@/config/axios';
import cookies from 'vue-cookies';

const token = cookies.get('token');

const data = {};

const getters = {};

const mutations = {
  setTemporary(state, value) {
    state.temp = value;
  },
};

const actions = {
  getSalesToday({ commit }, payload) {
    return axios({
      method: 'get',
      url: '/admin/report/salestoday',
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

  getMonthlyReport({ commit }, payload) {
    return axios({
      method: 'get',
      url: '/admin/report/income/monthly',
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

  getAnnualReport({ commit }, payload) {
    return axios({
      method: 'get',
      url: '/admin/report/income/annual',
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
};

export default {
  namespaced: true,
  state: data,
  getters,
  mutations,
  actions,
};
