<template>
  <div>
    <Loader :class="`${loader ? '' : 'd-none'}`"/>
  </div>
</template>

<script>

import { mapActions } from 'vuex';
import Loader from '@/components/Loader.vue';

export default {

  components: {
    Loader,
  },

  data() {
    return {
      loader: false,
    };
  },

  methods: {
    ...mapActions('user', ['activationAccount']),

    async validate() {
      this.loader = true;

      const { code } = await this.$func.promiseAPI(this.activationAccount, {
        st: this.$route.params.email,
        nd: this.$route.params.password,
      });

      if (code >= 200 && code < 300) {
        this.$func.popupSuccess('Berhasil mengaktifkan akun', this.$router, '/');
      } else {
        this.$func.popupErrorRedirect('Gagal mengaktifkan akun', 'OK', this.$router, '/');
      }

      this.loader = false;
    },

  },

  created() {
    this.validate();
  },

};

</script>
