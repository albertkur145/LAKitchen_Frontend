<template>
  <div class="sign-up">
    <b-row class="input-group-la">
      <b-col cols="12">
        <input type="text" v-model="form.email" @keyup="validateEmail"
        autocomplete="off" placeholder="Masukkan email">
        <font-awesome-icon icon="mail-bulk" class="input-icon"></font-awesome-icon>
        <b-form-text :class="`warning-text${validateForm.email ? ' d-none' : ''}`">
          Email tidak valid.
        </b-form-text>
      </b-col>
    </b-row>

    <b-row class="input-group-la">
      <b-col cols="12">
        <input type="text" v-model="form.hp" @keyup="validateHP"
        autocomplete="off" placeholder="Masukkan nomor hp">
        <font-awesome-icon icon="tty" class="input-icon"></font-awesome-icon>
        <b-form-text :class="`warning-text${validateForm.hp ? ' d-none' : ''}`">
          Contoh: 0813xxxxxxxx
        </b-form-text>
      </b-col>
    </b-row>

    <b-row class="input-group-la">
      <b-col cols="12">
        <input :type="typePassword" v-model="form.password" @keyup="validatePassword"
        autocomplete="off" placeholder="Masukkan kata sandi">
        <font-awesome-icon icon="lock" class="input-icon"/>
        <font-awesome-icon :icon="typeIcon" class="show-icon" @click="toggleType"/>
        <b-form-text :class="`warning-text${validateForm.password ? ' d-none' : ''}`">
          Kata sandi harus diisi.
        </b-form-text>
      </b-col>
    </b-row>

    <b-row class="input-group-la">
      <b-col cols="12">
        <input :type="typeConfirmPassword" v-model="form.confirmPassword"
        @keyup="validateConfirmPassword" autocomplete="off" placeholder="Konfirmasi kata sandi">
        <font-awesome-icon icon="lock" class="input-icon"/>
        <font-awesome-icon :icon="typeConfirmIcon" class="show-icon" @click="toggleConfirmType"/>
        <b-form-text :class="`warning-text${validateForm.confirmPassword ? ' d-none' : ''}`">
          Kata sandi tidak sama.
        </b-form-text>
      </b-col>
    </b-row>

    <button class="btn-register" @click="validationForm">Daftar</button>

    <div class="login-text">
      Sudah punya akun? <router-link to="/login">Masuk disini</router-link>
    </div>

    <Loader :class="`${loader ? '' : 'd-none'}`"/>
  </div>
</template>

<style lang="scss" scoped>

  // global css
  .sign-up {
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

      .warning-text {
        color: #FF003D !important;
      }
    }

    .btn-register {
      width: 100%;
      border-radius: 0.3125rem;
      font-weight: 500;
      color: #FFF;
      background-image: linear-gradient(to left, #FF8F1E, #FF6C00);
      margin-top: 0.5rem;
      padding: 0.5875rem;
      font-size: 0.875em;
    }

    .login-text {
      display: none;
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
    .login-text {
      display: block !important;
    }
  }
  // #Device = Laptops, Desktops

</style>

<script>

import { mapActions } from 'vuex';
import Swal from 'sweetalert2';
import Loader from '../Loader.vue';

export default {

  components: {
    Loader,
  },

  data() {
    return {
      typePassword: 'password',
      typeIcon: 'eye',
      typeConfirmPassword: 'password',
      typeConfirmIcon: 'eye',
      loader: false,

      form: {
        email: '',
        hp: '',
        password: '',
        confirmPassword: '',
      },
      validateForm: {
        email: true,
        hp: true,
        password: true,
        confirmPassword: true,
      },
    };
  },

  methods: {
    ...mapActions('user', [
      'register',
    ]),

    async registerUser() {
      this.loader = true;
      const { code } = await this.$func.promiseAPI(this.register, {
        email: this.form.email,
        phoneNumber: this.form.hp,
        password: this.form.password,
      });
      this.loader = false;

      if (code >= 200 && code < 300) {
        Swal.fire({
          icon: 'success',
          text: 'Lakukan konfirmasi pada email',
          confirmButtonText: 'Ok',
          allowOutsideClick: false,
        }).then(() => {
          this.$router.push('/');
        });
      } else {
        this.$func.popupConnectionError();
      }
    },

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

    toggleConfirmType() {
      const type = this.checkConfirmPasswordType();

      this.typeConfirmPassword = type.typePassword;
      this.typeConfirmIcon = type.typeIcon;
    },

    checkConfirmPasswordType() {
      if (this.typeConfirmPassword === 'password') {
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

    validationForm() {
      if (this.validateEmail() && this.validateHP()
      && this.validatePassword() && this.validateConfirmPassword()) {
        this.registerUser();
      }
    },

    validateEmail() {
      const regEmail = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;

      if (!regEmail.test(this.form.email)) {
        this.validateForm.email = false;
        return 0;
      }

      this.validateForm.email = true;
      return 1;
    },

    validateHP() {
      const regHp = /^08[0-9]{8,11}$/;

      if (!regHp.test(this.form.hp)) {
        this.validateForm.hp = false;
        return 0;
      }

      this.validateForm.hp = true;
      return 1;
    },

    validatePassword() {
      if (this.form.password.length === 0) {
        this.validateForm.password = false;
        return 0;
      }

      this.validateForm.password = true;
      return 1;
    },

    validateConfirmPassword() {
      if (this.form.password !== this.form.confirmPassword) {
        this.validateForm.confirmPassword = false;
        return 0;
      }

      this.validateForm.confirmPassword = true;
      return 1;
    },
  },

};

</script>
