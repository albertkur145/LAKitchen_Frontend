<template>
  <div class="container-la">
    <div class="title">
      <span class="txt-title">{{ title }}</span>
      <span class="txt-more">Lihat Semua</span>
    </div>

    <swiper class="swiper" :options="swiperOption">
      <swiper-slide v-for="(value) in products" :key="value.id" class="slider-container">
        <Product :product="value"/>
      </swiper-slide>

      <swiper-slide style="visibility: hidden;">
        <Product :product="tempProduct"/>
      </swiper-slide>

      <div class="swiper-button-prev swiper-button-la swiper-button-la-left"
      slot="button-prev"></div>
      <div class="swiper-button-next swiper-button-la swiper-button-la-right"
      slot="button-next"></div>
    </swiper>
  </div>
</template>

<style lang="scss" scoped>

  // global css
  .container-la {
    background-color: #FFF;
    border-radius: 0.875rem;
    box-shadow: 0 0 0.125rem 0.0625rem rgba($color: #000000, $alpha: 0.2);
    padding: 1.25rem 1.75rem 1.75rem;

    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: 'M PLUS 1p';
      font-weight: 500;

      .txt-title {
        color: #414141;
        font-size: 1.0625em;
      }

      .txt-more {
        cursor: pointer;
        text-transform: uppercase;
        color: #0085FF;
        font-size: 0.6875em;

        &:hover {
          color: #006BCD;
        }
      }
    }

    .swiper {
      margin-top: 1rem;

      .swiper-button-la {
        visibility: hidden;
        background-color: rgba($color: #000000, $alpha: 0.4);
        transition: background-color .1s linear;
        border-radius: 100rem;
        outline: none;
        top: 40%;
        padding: 1.5rem 1.5rem;
        --swiper-navigation-size: 1rem;

        &:hover {
          background-color: rgba($color: #000000, $alpha: 0.6);
        }
      }

      .swiper-button-la-right {
        right: 0;
      }

      .swiper-button-la-left {
        left: 0;
      }
    }
  }
  // global css

  // #Device = Mobiles
  @media (min-width: 320px) and (max-width: 480px) {
    .container-la {

      .title {

        .txt-title {
          font-size: 1.125em;
        }

        .txt-more {
          font-size: 0.75em;
        }
      }
    }
  }
  // #Device = Mobiles

  // #Device = Low Resolution Tablets
  @media (min-width: 481px) and (max-width: 767px) {
    .container-la {

      .title {

        .txt-title {
          font-size: 1.125em;
        }

        .txt-more {
          font-size: 0.75em;
        }
      }
    }
  }
  // #Device = Low Resolution Tablets

  // #Device = Tablets, Ipads
  @media (min-width: 768px) and (max-width: 1024px) {
    .container-la {
      padding: 1.25rem 1.75rem 1.75rem;

      .title {

        .txt-title {
          font-size: 1.25em;
        }

        .txt-more {
          font-size: 0.8125em;
        }
      }
    }
  }
  // #Device = Tablets, Ipads

  // #Device = Laptops, Desktops
  @media (min-width: 1025px) {
    .container-la {
      padding: 1.5rem 2rem 2rem;

      .title {

        .txt-title {
          font-size: 1.375em;
        }

        .txt-more {
          font-size: 0.875em;
        }
      }

      .swiper {
        margin-top: 1rem;

        .swiper-button-la {
          visibility: visible;
          padding: 1.5rem 1.5rem;
          --swiper-navigation-size: 1rem;
        }
      }
    }
  }
  // #Device = Laptops, Desktops

</style>

<script>

import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
import { mapActions } from 'vuex';
import Product from './Product.vue';

export default {

  props: {
    type: {
      required: true,
    },
    params: {
      required: true,
    },
  },

  components: {
    Swiper,
    SwiperSlide,
    Product,
  },

  data() {
    return {
      swiperOption: {
        grabCursor: true,
        lazy: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          1300: {
            slidesPerView: 6,
            spaceBetween: 22,
          },
          1200: {
            slidesPerView: 6,
            spaceBetween: 110,
          },
          1100: {
            slidesPerView: 5,
            spaceBetween: 32,
          },
          1025: {
            slidesPerView: 5,
            spaceBetween: 96,
          },
          970: {
            slidesPerView: 5,
            spaceBetween: 22,
          },
          920: {
            slidesPerView: 5,
            spaceBetween: 66,
          },
          850: {
            slidesPerView: 5,
            spaceBetween: 132,
          },
          800: {
            slidesPerView: 4,
            spaceBetween: 25,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 75,
          },
          710: {
            slidesPerView: 4,
            spaceBetween: 23,
          },
          680: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
          630: {
            slidesPerView: 4,
            spaceBetween: 100,
          },
          590: {
            slidesPerView: 4,
            spaceBetween: 150,
          },
          560: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          520: {
            slidesPerView: 3,
            spaceBetween: 60,
          },
          481: {
            slidesPerView: 3,
            spaceBetween: 100,
          },
          440: {
            slidesPerView: 3,
            spaceBetween: 120,
          },
          410: {
            slidesPerView: 3,
            spaceBetween: 145,
          },
          385: {
            slidesPerView: 2,
            spaceBetween: 22,
          },
          360: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          320: {
            slidesPerView: 2,
            spaceBetween: 85,
          },
          300: {
            slidesPerView: 2,
            spaceBetween: 85,
          },
          270: {
            slidesPerView: 2,
            spaceBetween: 110,
          },
        },
      },

      title: '',
      products: [],

      tempProduct: {
        id: 0,
        name: '',
        price: 0,
        rating: 0,
        evaluators: 0,
        photo_link: 'hakau',
      },
    };
  },

  methods: {
    ...mapActions('products', [
      'getByCategory',
      'getBySubCategory',
    ]),

    async getProducts(action, params) {
      // req api
      const { code, data } = await this.$func.promiseAPI(action, params);

      if (code >= 200 || code < 300) {
        this.products = data.products;
        this.title = data.title;
      }
    },

    selection() {
      let params = null;
      let action = null;

      switch (this.type) {
        case 'category': {
          params = { categoryId: this.params };
          action = this.getByCategory;
          break;
        }

        case 'subCategory': {
          params = { subCategoryId: this.params };
          action = this.getBySubCategory;
          break;
        }

        default:
          break;
      }

      this.getProducts(action, params);
    },
  },

  created() {
    this.selection();
  },

};

</script>
