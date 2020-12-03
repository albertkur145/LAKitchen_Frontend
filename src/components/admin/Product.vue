<template>
  <div>
    <TemplateContent>
      <template v-slot:title>
        <span>Jual Produk</span>
      </template>

      <template v-slot:content>
        <div class="container-la">
          <div class="head">
            <div class="d-flex flex-wrap">
              <div class="position-relative">
                <select @change="getProducts(1)" v-model="selectedCategory"
                class="select-la bg-white" v-if="categories !== null">
                  <option value="">Semua Produk</option>
                  <option v-for="val in categories"
                  :key="val.id" :value="val.id">
                    {{ val.name }}
                  </option>
                </select>

                <font-awesome-icon icon="chevron-down" class="chev-icon"/>
              </div>

              <div class="position-relative">
                <input type="text" v-model="searchText"
                @keyup="search(1)" @keyup.enter="getProductsByName(1)"
                class="input-text" placeholder="Apa yang sedang kamu cari?">
                <font-awesome-icon icon="search" class="search-icon"/>
              </div>
            </div>

            <button @click="redirect({ name: 'AdminProductForm' })"
            class="btn-create">Tambah</button>
          </div>

          <b-table-simple responsive class="table-la">
            <b-thead>
              <b-tr>
                <b-th class="title">Produk</b-th>
                <b-th class="title">Harga</b-th>
                <b-th class="title">Kategori</b-th>
                <b-th class="title">Sub Kategori</b-th>
                <b-th class="title text-center">Popularitas</b-th>
                <b-th class="title text-center">Rating</b-th>
                <b-th class="title text-center">Total Penjualan</b-th>
                <b-th></b-th>
              </b-tr>
            </b-thead>

            <b-tbody v-if="dataTable !== null">
              <b-tr v-for="val in dataTable" :key="val.id">
                <b-td class="value">
                  <router-link :to="`/product/${val.id}`" target="_blank">
                    {{ val.name }}
                  </router-link>
                </b-td>
                <b-td class="value">{{ val.price | currency }}</b-td>
                <b-td class="value">{{ val.category }}</b-td>
                <b-td class="value">{{ val.subCategory }}</b-td>
                <b-td class="value text-center">{{ val.popularity }}</b-td>
                <b-td class="value text-center">{{ val.rating }}</b-td>
                <b-td class="value text-center">{{ val.sold }}</b-td>
                <b-td class="value">
                  <font-awesome-icon icon="pen" class="edit-icon"
                  @click="redirect({ name: 'AdminProductForm', params: { id: val.id } })"/>
                  <font-awesome-icon icon="star" class="ml-1 rate-icon"/>
                </b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>

          <div v-if="dataTable === null" class="is-empty text-center">
            Data tidak ditemukan.
          </div>

          <div class="paging" v-if="isPageActive && paging !== null">
            <span v-for="i in paging" :key="i" @click="manageRequest(i)"
            :class="`page${i === activePage ? ' active-page' : ''}`">
              {{ i }}
            </span>
          </div>
        </div>
      </template>
    </TemplateContent>

    <Loader :class="`${loader ? '' : 'd-none'}`"/>
  </div>
</template>

<style lang="scss" scoped>

  // global css
  .container-la {
    border-radius: 0.5rem;
    background-color: #FFF;
    padding: 1.5rem 2rem;

    .head {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;

      .select-la, .input-text {
        outline: none;
        color: #3F3F3F;
        border-radius: 0.3125rem;
        border: 0.0625rem solid #AAA;
        margin-right: 1rem;
        margin-bottom: 1rem;
        padding-top: 0.4375rem;
        padding-bottom: 0.4375rem;
        font-size: 0.875em;

        &:focus {
          border: 0.0625rem solid #BF67E9;
          box-shadow: 0 0 0.0625rem 0.125rem rgba($color: #BF67E9, $alpha: 0.3)
        }
      }

      .chev-icon, .search-icon {
        color: #BFBFBF;
        position: absolute;
      }

      .chev-icon {
        top: 0.875rem;
        right: 0.875rem;
        font-size: 0.6875em;
      }

      .search-icon {
        top: 0.8125rem;
        left: 0.75rem;
        font-size: 0.8125em;
      }

      .select-la {
        width: 100%;
        -webkit-appearance: none;
        -moz-appearance: none;
        padding-left: 1rem;
        padding-right: 3.25rem;
      }

      .input-text {
        width: 100%;
        padding-left: 2.5rem;
        padding-right: 1rem;

        &::placeholder {
          color: #A0A0A0;
        }
      }

      .btn-create {
        color: #FFF;
        font-weight: 600;
        border-radius: 0.5rem;
        background-color: #BF67E9;
        transition: background-color .2s ease-out;
        margin-bottom: 1rem;
        padding: 0.5875rem 1.5rem;
        font-size: 0.875em;

        &:hover {
          background-color: #B556E2;
        }
      }
    }

    .table-la {
      margin-top: 1.25rem;

      .title {
        color: #444;
        font-weight: 600;
        white-space: nowrap;
        font-size: 0.875em;
      }

      .value {
        color: #555;
        white-space: nowrap;
        font-size: 0.875em;
      }

      .edit-icon, .rate-icon {
        cursor: pointer;
      }

      .edit-icon {
        color: #24DB83;
      }

      .rate-icon {
        color: #FF9900;
      }
    }

    .is-empty {
      font-weight: 600;
      color: #BF67E9;
      border-radius: 0.5rem;
      border: 0.0625rem dashed #BF67E9;
      padding: 0.75rem;
      font-size: 0.875em;
    }

    .paging {
      text-align: right;

      .page {
        color: #666;
        cursor: pointer;
        margin-left: 0.25rem;
        font-size: 0.875em;
      }

      .active-page {
        font-weight: 600;
        color: #0075FF;
      }
    }
  }
  // global css

  // #Device = Mobiles
  @media (min-width: 320px) and (max-width: 480px) {

  }
  // #Device = Mobiles

  // #Device = Low Resolution Tablets
  @media (min-width: 481px) and (max-width: 767px) {
    .container-la {
      padding: 1.5rem 2rem;

      .head {

        .select-la, .input-text {
          font-size: 0.875em;
        }

        .chev-icon {
          top: 0.875rem;
          right: 1.75rem;
          font-size: 0.75em;
        }

        .search-icon {
          top: 0.75rem;
          left: 0.75rem;
          font-size: 0.875em;
        }

        .select-la {
          width: unset;
        }

        .input-text {
          width: 19rem;
        }

        .btn-create {
          font-size: 0.875em;
        }
      }

      .table-la {

        .title {
          font-size: 0.9375em;
        }

        .value {
          font-size: 0.875em;
        }
      }

      .is-empty {
        font-size: 0.9375em;
      }
    }
  }
  // #Device = Low Resolution Tablets

  // #Device = Tablets, Ipads
  @media (min-width: 768px) and (max-width: 1024px) {
    .container-la {
      padding: 1.5rem 2rem;

      .head {

        .select-la, .input-text {
          font-size: 0.9375em;
        }

        .chev-icon {
          top: 0.875rem;
          right: 1.75rem;
          font-size: 0.75em;
        }

        .search-icon {
          top: 0.75rem;
          left: 0.75rem;
          font-size: 0.875em;
        }

        .select-la {
          width: unset;
        }

        .input-text {
          width: 19rem;
        }

        .btn-create {
          font-size: 0.9375em;
        }
      }

      .table-la {

        .title {
          font-size: 1em;
        }

        .value {
          font-size: 0.9375em;
        }
      }

      .is-empty {
        font-size: 1em;
      }

      .paging {

        .page {
          font-size: 0.9375em;
        }
      }
    }
  }
  // #Device = Tablets, Ipads

  // #Device = Laptops, Desktops
  @media (min-width: 1025px) {
    .container-la {
      padding: 1.5rem 2rem;

      .head {

        .select-la, .input-text {
          font-size: 0.9375em;
        }

        .chev-icon {
          top: 0.875rem;
          right: 1.75rem;
          font-size: 0.75em;
        }

        .search-icon {
          top: 0.75rem;
          left: 0.75rem;
          font-size: 0.875em;
        }

        .select-la {
          width: unset;
        }

        .input-text {
          width: 19rem;
        }

        .btn-create {
          font-size: 0.9375em;
        }
      }

      .table-la {

        .title {
          font-size: 1em;
        }

        .value {
          font-size: 0.9375em;
        }
      }

      .is-empty {
        font-size: 1em;
      }

      .paging {

        .page {
          font-size: 0.9375em;
        }
      }
    }
  }
  // #Device = Laptops, Desktops

</style>

<script>

import { mapGetters, mapActions } from 'vuex';
import Loader from '../Loader.vue';
import TemplateContent from './TemplateContent.vue';

export default {

  components: {
    Loader,
    TemplateContent,
  },

  data() {
    return {
      loader: false,

      paging: null,
      activePage: null,
      isPageActive: true,

      dataTable: null,
      categories: null,

      searchText: '',
      selectedCategory: '',

      timeout: null,
    };
  },

  computed: {
    ...mapGetters('categories', [
      'generalCategoryList',
    ]),
  },

  methods: {
    ...mapActions('adProduct', [
      'getAllByPaging',
      'getAllByPagingCategory',
      'getAllByName',
    ]),

    ...mapActions('categories', [
      'getGeneralCategory',
    ]),

    async getCategories() {
      this.loader = true;

      const { code } = await this.$func.promiseAPI(this.getGeneralCategory);

      this.loader = false;

      if (code >= 200 && code < 300) {
        this.categories = this.generalCategoryList.categories;
      } else {
        this.$func.popupConnectionError(false);
      }
    },

    async getProducts(page) {
      this.searchText = '';
      this.loader = true;

      let action;
      const params = { page };

      if (this.selectedCategory) {
        params.categoryId = this.selectedCategory;
        action = this.getAllByPagingCategory;
      } else {
        action = this.getAllByPaging;
      }

      const { code, data, paging } = await this.$func.promiseAPI(action, params);

      this.loader = false;
      this.setData(code, data, paging, page);
    },

    async getProductsByName(page) {
      this.loader = true;

      const { code, data, paging } = await this.$func.promiseAPI(this.getAllByName, {
        page,
        name: this.searchText,
      });

      this.loader = false;
      this.setData(code, data, paging, page);
    },

    setData(code, data, paging, page) {
      if (code >= 200 && code < 300) {
        this.dataTable = data.products;
        this.paging = Math.ceil(paging.count / paging.view);
        this.activePage = page;
        this.isPageActive = true;
      } else if (code === 404) {
        this.isPageActive = false;
        this.dataTable = null;
      } else {
        this.$func.popupConnectionError(false);
      }
    },

    search(page) {
      clearTimeout(this.timeout);

      this.timeout = setTimeout(() => {
        if (this.searchText.length !== 0) {
          this.getProductsByName(page);
        } else {
          this.getProducts(1);
        }
      }, 1000);
    },

    manageRequest(page) {
      if (this.searchText.length === 0) {
        this.getProducts(page);
      } else {
        this.getProductsByName(page);
      }
    },

    redirect(route) {
      this.$router.push(route);
    },
  },

  created() {
    this.getCategories();
    this.getProducts(1);
  },

};

</script>
