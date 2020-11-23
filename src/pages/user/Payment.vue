<template>
  <div id="app">
    <div class="header">
      <img src="@/assets/images/logo.png" alt="logo" class="logo">
      <div class="title">Checkout</div>
    </div>

    <b-row class="content" v-if="cart !== undefined">
      <b-col cols="12" lg="8" class="data">
        <div>
          <div class="user">
            <div class="title">Alamat Pengiriman</div>
            <hr>

            <div class="name value">Budi Utomo</div>
            <div class="phone value">081392290882</div>
            <div class="value address">
              <div>Jalan Mayor Salim Batubara Komplek P.U No. 609 RT 11</div>
              <div>Sumatra Selatan, Palembang</div>
            </div>
          </div>

          <hr>

          <div>
            <div class="product" v-for="val in cart" :key="val.id">
              <div class="d-flex">
                <img :src="require(`@/assets/images/${val.photo_link}.webp`)" alt="img">

                <div class="description">
                  <div class="product-name value">{{ val.name }}</div>
                  <div class="price value">{{ val.price | currency }}</div>
                  <div class="quantity value">Jumlah : {{ val.quantity }}</div>
                  <div class="note value">{{ val.note }}</div>
                </div>
              </div>

              <div class="subtotal">{{ (val.price * val.quantity) | currency }}</div>
            </div>
          </div>
        </div>
      </b-col>

      <b-col cols="12" lg="4" class="payment">
        <div class="shop-summary">
          <div class="title">Ringkasan Pembayaran</div>

          <div class="mb-1 d-flex justify-content-between">
            <div class="key">Total Harga</div>
            <div class="value">{{ totalPayment | currency }}</div>
          </div>

          <div class="mb-1 d-flex justify-content-between">
            <div class="key">Ongkos Kirim</div>
            <div class="value">{{ postage | currency }}</div>
          </div>

          <hr>

          <div class="total-payment d-flex justify-content-between">
            <div class="key">Total Tagihan</div>
            <div class="value">{{ (totalPayment + postage) | currency }}</div>
          </div>

          <button class="btn-payment" @click="createOrder">
            <font-awesome-icon icon="lock" class="lock-icon"/>
            <span class="ml-2">Bayar Sekarang</span>
          </button>
        </div>
      </b-col>
    </b-row>

    <div class="btn-payment-mobile">
      <div>
        <div class="key">Total Tagihan</div>
        <div class="value">{{ (totalPayment + postage) | currency }}</div>
      </div>

      <button @click="createOrder">
        <font-awesome-icon icon="lock" class="lock-icon"/>
        <span class="ml-2">Bayar Sekarang</span>
      </button>
    </div>

    <div class="copyright">
      <font-awesome-icon :icon="['far', 'copyright']"/>
      <span class="ml-1">2020 - 2021</span>
    </div>

    <Loader :class="`${loader ? '' : 'd-none'}`"/>
  </div>
</template>

<style lang="scss" scoped>

  // global css
  #app {
    background-color: #FFF;

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 0.0625rem solid #FF4D00;
      padding: 1rem;

      .logo {
        width: 6.5rem;
      }

      .title {
        color: #3F3F3F;
        font-weight: 500;
        font-size: 1.0625em;
      }
    }

    .copyright {
      display: flex;
      color: #999;
      align-items: center;
      margin: 2rem 0 5rem;
      padding: 1.75rem 1rem;
      font-size: 0.75em;
    }

    .content {
      margin: 0;
      padding: 1.75rem 0;

      .data {

        hr {
          border-top: 0.0625rem solid #D2D2D2;
          margin: unset 0;
        }
      }

      .payment {
        margin-top: 1.25rem;
      }

      .user {

        .title {
          font-weight: 500;
          color: #3F3F3F;
          font-size: 1em;
        }

        .value {
          color: #3F3F3F;
          margin: 0.3125rem 0;
        }

        .name {
          font-weight: 500;
          font-size: 0.875em;
        }

        .phone {
          font-size: 0.875em;
        }

        .address {
          color: #4F4F4F;
          font-size: 0.8125em;
        }
      }

      .product {
        display: block;
        border-bottom: 0.0625rem solid #DDD;
        padding: 1rem 0;

        &:first-child {
          padding-top: 0;
        }

        img {
          border-radius: 0.375rem;
          width: 4rem;
          height: 4.0625rem;
        }

        .description {
          padding-left: 0.875rem;

          .value {
            margin-bottom: 0.25rem;
          }

          .product-name {
            color: #3F3F3F;
            font-weight: 500;
            font-size: 0.9375em;
          }

          .price {
            color: #7D5742;
            font-weight: 500;
            font-size: 0.8125em;
          }

          .quantity {
            color: #3F3F3F;
            font-size: 0.75em;
          }

          .note {
            color: #888;
            font-size: 0.6875em;
          }
        }

        .subtotal {
          color: #FF5C00;
          font-weight: 700;
          text-align: right;
          white-space: nowrap;
          margin-top: 0.5rem;
          font-size: 0.875em;
        }
      }

      .shop-summary {
        position: relative;
        color: #3F3F3F;
        border: 0.0625rem solid #E0E0E0;
        padding: 0.75rem 0.875rem;

        .title {
          font-weight: 500;
          margin-bottom: 1rem;
          font-size: 0.9375em;
        }

        .key {
          font-size: 0.8125em;
        }

        .value {
          color: #222;
          font-size: 0.8125em;
        }

        .total-payment {
          font-size: 0.9375em;

          .key {
            font-weight: 500;
          }

          .value {
            font-weight: 700;
            color: #FF5C00;
          }
        }

        .btn-payment {
          width: 100%;
          display: none;
          color: #FFF;
          font-weight: 500;
          margin-top: 1.25rem;
          border-radius: 0.375rem;
          text-transform: uppercase;
          background-color: #FF5C00;
          transition: background-color .2s ease-out;
          padding: 0.625rem;
          font-size: 0.75em;

          &:hover {
            background-color: #FF6813;
          }
        }
      }
    }

    .btn-payment-mobile {
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      position: fixed;
      align-items: center;
      background-color: #FFF;
      justify-content: space-between;
      box-shadow: 0 0 0.375rem 0.0625rem rgba($color: #000000, $alpha: 0.2);
      padding: 0.875rem 1rem;

      .key {
        color: #3F3F3F;
        font-weight: 500;
        white-space: nowrap;
        font-size: 0.875em;
      }

      .value {
        font-weight: 700;
        color: #FF5C00;
        white-space: nowrap;
        font-size: 1em;
      }

      button {
        color: #FFF;
        font-weight: 500;
        margin-left: 1rem;
        border-radius: 0.375rem;
        text-transform: uppercase;
        background-color: #FF5C00;
        transition: background-color .2s ease-out;
        padding: 0.625rem 1.25rem;
        font-size: 0.75em;

        &:hover {
          background-color: #FF6813;
        }
      }
    }
  }
  // global css

  // #Device = Mobiles
  @media (min-width: 320px) and (max-width: 480px) {

  }
  // #Device = Mobiles

  // #Device = Low Resolution Tablets
  @media (min-width: 481px) and (max-width: 767px) {
    #app {

      .header {
        padding: 1.25rem;

        .logo {
          width: 7.5rem;
        }

        .title {
          font-size: 1.25em;
        }
      }

      .copyright {
        padding: 2rem 1.25rem;
        font-size: 0.8125em;
      }

      .content {
        padding: 2rem 1.25rem;

        .data {

          hr {
            margin: 1rem 0;
          }
        }

        .user {

          .title {
            font-size: 1.0625em;
          }

          .value {
            margin: 0.5rem 0;
          }

          .name {
            font-size: 0.9375em;
          }

          .phone {
            font-size: 0.9375em;
          }

          .address {
            font-size: 0.875em;
          }
        }

        .product {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 0;

          img {
            width: 4.75rem;
            height: 4.875rem;
          }

          .description {
            padding: 0 1.25rem;

            .value {
              margin-bottom: 0.375rem;
            }

            .product-name {
              font-size: 1em;
            }

            .price {
              font-size: 0.875em;
            }

            .quantity {
              font-size: 0.8125em;
            }

            .note {
              font-size: 0.75em;
            }
          }

          .subtotal {
            margin-top: 0;
            font-size: 0.9375em;
          }
        }

        .shop-summary {
          padding: 1rem 1.25rem;

          .title {
            font-size: 1em;
          }

          .key {
            font-size: 0.875em;
          }

          .value {
            font-size: 0.875em;
          }

          .total-payment {
            font-size: 1em;
          }

          .btn-payment {
            padding: 0.6875rem;
            font-size: 0.8125em;
          }
        }
      }

      .btn-payment-mobile {
        padding: 0.875rem 1.25rem;

        .key {
          font-size: 0.9375em;
        }

        .value {
          margin-top: 0.0625rem;
          font-size: 1.0625em;
        }

        button {
          padding: 0.75rem 1.5rem;
          font-size: 0.8125em;
        }
      }
    }
  }
  // #Device = Low Resolution Tablets

  // #Device = Tablets, Ipads
  @media (min-width: 768px) and (max-width: 1024px) {
    #app {

      .header {
        padding: 1.5rem 5rem;

        .logo {
          width: 8.5rem;
        }

        .title {
          font-size: 1.375em;
        }
      }

      .copyright {
        padding: 3rem 5rem;
        font-size: 0.875em;
      }

      .content {
        padding: 3rem 5rem;

        .data {

          hr {
            margin: 1.25rem 0;
          }
        }

        .user {

          .title {
            font-size: 1.1875em;
          }

          .value {
            margin: 0.75rem 0;
          }

          .name {
            font-size: 1em;
          }

          .phone {
            font-size: 1em;
          }

          .address {
            font-size: 0.9375em;
          }
        }

        .product {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 0;

          img {
            width: 5.5rem;
            height: 5.625rem;
          }

          .description {
            padding: 0 1.5rem;

            .value {
              margin-bottom: 0.375rem;
            }

            .product-name {
              font-size: 1.0625em;
            }

            .price {
              font-size: 0.9375em;
            }

            .quantity {
              font-size: 0.875em;
            }

            .note {
              font-size: 0.8125em;
            }
          }

          .subtotal {
            margin-top: 0;
            font-size: 1.125em;
          }
        }

        .shop-summary {
          padding: 1rem 1.25rem;

          .title {
            font-size: 1.0625em;
          }

          .key {
            font-size: 0.9375em;
          }

          .value {
            font-size: 0.9375em;
          }

          .total-payment {
            font-size: 1.0625em;
          }

          .btn-payment {
            padding: 0.6875rem;
            font-size: 0.875em;
          }
        }
      }

      .btn-payment-mobile {
        padding: 1rem 5rem;

        .key {
          font-size: 1em;
        }

        .value {
          margin-top: 0.125rem;
          font-size: 1.125em;
        }

        button {
          padding: 0.75rem 1.75rem;
          font-size: 0.875em;
        }
      }
    }
  }
  // #Device = Tablets, Ipads

  // #Device = Laptops, Desktops
  @media (min-width: 1025px) {
    #app {

      .header {
        padding: 1.5rem 5rem;

        .logo {
          width: 8.5rem;
        }

        .title {
          font-size: 1.375em;
        }
      }

      .copyright {
        margin-bottom: 0;
        padding: 3rem 5rem;
        font-size: 0.875em;
      }

      .content {
        padding: 3rem 5rem;

        .data {
          padding-left: 0;

          hr {
            margin: 1.25rem 0;
          }
        }

        .payment {
          padding-right: 0;
          margin-top: 0;
        }

        .user {

          .title {
            font-size: 1.1875em;
          }

          .value {
            margin: 0.75rem 0;
          }

          .name {
            font-size: 1em;
          }

          .phone {
            font-size: 1em;
          }

          .address {
            font-size: 0.9375em;
          }
        }

        .product {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 0;

          img {
            width: 5.5rem;
            height: 5.625rem;
          }

          .description {
            padding: 0 1.5rem;

            .value {
              margin-bottom: 0.375rem;
            }

            .product-name {
              font-size: 1.0625em;
            }

            .price {
              font-size: 0.9375em;
            }

            .quantity {
              font-size: 0.875em;
            }

            .note {
              font-size: 0.8125em;
            }
          }

          .subtotal {
            margin-top: 0;
            font-size: 1.125em;
          }
        }

        .shop-summary {
          padding: 1rem 1.25rem;

          .title {
            font-size: 1.0625em;
          }

          .key {
            font-size: 0.9375em;
          }

          .value {
            font-size: 0.9375em;
          }

          .total-payment {
            font-size: 1.0625em;
          }

          .btn-payment {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0.6875rem;
            font-size: 0.875em;
          }
        }
      }

      .btn-payment-mobile {
        display: none;
      }
    }
  }
  // #Device = Laptops, Desktops

</style>

<script>

import Loader from '@/components/Loader.vue';
import { mapActions } from 'vuex';

export default {

  components: {
    Loader,
  },

  data() {
    return {
      cart: undefined,
      loader: false,
      postage: 15000,
    };
  },

  computed: {
    totalPayment() {
      return this.cart.reduce((val, item) => val + (item.price * item.quantity), 0);
    },
  },

  methods: {
    ...mapActions('order', [
      'create',
    ]),

    async createOrder() {
      this.loader = true;
      const params = this.cart.map((val) => ({
        id: val.id,
        price: val.price,
        quantity: val.quantity,
        note: val.note,
      }));

      const { code } = await this.$func.promiseAPI(this.create, {
        userId: this.$cookies.get('user').id,
        products: params,
      });

      this.loader = false;

      if (code >= 200 && code < 300) {
        this.$func.popupSuccess(
          'Transaksi berhasil<br>Segera lakukan pembayaran<br>[ <b class="text-success">MOHON CEK EMAIL</b> ]',
          this.$router,
          '/',
        );
      } else {
        this.$func.popupConnectionError();
      }
    },

    isProfileComplete() {
      const user = this.$cookies.get('user');

      if (user.name.length === 0) {
        return false;
      }

      if (user.phoneNumber.length === 0) {
        return false;
      }

      if (user.province.length === 0) {
        return false;
      }

      if (user.city.length === 0) {
        return false;
      }

      if (user.address.length === 0) {
        return false;
      }

      if (user.email.length === 0) {
        return false;
      }

      return true;
    },
  },

  beforeRouteLeave(to, from, next) {
    localStorage.removeItem('cart');
    next();
  },

  beforeRouteEnter(to, from, next) {
    if (from.name === 'Cart' && to.name === 'Payment') {
      next();
    } else {
      window.location.href = '/cart';
    }
  },

  created() {
    this.$func.isLoggedIn(this.$cookies, true, this.$router);
    this.cart = JSON.parse(localStorage.getItem('cart'));

    if (!this.cart) {
      this.$router.go(-1);
    }

    if (!this.isProfileComplete()) {
      this.$func.popupErrorRedirect(
        'Lengkapi profil terlebih dahulu',
        'Ok',
        this.$router,
        '/profile',
      );
    }
  },

};

</script>
