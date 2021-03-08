<template>
  <div class="header">
    <div class="title">
      <slot name="title"/>
    </div>

    <div @click="logout">
      <font-awesome-icon icon="sign-out-alt" class="logout-icon"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>

  // global css
  .header {
    display: flex;
    align-items: center;
    background-color: #FFF;
    justify-content: space-between;
    padding: 0.75rem 1.125rem;

    .title {
      display: flex;
      align-items: center;
      color: #555;
      font-weight: 600;
      font-size: 1em;
    }

    .logout-icon {
      color: #FF3062;
      cursor: pointer;
      font-size: 1em;
    }
  }
  // global css

  // #Device = Mobiles
  @media (min-width: 320px) and (max-width: 480px) {

  }
  // #Device = Mobiles

  // #Device = Low Resolution Tablets
  @media (min-width: 481px) and (max-width: 767px) {
    .header {
      padding: 0.75rem 1.125rem;

      .title {
        font-size: 1.0625em;
      }

      .logout-icon {
        font-size: 1.0625em;
      }
    }
  }
  // #Device = Low Resolution Tablets

  // #Device = Tablets, Ipads
  @media (min-width: 768px) and (max-width: 1024px) {
    .header {
      padding: 0.875rem 1.25rem;

      .title {
        font-size: 1.125em;
      }

      .logout-icon {
        font-size: 1.125em;
      }
    }
  }
  // #Device = Tablets, Ipads

  // #Device = Laptops, Desktops
  @media (min-width: 1025px) {
    .header {
      padding: 0.875rem 1.25rem;

      .title {
        font-size: 1.25em;
      }

      .logout-icon {
        font-size: 1.25em;
      }
    }
  }
  // #Device = Laptops, Desktops

</style>

<script>

export default {

  methods: {
    logout() {
      this.$cookies.remove('admin_token');
      this.$cookies.remove('admin');
      this.$router.push({ name: 'AdminLogin' });
    },
  },

};

</script>
