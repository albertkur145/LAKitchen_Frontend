import axios from 'axios';
import config from '@/config';

const { API } = config;

const data = {
  categories: {},
  generalCategory: {},
};

const getters = {
  categoryList(state) {
    return state.categories;
  },

  generalCategoryList(state) {
    return state.generalCategory;
  },
};

const mutations = {
  setCategories(state, value) {
    state.categories = value;
  },

  setGeneralCategory(state, value) {
    state.generalCategory = value;
  },
};

const actions = {
  getCategories({ commit }, payload) {
    return axios({
      method: 'get',
      url: `${API}/categoriesandsub`,
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {},
    })
      .then((res) => {
        commit('setCategories', res.data.data);
        payload.resolve(res.data.code);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getGeneralCategory({ commit }, payload) {
    return axios({
      method: 'get',
      url: `${API}/categories`,
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {},
    })
      .then((res) => {
        commit('setGeneralCategory', res.data.data);
        payload.resolve(res.data.code);
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
