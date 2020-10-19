<template>
  <div id="app">
    <div class="top">
      <div class="brand">
        <img src="@/assets/images/logo.png" alt="Logo LA' Kitchen">
      </div>

      <div class="search">
        <font-awesome-icon icon="search" class="search-icon"/>
        <input type="text" placeholder="Kamu sedang cari apa...">
        <button class="btn-search">Cari</button>
      </div>

      <div class="info">
        <div class="cart">
          <font-awesome-icon icon="shopping-cart"/>
        </div>

        <div class="sign">
          <button class="btn-login">Masuk</button>
          <button class="btn-register">Daftar</button>
        </div>

        <div class="profile d-none">
          <b-avatar class="avatar">AK</b-avatar>
          <span class="username ml-3">Hi, Albert Kurniawan</span>
        </div>
      </div>
    </div>

    <div class="bottom">
      <div class="left">
        <div class="categories">
          <font-awesome-icon icon="bars" class="bars-icon"/>
          <span class="text">Kategori</span>
          <font-awesome-icon icon="chevron-down" class="chevdown-icon"/>

          <Categories/>
        </div>

        <div class="line-spacer">|</div>

        <div class="sort-text">Rating Teratas</div>
        <div class="sort-text">Harga Terendah</div>
        <div class="sort-text">Harga Tertinggi</div>
      </div>

      <div class="right">
        <div class="help">
          <font-awesome-icon icon="question-circle"/>
          <span class="ml-1">Bantuan</span>
        </div>
      </div>
    </div>

    <div class="mt-4 text-center text-danger">{{ width }}</div>
  </div>
</template>

<style lang="scss" scoped>

  // global css
  #app {
    position: fixed;
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
      display: none;
    }
  }
  // global css

  // Mobile devices
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
    }
  }
  // Mobile devices

  // iPads, Tablets
  @media (min-width: 481px) and (max-width: 768px) {
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
    }
  }
  // iPads, Tablets

  // Small screen laptops
  @media (min-width: 769px) and (max-width: 1024px) {
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
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #FFF;
        color: #555;
        position: relative;
        box-shadow: 0 0.25rem 0.25rem rgba($color: #333, $alpha: 0.1);
        font-size: 0.8125em;
        padding: 0.5rem 1.5rem;

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
            color: #BDBDBD;
            margin-right: 1.5rem;
          }

          .sort-text {
            cursor: pointer;
            margin-right: 1.5rem;

            &:hover {
              color: #333;
            }
          }
        }

        .right {
          display: flex;

          .help {
            cursor: pointer;

            &:hover {
              color: #333;
            }
          }
        }
      }
    }
  }
  // Small screen laptops

  // Desktops, Other large screens
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
            cursor: pointer;
            color: #777;
            border-radius: 0.5rem;
            margin-left: 1rem;
            font-size: 1.25em;
            padding: 0.25rem 0.625rem;

            &:hover {
              background-color: #F6F6F6;
            }
          }

          .sign {
            margin-left: 1rem;

            .btn-login, .btn-register {
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
          }
        }
      }

      .bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #FFF;
        color: #555;
        position: relative;
        font-size: 0.875em;
        box-shadow: 0 0.25rem 0.25rem rgba($color: #333, $alpha: 0.1);
        padding: 0.5rem 1.875rem;

        .left {
          display: flex;

          .categories {
            display: flex;
            align-items: center;
            cursor: pointer;
            margin-right: 1.75rem;

            .bars-icon {
              margin-right: 0.875rem;
              font-size: 0.9375em;
            }

            .chevdown-icon {
              color: #999;
              font-size: 0.8125em;
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
            color: #BDBDBD;
            margin-right: 1.75rem;
          }

          .sort-text {
            cursor: pointer;
            margin-right: 1.75rem;

            &:hover {
              color: #333;
            }
          }
        }

        .right {
          display: flex;

          .help {
            cursor: pointer;

            &:hover {
              color: #333;
            }
          }
        }
      }
    }
  }
  // Desktops, Other large screens

</style>

<script>

import Categories from './Categories.vue';

export default {

  components: {
    Categories,
  },

  data() {
    return {
      width: null,
    };
  },

  mounted() {
    window.addEventListener('resize', this.windowWidth);
  },

  methods: {
    windowWidth() {
      this.width = window.innerWidth;
    },
  },

  created() {
    this.windowWidth();
  },

};

</script>
