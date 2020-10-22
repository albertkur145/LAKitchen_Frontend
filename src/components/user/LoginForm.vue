<template>
  <div class="sign-in">
    <b-row class="input-group-la">
      <b-col cols="12">
        <input id="email" type="text" autocomplete="off" placeholder="Masukkan email">
        <font-awesome-icon icon="mail-bulk" class="input-icon"></font-awesome-icon>
      </b-col>
    </b-row>

    <b-row class="input-group-la">
      <b-col cols="12">
        <input id="password" type="password" autocomplete="off" placeholder="Masukkan kata sandi">
        <font-awesome-icon icon="lock" class="input-icon"></font-awesome-icon>
      </b-col>
    </b-row>

    <button class="btn-login">Masuk</button>

    <div class="register-text">
      Belum punya akun? <router-link to="/">Daftar disini</router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>

  // global css
  .sign-in {
    padding-right: 0 !important;

    .input-group-la {
      margin-bottom: 1.75rem;

      .input-icon {
        position: absolute;
        color: #AAA;
        top: 0.5rem;
        left: 1rem;
        font-size: 1em;
      }

      input {
        width: 100%;
        height: 2.25rem;
        border: 0;
        color: #444;
        border-bottom: 0.0625rem solid #BBB;
        padding: 0.5rem 0.75rem 0.5rem 2rem;
        font-size: 0.875em;

        &:focus {
          color: #222;
          outline: none;
          border-bottom: 0.0625rem solid #FF6C2D;
        }

        &:focus + .input-icon {
          color: #FF6C2D;
        }

        &:focus::placeholder {
          color: #777;
        }

        &::placeholder {
          color: #AAA;
        }
      }
    }

    .btn-login {
      width: 100%;
      border-radius: 0.3125rem;
      font-weight: 500;
      color: #FFF;
      background-image: linear-gradient(to left, #FF8F1E, #FF6C00);
      margin-top: 0.5rem;
      padding: 0.5875rem;
      font-size: 0.875em;
    }

    .register-text {
      text-align: center;
      color: #222;
      margin-top: 1.25rem;
      font-size: 0.875em;

      a {
        color: #006DEE;
      }
    }
  }
  // global css

  // Mobile devices
  @media (min-width: 320px) and (max-width: 480px) {

  }
  // Mobile devices

  // iPads, Tablets
  @media (min-width: 481px) and (max-width: 768px) {

  }
  // iPads, Tablets

  // Small screen laptops
  @media (min-width: 769px) and (max-width: 1024px) {

  }
  // Small screen laptops

  // Desktops, Other large screens
  @media (min-width: 1025px) {

  }
  // Desktops, Other large screens

</style>

<script>

export default {

};

</script>
