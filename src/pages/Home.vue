<template>
  <div id="app">
    <Header @show="showBackground" @hide="hideBackground"/>
    <div class="bg-all"></div>
    <div class="text text-center">a</div>
  </div>
</template>

<style lang="scss" scoped>

  #app {

    .bg-all {
      position: absolute;
      background-color: rgba($color: #000000, $alpha: 0.5);
      z-index: 1;
      opacity: 0;
      transition: opacity .3s ease-in-out;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }

    .text {
      margin-top: 15rem;
    }
  }

</style>

<script>

import Header from '@/components/user/Header.vue';

export default {

  components: {
    Header,
  },

  methods: {
    showBackground() {
      const el = document.querySelector('.bg-all');
      el.style.opacity = '1';
    },

    hideBackground() {
      const el = document.querySelector('.bg-all');
      el.style.opacity = '0';
    },
  },

};

</script>
