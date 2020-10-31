<template>
  <div id="sidebar" :class="show ? '' : 'scale-transform'">
    <span class="times-icon" @click="$emit('close')">
      <font-awesome-icon icon="times"/>
    </span>

    <div class="path">
      <section v-if="!isLogin">
        <div class="brand">
          <img src="@/assets/images/logo.png" alt="Logo LA' Kitchen">
        </div>

        <LoginForm/>
      </section>

      <section v-else>
        <div class="account">
          Akun Saya
        </div>

        <ProfilePath/>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>

  // global css
  #sidebar {
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    transform: scaleX(1);
    transform-origin: right;
    transition: transform .2s ease-out;
    background-color: #FFF;
    border-left: 0.1875rem solid #FF6C2D;
    box-shadow: -0.0625rem 0 0.25rem rgba($color: #000000, $alpha: 0.4);
    width: 100%;

    .times-icon {
      position: absolute;
      cursor: pointer;
      top: 7.5rem;
      left: 0.25rem;
      color: #FFF;
      background-color: #FF6C2D;
      border-radius: 100rem;
      transition: left .4s ease-in-out;
      padding: 0.5rem 0.875rem;
    }

    .path {
      padding: 3rem 2rem 3rem 4rem;

      .brand {
        text-align: center;
        margin-bottom: 6rem;

        img {
          width: 8.5rem;
          max-width: 8.5rem;
        }
      }

      .account {
        text-align: center;
        color: #FF6C2D;
        font-weight: 500;
        font-size: 1rem;
        margin-bottom: 1.5rem;
      }
    }
  }
  // global css

  .scale-transform {
    transform: scaleX(0) !important;
  }

  // #Device = Mobiles
  @media (min-width: 320px) and (max-width: 480px) {
    #sidebar {
      width: 100%;

      .path {
        padding: 3rem 2rem 3rem 4rem;

        .brand {
          margin-bottom: 6rem;

          img {
            width: 9rem;
            max-width: 9rem;
          }
        }

        .account {
          font-size: 1.25rem;
        }
      }
    }
  }
  // #Device = Mobiles

  // #Device = Low Resolution Tablets
  @media (min-width: 481px) and (max-width: 767px) {
    #sidebar {
      width: 80%;

      .times-icon {
        left: -1.25rem;
      }

      .path {
        padding: 3rem;

        .brand {
          margin-bottom: 5rem;

          img {
            width: 9.5rem;
            max-width: 9.5rem;
          }
        }

        .account {
          font-size: 1.375rem;
        }
      }
    }
  }
  // #Device = Low Resolution Tablets

  // #Device = Tablets, Ipads
  @media (min-width: 768px) and (max-width: 1024px) {
    #sidebar {
      width: 60%;

      .times-icon {
        left: -1.25rem;
      }

      .path {
        padding: 3rem;

        .brand {
          margin-bottom: 5rem;

          img {
            width: 10rem;
            max-width: 10rem;
          }
        }

        .account {
          font-size: 1.5rem;
        }
      }
    }
  }
  // #Device = Tablets, Ipads

  // #Device = Laptops, Desktops
  @media (min-width: 1025px) {

  }
  // #Device = Laptops, Desktops

</style>

<script>

import LoginForm from './LoginForm.vue';
import ProfilePath from './ProfilePath.vue';

export default {

  props: {
    show: {
      type: Boolean,
      required: true,
      default: false,
    },
  },

  components: {
    LoginForm,
    ProfilePath,
  },

  data() {
    return {
      isLogin: false,
    };
  },

};

</script>
