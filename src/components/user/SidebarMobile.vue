<template>
  <div id="sidebar" :class="show ? '' : 'scale-transform'">
    <span class="times-icon" @click="$emit('close')">
      <font-awesome-icon icon="times"/>
    </span>

    <div class="path">
      <div class="brand">
        <img src="@/assets/images/logo.png" alt="Logo LA' Kitchen">
      </div>

      <div class="sign-in">
        <b-row class="input-group-la">
          <b-col cols="12"><label for="email">Email</label></b-col>
          <b-col cols="12">
            <input id="email" type="text" autocomplete="off">
          </b-col>
        </b-row>

        <b-row class="input-group-la">
          <b-col cols="12"><label for="password">Password</label></b-col>
          <b-col cols="12">
            <input id="password" type="password" autocomplete="off">
          </b-col>
        </b-row>

        <button class="btn-login">Masuk</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

  #sidebar {
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    width: 85%;
    transform: scaleX(1);
    transform-origin: right;
    transition: transform .2s ease-out;
    background-color: #FFF;
    border-left: 0.1875rem solid #FF6C2D;
    box-shadow: -0.0625rem 0 0.25rem rgba($color: #000000, $alpha: 0.4);

    .times-icon {
      position: absolute;
      cursor: pointer;
      top: 7.5rem;
      left: -1.25rem;
      color: #FFF;
      background-color: #FF6C2D;
      border-radius: 100rem;
      padding: 0.5rem 0.875rem;
    }

    .path {
      padding: 2rem 4rem;

      .brand {
        text-align: center;
        display: block;
        margin-bottom: 4rem;

        img {
          width: 9rem;
          max-width: 9rem;
        }
      }

      .sign-in {
        padding-right: 0 !important;

        .input-group-la {
          margin-bottom: 1.5rem;

          label {
            color: #333;
            font-weight: 500;
            font-size: 0.875em;
          }

          input {
            width: 100%;
            height: 2.25rem;
            border-radius: 0.25rem;
            border: 0.0625rem solid #BBB;
            padding: 0.5rem 0.75rem;
            font-size: 0.9375em;

            &:focus {
              outline: none;
              border: 0.0625rem solid #FF6C2D;
              box-shadow: 0 0 0.0625rem 0.125rem #FFC6AE;
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
      }
    }
  }

  .scale-transform {
    transform: scaleX(0) !important;
  }

  // Mobile devices
  @media (min-width: 320px) and (max-width: 480px) {
    #sidebar {
      width: 70%;
    }
  }
  // Mobile devices

  // iPads, Tablets
  @media (min-width: 481px) and (max-width: 768px) {
    #sidebar {
      width: 65%;
    }
  }
  // iPads, Tablets

  // Small screen laptops
  @media (min-width: 769px) and (max-width: 1024px) {
    #sidebar {
      width: 50%;
    }
  }
  // Small screen laptops

  // Desktops, Other large screens
  @media (min-width: 1025px) {

  }
  // Desktops, Other large screens

</style>

<script>

export default {

  props: {
    show: {
      type: Boolean,
      required: true,
      default: false,
    },
  },

};

</script>
