<template>
  <div class="position-relative">
    <router-link :to="`/product/${product.id}`"
    class="product-container">
      <div class="img-container">
        <img :src="require(`@/assets/images/${product.photo_link}.webp`)" alt="product">
      </div>

      <div class="description">
        <div class="name">{{ productName }}</div>
        <div class="price">{{ product.price | currency }}</div>

        <div class="rating">
          <font-awesome-icon v-for="i in 5" :key="i" icon="star"
          :class="`star-icon${ i <= rating ? ' fill-color' : '' }`"/>
          <span class="evaluator">({{ product.evaluators }})</span>
        </div>

      </div>
    </router-link>

    <span class="remove" v-if="remove" @click="$emit('del', product.id)">
      <font-awesome-icon icon="times" class="times-icon"/>
    </span>
  </div>
</template>

<style lang="scss" scoped>

  // global css
  .product-container {
    position: relative;
    display: inline-block;
    text-decoration: none;
    background-color: #FFF;
    cursor: pointer;
    border-radius: 0.75rem;
    border: 0.0625rem solid #BBB;

    &:hover .img-container > img {
      transform: scale(1.1);
    }

    .img-container {
      overflow: hidden;
      border-radius: 0.75rem 0.75rem 0 0;
      border-bottom: 0.0625rem solid #BBB;
      max-width: 8rem;
      max-height: 9rem;

      img {
        transition: transform .3s ease-out;
        width: 8rem;
        height: 9rem;
      }
    }

    .description {
      padding: 0.1875rem 0.3125rem;

      .name {
        color: #2A2A2A;
        font-size: 0.75em;
      }

      .price {
        font-weight: 500;
        color: #FF5C00;
        margin-top: 0.6875rem;
        font-size: 0.75em;
      }

      .rating {

        .star-icon {
          color: #BBB;
          font-size: 0.6875em;
          margin-right: 0.0625rem;
        }

        .fill-color {
          color: #FFB800 !important;
        }

        .evaluator {
          color: #888888;
          margin-left: 0.25rem;
          font-size: 0.625em;
        }
      }
    }
  }

  .remove {
    top: 0.25rem;
    right: 0.5rem;
    cursor: pointer;
    color: #FF3743;
    position: absolute;
    border-radius: 100rem;
    background-color: #FFF;
    padding: 0rem 0.5rem 0.0625rem;

    &:hover {
      color: #FF0D47;
    }

    .times-icon {
      font-size: 0.75em;
    }
  }
  // global css

  // #Device = Mobiles
  @media (min-width: 320px) and (max-width: 480px) {
    .product-container {

      .img-container {
        max-width: 8.5rem;
        max-height: 9.5rem;

        img {
          width: 8.5rem;
          height: 9.5rem;
        }
      }

      .description {
        padding: 0.25rem 0.375rem;

        .name {
          font-size: 0.8125em;
        }

        .price {
          margin-top: 0.75rem;
          font-size: 0.8125em;
        }

        .rating {

          .star-icon {
            font-size: 0.75em;
            margin-right: 0.0625rem;
          }

          .evaluator {
            font-size: 0.6875em;
          }
        }
      }
    }
  }
  // #Device = Mobiles

  // #Device = Low Resolution Tablets
  @media (min-width: 481px) and (max-width: 767px) {
    .product-container {

      .img-container {
        max-width: 9rem;
        max-height: 10rem;

        img {
          width: 9rem;
          height: 10rem;
        }
      }

      .description {
        padding: 0.25rem 0.375rem;

        .name {
          font-size: 0.8125em;
        }

        .price {
          margin-top: 0.75rem;
          font-size: 0.8125em;
        }

        .rating {

          .star-icon {
            font-size: 0.75em;
            margin-right: 0.0625rem;
          }

          .evaluator {
            font-size: 0.6875em;
          }
        }
      }
    }
  }
  // #Device = Low Resolution Tablets

  // #Device = Tablets, Ipads
  @media (min-width: 768px) and (max-width: 1024px) {
    .product-container {

      .img-container {
        max-width: 10rem;
        max-height: 10.75rem;

        img {
          width: 10rem;
          height: 10.75rem;
        }
      }

      .description {
        padding: 0.3125rem 0.5rem;

        .name {
          font-size: 0.875em;
        }

        .price {
          margin-top: 0.875rem;
          font-size: 0.875em;
        }

        .rating {

          .star-icon {
            font-size: 0.8125em;
            margin-right: 0.0625rem;
          }

          .evaluator {
            font-size: 0.75em;
          }
        }
      }
    }
  }
  // #Device = Tablets, Ipads

  // #Device = Laptops, Desktops
  @media (min-width: 1025px) {
    .product-container {

      .img-container {
        max-width: 11.5rem;
        max-height: 12.5rem;

        img {
          width: 11.5rem;
          height: 12.5rem;
        }
      }

      .description {
        padding: 0.5rem 0.625rem;

        .name {
          font-size: 0.9375em;
        }

        .price {
          margin-top: 1rem;
          font-size: 0.9375em;
        }

        .rating {

          .star-icon {
            font-size: 0.875em;
            margin-right: 0.125rem;
          }

          .evaluator {
            font-size: 0.8125em;
          }
        }
      }
    }
  }
  // #Device = Laptops, Desktops

</style>

<script>

export default {

  props: {
    product: {
      type: Object,
      required: true,
    },
    remove: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      windowWidth: null,
    };
  },

  computed: {
    rating() {
      return Math.round(this.product.rating);
    },

    productName() {
      if (this.windowWidth >= 768) {
        if (this.product.name.length > 18) {
          return `${this.product.name.slice(0, 18)}...`;
        }
      }

      if (this.windowWidth < 768) {
        if (this.product.name.length > 14) {
          return `${this.product.name.slice(0, 14)}...`;
        }
      }

      return this.product.name;
    },
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
