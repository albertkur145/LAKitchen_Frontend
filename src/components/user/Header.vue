<template>
  <div id="app">
    <div class="top">
      <div class="brand">
        <img src="@/assets/images/logo.png" alt="Logo LA' Kitchen">
      </div>

      <div class="search">
        <input type="text">
        <button class="btn-search">Cari</button>
      </div>

      <div class="info">
        roboto
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
      box-shadow: 0 0.0625rem 0.75rem rgba($color: #000000, $alpha: 0.1);
      padding: 0.875rem 1.875rem;

      .brand {
        max-width: 7rem;

        img {
          width: 100%;
        }
      }

      .search {
        position: relative;
        min-width: 40rem;
        border: 0.125rem solid #FF6C2D;
        border-radius: 100rem;
        padding: 0.4375rem 1rem;

        input {
          width: 100%;
          outline: 0;
          border: 0;
          padding-left: 4rem;
        }

        .btn-search {
          position: absolute;
          border: 0;
          outline: 0;
          border-radius: 100rem;
          background-color: #FF6C2D;
          color: #FFF;
          font-weight: 100;
          top: 0.1875rem;
          right: 0.25rem;
          padding: 0.375rem 1.5rem;
          font-size: 0.9375em;
        }
      }
    }
  }

</style>
