import axios from '@/config/axios';
import cookies from 'vue-cookies';

const data = {
  temp: {},
  calls: {},
  contacts: {},
  messages: {},
};

const getters = {
  callList(state) {
    return state.calls;
  },

  contactList(state) {
    return state.contacts;
  },

  messageList(state) {
    return state.messages;
  },
};

const mutations = {
  setTemporary(state, value) {
    state.temp = value;
  },

  setCalls(state, value) {
    state.calls = value;
  },

  setContacts(state, value) {
    state.contacts = value;
  },

  setMessages(state, value) {
    state.messages = value;
  },
};

const actions = {
  receiveCall({ commit }, payload) {
    return axios({
      method: 'post',
      url: '/cs/call',
      data: payload.params,
      headers: {
        Authorization: `Bearer ${cookies.get('cs_token')}`,
      },
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

  getUnreceivedCall({ commit }, payload) {
    return axios({
      method: 'get',
      url: '/cs/call',
      data: {},
      headers: {
        Authorization: `Bearer ${cookies.get('cs_token')}`,
      },
    })
      .then((res) => {
        commit('setCalls', res.data.data);
        payload.resolve({ code: res.data.code });
      })
      .catch((err) => {
        payload.resolve({ code: err.response.status });
      });
  },

  getAllContact({ commit }, payload) {
    return axios({
      method: 'get',
      url: '/cs/contact',
      params: payload.params,
      data: {},
      headers: {
        Authorization: `Bearer ${cookies.get('cs_token')}`,
      },
    })
      .then((res) => {
        commit('setContacts', res.data.data);
        payload.resolve({ code: res.data.code });
      })
      .catch((err) => {
        payload.resolve({ code: err.response.status });
      });
  },

  getAllMessage({ commit }, payload) {
    return axios({
      method: 'get',
      url: '/cs/message',
      params: payload.params,
      data: {},
      headers: {
        Authorization: `Bearer ${cookies.get('cs_token')}`,
      },
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
      headers: {
        Authorization: `Bearer ${cookies.get('cs_token')}`,
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

  terminateCall({ commit }, payload) {
    return axios({
      method: 'delete',
      url: '/chat/call',
      params: payload.params,
      data: {},
      headers: {
        Authorization: `Bearer ${cookies.get('cs_token')}`,
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

  readMessage({ commit }, payload) {
    return axios({
      method: 'post',
      url: '/chat/message',
      data: payload.params,
      headers: {
        Authorization: `Bearer ${cookies.get('cs_token')}`,
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
};

export default {
  namespaced: true,
  state: data,
  getters,
  mutations,
  actions,
};
