<template>
  <div id="app">
    halo
  </div>
</template>

<style lang="scss" scoped>

</style>

<script>

export default {

  data() {
    return {
      cart: undefined,
    };
  },

  beforeRouteLeave(to, from, next) {
    this.$cookies.remove('cart');
    next();
  },

  created() {
    this.cart = this.$cookies.get('cart');
    if (!this.$cookies.get('token')) {
      this.$router.push('/login');
    }

    if (!this.cart) {
      this.$router.go(-1);
    }

    console.log(this.cart[0]);
  },

};

</script>
