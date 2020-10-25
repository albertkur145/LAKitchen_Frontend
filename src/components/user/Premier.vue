<template>
  <b-row class="advertisement">
    <b-col md="8" sm="12" cols="12" class="carousel-banner">
      <swiper class="swiper" :options="swiperOption">
        <swiper-slide v-for="i in 5" :key="i" class="slider-container">
          <img :src="require(`@/assets/banner/${i}.webp`)" alt="banner" class="swiper-lazy">
          <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
        </swiper-slide>

        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev swiper-button-la swiper-button-la-left"
        slot="button-prev"></div>
        <div class="swiper-button-next swiper-button-la swiper-button-la-right"
        slot="button-next"></div>
      </swiper>
    </b-col>

    <b-col md="4" sm="12" class="static-banner">
      <b-row>
        <b-col md="12" sm="6" cols="12" class="img-container" style="max-height: 23.5rem">
          <img src="@/assets/banner/6.webp">
        </b-col>
        <b-col md="12" sm="6" cols="12" class="img-container" style="max-height: 23.5rem">
          <img src="@/assets/banner/7.webp">
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<style lang="scss" scoped>

  // global css
  .advertisement {

    .carousel-banner {

      .swiper {

        .slider-container {
          height: 100%;

          img {
            width: 100%;
            height: 100%;
            background-size: cover;
          }
        }

        .swiper-button-la {
          background-color: rgba($color: #000000, $alpha: 0.4);
          color: #FFF;
          top: 40%;
          padding: 1.5rem 0.75rem;
          --swiper-navigation-size: 0.75rem;
        }

        .swiper-button-la-right {
          right: 0;
        }

        .swiper-button-la-left {
          left: 0;
        }
      }
    }

    .static-banner {

      .img-container {
        margin-top: 0.5rem;

        img {
          width: 100%;
        }
      }
    }
  }
  // global css

  // #Device = Mobiles
  @media (min-width: 320px) and (max-width: 480px) {
    .advertisement {

      .carousel-banner {

        .swiper {

          .swiper-button-la {
            padding: 1.75rem 0.875rem;
            --swiper-navigation-size: 0.875rem;
          }
        }
      }
    }
  }
  // #Device = Mobiles

  // #Device = Low Resolution Tablets
  @media (min-width: 481px) and (max-width: 767px) {
    .advertisement {

      .carousel-banner {

        .swiper {

          .swiper-button-la {
            padding: 2.25rem 1.125rem;
            --swiper-navigation-size: 1.1875rem;
          }
        }
      }

      .static-banner {

        .img-container {

          &:first-child {
            padding-right: 0.25rem;
          }

          &:last-child {
            padding-left: 0.25rem;
          }
        }
      }
    }
  }
  // #Device = Low Resolution Tablets

  // #Device = Tablets, Ipads
  @media (min-width: 768px) and (max-width: 1024px) {
    .advertisement {

      .carousel-banner {
        padding-right: 0.5rem;

        .swiper {

          .slider-container {
            height: 17.5rem;
          }

          .swiper-button-la {
            padding: 2.125rem 1.0625rem;
            --swiper-navigation-size: 1rem;
          }
        }
      }

      .static-banner {
        padding-left: 0;

        .img-container {
          margin: 0;

          &:last-child {
            margin-top: 0.5rem;
          }

          img {
            height: 8.5rem;
          }
        }
      }
    }
  }
  // #Device = Tablets, Ipads

  // #Device = Laptops, Desktops
  @media (min-width: 1025px) {
    .advertisement {

      .carousel-banner {
        padding-right: 0.5rem;

        .swiper {

          .slider-container {
            height: 20.5rem;
          }

          .swiper-button-la {
            padding: 2.25rem 1.125rem;
            --swiper-navigation-size: 1.125rem;
          }
        }
      }

      .static-banner {
        padding-left: 0;

        .img-container {
          margin: 0;

          &:last-child {
            margin-top: 0.5rem;
          }

          img {
            height: 10rem;
          }
        }
      }
    }
  }
  // #Device = Laptops, Desktops

</style>

<script>

import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';

export default {

  components: {
    Swiper,
    SwiperSlide,
  },

  data() {
    return {
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 15,
        grabCursor: true,
        loop: true,
        lazy: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
    };
  },

};

</script>
