<template>
  <div>
    <Header>
      <template v-slot:title>
        <slot name="title"/>
      </template>
    </Header>

    <div class="content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>

  // global css
  .content {
    padding: 1rem 1.25rem;
  }
  // global css

  // #Device = Mobiles
  @media (min-width: 320px) and (max-width: 480px) {

  }
  // #Device = Mobiles

  // #Device = Low Resolution Tablets
  @media (min-width: 481px) and (max-width: 767px) {
    .content {
      padding: 1.25rem 1.5rem;
    }
  }
  // #Device = Low Resolution Tablets

  // #Device = Tablets, Ipads
  @media (min-width: 768px) and (max-width: 1024px) {
    .content {
      padding: 1.5rem 1.75rem;
    }
  }
  // #Device = Tablets, Ipads

  // #Device = Laptops, Desktops
  @media (min-width: 1025px) {
    .content {
      padding: 1.75rem 2rem;
    }
  }
  // #Device = Laptops, Desktops

</style>

<script>

import Header from './Header.vue';

export default {

  components: {
    Header,
  },

};

</script>
