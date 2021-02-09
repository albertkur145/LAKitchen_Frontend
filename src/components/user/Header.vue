<template>
  <div id="app">
    <div class="top">
      <router-link to="/" class="brand">
        <img src="@/assets/images/logo.png" alt="Logo LA' Kitchen">
      </router-link>

      <div class="search">
        <label for="search-input"></label>
        <font-awesome-icon icon="search" class="search-icon"/>
        <input id="search-input" v-model="searchText" placeholder="Kamu sedang cari apa..."
        @keyup.enter="redirectSearch('search', searchText)" type="text">
        <button class="btn-search" @click="redirectSearch('search', searchText)">Cari</button>
      </div>

      <div class="info">
        <div class="cart" @click="$router.push('/cart')">
          <span class="num-cart" v-if="isLogin && totalCart">{{ totalCart }}</span>
          <font-awesome-icon icon="shopping-cart"/>
        </div>

        <div :class="`sign${isLogin ? ' d-none' : ''}`">
          <router-link to="/login" class="btn-login">Masuk</router-link>
          <router-link to="/register" class="btn-register">Daftar</router-link>
        </div>

        <div @mouseover="showBackground" @mouseleave="hideBackground"
        :class="`profile${isLogin ? '' : ' d-none'}`" v-if="user !== null">
          <b-avatar class="avatar">{{ getInitial() }}</b-avatar>
          <span class="username ml-3">
            Hi, {{ user.name === null ? 'User' : username }}
          </span>

          <div class="profile-path">
            <div class="container-path">
              <div v-for="(value, index) in profilePath" :key="index"
              class="text-path" @click="redirect(value.route)">
                <b-row>
                  <b-col cols="1"><font-awesome-icon :icon="value.icon"/></b-col>
                  <b-col cols="10"><span class="ml-1">{{ value.name }}</span></b-col>
                </b-row>
              </div>
              <div class="text-path" @click="logout">
                <b-row>
                  <b-col cols="1"><font-awesome-icon icon="sign-out-alt"/></b-col>
                  <b-col cols="10"><span class="ml-1">Keluar</span></b-col>
                </b-row>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bottom">
      <div class="left">
        <div class="categories">
          <section @click="toggleCategories">
            <font-awesome-icon icon="bars" class="bars-icon"/>
            <span class="text">Kategori</span>
            <font-awesome-icon icon="chevron-down" class="chevdown-icon"/>
          </section>

          <template v-if="windowWidth < 769">
            <CategoriesMobile :categories="categories"/>
          </template>

          <Categories v-else :categories="categories"/>
        </div>

        <div class="line-spacer">|</div>

        <div class="sort-text" @click="redirectSearch('rating', '-')">Rating Teratas</div>
        <div class="sort-text" @click="redirectSearch('price', 'lowest')">Harga Terendah</div>
        <div class="sort-text" @click="redirectSearch('price', 'highest')">Harga Tertinggi</div>
      </div>

      <div class="right">
        <div class="help">
          <font-awesome-icon icon="question-circle"/>
          <span class="ml-1">Bantuan</span>
        </div>
      </div>
    </div>

    <template v-if="windowWidth < 1025">
      <div class="sidebar-icon" @click="showSidebar">
        <font-awesome-icon icon="bars"/>
      </div>

      <SidebarMobile :show="isShowSide" @close="hideSidebar"/>
    </template>
    <!-- <div class="text-center mt-5">{{ windowWidth }}</div> -->

    <Loader :class="`${loader ? '' : 'd-none'}`"/>
  </div>
</template>

<style lang="scss" scoped>

  // global css
  #app {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    right: 0;

    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #FFF;
      border-bottom: 0.0625rem solid #FF6C2D;
      padding: 0.875rem;

      .brand {
        display: none;
      }

      .search {
        position: relative;
        border: 0.125rem solid #FF6C2D;
        border-radius: 100rem;
        width: 100%;
        padding: 0.375rem 0.875rem;

        .search-icon {
          position: absolute;
          color: #999;
          top: 0.6875rem;
          left: 0.75rem;
          font-size: 0.875em;
        }

        input {
          width: 100%;
          outline: 0;
          border: 0;
          color: #555;
          padding-left: 1.375rem;
          font-size: 0.6875em;

          &::placeholder {
            color: #999;
          }
        }

        .btn-search {
          position: absolute;
          border-radius: 100rem;
          background-color: #FF6C2D;
          color: #FFF;
          font-weight: 500;
          top: 0.125rem;
          right: 0.125rem;
          padding: 0.4375rem 1rem;
          font-size: 0.75em;
        }
      }

      .info {
        display: none;
      }
    }

    .bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #FFF;
      color: #444;
      position: relative;
      box-shadow: 0 0.25rem 0.25rem rgba($color: #333, $alpha: 0.1);
      font-size: 0.8125em;
      padding: 0.5rem 0.875rem;

      .left {
        display: flex;

        .categories {
          display: flex;
          align-items: center;
          cursor: pointer;
          margin-right: 1.5rem;

          .bars-icon {
            margin-right: 0.875rem;
            font-size: 0.875em;
          }

          .chevdown-icon {
            color: #999;
            font-size: 0.75em;
          }

          .text {
            margin-right: 0.875rem;
          }

          &:hover, &:hover .chevdown-icon {
            color: #333;
          }

          &:hover .menu-list-container {
            transform: scaleY(1);
          }
        }

        .line-spacer {
          display: none;
          color: #BDBDBD;
          margin-right: 1.5rem;
        }

        .sort-text {
          display: none;
          cursor: pointer;
          margin-right: 1.5rem;

          &:hover {
            color: #333;
          }
        }
      }

      .right {
        display: none;

        .help {
          cursor: pointer;

          &:hover {
            color: #333;
          }
        }
      }
    }

    .transform-scale {
      transform: scaleY(0) !important;
    }

    .sidebar-icon {
      position: absolute;
      cursor: pointer;
      color: #FFF;
      border-radius: 100rem 0 0 100rem;
      background-color: #FF6C2D;
      box-shadow: 0 0 0.25rem rgba($color: #000000, $alpha: 0.4);
      top: 7.5rem;
      right: 0;
      padding: 0.5rem 0.5rem 0.5rem 1rem;
    }
  }
  // global css

  // #Device = Mobiles
  @media (min-width: 320px) and (max-width: 480px) {
    #app {

      .top {
        padding: 0.875rem;

        .search {
          padding: 0.375rem 0.875rem;

          .search-icon {
            top: 0.6875rem;
            left: 1rem;
            font-size: 0.875em;
          }

          input {
            padding-left: 2rem;
            font-size: 0.75em;
          }

          .btn-search {
            top: 0.125rem;
            right: 0.125rem;
            padding: 0.4375rem 1.125rem;
            font-size: 0.75em;
          }
        }
      }

      .bottom {
        padding: 0.5rem 0.875rem;

        .right {
          display: block;
        }
      }
    }
  }
  // #Device = Mobiles

  // #Device = Low Resolution Tablets
  @media (min-width: 481px) and (max-width: 767px) {
    #app {

      .top {
        padding: 0.75rem 1rem;

        .brand {
          display: block;
          max-width: 6.5rem;

          img {
            width: 6.5rem;
          }
        }

        .search {
          width: 67%;
          padding: 0.25rem 0.75rem;

          .search-icon {
            top: 0.5875rem;
            left: 0.875rem;
            font-size: 0.875em;
          }

          input {
            padding-left: 2rem;
            font-size: 0.75em;
          }

          .btn-search {
            top: 0.125rem;
            right: 0.1875rem;
            padding: 0.3125rem 1.125rem;
            font-size: 0.75em;
          }
        }
      }

      .bottom {
        padding: 0.5rem 1rem;

        .right {
          display: flex;
        }
      }
    }
  }
  // #Device = Low Resolution Tablets

  // #Device = Tablets, Ipads
  @media (min-width: 768px) and (max-width: 1024px) {
    #app {

      .top {
        padding: 0.875rem 1.5rem;

        .brand {
          display: block;
          max-width: 7rem;

          img {
            width: 7rem;
          }
        }

        .search {
          width: 70%;
          padding: 0.3125rem 0.9375rem;

          .search-icon {
            top: 0.625rem;
            left: 1rem;
            font-size: 0.9375em;
          }

          input {
            padding-left: 2.5rem;
            font-size: 0.8125em;
          }

          .btn-search {
            top: 0.125rem;
            right: 0.1875rem;
            padding: 0.25rem 1.375rem;
            font-size: 0.9375em;
          }
        }
      }

      .bottom {
        font-size: 0.8125em;
        padding: 0.5rem 1.5rem;

        .left {

          .categories {
            margin-right: 1.5rem;

            .bars-icon {
              margin-right: 0.875rem;
              font-size: 0.875em;
            }

            .chevdown-icon {
              font-size: 0.75em;
            }

            .text {
              margin-right: 0.875rem;
            }
          }

          .line-spacer {
            display: block;
            margin-right: 1.5rem;
          }

          .sort-text {
            display: block;
            margin-right: 1.5rem;
          }
        }

        .right {
          display: flex;
        }
      }
    }
  }
  // #Device = Tablets, Ipads

  // #Device = Laptops, Desktops
  @media (min-width: 1025px) {
    #app {

      .top {
        padding: 0.875rem 1.875rem;

        .brand {
          display: block;
          max-width: 7rem;

          img {
            width: 7rem;
          }
        }

        .search {
          width: 49%;
          padding: 0.375rem 1rem;

          .search-icon {
            top: 0.5875rem;
            left: 1rem;
            font-size: 1.0625em;
          }

          input {
            padding-left: 2.75rem;
            font-size: 0.875em;
          }

          .btn-search {
            top: 0.125rem;
            right: 0.1875rem;
            padding: 0.3125rem 1.5rem;
            font-size: 0.9375em;
          }
        }

        .info {
          display: flex;
          align-items: center;

          .cart {
            color: #777;
            cursor: pointer;
            position: relative;
            border-radius: 0.5rem;
            margin-left: 1rem;
            font-size: 1.25em;
            padding: 0.25rem 0.625rem;

            .num-cart {
              top: -0.4375rem;
              right: -0.4375rem;
              color: #FFF;
              font-weight: 500;
              position: absolute;
              border-radius: 100rem;
              background-color: #FF5823;
              padding: 0.1875rem 0.5rem 0.125rem;
              font-size: 0.625em;
            }

            &:hover {
              background-color: #F6F6F6;
            }
          }

          .sign {
            margin-left: 1rem;

            .btn-login, .btn-register {
              display: inline-block;
              text-decoration: none;
              font-weight: 500;
              border-radius: 0.5rem;
              padding: 0.5rem 2rem;
              margin-left: 1.5rem;
              font-size: 0.8125em;
            }

            .btn-login {
              background-color: #FFF;
              color: #FF6C2D;
              border: 0.0625rem solid #FF6C2D;
            }

            .btn-register {
              background-color: #FF6C2D;
              color: #FFF;
              transition: background-color .2s linear;

              &:hover {
                background-color: #F56527;
              }
            }
          }

          .profile {
            display: flex;
            align-items: center;
            cursor: pointer;
            position: relative;
            margin-left: 4rem;

            .avatar {
              background-image: radial-gradient(#FF8541, #FF7222, #FF5C00);
              font-size: 0.875em;
            }

            .username {
              display: block;
              color: #6A6A6A;
              font-size: 0.9375em;
            }

            .profile-path {
              position: absolute;
              opacity: 0;
              transform: scaleY(0);
              transform-origin: top;
              transition: opacity .3s linear;
              z-index: 1;
              right: 0;
              top: 2.5rem;
              width: 15rem;
              padding: 0.5rem 0;

              .container-path {
                border: 0.0625rem solid #DADADA;
                background-color: #FFF;
                border-radius: 0.625rem;
                padding: 0.5rem 0;

                .text-path {
                  color: #404040;
                  font-size: 0.875em;
                  padding: 0.75rem 1.375rem;

                  &:hover {
                    background-color: #F1F1F1;
                  }
                }
              }
            }

            &:hover .profile-path {
              opacity: 1;
              transform: scaleY(1);
            }
          }
        }
      }

      .bottom {
        font-size: 0.875em;
        padding: 0.5rem 1.875rem;

        .left {

          .categories {
            margin-right: 1.75rem;

            .bars-icon {
              margin-right: 0.875rem;
              font-size: 0.9375em;
            }

            .chevdown-icon {
              font-size: 0.8125em;
            }

            .text {
              margin-right: 0.875rem;
            }
          }

          .line-spacer {
            display: block;
            margin-right: 1.75rem;
          }

          .sort-text {
            display: block;
            margin-right: 1.75rem;
          }
        }

        .right {
          display: flex;
        }
      }
    }
  }
  // #Device = Laptops, Desktops

</style>

<script>

import { mapGetters, mapActions } from 'vuex';
import Loader from '../Loader.vue';
import Categories from './Categories.vue';
import CategoriesMobile from './CategoriesMobile.vue';
import SidebarMobile from './SidebarMobile.vue';

export default {

  components: {
    Categories,
    CategoriesMobile,
    SidebarMobile,
    Loader,
  },

  data() {
    return {
      windowWidth: null,
      isShowSide: false,
      categories: [],
      searchText: '',
      isLogin: false,
      loader: false,
      user: null,
    };
  },

  computed: {
    ...mapGetters('categories', [
      'categoryList',
    ]),

    ...mapGetters('cart', [
      'countUserCart',
    ]),

    profilePath() {
      return this.$func.pathUser();
    },

    username() {
      if (this.user.name.length > 16) {
        return `${this.user.name.slice(0, 16)}...`;
      }

      return this.user.name;
    },

    totalCart() {
      return this.countUserCart.productSum;
    },
  },

  mounted() {
    window.addEventListener('resize', this.getWindowWidth);

    if (this.$cookies.get('token') && this.$cookies.get('user')) {
      this.isLogin = true;
    }
  },

  methods: {
    ...mapActions('categories', [
      'getCategories',
    ]),

    ...mapActions('cart', [
      'countCart',
    ]),

    ...mapActions('csChat', ['terminateCall']),

    async terminateCallWhenLogout() {
      const callId = localStorage.getItem('callId');
      await this.$func.promiseAPI(this.terminateCall, { callId });
    },

    async getTotalCart() {
      await this.$func.promiseAPI(this.countCart, {
        userId: this.$cookies.get('user').id,
      });
    },

    async getCategoryList() {
      this.loader = true;
      const { code } = await this.$func.promiseAPI(this.getCategories);
      this.loader = false;

      if (code >= 200 && code < 300) {
        this.categories = this.categoryList.categories;
      } else {
        this.$func.popupConnectionError();
      }
    },

    getWindowWidth() {
      this.windowWidth = window.innerWidth;
    },

    showBackground() {
      this.$emit('show');
    },

    hideBackground() {
      this.$emit('hide');
    },

    toggleCategories() {
      const el = document.querySelector('.bottom .left .menu-list-container');
      el.classList.toggle('transform-scale');
    },

    showSidebar() {
      this.isShowSide = true;
      this.showBackground();
    },

    hideSidebar() {
      this.isShowSide = false;
      this.hideBackground();
    },

    redirectSearch(type, value) {
      this.$router.push({
        name: 'ProductSearch',
        params: {
          type,
          value,
        },
      });
    },

    getInitial() {
      if (this.user.name === null) {
        return 'U';
      }

      const name = this.user.name.split(' ');
      let limit = 0;
      let initial = '';

      for (let i = 0; i < name.length; i += 1) {
        if (limit > 1) {
          break;
        }
        initial += `${name[i][0]}`;
        limit += 1;
      }

      return initial;
    },

    logout() {
      this.terminateCallWhenLogout();
      this.$func.removeStorages(this.$cookies);
      window.location.reload();
    },

    redirect(route) {
      this.$router.push(route);
    },
  },

  created() {
    this.getWindowWidth();
    this.getCategoryList();

    this.user = this.$cookies.get('user');

    if (this.user) {
      this.getTotalCart();
    }
  },

};

</script>
