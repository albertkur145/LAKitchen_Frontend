import axios from '@/config/axios';
import cookies from 'vue-cookies';

const token = cookies.get('token');

const data = {
  temp: {},
};

const getters = {

};

const mutations = {
  setTemporary(state, value) {
    state.temp = value;
  },
};

const actions = {
  register({ commit }, payload) {
    return axios({
      method: 'post',
      url: '/user',
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

  update({ commit }, payload) {
    return axios({
      method: 'put',
      url: '/user',
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

  changePassword({ commit }, payload) {
    return axios({
      method: 'put',
      url: '/user/changepassword',
      data: payload.params,
      headers: {
        Authorization: `Bearer ${token}`,
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
};

export default {
  namespaced: true,
  state: data,
  getters,
  mutations,
  actions,
};
