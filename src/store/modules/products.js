import axios from '@/config/axios';

const data = {
  temp: {},
  product: {},
};

const getters = {
  productDetail(state) {
    return state.product;
  },
};

const mutations = {
  setTemporary(state, value) {
    state.temp = value;
  },

  setProduct(state, value) {
    state.product = value;
  },
};

const actions = {
  getByCategory({ commit }, payload) {
    return axios({
      method: 'get',
      url: '/product/category',
      params: payload.params,
      data: {},
    })
      .then((res) => {
        commit('setTemporary', null);
        payload.resolve({
          code: res.data.code,
          data: res.data.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getBySubCategory({ commit }, payload) {
    return axios({
      method: 'get',
      url: '/product/subcategory',
      params: payload.params,
      data: {},
    })
      .then((res) => {
        commit('setTemporary', null);
        payload.resolve({
          code: res.data.code,
          data: res.data.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getById({ commit }, payload) {
    return axios({
      method: 'get',
      url: '/product/id',
      params: payload.params,
      data: {},
    })
      .then((res) => {
        commit('setProduct', res.data.data);
        payload.resolve({ code: res.data.code });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  incrementSeen({ commit }, payload) {
    return axios({
      method: 'put',
      url: '/product/seen',
      data: payload.params,
    })
      .then((res) => {
        commit('setTemporary', null);
        payload.resolve({ code: res.data.code });
      })
      .catch((err) => {
        console.log(err);
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
