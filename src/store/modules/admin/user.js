import axios from '@/config/axios';
import cookies from 'vue-cookies';

const token = cookies.get('token');

const data = {
  temp: {},
  employee: {},
};

const getters = {
  employeeDetail(state) {
    return state.employee;
  },
};

const mutations = {
  setTemporary(state, value) {
    state.temp = value;
  },

  setEmployeeDetail(state, value) {
    state.employee = value;
  },
};

const actions = {
  getAllCustomer({ commit }, payload) {
    return axios({
      method: 'get',
      url: '/admin/customer',
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

  getAllCustomerByStatus({ commit }, payload) {
    return axios({
      method: 'get',
      url: '/admin/customer/status',
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

  getAllCustomerByName({ commit }, payload) {
    return axios({
      method: 'get',
      url: '/admin/customer/search',
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

  getAllEmployee({ commit }, payload) {
    return axios({
      method: 'get',
      url: '/admin/employee',
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

  getAllEmployeeByStatus({ commit }, payload) {
    return axios({
      method: 'get',
      url: '/admin/employee/status',
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

  getAllEmployeeByName({ commit }, payload) {
    return axios({
      method: 'get',
      url: '/admin/employee/search',
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

  getEmployeeById({ commit }, payload) {
    return axios({
      method: 'get',
      url: '/admin/employee/id',
      params: payload.params,
      data: {},
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        commit('setEmployeeDetail', res.data.data);
        payload.resolve({ code: res.data.code });
      })
      .catch((err) => {
        payload.resolve({ code: err.response.status });
      });
  },

  createEmployee({ commit }, payload) {
    return axios({
      method: 'POST',
      url: '/admin/employee',
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

  updateEmployee({ commit }, payload) {
    return axios({
      method: 'PUT',
      url: '/admin/employee',
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

  activationAccount({ commit }, payload) {
    return axios({
      method: 'put',
      url: '/admin/user/activation',
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

  resetPassword({ commit }, payload) {
    return axios({
      method: 'put',
      url: '/admin/user/reset',
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
