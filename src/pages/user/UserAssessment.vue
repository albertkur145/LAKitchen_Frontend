<template>
  <div id="app">
    <Header @show="showBackground" @hide="hideBackground"/>
    <div class="bg-all"></div>

    <div class="content">
      <UserPathContainer title="" active="Daftar Pesanan">
        <template v-slot:path-back>
          <router-link to="/order" class="back">Daftar Pesanan</router-link>
          <span class="back"> / </span>
          <router-link class="back"
          :to="`/order/${paramOrderNumber}/assessment`">Nilai Produk</router-link>
          <span class="back"> / </span>
          <span class="back product-name">{{ data.product.name }}</span>
        </template>

        <template v-slot:content>
          <UserAssessmentBody @send="sendAssessment"
          :data="data" v-if="data !== undefined"/>
        </template>
      </UserPathContainer>
    </div>

    <Loader :class="`${loader ? '' : 'd-none'}`"/>
    <Footer/>
  </div>
</template>

<style lang="scss" scoped>

  // global css
  #app {

    .bg-all {
      position: fixed;
      height: 0;
      background-color: rgba($color: #000000, $alpha: 0.5);
      z-index: 2;
      opacity: 0;
      transition: opacity .3s ease-in-out;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }

    .content {
      padding: 7.25rem 0.875rem;

      .back {
        color: #AAA;
        font-size: 0.625em;
      }

      .product-name {
        color: #4F4F4F;
      }
    }
  }
  // global css

  // #Device = Mobiles
  @media (min-width: 320px) and (max-width: 480px) {
    #app {

      .content {
        padding: 7.5rem 1rem;
      }
    }
  }
  // #Device = Mobiles

  // #Device = Low Resolution Tablets
  @media (min-width: 481px) and (max-width: 767px) {
    #app {

      .content {
        padding: 7.5rem 1rem;
      }
    }
  }
  // #Device = Low Resolution Tablets

  // #Device = Tablets, Ipads
  @media (min-width: 768px) and (max-width: 1024px) {
    #app {

      .content {
        padding: 7.75rem 1.5rem;
      }
    }
  }
  // #Device = Tablets, Ipads

  // #Device = Laptops, Desktops
  @media (min-width: 1025px) {
    #app {

      .content {
        padding: 8rem 1.875rem;
      }
    }
  }
  // #Device = Laptops, Desktops

</style>

<script>

import Loader from '@/components/Loader.vue';
import Header from '@/components/user/Header.vue';
import Footer from '@/components/user/Footer.vue';
import UserPathContainer from '@/components/user/UserPathContainer.vue';
import UserAssessmentBody from '@/components/user/UserAssessmentBody.vue';
import { mapActions } from 'vuex';

export default {

  components: {
    Header,
    Footer,
    UserPathContainer,
    UserAssessmentBody,
    Loader,
  },

  data() {
    return {
      loader: false,
      paramId: '',
      paramOrderNumber: '',
      data: undefined,
    };
  },

  methods: {
    ...mapActions('order', [
      'getProductDetail',
    ]),

    ...mapActions('assessment', [
      'postAssessment',
    ]),

    async getProduct() {
      this.loader = true;

      const { data, code } = await this.$func.promiseAPI(this.getProductDetail, {
        orderNumber: this.paramOrderNumber,
        productId: parseInt(this.paramId, 10),
      });

      this.loader = false;

      if (code >= 200 && code < 300) {
        this.data = data;
      } else {
        this.$func.popupConnectionError();
      }
    },

    async sendAssessment(form) {
      this.loader = true;

      const { code } = await this.$func.promiseAPI(this.postAssessment, {
        orderNumber: this.paramOrderNumber,
        productId: parseInt(this.paramId, 10),
        userId: this.$cookies.get('user').id,
        rate: parseInt(form.rate, 10),
        comment: form.comment,
      });

      this.loader = false;

      if (code >= 200 && code < 300) {
        this.$func.popupSuccess(
          'Terimakasih sudah menilai kami :)',
          this.$router,
          `/order/${this.paramOrderNumber}/assessment`,
        );
      } else {
        this.$func.popupConnectionError(false);
      }
    },

    showBackground() {
      const el = document.querySelector('.bg-all');
      el.style.opacity = '1';
      el.style.height = 'inherit';
    },

    hideBackground() {
      const el = document.querySelector('.bg-all');
      el.style.opacity = '0';
      el.style.height = '0';
    },
  },

  created() {
    if (!this.$cookies.get('token')) {
      this.$router.push('/');
    }

    this.paramOrderNumber = this.$route.params.number;
    this.paramId = this.$route.params.id;
    this.getProduct();
  },

};

</script>
