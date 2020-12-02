import axios from '@/config/axios';
import cookies from 'vue-cookies';

const token = cookies.get('token');

const data = {
  temp: {},
  productDetail: {},
};

const getters = {
  product(state) {
    return state.productDetail;
  },
};

const mutations = {
  setTemporary(state, value) {
    state.temp = value;
  },

  setProductDetail(state, value) {
    state.productDetail = value;
  },
};

const actions = {
  getAllByPaging({ commit }, payload) {
    return axios({
      method: 'get',
      url: '/admin/product',
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

  getAllByPagingCategory({ commit }, payload) {
    return axios({
      method: 'get',
      url: '/admin/product/category',
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

  getAllByName({ commit }, payload) {
    return axios({
      method: 'get',
      url: '/admin/product/name',
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

  getById({ commit }, payload) {
    return axios({
      method: 'get',
      url: '/admin/product/id',
      params: payload.params,
      data: {},
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        commit('setProductDetail', res.data.data);
        payload.resolve({ code: res.data.code });
      })
      .catch((err) => {
        payload.resolve({ code: err.response.status });
      });
  },

  addProduct({ commit }, payload) {
    return axios({
      method: 'post',
      url: '/admin/product',
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

  updateProduct({ commit }, payload) {
    return axios({
      method: 'put',
      url: '/admin/product',
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
