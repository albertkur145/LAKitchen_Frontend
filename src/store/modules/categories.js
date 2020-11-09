import axios from '@/config/axios';

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
      url: '/categoriesandsub',
      data: {},
    })
      .then((res) => {
        commit('setCategories', res.data.data);
        payload.resolve({ code: res.data.code });
      })
      .catch((err) => {
        payload.resolve({ code: err.response.status });
      });
  },

  getGeneralCategory({ commit }, payload) {
    return axios({
      method: 'get',
      url: '/categories',
      data: {},
    })
      .then((res) => {
        commit('setGeneralCategory', res.data.data);
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
