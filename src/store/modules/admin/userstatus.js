import axios from '@/config/axios';
import cookies from 'vue-cookies';

const data = {
  status: {},
};

const getters = {
  userStatus(state) {
    return state.status;
  },
};

const mutations = {
  setStatus(state, value) {
    state.status = value;
  },
};

const actions = {
  getAllUserStatus({ commit }, payload) {
    return axios({
      method: 'get',
      url: '/admin/user/status',
      data: {},
      headers: {
        Authorization: `Bearer ${cookies.get('admin_token')}`,
      },
    })
      .then((res) => {
        commit('setStatus', res.data.data);
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
