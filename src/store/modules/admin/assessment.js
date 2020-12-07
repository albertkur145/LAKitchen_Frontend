import axios from '@/config/axios';
import cookies from 'vue-cookies';

const token = cookies.get('token');

const data = {
  temp: {},
  assessment: {},
  comment: {},
};

const getters = {
  assessmentProduct(state) {
    return state.assessment;
  },

  comments(state) {
    return state.comment;
  },
};

const mutations = {
  setTemporary(state, value) {
    state.temp = value;
  },

  setAssessment(state, value) {
    state.assessment = value;
  },

  setComment(state, value) {
    state.comment = value;
  },
};

const actions = {
  getAssessment({ commit }, payload) {
    return axios({
      method: 'get',
      url: '/admin/assessment',
      params: payload.params,
      data: {},
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        commit('setAssessment', res.data.data);
        payload.resolve({ code: res.data.code });
      })
      .catch((err) => {
        payload.resolve({ code: err.response.status });
      });
  },

  getComments({ commit }, payload) {
    return axios({
      method: 'get',
      url: '/admin/assessment/comment',
      params: payload.params,
      data: {},
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        commit('setComment', res.data.data);
        payload.resolve({
          code: res.data.code,
          paging: res.data.paging,
        });
      })
      .catch((err) => {
        payload.resolve({ code: err.response.status });
      });
  },

  deleteComment({ commit }, payload) {
    return axios({
      method: 'delete',
      url: '/admin/assessment/comment',
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
