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
import Product from './Product.vue';

export default {

  props: {
    title: {
      type: String,
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
      products: [
        {
          id: 1,
          name: 'Nastar',
          price: 90000,
          rating: 4.73,
          evaluators: 233,
          photo_link: 'nastar',
        },
        {
          id: 2,
          name: 'Semprit Dahlia',
          price: 75000,
          rating: 4.73,
          evaluators: 164,
          photo_link: 'semprit_dahlia',
        },
        {
          id: 3,
          name: 'Kastengel Keju',
          price: 60000,
          rating: 4.73,
          evaluators: 95,
          photo_link: 'kastengel',
        },
        {
          id: 4,
          name: 'Talan Pandan',
          price: 50000,
          rating: 4.73,
          evaluators: 142,
          photo_link: 'talan_pandan',
        },
        {
          id: 5,
          name: 'Wingko',
          price: 65000,
          rating: 4.73,
          evaluators: 78,
          photo_link: 'wingko',
        },
        {
          id: 6,
          name: 'Lapis Legit Pandan',
          price: 60000,
          rating: 4.73,
          evaluators: 95,
          photo_link: 'nastar',
        },
        {
          id: 7,
          name: 'Nastar',
          price: 60000,
          rating: 4.73,
          evaluators: 95,
          photo_link: 'nastar',
        },
      ],

      tempProduct: {
        id: 0,
        name: '',
        price: 0,
        rating: 0,
        evaluators: 0,
        photo_link: 'hakau',
      },

      swiperOption: {
        grabCursor: true,
        lazy: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          1220: {
            slidesPerView: 3,
            spaceBetween: 37,
          },
          1150: {
            slidesPerView: 3,
            spaceBetween: 74,
          },
          1100: {
            slidesPerView: 3,
            spaceBetween: 100,
          },
          1025: {
            slidesPerView: 3,
            spaceBetween: 150,
          },
          970: {
            slidesPerView: 3,
            spaceBetween: 85,
          },
          920: {
            slidesPerView: 3,
            spaceBetween: 110,
          },
          850: {
            slidesPerView: 3,
            spaceBetween: 150,
          },
          800: {
            slidesPerView: 3,
            spaceBetween: 170,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 27,
          },
          680: {
            slidesPerView: 5,
            spaceBetween: 140,
          },
          630: {
            slidesPerView: 4,
            spaceBetween: 45,
          },
          590: {
            slidesPerView: 4,
            spaceBetween: 90,
          },
          560: {
            slidesPerView: 4,
            spaceBetween: 125,
          },
          520: {
            slidesPerView: 3,
            spaceBetween: 32,
          },
          481: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          440: {
            slidesPerView: 3,
            spaceBetween: 65,
          },
          410: {
            slidesPerView: 3,
            spaceBetween: 92,
          },
          385: {
            slidesPerView: 3,
            spaceBetween: 125,
          },
          360: {
            slidesPerView: 3,
            spaceBetween: 130,
          },
          300: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          270: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
        },
      },
    };
  },

};

</script>
