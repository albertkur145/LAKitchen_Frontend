<template>
  <div class="product-container">
    <div class="img-container">
      <img :src="require('@/assets/images/kaki_naga.jpg')" alt="product">
    </div>

    <div class="description">
      <div class="name">{{ product.name }}</div>
      <div class="price">{{ product.price | currency }}</div>

      <div class="rating">
        <font-awesome-icon v-for="i in 5" :key="i" icon="star"
        :class="`star-icon${ i <= rating ? ' fill-color' : '' }`"/>
        <span class="evaluator">({{ product.evaluators }})</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

  .product-container {
    display: inline-block;
    background-color: #FFF;
    cursor: pointer;
    border-radius: 0.5rem;
    border: 0.0625rem solid #AAA;

    &:hover .img-container > img {
      transform: scale(1.1);
    }

    .img-container {
      overflow: hidden;
      border-radius: 0.5rem 0.5rem 0 0;
      border-bottom: 0.0625rem solid #AAA;
      max-width: 11.5rem;
      max-height: 12.5rem;
      background-size: cover;

      img {
        transition: transform .3s ease-out;
        width: 11.5rem;
        height: 12.5rem;
      }
    }

    .description {
      padding: 0.5rem;

      .name {
        color: #444;
        font-size: 0.9375em;
      }

      .price {
        font-weight: 500;
        color: #FF5C00;
        margin-top: 1rem;
        font-size: 0.9375em;
      }

      .rating {

        .star-icon {
          color: #BBB;
          font-size: 0.875em;
          margin-right: 0.125rem;
        }

        .fill-color {
          color: #FFB800 !important;
        }

        .evaluator {
          color: #888888;
          margin-left: 0.25rem;
          font-size: 0.8125em;
        }
      }
    }
  }

</style>

<script>

export default {

  props: {
    product: {
      type: Object,
      required: true,
    },
  },

  computed: {
    rating() {
      return Math.round(this.product.rating);
    },
  },

};

</script>
