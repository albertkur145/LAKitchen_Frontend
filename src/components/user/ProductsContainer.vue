<template>
  <div>
    <div class="title">Makanan Instan</div>
    <div class="products-container">
      <Product class="product" :product="temp" v-for="i in 15" :key="i"/>
      <div class="empty-fill"></div>
      <div class="empty-fill"></div>
      <div class="empty-fill"></div>
      <div class="empty-fill"></div>
      <div class="empty-fill"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

  // global css
  .title {
    color: #414141;
    font-family: 'M PLUS 1p';
    font-weight: 500;
    font-size: 1.0625em;
  }

  .products-container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 1rem;

    &::after {
      content: "";
      flex: auto;
    }

    .product {
      width: 46%;
      margin-right: 0.5rem;
      margin-bottom: 1.5rem;

      ::v-deep .img-container {
        max-width: 100%;
        max-height: 100%;
      }

      ::v-deep img {
        width: 100%;
        height: 100%;
      }
    }

    .empty-fill {
      height: 0;
      margin-right: 0.5rem;
      width: 11.5rem;
    }
  }
  // global css

  // #Device = Mobiles
  @media (min-width: 320px) and (max-width: 380px) {
    .title {
      font-size: 1.125em;
    }

    .products-container {

      .product {
        width: 47%;

        ::v-deep .img-container {
          max-width: 100%;
          max-height: 10rem;
        }

        ::v-deep img {
          width: 100%;
          height: 10rem;
        }
      }

      .empty-fill {
        width: 47%;
      }
    }
  }
  // #Device = Mobiles

  // #Device = Mobiles
  @media (min-width: 381px) and (max-width: 420px) {
    .products-container {

      .product {
        width: 47%;

        ::v-deep .img-container {
          max-width: 100%;
          max-height: 11.5rem;
        }

        ::v-deep img {
          width: 100%;
          height: 11.5rem;
        }
      }

      .empty-fill {
        width: 47%;
      }
    }
  }
  // #Device = Mobiles

  // #Device = Mobiles
  @media (min-width: 421px) and (max-width: 480px) {
    .products-container {

      .product {
        width: 30%;

        ::v-deep .img-container {
          max-width: 100%;
          max-height: 8.75rem;
        }

        ::v-deep img {
          width: 100%;
          height: 8.75rem;
        }
      }

      .empty-fill {
        width: 30%;
      }
    }
  }
  // #Device = Mobiles

  // #Device = Low Resolution Tablets
  @media (min-width: 481px) and (max-width: 550px) {
    .title {
      font-size: 1.125em;
    }

    .products-container {

      .product {
        width: 31%;

        ::v-deep .img-container {
          max-width: 100%;
          max-height: 9.75rem;
        }

        ::v-deep img {
          width: 100%;
          height: 9.75rem;
        }
      }

      .empty-fill {
        width: 31%;
      }
    }
  }
  // #Device = Low Resolution Tablets

  // #Device = Low Resolution Tablets
  @media (min-width: 551px) and (max-width: 660px) {
    .products-container {

      .product {
        width: 23%;

        ::v-deep .img-container {
          max-width: 100%;
          max-height: 8.75rem;
        }

        ::v-deep img {
          width: 100%;
          height: 8.75rem;
        }
      }

      .empty-fill {
        width: 23%;
      }
    }
  }
  // #Device = Low Resolution Tablets

  // #Device = Low Resolution Tablets
  @media (min-width: 661px) and (max-width: 767px) {
    .products-container {

      .product {
        width: 23%;

        ::v-deep .img-container {
          max-width: 100%;
          max-height: 10.5rem;
        }

        ::v-deep img {
          width: 100%;
          height: 10.5rem;
        }
      }

      .empty-fill {
        width: 23%;
      }
    }
  }
  // #Device = Low Resolution Tablets

  // #Device = Tablets, Ipads
  @media (min-width: 768px) and (max-width: 1024px) {
    .title {
      font-size: 1.25em;
    }

    .products-container {

      .product {
        max-width: 10rem;

        ::v-deep .img-container {
          max-width: 10rem;
          max-height: 10.75rem;
        }

        ::v-deep img {
          width: 10rem;
          height: 10.75rem;
        }
      }

      .empty-fill {
        width: 10rem;
      }
    }
  }
  // #Device = Tablets, Ipads

  // #Device = Laptops, Desktops
  @media (min-width: 1025px) {
    .title {
      font-size: 1.375em;
    }

    .products-container {

      .product {
        max-width: 11.5rem;

        ::v-deep .img-container {
          max-width: 11.5rem;
          max-height: 12.5rem;
        }

        ::v-deep img {
          width: 11.5rem;
          height: 12.5rem;
        }
      }

      .empty-fill {
        width: 11.5rem;
      }
    }
  }
  // #Device = Laptops, Desktops

</style>

<script>

import Product from './Product.vue';

export default {

  props: [
    'parameter',
    'type',
  ],

  components: {
    Product,
  },

  data() {
    return {
      temp: {
        id: 1,
        name: 'Indomie Goreng Rasa Rendang',
        price: 30000,
        rating: 4.94,
        evaluators: 427,
        photo_link: 'indomie_goreng_rasa_rendang',
      },

      windowWidth: null,
    };
  },

  mounted() {
    window.addEventListener('resize', this.getWindowWidth);
  },

  methods: {
    getWindowWidth() {
      this.windowWidth = window.innerWidth;
    },
  },

  created() {
    this.getWindowWidth();
  },

};

</script>
