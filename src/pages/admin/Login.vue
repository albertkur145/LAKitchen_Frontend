<template>
  <div id="app">
    <div class="d-flex justify-content-center">
      <div class="login">
        <div class="header">LA' Kitchen</div>

        <div class="form">
          <b-row class="input-group-la">
            <b-col cols="12">
              <label>Kode pegawai</label>
            </b-col>

            <b-col cols="12">
              <input type="text" v-model="form.email" @keyup.enter="validate"
              class="input-text" autocomplete="off" placeholder="Masukkan kode pegawai">
              <font-awesome-icon icon="id-card-alt" class="abs-icon input-icon"/>
            </b-col>
          </b-row>

          <b-row class="input-group-la">
            <b-col cols="12">
              <label>Kata sandi</label>
            </b-col>

            <b-col cols="12">
              <input :type="password.type" v-model="form.password" @keyup.enter="validate"
              class="input-text" autocomplete="off" placeholder="Masukkan kata sandi">

              <font-awesome-icon icon="lock" class="abs-icon input-icon"/>

              <font-awesome-icon @click="toggleShowPassword"
              :icon="password.icon" class="abs-icon show-icon"/>
            </b-col>
          </b-row>

          <b-row>
            <b-col cols="12">
              <button class="btn-login" @click="validate">Masuk</button>
            </b-col>
          </b-row>
        </div>
      </div>
    </div>

    <Loader :class="`${loader ? '' : 'd-none'}`"/>
  </div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@700&display=swap');

  // global css
  #app {
    padding: 0 1rem;
    min-height: 100vh;
    background-color: #EEE;

    .login {
      display: inline-block;
      border-radius: 0.75rem;
      background-color: #FFF;
      margin-top: 6rem;

      .header {
        font-weight: 700;
        text-align: center;
        text-transform: uppercase;
        font-family: 'Source Sans Pro';
        -webkit-text-fill-color: transparent;
        border-bottom: 0.125rem solid #DDD;
        background: -webkit-linear-gradient(45deg, #FF4D00, #FF8A1F, #FFAA2C);
        background-clip: text;
        padding: 0.625rem;
        font-size: 1.5em;
      }

      .form {
        padding: 1rem 1.25rem;

        .input-group-la {
          margin-bottom: 1rem;

          label {
            color: #333;
            font-weight: 500;
            font-size: 0.75em;
          }

          .input-text {
            width: 100%;
            outline: none;
            color: #222;
            margin-top: -0.125rem;
            border-radius: 0.25rem;
            transition: border .1s linear;
            border: 0.0625rem solid #BBB;
            padding: 0.625rem 2.5rem 0.625rem 3rem;
            font-size: 0.6875em;

            &::placeholder {
              color: #777;
              font-style: italic;
            }

            &:focus {
              border: 0.0625rem solid #777;
            }

            &:focus::placeholder {
              color: #555;
            }
          }

          .abs-icon {
            color: #ACACAC;
            position: absolute;
            top: 0.625rem;
            font-size: 0.75em;
          }

          .input-icon {
            left: 2rem;
          }

          .show-icon {
            cursor: pointer;
            top: 0.6875rem;
            right: 2rem;
          }
        }

        .btn-login {
          width: 100%;
          color: #FFF;
          font-weight: 500;
          border-radius: 0.5rem;
          background-image: linear-gradient(to right, #FF662C, #FF7A00, #FF8E25);
          padding: 0.625rem;
          margin-top: 0.375rem;
          font-size: 0.8125em;
        }
      }
    }
  }
  // global css

  // #Device = Mobiles
  @media (min-width: 320px) and (max-width: 480px) {
    #app {

      .login {

        .header {
          padding: 0.75rem;
          font-size: 1.875em;
        }

        .form {
          padding: 1.75rem 2.25rem;

          .input-group-la {

            label {
              font-size: 0.8125em;
            }

            .input-text {
              font-size: 0.75em;
            }

            .abs-icon {
              font-size: 0.8125em;
            }
          }

          .btn-login {
            padding: 0.625rem;
            font-size: 0.875em;
          }
        }
      }
    }
  }
  // #Device = Mobiles

  // #Device = Low Resolution Tablets
  @media (min-width: 481px) and (max-width: 767px) {
    #app {

      .login {

        .header {
          padding: 0.875rem;
          font-size: 2.25em;
        }

        .form {
          padding: 2rem 2.75rem;

          .input-group-la {

            label {
              font-size: 0.875em;
            }

            .input-text {
              font-size: 0.8125em;
            }

            .abs-icon {
              font-size: 0.9375em;
            }
          }

          .btn-login {
            padding: 0.625rem;
            margin-top: 0.5rem;
            font-size: 0.9375em;
          }
        }
      }
    }
  }
  // #Device = Low Resolution Tablets

  // #Device = Tablets, Ipads, Laptops, Desktops
  @media (min-width: 768px) {
    #app {

      .login {

        .header {
          padding: 1rem;
          font-size: 2.5em;
        }

        .form {
          padding: 3rem 4rem;

          .input-group-la {

            label {
              font-size: 0.9375em;
            }

            .input-text {
              font-size: 0.875em;
            }

            .abs-icon {
              font-size: 1em;
            }
          }

          .btn-login {
            padding: 0.75rem;
            margin-top: 0.75rem;
            font-size: 1em;
          }
        }
      }
    }
  }
  // #Device = Tablets, Ipads, Laptops, Desktops

</style>

<script>

import { mapGetters, mapActions } from 'vuex';
import Loader from '@/components/Loader.vue';

export default {

  components: {
    Loader,
  },

  data() {
    return {
      password: {
        isHide: true,
        type: 'password',
        icon: 'eye',
      },

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

    toggleShowPassword() {
      if (this.password.isHide) {
        this.password = { isHide: false, type: 'text', icon: 'eye-slash' };
        return;
      }

      this.password = { isHide: true, type: 'password', icon: 'eye' };
    },

    async validate() {
      this.loader = true;

      const { code } = await this.$func.promiseAPI(this.login, {
        email: this.form.email,
        password: this.form.password,
      });

      this.loader = false;

      if (code >= 200 && code < 300) {
        this.checkRole();
      } else {
        this.$func.popupError('Kode / password salah!', 'Coba lagi');
      }
    },

    checkRole() {
      if (this.userData.user.role === 'ROLE_ADMIN' || this.userData.user.role === 'ROLE_CS') {
        let user;
        let route;

        if (this.userData.user.role === 'ROLE_ADMIN') {
          user = 'admin';
          route = '/admin';
        } else {
          user = 'cs';
          route = '/cs';
        }

        this.$cookies.set('token', this.userData.token, '1y');
        this.$cookies.set(user, this.userData.user, '1y');
        this.$router.push(route);
      } else {
        this.$func.popupError('Kode / password salah!', 'Coba lagi');
      }
    },

    popupLogoutFirst(route) {
      this.$func.popupInfo('Silahkan logout terlebih dahulu')
        .then(() => {
          this.$router.push(route);
        });
    },
  },

  created() {
    if (this.$cookies.get('token')) {
      if (this.$cookies.get('admin')) {
        this.popupLogoutFirst('/admin');
      } else if (this.$cookies.get('cs')) {
        this.popupLogoutFirst('/cs');
      }
    }
  },

};

</script>
