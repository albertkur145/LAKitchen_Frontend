<template>
  <div class="container-la">
    <div class="title">{{ title }}</div>

    <swiper class="swiper" :options="swiperOption">
      <swiper-slide v-for="(value) in products" :key="value.id" class="slider-container">
        <Product :product="value"/>
      </swiper-slide>

      <div class="swiper-button-prev swiper-button-la swiper-button-la-left"
      slot="button-prev"></div>
      <div class="swiper-button-next swiper-button-la swiper-button-la-right"
      slot="button-next"></div>
    </swiper>
  </div>
</template>

<style lang="scss" scoped>

  .container-la {
    background-color: #FFF;
    border-radius: 0.875rem;
    box-shadow: 0 0 0.125rem 0.0625rem rgba($color: #000000, $alpha: 0.2);
    padding: 1.5rem 2rem;

    .title {
      font-family: 'M PLUS 1p';
      color: #414141;
      font-weight: 500;
      font-size: 1.375em;
    }

    .swiper {
      margin-top: 1rem;

      .swiper-button-la {
        background-color: rgba($color: #000000, $alpha: 0.4);
        transition: background-color .1s linear;
        border-radius: 100rem;
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
          name: 'Kaki Naga Dimsum',
          price: 45000,
          rating: 4.73,
          evaluators: 127,
        },
        {
          id: 2,
          name: 'Kaki Naga Dimsum',
          price: 45000,
          rating: 4.73,
          evaluators: 127,
        },
        {
          id: 3,
          name: 'Kaki Naga Dimsum',
          price: 45000,
          rating: 4.73,
          evaluators: 127,
        },
        {
          id: 4,
          name: 'Kaki Naga Dimsum',
          price: 45000,
          rating: 4.73,
          evaluators: 127,
        },
        {
          id: 5,
          name: 'Kaki Naga Dimsum',
          price: 45000,
          rating: 4.73,
          evaluators: 127,
        },
        {
          id: 6,
          name: 'Kaki Naga Dimsum',
          price: 45000,
          rating: 4.73,
          evaluators: 127,
        },
        {
          id: 7,
          name: 'Kaki Naga Dimsum',
          price: 45000,
          rating: 4.73,
          evaluators: 127,
        },
        {
          id: 8,
          name: 'Kaki Naga Dimsum',
          price: 45000,
          rating: 4.73,
          evaluators: 127,
        },
      ],

      swiperOption: {
        slidesPerView: 6,
        spaceBetween: 22,
        lazy: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
    };
  },

};

</script>
