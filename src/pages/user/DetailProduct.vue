<template>
  <div id="app">
    <Header @show="showBackground" @hide="hideBackground"/>
    <div class="bg-all"></div>

    <div class="content">
      <div class="path-link">
        <router-link to="/" class="link">Home</router-link>
        <font-awesome-icon icon="chevron-right" class="chev-icon"/>

        <router-link to="/" class="link">{{ path.category.name }}</router-link>
        <font-awesome-icon icon="chevron-right" class="chev-icon"/>

        <router-link to="/" class="link">{{ path.subCategory.name }}</router-link>
        <font-awesome-icon icon="chevron-right" class="chev-icon"/>

        <span class="link">{{ product.name }}</span>
      </div>

      <div class="path-link-mobile">
        <router-link to="/">
          <font-awesome-icon icon="arrow-left" class="arr-icon"/>
          <span class="link">Beranda</span>
        </router-link>
      </div>

      <b-row class="product-detail">
        <b-col md="4" cols="12" class="left">
          <div class="desktop">
            <img :src="require(`@/assets/images/${imgBinding}.webp`)"
            alt="image" class="main-image">

            <div class="image-list">
              <img v-for="val in product.photo_links" :key="val.id"
              :src="require(`@/assets/images/${val.link}.webp`)"
              alt="image" class="alt-image" @click="changeMainImage(`${val.link}`)">
            </div>
          </div>

          <div class="mobile">
            <swiper class="swiper" :options="swiperOption">
              <swiper-slide v-for="val in product.photo_links" :key="val.id"
              class="slider-container">
                <img :src="require(`@/assets/images/${val.link}.webp`)"
                alt="image" class="main-image">
              </swiper-slide>
              <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
          </div>
        </b-col>

        <b-col md="8" cols="12" class="right">
          <div class="top">
            <div class="name">{{ product.name }}</div>
            <div class="reward">
              <div class="rating">
                <span class="rate">{{ product.rating }}</span>
                <span>
                  <font-awesome-icon v-for="i in 5" :key="i" icon="star"
                  :class="`star-icon${ i <= rating ? ' fill-color' : '' }`"/>
                </span>
              </div>

              <div class="space-line">|</div>
              <div class="text">{{ product.evaluators }} Penilaian</div>
              <div class="space-line">|</div>
              <div class="text">{{ product.seen }} Terlihat</div>
            </div>
          </div>

          <hr>

          <div class="bottom">
            <b-row class="d-flex align-items-center mb-4">
              <b-col sm="2" cols="12" class="title">Harga</b-col>
              <b-col sm="9" cols="12" class="price ml-3">{{ product.price | currency }}</b-col>
            </b-row>

            <b-row class="d-flex align-items-center mb-4">
              <b-col sm="2" cols="12" class="title">Jumlah</b-col>
              <b-col sm="9" cols="12" class="quantity ml-3">
                <span :class="`minus icon-control${quantity === 1 ? ' disable' : ''}`"
                @click="manipulateQuantity(0)">
                  <font-awesome-icon icon="minus"/>
                </span>

                <input type="number" v-model="quantity" disabled>

                <span :class="`plus icon-control${quantity === maxQuantity ? ' disable' : ''}`"
                @click="manipulateQuantity(1)">
                  <font-awesome-icon icon="plus"/>
                </span>
              </b-col>
            </b-row>

            <b-row class="mb-4">
              <b-col sm="2" cols="12" class="title">Deskripsi</b-col>
              <b-col sm="9" cols="12" class="description ml-3">{{ product.description }}</b-col>
            </b-row>

            <div class="button-act">
              <button class="buy-now">Beli Sekarang</button>
              <button class="add-to-cart">Tambah Ke Keranjang</button>
            </div>

            <div class="wishlist">
              <font-awesome-icon :icon="['far', 'heart']" class="wishlist-icon"/>
              <span class="ml-2">Tambah ke Wishlist</span>
            </div>
          </div>
        </b-col>
      </b-row>

      <b-row class="assessment">
        <b-col class="head" cols="12">
          <span class="title">Penilaian Produk ({{ product.evaluators }})</span>
          <span class="more">Lihat Semua</span>
        </b-col>

        <b-col cols="12">
          <b-row class="user-rating" v-for="val in product.assessment" :key="val.id">
            <b-col md="1" cols="2" class="avatar">
              <span><font-awesome-icon icon="user-alt" class="user-icon"/></span>
            </b-col>

            <b-col md="11" cols="10" class="desc-assest">
              <b-row>
                <b-col md="2" cols="12">
                  <div class="username">{{ getUsername(val.user.name) }}</div>
                  <div class="date">{{ val.date }}</div>
                </b-col>

                <b-col md="10" cols="12">
                  <div class="rate">
                    <font-awesome-icon v-for="i in 5" :key="i" icon="star"
                    :class="`star-icon${ i <= val.rate ? ' fill-color' : '' }`"/>
                  </div>

                  <div class="comment">{{ val.comment }}</div>
                </b-col>
              </b-row>
            </b-col>

            <b-col cols="12" class="line"></b-col>
          </b-row>
        </b-col>
      </b-row>

      <div class="fixed-button-act">
        <div>
          <div class="add-to-wishlist d-inline-block">
            <font-awesome-icon :icon="['far', 'heart']" class="wishlist-icon"/>
          </div>
          <div class="add-to-cart d-inline-block">
            <font-awesome-icon icon="cart-plus" class="cart-icon"/>
          </div>
        </div>
        <button class="buy-now">Beli Sekarang</button>
      </div>
    </div>

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
      padding: 7.25rem 0.875rem;

      .path-link {
        display: none;

        .link {
          color: #0047FF;

          &:first-child {
            margin-left: 0;
          }

          &:last-child {
            color: #777777;
          }
        }

        .chev-icon {
          color: #6D6B6B;
        }
      }

      .path-link-mobile {
        display: block;
        color: #0085FF;
        padding-bottom: 0.5rem;

        .arr-icon {
          font-size: 0.75em;
        }

        .link {
          margin-left: 0.375rem;
          font-size: 0.875em;
        }
      }

      .product-detail {
        margin: 0;
        border-radius: 0.5rem;
        background-color: #FFF;
        box-shadow: 0 0 0.125rem rgba($color: #000000, $alpha: 0.6);
        padding: 0.9375rem 0;

        .left {

          .desktop {
            display: none;
          }

          .mobile {
            display: block;
          }

          .main-image {
            border-radius: 0.5rem;
            border: 0.0625rem solid #BBB;
            width: 100%;
          }

          .image-list {
            max-width: 100%;

            .alt-image {
              cursor: pointer;
              border-radius: 0.375rem;
              border: 0.0625rem solid #CCC;
            }

            .active-image {
              border: 0.0625rem solid #FF7A00;
            }
          }
        }

        .right {
          margin-top: 0.625rem;

          .top {
            margin-bottom: 1rem;

            .name {
              color: #444;
              font-weight: 500;
              font-size: 0.875rem;
            }

            .reward {
              margin-top: 0.25rem;

              .rating {
                display: flex;
                align-items: center;

                .rate {
                  color: #F07300;
                  font-weight: 500;
                  text-decoration: underline;
                  font-size: 0.875em;
                  margin-right: 0.5rem;
                }

                .star-icon {
                  color: #BBB;
                  font-size: 0.875em;
                }
              }

              .space-line {
                display: none;
                color: #BBB;
              }

              .text {
                color: #5D5D5D;
                margin-top: 0.375rem;
                font-size: 0.8125em;
              }
            }
          }

          .bottom {
            margin-top: 1rem;

            .title {
              text-transform: uppercase;
              color: #999;
              font-weight: 500;
              font-size: 0.6875em;
              margin-bottom: 0.375rem;
            }

            .price {
              color: #FF5C00;
              font-weight: 700;
              font-size: 1.0625em;
            }

            .quantity {
              display: flex;
              align-items: center;

              .icon-control {
                color: #FFF;
                cursor: pointer;
                border-radius: 100rem;
                transition: background-color .3s ease-out;
                margin-right: 0.5rem;
                padding: 0.375rem 0.5875rem;
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
                text-align: center;
                font-weight: 500;
                background-color: #FFF;
                border: 0.0625rem solid #BBB;
                width: 4.5rem;
                margin-right: 0.5rem;
                padding: 0.25rem;
                font-size: 0.8125em;

                &::-webkit-outer-spin-button,
                &::-webkit-inner-spin-button {
                  -webkit-appearance: none;
                  margin: 0;
                }
              }
            }

            .description {
              padding-right: 2rem;
              font-size: 0.75em;
            }

            .button-act {
              display: none;

              .buy-now {
                color: #FFF;
                font-weight: 700;
                border-radius: 0.75rem;
                letter-spacing: 0.0625rem;
                text-transform: uppercase;
                background-color: #FF8A00;
                transition: background-color .2s ease-out;

                &:hover {
                  background-color: #FF9314;
                }
              }

              .add-to-cart {
                color: #FF8A00;
                font-weight: 700;
                border-radius: 0.75rem;
                letter-spacing: 0.0625rem;
                text-transform: uppercase;
                background-color: #FFF;
                border: 0.0625rem solid #FF8A00;
                transition: all .2s ease-out;

                &:hover {
                  color: #FF5C00;
                  border: 0.0625rem solid #FF5C00;
                }
              }
            }

            .wishlist {
              display: none;
              cursor: pointer;
              color: #FF002E;
            }
          }
        }
      }

      .assessment {
        margin: 0;
        border-radius: 0.5rem;
        background-color: #FFF;
        box-shadow: 0 0 0.125rem rgba($color: #000000, $alpha: 0.6);
        margin-top: 1.5rem;
        padding: 0.9375rem 0;

        .head {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .title {
            color: #333;
            font-weight: 500;
            font-size: 0.8125em;
          }

          .more {
            font-weight: 500;
            cursor: pointer;
            color: #0085FF;
            text-transform: uppercase;
            font-size: 0.625em;
          }
        }

        .user-rating {
          padding: 0;

          .avatar {
            margin-top: 1.25rem;

            span {
              display: inline-block;
              border-radius: 100rem;
              background-color: #AAA;
              padding: 0 0.4375rem 0.0625rem;

              .user-icon {
                color: #FFF;
                font-size: 0.625em;
              }
            }
          }

          .desc-assest {
            margin-top: 1.25rem;

            .username {
              color: #444;
              font-weight: 500;
              font-size: 0.8125em;
            }

            .date {
              color: #888;
              margin-top: 0;
              margin-top: 0.125rem;
              font-size: 0.6875em;
            }

            .rate {
              color: #BBB;
              margin-top: 0.25rem;
              font-size: 0.75em;
            }

            .comment {
              color: #333;
              margin-top: 0.75rem;
              font-size: 0.6875em;
            }
          }
        }

        .line {
          border-top: 0.0625rem solid #CCC;
          margin-top: 1.25rem;
        }
      }

      .fixed-button-act {
        display: none;
        display: flex;
        justify-content: space-between;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
        background-color: #FFF;
        border-radius: 1.5rem 1.5rem 0 0;
        box-shadow: 0 0 0.125rem 0.125rem rgba($color: #000000, $alpha: 0.2);
        padding: 0.875em;

        .buy-now {
          color: #FFF;
          font-weight: 500;
          border-radius: 0.75rem;
          letter-spacing: 0.0625rem;
          text-transform: uppercase;
          background-color: #FF8A00;
          transition: background-color .2s ease-out;
          padding: 0.6875rem 0.875rem;
          font-size: 0.6875em;

          &:hover {
            background-color: #EB7F00;
          }
        }

        .add-to-wishlist {
          cursor: pointer;
          color: #FFF;
          font-weight: 500;
          border-radius: 0.75rem;
          background-color: #F8323D;
          transition: background-color .2s ease-out;
          padding: 0.4375rem 0.6875rem;
          font-size: 0.9375em;
          margin-right: 0.5rem;

          &:hover {
            background-color: #F63E49;
          }
        }

        .add-to-cart {
          cursor: pointer;
          color: #FF8A00;
          font-weight: 500;
          border-radius: 0.75rem;
          letter-spacing: 0.0625rem;
          text-transform: uppercase;
          background-color: #FFF;
          border: 0.0625rem solid #FF8A00;
          transition: all .2s ease-out;
          padding: 0.4375rem 0.6875rem;
          font-size: 0.9375em;

          &:hover {
            color: #FF5C00;
            border: 0.0625rem solid #FF5C00;
          }
        }
      }

      .fill-color {
        color: #F07300 !important;
      }
    }
  }
  // global css

  // #Device = Mobiles
  @media (min-width: 320px) and (max-width: 480px) {
    #app {

      .content {
        padding: 7.5rem 1rem;

        .path-link-mobile {
          padding-bottom: 0.625rem;
        }

        .product-detail {
          padding: 0.9375rem 0;

          .right {
            margin-top: 0.75rem;

            .top {
              margin-bottom: 1rem;

              .name {
                font-size: 1em;
              }

              .reward {
                margin-top: 0.375rem;

                .rating {

                  .rate {
                    font-size: 0.9375em;
                    margin-right: 0.375rem;
                  }

                  .star-icon {
                    font-size: 0.9375em;
                  }
                }

                .text {
                  margin-top: 0.375rem;
                  font-size: 0.875em;
                }
              }
            }

            .bottom {
              margin-top: 1rem;

              .title {
                font-size: 0.75em;
                margin-bottom: 0.375rem;
              }

              .price {
                font-size: 1.125em;
              }

              .quantity {

                .icon-control {
                  margin-right: 0.75rem;
                  padding: 0.4375rem 0.625rem;
                  font-size: 0.75em;
                }

                input {
                  width: 4.5rem;
                  margin-right: 0.75rem;
                  padding: 0.3125rem;
                  font-size: 0.875em;
                }
              }

              .description {
                font-size: 0.8125em;
              }
            }
          }
        }

        .assessment {
          padding: 0.9375rem 0;

          .head {

            .title {
              font-size: 0.875em;
            }

            .more {
              font-size: 0.6875em;
            }
          }

          .user-rating {
            padding: 0;

            .avatar {
              margin-top: 1.25rem;

              span {
                padding: 0 0.4375rem 0.0625rem;

                .user-icon {
                  font-size: 0.625em;
                }
              }
            }

            .desc-assest {
              margin-top: 1.25rem;

              .username {
                font-size: 0.875em;
              }

              .date {
                font-size: 0.75em;
              }

              .rate {
                font-size: 0.8125em;
              }

              .comment {
                font-size: 0.75em;
              }
            }
          }

          .line {
            margin-top: 1.25rem;
          }
        }

        .fixed-button-act {
          padding: 0.875rem;

          .buy-now {
            padding: 0.75rem 1.125rem;
            font-size: 0.8125em;
          }

          .add-to-wishlist {
            padding: 0.5rem 0.8125rem;
            font-size: 1.0625em;
            margin-right: 1rem;
          }

          .add-to-cart {
            padding: 0.5rem 0.8125rem;
            font-size: 1.0625em;
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
        padding: 7.5rem 3rem;

        .path-link-mobile {
          padding-bottom: 0.75rem;

          .arr-icon {
            font-size: 0.8125em;
          }

          .link {
            font-size: 0.875em;
          }
        }

        .product-detail {
          padding: 2rem 1.5rem;

          .right {
            margin-top: 1rem;

            .top {
              margin-bottom: 1.25rem;

              .name {
                font-size: 1.25em;
              }

              .reward {
                margin-top: 0.5rem;

                .rating {

                  .rate {
                    font-size: 1.0625em;
                    margin-right: 0.5rem;
                  }

                  .star-icon {
                    font-size: 1em;
                  }
                }

                .text {
                  margin-top: 0.5rem;
                  font-size: 1em;
                }
              }
            }

            .bottom {
              margin-top: 1.25rem;

              .title {
                margin-bottom: 0;
                font-size: 0.8125em;
              }

              .price {
                font-size: 1.25em;
              }

              .quantity {

                .icon-control {
                  margin-right: 0.75rem;
                  padding: 0.375rem 0.5875rem;
                  font-size: 0.75em;
                }

                input {
                  width: 6rem;
                  margin-right: 0.75rem;
                  padding: 0.25rem;
                  font-size: 0.875em;
                }
              }

              .description {
                padding-right: 0;
                font-size: 0.875em;
              }

              .wishlist {
                margin-top: 0.875rem;
                font-size: 0.875em;
              }
            }
          }
        }

        .assessment {
          padding: 1.75rem 1.5rem;

          .head {

            .title {
              font-size: 1.125em;
            }

            .more {
              font-size: 0.8125em;
            }
          }

          .user-rating {
            padding: 0;

            .avatar {
              margin-top: 1.5rem;

              span {
                padding: 0.3125rem 0.625rem;

                .user-icon {
                  font-size: 0.8125em;
                }
              }
            }

            .desc-assest {
              margin-top: 1.5rem;

              .username {
                font-size: 0.9375em;
              }

              .date {
                font-size: 0.8125em;
              }

              .rate {
                margin-top: 0.25rem;
                font-size: 0.875em;
              }

              .comment {
                margin-top: 0.75rem;
                font-size: 0.8125em;
              }
            }
          }

          .line {
            margin-top: 1.5rem;
          }
        }

        .fixed-button-act {
          padding: 1rem;

          .buy-now {
            padding: 0.875rem 1.375rem;
            font-size: 0.875em;
          }

          .add-to-wishlist {
            padding: 0.5875rem 0.875rem;
            font-size: 1.1875em;
            margin-right: 1rem;
          }

          .add-to-cart {
            padding: 0.5875rem 0.875rem;
            font-size: 1.1875em;
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
        padding: 7.75rem 1.5rem;

        .path-link-mobile {
          display: none;
        }

        .path-link {
          display: block;
          padding: 0.75rem 0;

          .link {
            margin-left: 1rem;
            font-size: 0.875em;
          }

          .chev-icon {
            margin-left: 1rem;
            font-size: 0.5em;
          }
        }

        .product-detail {
          padding: 1.5rem 0.75rem;

          .left {

            .desktop {
              display: block;
            }

            .mobile {
              display: none;
            }

            .image-list {

              .alt-image {
                width: 3.5rem;
                height: 3.625rem;
                margin-top: 0.5rem;
                margin-right: 0.5rem;
              }
            }
          }

          .right {
            margin: 0;
            padding: 0 1.75rem;

            .top {
              margin-bottom: 1.25rem;

              .name {
                font-size: 1.5em;
              }

              .reward {
                display: flex;
                align-items: center;
                margin-top: 0.5rem;

                .rating {
                  margin-right: 1rem;

                  .rate {
                    font-size: 1em;
                    margin-right: 0.5rem;
                  }

                  .star-icon {
                    font-size: 0.9375em;
                  }
                }

                .space-line {
                  display: block;
                  margin-right: 1rem;
                  font-size: 1.0625em;
                }

                .text {
                  margin-top: 0;
                  font-size: 1em;
                  margin-right: 1rem;
                }
              }
            }

            .bottom {
              margin-top: 1.25rem;

              .title {
                margin-bottom: 0;
                font-size: 0.875em;
              }

              .price {
                font-size: 1.3125em;
              }

              .quantity {

                .icon-control {
                  margin-right: 0.75rem;
                  padding: 0.375rem 0.5875rem;
                  font-size: 0.75em;
                }

                input {
                  width: 6rem;
                  margin-right: 0.75rem;
                  padding: 0.25rem;
                  font-size: 0.875em;
                }
              }

              .description {
                padding-right: 0;
                font-size: 0.9375em;
              }

              .button-act {
                display: block;
                margin-top: 1.5rem;

                .buy-now {
                  margin-right: 1.1875rem;
                  padding: 0.875rem 1.5rem;
                  font-size: 0.8125em;
                }

                .add-to-cart {
                  padding: 0.875rem 1.5rem;
                  font-size: 0.8125em;
                }
              }

              .wishlist {
                display: inline-block;
                margin-top: 1rem;
                font-size: 0.9375em;
              }
            }
          }
        }

        .assessment {
          padding: 1.5rem 0.75rem;

          .head {

            .title {
              font-size: 1.25em;
            }

            .more {
              font-size: 0.875em;
            }
          }

          .user-rating {
            padding: 0;

            .avatar {
              margin-top: 2rem;

              span {
                padding: 0.5rem 0.75rem;

                .user-icon {
                  font-size: 0.875em;
                }
              }
            }

            .desc-assest {
              margin-top: 2rem;

              .username {
                font-size: 1em;
              }

              .date {
                font-size: 0.8125em;
              }

              .rate {
                margin-top: 0;
                font-size: 0.9375em;
              }

              .comment {
                margin-top: 0.75rem;
                font-size: 0.9375em;
              }
            }
          }

          .line {
            margin-top: 2rem;
          }
        }

        .fixed-button-act {
          display: none;
        }
      }
    }
  }
  // #Device = Tablets, Ipads

  // #Device = Laptops, Desktops
  @media (min-width: 1025px) {
    #app {

      .content {
        padding: 8rem 5rem;

        .path-link-mobile {
          display: none;
        }

        .path-link {
          display: block;
          padding: 1rem 0;

          .link {
            margin-left: 1.25rem;
            font-size: 1em;
          }

          .chev-icon {
            margin-left: 1.25rem;
            font-size: 0.5em;
          }
        }

        .product-detail {
          padding: 2rem 1.25rem;

          .left {

            .desktop {
              display: block;
            }

            .mobile {
              display: none;
            }

            .image-list {

              .alt-image {
                width: 4rem;
                height: 4.25rem;
                margin-top: 0.75rem;
                margin-right: 0.75rem;
              }
            }
          }

          .right {
            margin: 0;
            padding: 0 2rem;

            .top {
              margin-bottom: 1.5rem;

              .name {
                font-size: 1.75em;
              }

              .reward {
                display: flex;
                align-items: center;
                margin-top: 0.75rem;

                .rating {
                  margin-right: 1.25rem;

                  .rate {
                    font-size: 1.125em;
                    margin-right: 0.875rem;
                  }

                  .star-icon {
                    font-size: 1.0625em;
                  }
                }

                .space-line {
                  display: block;
                  margin-right: 1.25rem;
                  font-size: 1.125em;
                }

                .text {
                  margin-top: 0;
                  font-size: 1.0625em;
                  margin-right: 1.25rem;
                }
              }
            }

            .bottom {
              margin-top: 1.5rem;

              .title {
                margin-bottom: 0;
                font-size: 1em;
              }

              .price {
                font-size: 1.5em;
              }

              .quantity {

                .icon-control {
                  margin-right: 1rem;
                  padding: 0.5rem 0.6875rem;
                  font-size: 0.8125em;
                }

                input {
                  width: 7rem;
                  margin-right: 1rem;
                  padding: 0.25rem;
                  font-size: 1em;
                }
              }

              .description {
                padding-right: 0;
                font-size: 1em;
              }

              .button-act {
                display: block;
                margin-top: 2rem;

                .buy-now {
                  margin-right: 1.5rem;
                  padding: 1rem 2rem;
                  font-size: 0.9375em;
                }

                .add-to-cart {
                  padding: 1rem 2rem;
                  font-size: 0.9375em;
                }
              }

              .wishlist {
                display: inline-block;
                margin-top: 1rem;
                font-size: 1.0625em;
              }
            }
          }
        }

        .assessment {
          margin-top: 1.5rem;
          padding: 2rem 1.25rem;

          .head {

            .title {
              font-size: 1.3125em;
            }

            .more {
              font-size: 0.9375em;
            }
          }

          .user-rating {
            padding: 0.5rem 0;

            .avatar {
              margin-top: 2rem;

              span {
                padding: 0.625rem 0.875rem;

                .user-icon {
                  font-size: 1em;
                }
              }
            }

            .desc-assest {
              margin-top: 2rem;

              .username {
                font-size: 1.0625em;
              }

              .date {
                font-size: 0.875em;
                margin-top: 0.125rem;
              }

              .rate {
                margin-top: 0;
                font-size: 1em;
              }

              .comment {
                margin-top: 0.75rem;
                font-size: 1em;
              }
            }
          }

          .line {
            margin-top: 2rem;
          }
        }

        .fixed-button-act {
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
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';

export default {

  components: {
    Header,
    Footer,
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
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction',
        },
      },

      path: {
        category: {
          id: '1',
          name: 'Mie & Pasta',
        },
        subCategory: {
          id: '1',
          name: 'Mie Instan',
        },
      },

      product: {
        id: 1,
        name: 'Indomie Goreng Rasa Rendang 10 Pcs',
        price: 25000,
        description: 'Indomie goreng rasa rendang terbaru, baru keluar di tahun 2020. Sangat cocok dinikmati bersama keluarga dimusim panas ataupun dingin, dengan khas rasa rendang yang bikin kamu jadi nendang. Stok terbatas, siapa cepat dia dapat.',
        seen: 126,
        rating: 4.82,
        evaluators: 43,
        photo_links: [
          {
            id: 1,
            link: 'bakpao',
          },
          {
            id: 2,
            link: 'bolu_gulung',
          },
          {
            id: 3,
            link: 'cendol_cake',
          },
          {
            id: 4,
            link: 'ekado',
          },
        ],
        assessment: [
          {
            id: 1,
            user: {
              id: 1,
              name: 'Budi Utama Wijaya',
            },
            rate: 5,
            comment: 'Produk datang tepat waktu, kemasan double safety, setelah dimasak rasanya nendang sekali... Mantap sekali sangat recommended!',
            date: '20/12/2020',
          },
          {
            id: 2,
            user: {
              id: 5,
              name: 'Rio Martin',
            },
            rate: 4,
            comment: 'Mantap, rasanya enak sekali. Tetapi saya masih suka indomie goreng biasa, jadi saya kasih 4 saja dulu ya hehe',
            date: '05/01/2021',
          },
        ],
      },

      windowWidth: null,
      imgBinding: '',
      quantity: 1,
      maxQuantity: 20,
    };
  },

  computed: {
    rating() {
      return Math.round(this.product.rating);
    },
  },

  mounted() {
    window.addEventListener('resize', this.getWindowWidth);
  },

  methods: {
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

    changeMainImage(url) {
      this.imgBinding = url;
    },

    manipulateQuantity(act) {
      switch (act) {
        case 1:
          if (this.quantity < this.maxQuantity) {
            this.quantity += 1;
          }
          break;

        case 0:
          if (this.quantity > 1) {
            this.quantity -= 1;
          }
          break;

        default:
          break;
      }
    },

    getUsername(str) {
      if (this.windowWidth >= 768) {
        const name = str.split(' ');
        let fullname = name[0];

        name.shift();
        name.forEach((val) => {
          fullname += ` ${val[0]}`;
        });

        return fullname;
      }

      return str;
    },
  },

  created() {
    this.getWindowWidth();
    [this.imgBinding] = this.product.photo_links;
    this.imgBinding = this.imgBinding.link;
  },

};

</script>
