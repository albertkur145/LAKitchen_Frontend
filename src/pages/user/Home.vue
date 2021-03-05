<template>
  <div id="app" class="position-relative">
    <Header @show="showBackground" @hide="hideBackground"/>
    <div class="bg-all"></div>

    <div class="content">
      <Premier/>

      <b-row class="mt-md-5 mt-4">
        <b-col cols="12">
          <InsideSlider type="subCategory" :params="481" :isLimit="true"/>
        </b-col>
      </b-row>

      <b-row>
        <b-col class="mt-md-5 mt-4" md="6" sm="12">
          <OutsideSlider type="subCategory" :params="473" :isLimit="true"/>
        </b-col>

        <b-col class="mt-md-5 mt-4" md="6" sm="12">
          <OutsideSlider type="subCategory" :params="474" :isLimit="true"/>
        </b-col>
      </b-row>

      <b-row class="mt-md-5 mt-4">
        <b-col cols="12">
          <ProductsContainer type="category" :params="520" :isLimit="true" :limit="18"/>
        </b-col>
      </b-row>
    </div>

    <Chat v-if="isLogin"/>
    <Footer/>
  </div>
</template>

<style lang="scss" scoped>

@import url('https://fonts.googleapis.com/css2?family=M+PLUS+1p:wght@500&display=swap');

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

import Header from '@/components/user/Header.vue';
import Footer from '@/components/user/Footer.vue';
import Premier from '@/components/user/Premier.vue';
import InsideSlider from '@/components/user/InsideSlider.vue';
import OutsideSlider from '@/components/user/OutsideSlider.vue';
import ProductsContainer from '@/components/user/ProductsContainer.vue';
import Chat from '@/components/user/Chat.vue';

export default {

  components: {
    Header,
    Footer,
    Premier,
    InsideSlider,
    OutsideSlider,
    ProductsContainer,
    Chat,
  },

  data() {
    return {
      isLogin: null,
    };
  },

  methods: {
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
    this.isLogin = this.$func.isLoggedIn(this.$cookies, false);
  },
};

</script>
