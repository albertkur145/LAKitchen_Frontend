<template>
  <div id="app">
    <Header @show="showBackground" @hide="hideBackground"/>
    <div class="bg-all"></div>

    <div class="content">
      <div class="login-container">
        <div class="title">Masuk ke akun kamu</div>
        <LoginForm/>
      </div>
    </div>

    <Footer/>
  </div>
</template>

<style lang="scss" scoped>

  // global css
  #app {

    .bg-all {
      position: fixed;
      height: 0;
      background-color: rgba($color: #000000, $alpha: 0.5);
      z-index: 2;
      opacity: 0;
      transition: opacity .3s ease-in-out;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }

    .content {
      padding: 7.25rem 0.875rem;

      .login-container {
        margin: 2rem auto 0;
        background-color: #FFF;
        box-shadow: 0 0 0.0625rem 0.0625rem rgba($color: #000000, $alpha: 0.2);
        padding: 1.5rem;
        width: 100%;

        .title {
          font-weight: 500;
          color: #FF6B00;
          text-align: center;
          margin-bottom: 2.5rem;
          font-size: 1.125em;
        }
      }
    }
  }
  // global css

  // #Device = Mobiles
  @media (min-width: 320px) and (max-width: 480px) {
    #app {

      .content {
        padding: 7.5rem 1rem;

        .login-container {
          padding: 1.75rem;

          .title {
            font-size: 1.25em;
          }
        }
      }
    }
  }
  // #Device = Mobiles

  // #Device = Low Resolution Tablets
  @media (min-width: 481px) and (max-width: 767px) {
    #app {

      .content {
        padding: 7.5rem 1rem;

        .login-container {
          padding: 1.5rem 2rem 2rem;
          width: 22rem;

          .title {
            font-size: 1.3125em;
          }
        }
      }
    }
  }
  // #Device = Low Resolution Tablets

  // #Device = Tablets, Ipads
  @media (min-width: 768px) and (max-width: 1024px) {
    #app {

      .content {
        padding: 7.75rem 1.5rem;

        .login-container {
          padding: 1.5rem 2.5rem 2.5rem;
          width: 25rem;

          .title {
            font-size: 1.375em;
          }
        }
      }
    }
  }
  // #Device = Tablets, Ipads

  // #Device = Laptops, Desktops
  @media (min-width: 1025px) {
    #app {

      .content {
        padding: 8rem 1.875rem;

        .login-container {
          padding: 2rem 3rem 3rem;
          width: 27rem;

          .title {
            font-size: 1.5em;
          }
        }
      }
    }
  }
  // #Device = Laptops, Desktops

</style>

<script>

import Header from '@/components/user/Header.vue';
import Footer from '@/components/user/Footer.vue';
import LoginForm from '@/components/user/LoginForm.vue';

export default {

  components: {
    Header,
    Footer,
    LoginForm,
  },

  methods: {
    showBackground() {
      const el = document.querySelector('.bg-all');
      el.style.opacity = '1';
      el.style.height = 'inherit';
    },

    hideBackground() {
      const el = document.querySelector('.bg-all');
      el.style.opacity = '0';
      el.style.height = '0';
    },
  },

  created() {
    if (this.$cookies.get('token') && this.$cookies.get('user')) {
      this.$router.go(-1);
    }
  },

};

</script>
