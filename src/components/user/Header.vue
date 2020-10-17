<template>
  <div id="app">
    <div class="top">
      <div class="brand">
        <img src="@/assets/images/logo.png" alt="Logo LA' Kitchen">
      </div>

      <div class="search">
        <font-awesome-icon icon="search" class="search-icon"></font-awesome-icon>
        <input type="text" placeholder="Kamu sedang cari apa...">
        <button class="btn-search">Cari</button>
      </div>

      <div class="info">
        <div class="cart">
          <font-awesome-icon icon="shopping-cart"></font-awesome-icon>
        </div>

        <div class="sign">
          <button class="btn-login">Masuk</button>
          <button class="btn-register">Daftar</button>
        </div>
      </div>
    </div>

    <div class="bottom">
      <div class="left">
        <div class="categories">
          <font-awesome-icon icon="bars" class="bars-icon"></font-awesome-icon>
          <span class="text">Kategori</span>
          <font-awesome-icon icon="chevron-down" class="chevdown-icon"></font-awesome-icon>

          <div class="menu-list">
            a
          </div>
        </div>

        <div class="line-spacer">|</div>

        <div class="sort-text">Rating Teratas</div>
        <div class="sort-text">Harga Terendah</div>
        <div class="sort-text">Harga Tertinggi</div>
      </div>

      <div class="right">
        <div class="help">
          <font-awesome-icon icon="question-circle"></font-awesome-icon>
          <span class="ml-1">Bantuan</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

  #app {

    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #FFF;
      border-bottom: 0.0625rem solid #FF6C2D;
      padding: 0.875rem 1.875rem;

      .brand {
        max-width: 7rem;

        img {
          width: 100%;
        }
      }

      .search {
        position: relative;
        min-width: 42rem;
        border: 0.125rem solid #FF6C2D;
        border-radius: 100rem;
        margin-left: 3rem;
        padding: 0.375rem 1rem;

        .search-icon {
          position: absolute;
          color: #999;
          top: 0.5875rem;
          left: 1rem;
          font-size: 1.0625em;
        }

        input {
          width: 100%;
          outline: 0;
          border: 0;
          color: #555;
          padding-left: 2.75rem;
          font-size: 0.875em;

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
          margin-left: 1.75rem;
          font-size: 1.25em;
          padding: 0.25rem 0.625rem;

          &:hover {
            background-color: #F6F6F6;
          }
        }

        .sign {
          margin-left: 1.75rem;

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
      }
    }

    .bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #FFF;
      color: #555;
      font-size: 0.875em;
      box-shadow: 0 0.25rem 0.25rem rgba($color: #333, $alpha: 0.1);
      padding: 0.5rem 1.875rem;

      .left {
        display: flex;

        .categories {
          display: flex;
          align-items: center;
          cursor: pointer;
          position: relative;
          margin-right: 1.75rem;

          .bars-icon, .chevdown-icon {
            margin-right: 0.875rem;
            font-size: 0.9375em;
          }

          .chevdown-icon {
            color: #999;
            font-size: 0.8125em;
          }

          .text {
            margin-right: 0.875rem;
            font-size: 1em;
          }

          &:hover, &:hover .chevdown-icon {
            color: #333;
          }

          .menu-list {
            position: absolute;
            top: 0;
            left: 0;
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

</style>
