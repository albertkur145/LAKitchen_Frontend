<template>
  <div>
    <div class="products-container" v-if="products.length !== 0">
      <Product class="product" :product="val" :remove="true"
      @del="removeProduct" v-for="val in products" :key="val.id"/>
      <div class="empty-fill"></div>
      <div class="empty-fill"></div>
      <div class="empty-fill"></div>
      <div class="empty-fill"></div>
    </div>

    <div class="is-empty" v-else>
      <img src="@/assets/icons/empty_box.svg" alt="image">
      <div class="message">
        Belum ada produk yang disukai?
        Yuk cari <router-link to="/">disini</router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

  // global css
  .products-container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    &::after {
      content: "";
      flex: auto;
    }

    .product {
      width: 100%;
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
      width: 100%;
    }
  }

  .is-empty {
    text-align: center;

    img {
      width: 100%;
      margin-bottom: 1.75rem;
    }

    .message {
      color: #333;
      margin-top: 0.125rem;
      font-size: 0.75em;
    }
  }
  // global css

  // #Device = Mobiles
  @media (min-width: 320px) and (max-width: 349px) {
    .products-container {

      .product {
        width: 100%;

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
        width: 100%;
      }
    }

    .is-empty {

      img {
        width: 16rem;
      }

      .message {
        font-size: 0.8125em;
      }
    }
  }
  // #Device = Mobiles

  // #Device = Mobiles
  @media (min-width: 350px) and (max-width: 379px) {
    .products-container {

      .product {
        width: 45%;

        ::v-deep .img-container {
          max-width: 100%;
          max-height: 8rem;
        }

        ::v-deep img {
          width: 100%;
          height: 8rem;
        }
      }

      .empty-fill {
        width: 45%;
      }
    }

    .is-empty {

      img {
        width: 16rem;
      }

      .message {
        font-size: 0.8125em;
      }
    }
  }
  // #Device = Mobiles

  // #Device = Mobiles
  @media (min-width: 380px) and (max-width: 409px) {
    .products-container {

      .product {
        width: 47%;

        ::v-deep .img-container {
          max-width: 100%;
          max-height: 9rem;
        }

        ::v-deep img {
          width: 100%;
          height: 9rem;
        }
      }

      .empty-fill {
        width: 47%;
      }
    }

    .is-empty {

      img {
        width: 16rem;
      }

      .message {
        font-size: 0.8125em;
      }
    }
  }
  // #Device = Mobiles

  // #Device = Mobiles
  @media (min-width: 410px) and (max-width: 439px) {
    .products-container {

      .product {
        width: 47%;

        ::v-deep .img-container {
          max-width: 100%;
          max-height: 9.5rem;
        }

        ::v-deep img {
          width: 100%;
          height: 9.5rem;
        }
      }

      .empty-fill {
        width: 47%;
      }
    }

    .is-empty {

      img {
        width: 16rem;
      }

      .message {
        font-size: 0.8125em;
      }
    }
  }
  // #Device = Mobiles

  // #Device = Mobiles
  @media (min-width: 440px) and (max-width: 480px) {
    .products-container {

      .product {
        width: 47%;

        ::v-deep .img-container {
          max-width: 100%;
          max-height: 10.25rem;
        }

        ::v-deep img {
          width: 100%;
          height: 10.25rem;
        }
      }

      .empty-fill {
        width: 47%;
      }
    }

    .is-empty {

      img {
        width: 16rem;
      }

      .message {
        font-size: 0.8125em;
      }
    }
  }
  // #Device = Mobiles

  // #Device = Low Resolution Tablets
  @media (min-width: 481px) and (max-width: 490px) {
    .products-container {

      .product {
        width: 47%;

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
        width: 47%;
      }
    }

    .is-empty {

      img {
        width: 18rem;
      }

      .message {
        font-size: 0.875em;
      }
    }
  }
  // #Device = Low Resolution Tablets

  // #Device = Low Resolution Tablets
  @media (min-width: 491px) and (max-width: 529px) {
    .products-container {

      .product {
        width: 30%;

        ::v-deep .img-container {
          max-width: 100%;
          max-height: 8rem;
        }

        ::v-deep img {
          width: 100%;
          height: 8rem;
        }
      }

      .empty-fill {
        width: 30%;
      }
    }

    .is-empty {

      img {
        width: 18rem;
      }

      .message {
        font-size: 0.875em;
      }
    }
  }
  // #Device = Low Resolution Tablets

  // #Device = Low Resolution Tablets
  @media (min-width: 530px) and (max-width: 579px) {
    .products-container {

      .product {
        width: 30%;

        ::v-deep .img-container {
          max-width: 100%;
          max-height: 9rem;
        }

        ::v-deep img {
          width: 100%;
          height: 9rem;
        }
      }

      .empty-fill {
        width: 30%;
      }
    }

    .is-empty {

      img {
        width: 18rem;
      }

      .message {
        font-size: 0.875em;
      }
    }
  }
  // #Device = Low Resolution Tablets

  // #Device = Low Resolution Tablets
  @media (min-width: 580px) and (max-width: 639px) {
    .products-container {

      .product {
        width: 30%;

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
        width: 30%;
      }
    }

    .is-empty {

      img {
        width: 18rem;
      }

      .message {
        font-size: 0.875em;
      }
    }
  }
  // #Device = Low Resolution Tablets

  // #Device = Low Resolution Tablets
  @media (min-width: 640px) and (max-width: 719px) {
    .products-container {

      .product {
        width: 30%;

        ::v-deep .img-container {
          max-width: 100%;
          max-height: 11rem;
        }

        ::v-deep img {
          width: 100%;
          height: 11rem;
        }
      }

      .empty-fill {
        width: 30%;
      }
    }

    .is-empty {

      img {
        width: 18rem;
      }

      .message {
        font-size: 0.875em;
      }
    }
  }
  // #Device = Low Resolution Tablets

  // #Device = Low Resolution Tablets
  @media (min-width: 720px) and (max-width: 767px) {
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
        width: 18rem;
      }

      .message {
        font-size: 0.875em;
      }
    }
  }
  // #Device = Low Resolution Tablets

  // #Device = Tablets, Ipads
  @media (min-width: 768px) and (max-width: 804px) {
    .products-container {

      .product {
        max-width: 9.25rem;

        ::v-deep .img-container {
          max-width: 9.25rem;
          max-height: 10rem;
        }

        ::v-deep img {
          width: 9.25rem;
          height: 10rem;
        }
      }

      .empty-fill {
        width: 9.25rem;
      }
    }

    .is-empty {

      img {
        width: 21rem;
      }

      .message {
        font-size: 0.9375em;
      }
    }
  }
  // #Device = Tablets, Ipads

  // #Device = Tablets, Ipads
  @media (min-width: 805px) and (max-width: 1024px) {
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
        width: 21rem;
      }

      .message {
        font-size: 0.9375em;
      }
    }
  }
  // #Device = Tablets, Ipads

  // #Device = Laptops, Desktops
  @media (min-width: 1025px) and (max-width: 1129px) {
    .products-container {

      .product {
        max-width: 9rem;

        ::v-deep .img-container {
          max-width: 9rem;
          max-height: 9.625rem;
        }

        ::v-deep img {
          width: 9rem;
          height: 9.625rem;
        }
      }

      .empty-fill {
        width: 9rem;
      }
    }

    .is-empty {

      img {
        width: 18rem;
      }

      .message {
        font-size: 1em;
      }
    }
  }
  // #Device = Laptops, Desktops

  // #Device = Laptops, Desktops
  @media (min-width: 1130px) and (max-width: 1234px) {
    .products-container {

      .product {
        max-width: 10.25rem;

        ::v-deep .img-container {
          max-width: 10.25rem;
          max-height: 11rem;
        }

        ::v-deep img {
          width: 10.25rem;
          height: 11rem;
        }
      }

      .empty-fill {
        width: 10.25rem;
      }
    }

    .is-empty {

      img {
        width: 18rem;
      }

      .message {
        font-size: 1em;
      }
    }
  }
  // #Device = Laptops, Desktops

  // #Device = Laptops, Desktops
  @media (min-width: 1235px) {
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
        width: 18rem;
      }

      .message {
        font-size: 1em;
      }
    }
  }
  // #Device = Laptops, Desktops

</style>

<script>

import Product from '@/components/user/Product.vue';

export default {

  props: {
    products: {
      type: Array,
      required: true,
    },
  },

  components: {
    Product,
  },

  methods: {
    async removeProduct(id) {
      const result = await this.$func.popupConfirmAction(
        'Ingin menghapus produk dari wishlist?',
        'Ya',
        'Tidak',
      );

      if (result) {
        this.$emit('del', id);
      }
    },
  },

};

</script>
