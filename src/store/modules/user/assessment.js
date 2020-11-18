import axios from '@/config/axios';

const data = {
  temp: {},
  assessment: {},
};

const getters = {
  assessmentList(state) {
    return state.assessment;
  },
};

const mutations = {
  setTemporary(state, value) {
    state.temp = value;
  },

  setAssessment(state, value) {
    state.assessment = value;
  },
};

const actions = {
  getAssessment({ commit }, payload) {
    return axios({
      method: 'get',
      url: '/assessment',
      params: payload.params,
      data: {},
    })
      .then((res) => {
        commit('setAssessment', res.data.data);
        payload.resolve({ code: res.data.code });
      })
      .catch((err) => {
        payload.resolve({ code: err.response.status });
      });
  },

  postAssessment({ commit }, payload) {
    return axios({
      method: 'post',
      url: '/assessment',
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
