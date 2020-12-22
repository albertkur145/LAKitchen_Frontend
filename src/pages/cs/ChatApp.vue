<template>
  <div id="app" v-if="isLogin">
    <Header/>

    <div class="body">
      <div class="contact">
        <Contact v-for="i in 10" :key="i"/>
      </div>

      <Messenger/>
    </div>
  </div>
</template>

<style lang="scss" scoped>

  // global css
  #app {

    .body {
      display: flex;
      min-height: 90vh;
      max-height: 90vh;

      .contact {
        overflow-y: auto;
        background-color: #EAF7FF;
        min-width: 23rem;
      }

      .messenger {
        width: 100%;
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

import Header from '@/components/cs/Header.vue';
import Contact from '@/components/cs/Contact.vue';
import Messenger from '@/components/cs/Messenger.vue';

export default {

  components: {
    Header,
    Contact,
    Messenger,
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
    if (this.$cookies.get('token') && this.$cookies.get('cs')) {
      this.getWindowWidth();
      this.isLogin = true;
    } else {
      this.$router.go(-1);
    }
  },

};

</script>
