<template>
  <div id="app">
    <Header @show="showBackground" @hide="hideBackground"/>
    <div class="bg-all"></div>

    <div class="content">
      <div class="title">
        <font-awesome-icon icon="shopping-cart"/>
        <span class="ml-3">Keranjang Belanja</span>
      </div>

      <b-row class="cart-container" v-if="products !== undefined">
        <b-col cols="12" lg="8">
          <div class="top style-container">
            <label>
              <input type="checkbox" v-model="isCheckAll" @click="checkAll">
              <span class="checkbox-la"></span>
            </label>
            <span class="text">Pilih Semua</span>
          </div>

          <div class="body style-container">
            <div class="product" v-for="(val, index) in products" :key="val.id">
              <div class="d-flex">
                <label>
                  <input type="checkbox" @change="updateCheckAll"
                  :value="val" v-model="selectedProduct">
                  <span class="checkbox-la"></span>
                </label>

                <img :src="require('@/assets/images/hakau.webp')" alt="img">

                <div class="description">
                  <div class="product-name">{{ productName(val.name) }}</div>
                  <div class="price">{{ val.price | currency }}</div>
                  <div class="note">
                    <span class="value">{{ sliceNote(val.note) }}</span>
                    <span :class="`write${val.note.length !== 0 ? ' ml-sm-2' : ''}`"
                    @click="showForm(val.note, index)">
                      {{ getNoteText(val.note) }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="action-btn d-flex align-items-center">
                <font-awesome-icon @click="confirmAction(val.id)"
                icon="trash" class="icon-act"/>
                <font-awesome-icon @click="addToWishlist(val.id)"
                icon="heart" class="icon-act"/>

                <div class="quantity">
                  <span :class="`minus icon-control${val.quantity === 1 ? ' disable' : ''}`"
                  @click="manipulateQuantity(0, index)">
                    <font-awesome-icon icon="minus"/>
                  </span>

                  <input type="number" v-model="val.quantity" disabled>

                  <span @click="manipulateQuantity(1, index)"
                  :class="`plus icon-control
                  ${val.quantity === maxQuantity ? ' disable' : ''}`">
                    <font-awesome-icon icon="plus"/>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </b-col>

        <b-col lg="4">
          <div class="shop-summary style-container">
            <div class="sub-title">Ringkasan Belanja</div>
            <div class="d-flex justify-content-between">
              <span class="total-text">Total</span>
              <div class="total-value">{{ totalPrice | currency }}</div>
            </div>

            <button :class="`${selectedProduct.length > 0 ? ' btn-active' : ' btn-disable'}
              btn-buy`" @click="checkout">Beli ({{ selectedProduct.length }})</button>
          </div>
        </b-col>
      </b-row>

      <div class="shop-summary-mobile">
        <div>
          <div class="total-text">Total</div>
          <div class="total-value">{{ totalPrice | currency }}</div>
        </div>

        <button :class="`${selectedProduct.length > 0 ? ' btn-active' : ' btn-disable'}
          btn-buy`" @click="checkout">Beli ({{ selectedProduct.length }})</button>
      </div>
    </div>

    <Loader :class="`${loader ? '' : 'd-none'}`"/>
    <Footer/>
  </div>
</template>

<style lang="scss" scoped>

  // global css
  #app {

    .bg-all {
      position: fixed;
      height: 0;
      background-color: rgba($color: #000000, $alpha: 0.5);
      z-index: 2;
      opacity: 0;
      transition: opacity .3s ease-in-out;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }

    .content {
      padding: 7.75rem 0.875rem;

      .style-container {
        background-color: #FFF;
        box-shadow: 0 0 0.0625rem 0.0625rem rgba($color: #000000, $alpha: 0.2);
        padding: 0.8125rem 0.8125rem 0;
      }

      .title {
        color: #8A7051;
        font-weight: 500;
        font-size: 1.0625em;
      }

      .cart-container {
        margin-top: 1rem;

        label {
          cursor: pointer;

          &:hover > .checkbox-la {
            border: 0.0625rem solid #666;
          }

          input[type=checkbox] {
            position: absolute;
            opacity: 0;
            height: 0;
            width: 0;

            &:checked + .checkbox-la {
              background-color: #FF5C00;
              border: 0.0625rem solid #FF5C00;
            }

            &:checked + .checkbox-la::after {
              display: block;
            }
          }

          .checkbox-la {
            position: relative;
            display: inline-block;
            border-radius: 0.25rem;
            transition: all .1s linear;
            border: 0.0625rem solid #888;
            margin-right: 1.25rem;
            width: 1.25rem;
            height: 1.25rem;

            &::after {
              content: "";
              display: none;
              position: absolute;
              border: solid #FFF;
              transform: rotate(45deg);
              border-width: 0 0.1875rem 0.1875rem 0;
              width: 0.375rem;
              height: 0.6875rem;
              top: 0.125rem;
              left: 0.375rem;
            }
          }
        }

        .top {
          display: flex;

          .text {
            font-size: 0.875em;
          }
        }

        .body {
          margin-top: 1rem;
          padding-top: 0;
          padding-bottom: 1.5rem;

          .product {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
            border-bottom: 0.0625rem solid #DDD;
            padding: 1.5rem 0;

            img {
              border-radius: 0.375rem;
              width: 4.375rem;
              height: 4.5rem;
            }

            .description {
              padding-left: 1rem;
              padding-right: 2.5rem;

              .product-name {
                color: #3F3F3F;
                font-weight: 500;
                font-size: 0.875em;
              }

              .price {
                color: #FF5C00;
                font-weight: 500;
                white-space: nowrap;
                margin-top: 0.125rem;
                font-size: 0.8125em;
              }

              .note {
                margin-top: 0.75rem;
                font-size: 0.75em;

                .value {
                  display: block;
                  color: #666;
                }

                .write {
                  cursor: pointer;
                  color: #0086E7;
                  font-weight: 500;
                  white-space: nowrap;
                  text-decoration: underline;
                }
              }
            }

            .action-btn {
              display: flex;
              flex-wrap: wrap;
              margin-left: 2.5rem;
            }

            .icon-act {
              color: #999;
              cursor: pointer;
              margin-top: 1.5rem;
              margin-right: 1.25rem;
              font-size: 0.9375em;
            }

            .quantity {
              align-items: center;
              display: inline-flex;
              margin-top: 1.5rem;

              .icon-control {
                color: #FFF;
                cursor: pointer;
                border-radius: 100rem;
                transition: background-color .3s ease-out;
                margin-right: 0.5rem;
                padding: 0.3125rem 0.5rem;
                font-size: 0.75em;
              }

              .plus {
                background-color: #00E86B;

                &:hover {
                  background-color: #00C75B;
                }
              }

              .minus {
                background-color: #FF2D5F;

                &:hover {
                  background-color: #E52151;
                }
              }

              .disable {
                cursor: no-drop;
                background-color: #CCC;

                &:hover {
                  background-color: #BBB;
                }
              }

              input {
                outline: none;
                color: #333;
                font-weight: 500;
                text-align: center;
                background-color: #FFF;
                border: 0.0625rem solid #BBB;
                width: 4.75rem;
                padding: 0.3125rem;
                font-size: 0.8125em;
                margin-right: 0.5rem;

                &::-webkit-outer-spin-button,
                &::-webkit-inner-spin-button {
                  -webkit-appearance: none;
                  margin: 0;
                }
              }
            }
          }
        }
      }

      .shop-summary {
        display: none;

        .sub-title {
          color: #333;
          font-weight: 500;
          border-bottom: 0.0625rem solid #CCC;
          padding-bottom: 0.75rem;
          margin-bottom: 0.75rem;
          font-size: 1.0625em;
        }

        .total-text {
          color: #4F4F4F;
          font-weight: 500;
          font-size: 1em;
        }

        .total-value {
          font-weight: 700;
          color: #FF6C00;
          font-size: 1em;
        }

        .btn-buy {
          width: 100%;
          color: #FFF;
          font-weight: 500;
          border-radius: 0.375rem;
          transition: background-color .2s ease-out;
          margin: 1.25rem 0 0.75rem;
          padding: 0.625rem;
          font-size: 0.9375em;
        }
      }

      .shop-summary-mobile {
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        position: fixed;
        align-items: center;
        background-color: #FFF;
        justify-content: space-between;
        box-shadow: 0 0 0.125rem 0.125rem rgba($color: #000000, $alpha: 0.2);
        padding: 0.75rem 1.5rem;

        .total-text {
          color: #333;
          font-weight: 500;
          font-size: 1em;
        }

        .total-value {
          font-weight: 700;
          color: #FF6C00;
          font-size: 1em;
        }

        .btn-buy {
          color: #FFF;
          font-weight: 500;
          border-radius: 0.375rem;
          transition: background-color .2s ease-out;
          padding: 0.625rem 2rem;
          font-size: 0.875em;
        }
      }

      .btn-active {
        background-color: #FF6C00;

        &:hover {
          background-color: #FF740E;
        }
      }

      .btn-disable {
        cursor: no-drop;
        background-color: #AAA;

        &:hover {
          background-color: #999;
        }
      }
    }
  }
  // global css

  // #Device = Mobiles
  @media (min-width: 320px) and (max-width: 480px) {
    #app {

      .content {
        padding: 8rem 1rem;

        .cart-container {

          .body {

            .product {

              img {
                width: 4.5rem;
                height: 4.625rem;
              }
            }
          }
        }
      }
    }
  }
  // #Device = Mobiles

  // #Device = Low Resolution Tablets
  @media (min-width: 481px) and (max-width: 767px) {
    #app {

      .content {
        padding: 8rem 1rem;

        .style-container {
          padding: 0.8125rem 1rem 0;
        }

        .cart-container {

          .body {

            .product {

              img {
                width: 5.5rem;
                height: 5.625rem;
              }

              .description {
                padding-left: 1.25rem;

                .product-name {
                  font-size: 1.0625em;
                }

                .price {
                  font-size: 0.9375em;
                }

                .note {
                  margin-top: 1.125rem;
                  font-size: 0.875em;

                  .value {
                    display: inline-block;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  // #Device = Low Resolution Tablets

  // #Device = Tablets, Ipads
  @media (min-width: 768px) and (max-width: 1024px) {
    #app {

      .content {
        padding: 8.25rem 1.5rem;

        .style-container {
          padding: 0.8125rem 1rem 0;
        }

        .title {
          font-size: 1.25em;
        }

        .cart-container {
          margin-top: 1.5rem;

          label {

            .checkbox-la {
              width: 1.375rem;
              height: 1.375rem;

              &::after {
                width: 0.4375rem;
                height: 0.8125rem;
                top: 0.125rem;
                left: 0.4375rem;
              }
            }
          }

          .top {

            .text {
              font-size: 0.9375em;
            }
          }

          .body {

            .product {

              img {
                width: 5.5rem;
                height: 5.625rem;
              }

              .description {
                padding-right: 0;
                padding-left: 1.25rem;

                .product-name {
                  font-size: 1.0625em;
                }

                .price {
                  font-size: 0.9375em;
                }

                .note {
                  margin-top: 1.125rem;
                  font-size: 0.875em;

                  .value {
                    display: inline-block;
                  }
                }
              }

              .action-btn {
                margin-left: 0;
              }

              .icon-act {
                margin-top: 0;
                font-size: 1.0625em;
              }

              .quantity {
                margin-top: 0;

                .icon-control {
                  padding: 0.4375rem 0.625rem;
                  font-size: 0.75em;
                }

                input {
                  width: 4.75rem;
                  padding: 0.3125rem;
                  font-size: 0.875em;
                }
              }
            }
          }
        }

        .shop-summary-mobile {

          .total-text {
            font-size: 1.0625em;
          }

          .total-value {
            font-size: 1.0625em;
          }

          .btn-buy {
            font-size: 0.9375em;
          }
        }
      }
    }
  }
  // #Device = Tablets, Ipads

  // #Device = Laptops, Desktops
  @media (min-width: 1025px) {
    #app {

      .content {
        padding: 8.5rem 1.875rem;

        .style-container {
          padding: 0.8125rem 1rem 0;
        }

        .title {
          font-size: 1.25em;
        }

        .cart-container {
          margin-top: 1.5rem;

          label {

            .checkbox-la {
              width: 1.375rem;
              height: 1.375rem;

              &::after {
                width: 0.4375rem;
                height: 0.8125rem;
                top: 0.125rem;
                left: 0.4375rem;
              }
            }
          }

          .top {

            .text {
              font-size: 0.9375em;
            }
          }

          .body {

            .product {

              img {
                width: 5.5rem;
                height: 5.625rem;
              }

              .description {
                padding-right: 0;
                padding-left: 1.25rem;

                .product-name {
                  font-size: 1.0625em;
                }

                .price {
                  font-size: 0.9375em;
                }

                .note {
                  margin-top: 1.125rem;
                  font-size: 0.875em;

                  .value {
                    display: inline-block;
                  }
                }
              }

              .action-btn {
                margin-left: 0;
              }

              .icon-act {
                margin-top: 0;
                font-size: 1.0625em;
              }

              .quantity {
                margin-top: 0;

                .icon-control {
                  padding: 0.4375rem 0.625rem;
                  font-size: 0.75em;
                }

                input {
                  width: 4.75rem;
                  padding: 0.3125rem;
                  font-size: 0.875em;
                }
              }
            }
          }
        }

        .shop-summary {
          display: block;
        }

        .shop-summary-mobile {
          display: none;
        }
      }
    }
  }
  // #Device = Laptops, Desktops

</style>

<script>

import Header from '@/components/user/Header.vue';
import Footer from '@/components/user/Footer.vue';
import Loader from '@/components/Loader.vue';
import { mapGetters, mapActions } from 'vuex';

export default {

  components: {
    Header,
    Footer,
    Loader,
  },

  data() {
    return {
      quantity: 1,
      maxQuantity: 20,
      loader: false,
      products: undefined,
      isCheckAll: true,
      selectedProduct: [],
      windowWidth: null,
    };
  },

  computed: {
    ...mapGetters('cart', [
      'userCart',
    ]),

    totalPrice() {
      return this.selectedProduct.reduce((val, item) => val + (item.price * item.quantity), 0);
    },
  },

  mounted() {
    window.addEventListener('resize', this.getWindowWidth);
  },

  methods: {
    ...mapActions('cart', [
      'getAll',
      'remove',
      'update',
    ]),

    ...mapActions('wishlist', [
      'saveProduct',
    ]),

    async getUserCart() {
      this.loader = true;

      const { code } = await this.$func.promiseAPI(this.getAll, {
        userId: this.$cookies.get('user').id,
      });

      this.loader = false;

      if (code >= 200 && code < 300) {
        this.products = this.userCart.products;
        this.selectedProduct = this.products;
      } else {
        this.$func.popupConnectionError();
      }
    },

    async updateCart(val) {
      this.loader = true;

      const { code } = await this.$func.promiseAPI(this.update, {
        userId: this.$cookies.get('user').id,
        productId: val.id,
        quantity: val.quantity,
        note: val.note,
      });

      this.loader = false;

      if (code >= 200 && code < 300) {
        return true;
      }

      this.$func.popupConnectionError(false);
      return false;
    },

    async confirmAction(id) {
      const result = await this.$func.popupConfirmAction(
        'Ingin menghapus produk dari keranjang?',
        'Ya',
        'Tidak',
      );

      if (result) {
        this.removeFromCart(id);
      }
    },

    async removeFromCart(id) {
      this.loader = true;

      const { code } = await this.$func.promiseAPI(this.remove, {
        userId: this.$cookies.get('user').id,
        productId: id,
      });

      this.loader = false;

      if (code >= 200 && code < 300) {
        this.$func.popupSuccessNoRoute('Berhasil menghapus produk');
        this.popProductArray(id);
      } else {
        this.$func.popupConnectionError(false);
      }
    },

    async addToWishlist(id) {
      this.loader = true;

      const { code } = await this.$func.promiseAPI(this.saveProduct, {
        userId: this.$cookies.get('user').id,
        productId: id,
      });

      this.loader = false;

      if (code >= 200 && code < 300) {
        this.$func.popupSuccessNoRoute('Berhasil ditambahkan ke wishlist');
      } else {
        this.$func.popupConnectionError(false);
      }
    },

    async showForm(note, index) {
      const result = await this.$func.formTextArea(
        'Catatan',
        'Tulis catatan untuk toko',
        note,
      );

      if (result.isConfirmed && result.value.length !== 0) {
        const temp = this.products[index].note;
        this.products[index].note = result.value;
        const isSuccess = await this.updateCart(this.products[index]);

        if (!isSuccess) {
          this.products[index].note = temp;
        }
      }
    },

    checkout() {
      if (this.selectedProduct.length > 0) {
        this.$cookies.set('cart', this.selectedProduct);
        this.$router.push('/payment');
      }
    },

    checkAll() {
      this.isCheckAll = !this.isCheckAll;
      this.selectedProduct = [];

      if (this.isCheckAll) {
        this.products.forEach((val) => {
          this.selectedProduct.push(val);
        });
      }
    },

    updateCheckAll() {
      if (this.selectedProduct.length === this.products.length) {
        this.isCheckAll = true;
      } else {
        this.isCheckAll = false;
      }
    },

    popProductArray(id) {
      this.products = this.products.filter((val) => val.id !== id);
      this.selectedProduct = this.products.filter((val) => val.id !== id);
    },

    getNoteText(note) {
      if (note.length === 0) {
        return 'Tulis catatan';
      }

      return 'Ubah catatan';
    },

    productName(text) {
      if (this.windowWidth >= 420) {
        if (text.length > 22) {
          return `${text.slice(0, 22)}...`;
        }
      } else if (this.windowWidth < 420 && this.windowWidth >= 375) {
        if (text.length > 18) {
          return `${text.slice(0, 18)}...`;
        }
      } else if (this.windowWidth < 375) {
        if (text.length > 12) {
          return `${text.slice(0, 12)}...`;
        }
      }

      return text;
    },

    sliceNote(text) {
      if (text.length > 8) {
        return `${text.slice(0, 8)}...`;
      }

      return text;
    },

    getWindowWidth() {
      this.windowWidth = window.innerWidth;
    },

    showBackground() {
      const el = document.querySelector('.bg-all');
      el.style.opacity = '1';
      el.style.height = 'inherit';
    },

    hideBackground() {
      const el = document.querySelector('.bg-all');
      el.style.opacity = '0';
      el.style.height = '0';
    },

    async manipulateQuantity(act, i) {
      switch (act) {
        case 1:
          if (this.products[i].quantity < this.maxQuantity) {
            this.products[i].quantity += 1;
            const result = await this.updateCart(this.products[i]);

            if (!result) {
              this.products[i].quantity -= 1;
            }
          }
          break;

        case 0:
          if (this.products[i].quantity > 1) {
            this.products[i].quantity -= 1;
            const result = await this.updateCart(this.products[i]);

            if (!result) {
              this.products[i].quantity += 1;
            }
          }
          break;

        default:
          break;
      }
    },
  },

  created() {
    if (!this.$cookies.get('token')) {
      this.$router.push('/login');
    }

    this.getWindowWidth();
    this.getUserCart();
  },

};

</script>
