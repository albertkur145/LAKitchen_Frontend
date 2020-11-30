<template>
  <div id="app" v-if="isLogin">
    <div :class="`sidebar${isShow ? '' : ' scale-transform'}`">
      <Sidebar @close="toggleSidebar"/>
    </div>

    <div v-if="!isShow" @click="toggleSidebar"
    :class="`trigger-sidebar${!isShow ? '' : ' scale-transform'}`">
      <font-awesome-icon icon="bars" class="bars-icon"/>
    </div>

    <div class="body">
      <router-view/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;0,600;0,700;1,700&display=swap');

  // global css
  #app {
    display: flex;
    min-height: 100vh;
    background-color: #F2F2F2;
    font-family: 'Source Sans Pro';

    .scale-transform {
      transform: scaleX(0) !important;
      margin-left: -16rem !important;
    }

    .sidebar {
      top: 0;
      left: 0;
      bottom: 0;
      z-index: 1;
      position: fixed;
      min-width: 16rem;
      overflow-y: auto;
      min-height: 100vh;
      transform: scaleX(1);
      transform-origin: left;
      background-color: #FFF;
      transition: all .35s linear;
      box-shadow: 0.0625rem 0 0.25rem 0.125rem rgba($color: #000000, $alpha: 0.1);
    }

    .trigger-sidebar {
      left: 0;
      z-index: 1;
      top: 4.25rem;
      position: fixed;
      cursor: pointer;
      background-color: #FFF;
      border-radius: 0 100rem 100rem 0;
      box-shadow: 0 0 0.25rem 0.125rem rgba($color: #000000, $alpha: 0.1);
      padding: 0.5rem 1rem 0.5rem 0.75rem;

      .bars-icon {
        color: #444;
        font-size: 1em;
      }
    }

    .body {
      width: 100%;
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
    #app {

      .sidebar {
        position: unset;
        box-shadow: 0 0 0 0;
        transition: all .2s linear;
      }
    }
  }
  // #Device = Laptops, Desktops

</style>

<script>

import Sidebar from '@/components/admin/Sidebar.vue';

export default {

  components: {
    Sidebar,
  },

  data() {
    return {
      isShow: true,
      windowWidth: null,
      isLogin: false,
    };
  },

  mounted() {
    if (this.windowWidth < 1025) {
      this.isShow = false;
    }
  },

  methods: {
    toggleSidebar() {
      this.isShow = !this.isShow;
    },

    getWindowWidth() {
      this.windowWidth = window.innerWidth;
    },
  },

  created() {
    if (this.$cookies.get('token') && this.$cookies.get('admin')) {
      this.getWindowWidth();
      this.isLogin = true;
    } else {
      this.$router.go(-1);
    }
  },

};

</script>
