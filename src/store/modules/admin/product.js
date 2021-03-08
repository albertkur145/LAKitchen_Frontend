import axios from '@/config/axios';
import api from '@/config/api';
import cookies from 'vue-cookies';

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
        Authorization: `Bearer ${cookies.get('admin_token')}`,
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
        Authorization: `Bearer ${cookies.get('admin_token')}`,
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
        Authorization: `Bearer ${cookies.get('admin_token')}`,
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

  getAllBestSelling({ commit }, payload) {
    return axios({
      method: 'get',
      url: '/admin/product/bestselling',
      params: payload.params,
      data: {},
      headers: {
        Authorization: `Bearer ${cookies.get('admin_token')}`,
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

  getBestSellingByCategory({ commit }, payload) {
    return axios({
      method: 'get',
      url: '/admin/product/bestselling/category',
      params: payload.params,
      data: {},
      headers: {
        Authorization: `Bearer ${cookies.get('admin_token')}`,
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

  getAllFavorite({ commit }, payload) {
    return axios({
      method: 'get',
      url: '/admin/product/favorite',
      params: payload.params,
      data: {},
      headers: {
        Authorization: `Bearer ${cookies.get('admin_token')}`,
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

  getFavoriteByCategory({ commit }, payload) {
    return axios({
      method: 'get',
      url: '/admin/product/favorite/category',
      params: payload.params,
      data: {},
      headers: {
        Authorization: `Bearer ${cookies.get('admin_token')}`,
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

  getAllBestRating({ commit }, payload) {
    return axios({
      method: 'get',
      url: '/admin/product/bestrating',
      params: payload.params,
      data: {},
      headers: {
        Authorization: `Bearer ${cookies.get('admin_token')}`,
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

  getBestRatingByCategory({ commit }, payload) {
    return axios({
      method: 'get',
      url: '/admin/product/bestrating/category',
      params: payload.params,
      data: {},
      headers: {
        Authorization: `Bearer ${cookies.get('admin_token')}`,
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
        Authorization: `Bearer ${cookies.get('admin_token')}`,
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
      headers: {
        Authorization: `Bearer ${cookies.get('admin_token')}`,
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

  updateProduct({ commit }, payload) {
    return axios({
      method: 'put',
      url: '/admin/product',
      data: payload.params,
      headers: {
        Authorization: `Bearer ${cookies.get('admin_token')}`,
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

  nonActiveProduct({ commit }, payload) {
    return axios({
      method: 'delete',
      url: '/admin/product',
      params: payload.params,
      data: {},
      headers: {
        Authorization: `Bearer ${cookies.get('admin_token')}`,
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

  productActivation({ commit }, payload) {
    return axios({
      method: 'put',
      url: '/admin/product/activation',
      data: payload.params,
      headers: {
        Authorization: `Bearer ${cookies.get('admin_token')}`,
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

  uploadPhotos({ commit }, payload) {
    return axios({
      method: 'post',
      url: 'admin/product/upload',
      data: payload.params,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${cookies.get('admin_token')}`,
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

  uploadPhotosPHP({ commit }, payload) {
    return axios({
      method: 'post',
      url: `${api.phpURL}/upload.php`,
      data: payload.params,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${cookies.get('admin_token')}`,
      },
    })
      .then(() => {
        commit('setTemporary', null);
        payload.resolve({ code: 200 });
      })
      .catch((err) => {
        payload.resolve(err);
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
