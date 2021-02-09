import axios from '@/config/axios';

const data = {
  temp: {},
  currentCall: {},
  messages: {},
};

const getters = {
  userCurrentCall(state) {
    return state.currentCall;
  },

  messageList(state) {
    return state.messages;
  },
};

const mutations = {
  setTemporary(state, value) {
    state.temp = value;
  },

  setCurrentCall(state, value) {
    state.currentCall = value;
  },

  setMessages(state, value) {
    state.messages = value;
  },
};

const actions = {
  calling({ commit }, payload) {
    return axios({
      method: 'post',
      url: '/chat/call',
      data: payload.params,
    })
      .then((res) => {
        commit('setTemporary', null);
        payload.resolve({
          code: res.data.code,
          data: res.data.data,
        });
      })
      .catch((err) => {
        payload.resolve({ code: err.response.status });
      });
  },

  getCurrentCall({ commit }, payload) {
    return axios({
      method: 'get',
      url: '/chat/call',
      params: payload.params,
      data: {},
    })
      .then((res) => {
        commit('setCurrentCall', res.data.data);
        payload.resolve({ code: res.data.code });
      })
      .catch((err) => {
        payload.resolve({ code: err.response.status });
      });
  },

  getMessages({ commit }, payload) {
    return axios({
      method: 'get',
      url: '/chat/message',
      params: payload.params,
      data: {},
    })
      .then((res) => {
        commit('setMessages', res.data.data);
        payload.resolve({ code: res.data.code });
      })
      .catch((err) => {
        payload.resolve({ code: err.response.status });
      });
  },

  postMessage({ commit }, payload) {
    return axios({
      method: 'post',
      url: '/chat',
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
