<template>
  <div class="side">
    <div class="username">{{ username }}</div>

    <b-row :class="`text-path${val.name === active ? ' active' : ''}`"
    v-for="(val, index) in profilePath" :key="index" @click="redirect(val.route)">
      <b-col cols="1">
        <font-awesome-icon :icon="val.icon"/>
      </b-col>

      <b-col cols="9" class="ml-3">
        {{ val.name }}
      </b-col>
    </b-row>

    <b-row class="text-path" @click="logout">
      <b-col cols="1">
        <font-awesome-icon icon="sign-out-alt"/>
      </b-col>

      <b-col cols="9" class="ml-3">
        Keluar
      </b-col>
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

import { mapActions } from 'vuex';

export default {

  props: {
    active: {
      required: true,
    },
  },

  data() {
    return {
      user: null,
    };
  },

  computed: {
    profilePath() {
      return this.$func.pathUser();
    },

    username() {
      return this.user.name;
    },
  },

  methods: {
    ...mapActions('csChat', ['terminateCall']),

    async terminateCallWhenLogout() {
      const callId = localStorage.getItem('callId');
      await this.$func.promiseAPI(this.terminateCall, { callId });
    },

    redirect(route) {
      this.$router.push(route);
    },

    logout() {
      this.terminateCallWhenLogout();
      this.$func.removeStorages(this.$cookies);
      this.$router.push('/');
    },
  },

  created() {
    this.user = this.$cookies.get('user');
  },

};

</script>
