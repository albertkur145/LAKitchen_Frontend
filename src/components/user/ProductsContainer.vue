<template>
  <div>
    <template v-if="products.length !== 0">
      <div class="title">{{ title }}</div>
      <div class="products-container">
        <Product class="product" :product="val" v-for="val in products" :key="val.id"/>
        <div class="empty-fill"></div>
        <div class="empty-fill"></div>
        <div class="empty-fill"></div>
        <div class="empty-fill"></div>
        <div class="empty-fill"></div>
      </div>
    </template>

    <div class="is-empty" v-else>
      <img src="@/assets/icons/product_not_found.svg" alt="image">
      <div class="warning">Maaf, hasil pencarian "{{ title }}" tidak ditemukan</div>
      <div class="message">Yuk coba kata kunci yang lain</div>
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

  .is-empty {
    margin-top: 2rem;
    text-align: center;

    img {
      width: 100%;
      margin-bottom: 1.75rem;
    }

    .warning {
      color: #222;
      font-size: 0.875em;
    }

    .message {
      color: #555;
      margin-top: 0.125rem;
      font-size: 0.75em;
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

    .is-empty {

      img {
        width: 18rem;
      }

      .warning {
        font-size: 0.875em;
      }

      .message {
        font-size: 0.75em;
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

    .is-empty {

      img {
        width: 19rem;
      }

      .warning {
        font-size: 0.875em;
      }

      .message {
        font-size: 0.75em;
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

    .is-empty {

      img {
        width: 19rem;
      }

      .warning {
        font-size: 0.875em;
      }

      .message {
        font-size: 0.75em;
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

    .is-empty {

      img {
        width: 20rem;
      }

      .warning {
        font-size: 0.9375em;
      }

      .message {
        font-size: 0.8125em;
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

    .is-empty {

      img {
        width: 20rem;
      }

      .warning {
        font-size: 0.9375em;
      }

      .message {
        font-size: 0.8125em;
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

    .is-empty {

      img {
        width: 20rem;
      }

      .warning {
        font-size: 0.9375em;
      }

      .message {
        font-size: 0.8125em;
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

    .is-empty {

      img {
        width: 23rem;
      }

      .warning {
        font-size: 1em;
      }

      .message {
        font-size: 0.875em;
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

    .is-empty {

      img {
        width: 25rem;
      }

      .warning {
        font-size: 1.0625em;
      }

      .message {
        font-size: 0.9375em;
      }
    }
  }
  // #Device = Laptops, Desktops

</style>

<script>

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
    Product,
  },

  data() {
    return {
      title: '',
      products: [],
      windowWidth: null,
    };
  },

  methods: {
    ...mapActions('products', [
      'getByCategory',
      'getBySubCategory',
      'getByName',
    ]),

    async getProducts(action, params) {
      const { code, data } = await this.$func.promiseAPI(action, params);

      if (code >= 200 && code < 300) {
        this.products = data.products;
      }

      if (this.type === 'search') {
        this.title = this.params;
      } else {
        this.title = data.title;
      }
    },

    selection() {
      let params = null;
      let action = null;

      switch (this.type) {
        case 'category': {
          params = { categoryId: parseInt(this.params, 10) };
          action = this.getByCategory;
          break;
        }

        case 'subCategory': {
          params = { subCategoryId: parseInt(this.params, 10) };
          action = this.getBySubCategory;
          break;
        }

        case 'search': {
          params = { productName: this.params };
          action = this.getByName;
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
    this.$emit('is-null', true);
  },

};

</script>
