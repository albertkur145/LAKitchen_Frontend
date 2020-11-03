import axios from 'axios';
import config from '@/config';

const { API } = config;

const data = {
  temp: {},
  products: {},
};

const getters = {
  productList(state) {
    return state.products;
  },
};

const mutations = {
  setTemporary(state, value) {
    state.temp = value;
  },

  setProducts(state, value) {
    state.products = value;
  },
};

const actions = {
  getByCategory({ commit }, payload) {
    return axios({
      method: 'get',
      url: `${API}/product/category`,
      responseType: 'json',
      params: payload.params,
      headers: {
        'Content-Type': 'application/json',
      },
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
      url: `${API}/product/subcategory`,
      responseType: 'json',
      params: payload.params,
      headers: {
        'Content-Type': 'application/json',
      },
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
};

export default {
  namespaced: true,
  state: data,
  getters,
  mutations,
  actions,
};
