<template>
  <div id="app">
    <Header/>
  </div>
</template>

<style lang="scss" scoped>

  #app {
    min-height: 200vh;
  }

</style>

<script>

import Header from '@/components/user/Header.vue';

export default {
  components: {
    Header,
  },
};

</script>
