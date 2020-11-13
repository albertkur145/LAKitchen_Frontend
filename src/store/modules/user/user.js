import axios from '@/config/axios';

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
