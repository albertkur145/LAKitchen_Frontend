import axios from '@/config/axios';

const data = {
  temp: {},
  user: {},
};

const getters = {
  userData(state) {
    return state.user;
  },
};

const mutations = {
  setUser(state, value) {
    state.user = value;
  },

  setTemporary(state, value) {
    state.temp = value;
  },
};

const actions = {
  login({ commit }, payload) {
    return axios({
      method: 'post',
      url: '/auth/login',
      data: payload.params,
    })
      .then((res) => {
        commit('setUser', res.data.data);
        payload.resolve({ code: res.data.code });
      })
      .catch((err) => {
        payload.resolve({ code: err.response.status });
      });
  },

  register({ commit }, payload) {
    return axios({
      method: 'post',
      url: '/auth/register',
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
};

export default {
  namespaced: true,
  state: data,
  getters,
  mutations,
  actions,
};
