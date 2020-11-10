import axios from '@/config/axios';

const data = {
  assessment: {},
};

const getters = {
  assessmentList(state) {
    return state.assessment;
  },
};

const mutations = {
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
};

export default {
  namespaced: true,
  state: data,
  getters,
  mutations,
  actions,
};
