<template>
  <div class="sign-in">
    <b-row class="input-group-la">
      <b-col cols="12">
        <input type="text" v-model="form.email" @keyup.enter="validate"
        autocomplete="off" placeholder="Masukkan email">
        <font-awesome-icon icon="mail-bulk" class="input-icon"></font-awesome-icon>
      </b-col>
    </b-row>

    <b-row class="input-group-la">
      <b-col cols="12">
        <input :type="typePassword" v-model="form.password" @keyup.enter="validate"
        autocomplete="off" placeholder="Masukkan kata sandi">
        <font-awesome-icon icon="lock" class="input-icon"/>
        <font-awesome-icon :icon="typeIcon" class="show-icon" @click="toggleType"/>
      </b-col>
    </b-row>

    <button class="btn-login" @click="validate">Masuk</button>

    <div class="register-text" @click="$emit('close')">
      Belum punya akun? <router-link to="/register"
      >Daftar disini</router-link>
    </div>

    <Loader :class="`${loader ? '' : 'd-none'}`"/>
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

      .show-icon {
        color: #777;
        cursor: pointer;
        position: absolute;
        top: 0.5rem;
        right: 1rem;
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

  // #Device = Mobiles
  @media (min-width: 320px) and (max-width: 480px) {

  }
  // #Device = Mobiles

  // #Device = Low Resolution Tablets
  @media (min-width: 481px) and (max-width: 767px) {

  }
  // #Device = Low Resolution Tablets

  // #Device = Tablets, Ipads
  @media (min-width: 768px) and (max-width: 1024px) {

  }
  // #Device = Tablets, Ipads

  // #Device = Laptops, Desktops
  @media (min-width: 1025px) {

  }
  // #Device = Laptops, Desktops

</style>

<script>

import { mapGetters, mapActions } from 'vuex';
import Loader from '../Loader.vue';

export default {

  components: {
    Loader,
  },

  data() {
    return {
      typePassword: 'password',
      typeIcon: 'eye',
      form: {
        email: '',
        password: '',
      },
      loader: false,
    };
  },

  computed: {
    ...mapGetters('auth', [
      'userData',
    ]),
  },

  methods: {
    ...mapActions('auth', [
      'login',
    ]),

    toggleType() {
      const type = this.checkPasswordType();

      this.typePassword = type.typePassword;
      this.typeIcon = type.typeIcon;
    },

    checkPasswordType() {
      if (this.typePassword === 'password') {
        return {
          typePassword: 'text',
          typeIcon: 'eye-slash',
        };
      }

      return {
        typePassword: 'password',
        typeIcon: 'eye',
      };
    },

    async validate() {
      this.loader = true;

      const { code, errors } = await this.$func.promiseAPI(this.login, {
        email: this.form.email,
        password: this.form.password,
      });

      this.loader = false;

      if (code >= 200 && code < 300) {
        this.checkRole();
      } else {
        this.$func.popupError(errors, 'Coba lagi');
      }
    },

    checkRole() {
      if (this.userData.user.role !== 'ROLE_USER') {
        this.$func.popupError('Email / password salah!', 'Coba lagi');
      } else {
        this.$cookies.set('token', this.userData.token, '1y');
        this.$cookies.set('user', this.userData.user, '1y');
        window.location.reload();
      }
    },
  },

};

</script>
