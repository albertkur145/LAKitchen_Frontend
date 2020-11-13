<template>
  <div class="products-container">
    <template v-if="products.length !== 0">
      <Product class="product" :product="val" v-for="val in products" :key="val.id"/>
      <!-- <div class="empty-fill"></div>
      <div class="empty-fill"></div>
      <div class="empty-fill"></div>
      <div class="empty-fill"></div> -->
    </template>
  </div>
</template>

<style lang="scss" scoped>

  .product {
    width: 22%;
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

</style>

<script>

import Product from '@/components/user/Product.vue';

export default {

  components: {
    Product,
  },

  data() {
    return {
      products: [
        {
          id: 1,
          name: 'Makaroni',
          price: 55000,
          rating: 4.92,
          evaluators: '84',
          photo_link: 'bakpao',
        },
        {
          id: 2,
          name: 'Makaroni',
          price: 55000,
          rating: 4.92,
          evaluators: '84',
          photo_link: 'bakpao',
        },
        {
          id: 3,
          name: 'Makaroni',
          price: 55000,
          rating: 4.92,
          evaluators: '84',
          photo_link: 'bakpao',
        },
        {
          id: 4,
          name: 'Makaroni',
          price: 55000,
          rating: 4.92,
          evaluators: '84',
          photo_link: 'bakpao',
        },
      ],
    };
  },

};

</script>
