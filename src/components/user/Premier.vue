<template>
  <div>
    <b-row class="advertisement">
      <b-col md="8" sm="12" cols="12" class="carousel-banner">
        <swiper class="swiper" :options="bannerOption">
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
            <img src="@/assets/banner/6.webp" alt="banner">
          </b-col>
          <b-col md="12" sm="6" cols="12" class="img-container" style="max-height: 23.5rem">
            <img src="@/assets/banner/7.webp" alt="banner">
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    <!-- <div class="categories">
      <div class="title">Kategori Pilihan</div>

      <div class="item-container">
        <div class="item" v-for="(item) in categories" :key="item.id">
          <img :src="require(`@/assets/icons/${item.photo_link}.svg`)" alt="icon" class="icon">
          <span class="text">{{ item.name }}</span>
        </div>
      </div>
    </div> -->

    <Loader :class="`${loader ? '' : 'd-none'}`"/>
  </div>
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
          transition: background-color .1s linear;
          color: #FFF;
          outline: none;
          top: 40%;
          padding: 1.5rem 0.75rem;
          --swiper-navigation-size: 0.75rem;

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

    .static-banner {

      .img-container {
        margin-top: 0.5rem;

        img {
          width: 100%;
        }
      }
    }
  }

  .categories {
    display: block;
    margin-top: 1.125rem;

    .title {
      text-transform: uppercase;
      color: #444;
      font-weight: 500;
      font-size: 0.8125em;
    }

    .item-container {
      max-width: 100%;
      overflow-x: auto;
      white-space: nowrap;
      padding: 0.375rem 0 0.625rem;

      &::-webkit-scrollbar {
        width: 0.75rem;
        height: 0.75rem;
      }

      &::-webkit-scrollbar-track {
        box-shadow: inset 0 0 0.125rem #AAA;
        border-radius: 100rem;
        background-color: #FFF;
      }

      &::-webkit-scrollbar-thumb:horizontal {
        background-color: #FF8652;
        border: 0.25rem solid transparent;
        border-radius: 100rem;
        background-clip: padding-box;
      }

      .item {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        background-color: #FFF;
        border: 0.0625rem solid #CCC;
        color: #555;
        border-radius: 0.625rem;
        margin-right: 0.75rem;
        padding: 0.25rem 0.5rem;
        font-size: 0.6875em;

        &:last-child {
          margin-right: 0;
        }

        .icon {
          width: 0.875rem;
        }

        .text {
          margin-left: 0.5rem;
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

    .categories {
      margin-top: 1.25rem;

      .title {
        font-size: 0.875em;
      }

      .item-container {
        padding: 0.5rem 0 0.75rem;

        .item {
          padding: 0.375rem 0.625rem;
          font-size: 0.75em;

          .icon {
            width: 1rem;
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

    .categories {
      margin-top: 1.5rem;

      .title {
        font-size: 0.9375em;
      }

      .item-container {
        padding: 0.75rem 0;

        .item {
          padding: 0.5rem 0.75rem;
          font-size: 0.8125em;

          .icon {
            width: 1.25rem;
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

    .categories {
      display: none;
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

    .categories {
      display: none;
    }
  }
  // #Device = Laptops, Desktops

</style>

<script>

import { mapGetters, mapActions } from 'vuex';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
import Loader from '../Loader.vue';

export default {

  components: {
    Swiper,
    SwiperSlide,
    Loader,
  },

  data() {
    return {
      bannerOption: {
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

      categories: [],
      loader: false,
    };
  },

  computed: {
    ...mapGetters('categories', [
      'generalCategoryList',
    ]),
  },

  methods: {
    ...mapActions('categories', [
      'getGeneralCategory',
    ]),

    async getGeneralCategoryList() {
      this.loader = true;
      const { code } = await this.$func.promiseAPI(this.getGeneralCategory);
      this.loader = false;

      if (code >= 200 && code < 300) {
        this.categories = this.generalCategoryList.categories;
      } else {
        this.$func.popupConnectionError();
      }
    },
  },

  created() {
    this.getGeneralCategoryList();
  },

};

</script>
