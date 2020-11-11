<template>
  <div class="side">
    <div class="username">Albert Kurniawan</div>

    <b-row :class="`text-path${val.name === 'Profil' ? ' active' : ''}`"
    v-for="(val, index) in profilePath" :key="index" @click="redirect(val.route)">
      <b-col cols="1">
        <font-awesome-icon :icon="val.icon"/>
      </b-col>

      <b-cols cols="9" class="ml-3">
        {{ val.name }}
      </b-cols>
    </b-row>

    <b-row class="text-path" @click="logout">
      <b-col cols="1">
        <font-awesome-icon icon="sign-out-alt"/>
      </b-col>

      <b-cols cols="9" class="ml-3">
        Keluar
      </b-cols>
    </b-row>
  </div>
</template>

<style lang="scss" scoped>

  // global css
  .side {
    background-color: #FFF;
    padding-bottom: 1.5rem;
    box-shadow: 0 0 0.0625rem 0.0625rem rgba($color: #000000, $alpha: 0.2);

    .username {
      text-align: center;
      font-weight: 500;
      color: #FF6B00;
      word-wrap: break-word;
      border-bottom: 0.0625rem solid #CCC;
      font-size: 1.125em;
      padding: 1.25rem 0.75rem;
    }

    .text-path {
      margin: 0;
      color: #444;
      cursor: pointer;
      border-bottom: 0.0625rem solid #CCC;
      transition: background-color .1s ease-out;
      font-size: 0.9375em;
      padding: 1rem 0.5rem;

      &:hover {
        background-color: #F6F6F6;
      }
    }

    .active {
      font-weight: 500;
      color: #FF6B00 !important;
    }
  }
  // global css

</style>

<script>

export default {

  computed: {
    profilePath() {
      return this.$func.pathUser();
    },
  },

  methods: {
    redirect(route) {
      this.$router.push(route);
    },
  },

};

</script>
