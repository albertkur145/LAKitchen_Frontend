<template>
  <div>
    <div class="filter">
      <span :class="`text${activeText === 'Now' ? ' active-text' : ''}`"
      @click="filterOrder('Now')">Saat ini</span>

      <span :class="`text${activeText === 'Selesai' ? ' active-text' : ''}`"
      @click="filterOrder('Selesai')">Selesai</span>

      <span :class="`text${activeText === 'Dibatalkan' ? ' active-text' : ''}`"
      @click="filterOrder('Dibatalkan')">Dibatalkan</span>
    </div>

    <transition name="fade">
      <div class="order-container" v-if="show">
        <div class="total">Total : {{ filteredOrders.length }} pesanan</div>

        <div class="list" v-for="val in filteredOrders" :key="val.orderNumber">
          <div class="headline">
            <div>
              <div class="title">No Pesanan</div>
              <div class="value order-number">{{ val.orderNumber }}</div>
            </div>

            <div>
              <div class="title">Tanggal Transaksi</div>
              <div class="value">{{ val.date }}</div>
            </div>

            <div class="md-only">
              <div class="title">Status Pembayaran</div>
              <div class="value" v-if="val.status.id !== 1 &&
              val.status.name !== 'Dibatalkan'">Diterima</div>
              <div class="value text-center" v-else>-</div>
            </div>

            <div class="md-only">
              <div class="title">Total Pembayaran</div>
              <div class="value payment">{{ val.totalPayment + 15000 | currency }}</div>
            </div>
          </div>

          <div class="mt-5 bottom">
            <div v-if="val.status.name !== 'Selesai'" :class="`status${val.status.id === 1 ||
            val.status.name === 'Dibatalkan' ? ' bg-danger-la' : ''}`">
              {{ val.status.name }}
            </div>

            <router-link :to="`/order/${val.orderNumber}/assessment`" class="assessment" v-else>
              Nilai Produk
            </router-link>

            <router-link :to="`/order/${val.orderNumber}`" class="detail-order">
              <span>Detail pesanan</span>
              <font-awesome-icon icon="chevron-right" class="chev-icon"/>
            </router-link>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>

  // global css
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .filter {
    display: flex;
    overflow-wrap: break-word;
    overflow-x: auto;

    .text {
      cursor: pointer;
      color: #0056FC;
      white-space: nowrap;
      display: inline-block;
      border-radius: 100rem;
      background-color: #F2F2F2;
      transition: background-color .2s ease-out;
      margin-right: 0.5rem;
      padding: 0.375rem 1rem;
      font-size: 0.6875em;

      &:hover {
        background-color: #F0F0F0;
      }
    }

    .active-text {
      color: #FFF !important;
      background-color: #1AB2F3 !important;
    }
  }

  .order-container {
    margin-top: 1.75rem;

    .total {
      color: #666;
      margin-bottom: 0.75rem;
      font-size: 0.75em;
    }

    .list {
      border: 0.0625rem dashed #FF7A00;
      margin-bottom: 1.25rem;
      padding: 0.5rem;

      .headline {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;

        .md-only {
          display: none;
        }

        .title {
          color: #888;
          text-transform: uppercase;
          font-size: 0.75em;
        }

        .value {
          color: #3D3D3D;
          font-weight: 500;
          margin-top: 0.25rem;
          font-size: 0.875em;
        }

        .order-number {
          color: #0D7CFF;
        }

        .payment {
          color: #FF5C00;
        }
      }

      .bg-danger-la {
        background-color: #FF4264 !important;
      }

      .bottom {
        display: block;

        .status {
          color: #FFF;
          font-weight: 500;
          display: inline-block;
          border-radius: 0.25rem;
          letter-spacing: 0.0625rem;
          background-color: #31C699;
          padding: 0.625rem 1rem;
          font-size: 0.6875em;
        }

        .assessment {
          display: block;
          color: #FF9900;
          font-weight: 500;
          margin-top: 1rem;
          text-decoration: underline;
          font-size: 0.8125em;
        }

        .detail-order {
          display: block;
          color: #1AB2F3;
          text-align: right;
          font-weight: 500;
          margin-top: 1rem;

          span {
            margin-right: 0.5rem;
            font-size: 0.8125em;
          }

          .chev-icon {
            font-size: 0.6875em;
          }
        }
      }
    }
  }
  // global css

  // #Device = Mobiles
  @media (min-width: 320px) and (max-width: 480px) {
    .filter {

      .text {
        margin-right: 0.5rem;
        padding: 0.375rem 1rem;
        font-size: 0.6875em;
      }
    }

    .order-container {

      .total {
        font-size: 0.75em;
      }

      .list {
        padding: 0.5rem 0.75rem;

        .bottom {

          .status {
            padding: 0.625rem 1rem;
            font-size: 0.6875em;
          }
        }
      }
    }
  }
  // #Device = Mobiles

  // #Device = Low Resolution Tablets
  @media (min-width: 481px) and (max-width: 767px) {
    .filter {

      .text {
        margin-right: 0.75rem;
        padding: 0.5rem 1.5rem;
        font-size: 0.75em;
      }
    }

    .order-container {

      .total {
        font-size: 0.8125em;
      }

      .list {
        padding: 0.75rem 1.25rem;

        .bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .status {
            padding: 0.625rem 1rem;
            font-size: 0.6875em;
          }

          .assessment {
            margin-top: 0;
          }

          .detail-order {
            margin-top: 0;
          }
        }
      }
    }
  }
  // #Device = Low Resolution Tablets

  // #Device = Tablets, Ipads
  @media (min-width: 768px) and (max-width: 1024px) {
    .filter {

      .text {
        margin-right: 0.75rem;
        padding: 0.5rem 1.5rem;
        font-size: 0.8125em;
      }
    }

    .order-container {

      .total {
        font-size: 0.875em;
      }

      .list {
        padding: 1rem 1.5rem;

        .headline {

          .md-only {
            display: block;
          }
        }

        .bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .status {
            padding: 0.625rem 1rem;
            font-size: 0.75em;
          }

          .assessment {
            margin-top: 0;
            font-size: 0.875em;
          }

          .detail-order {
            margin-top: 0;
          }
        }
      }
    }
  }
  // #Device = Tablets, Ipads

  // #Device = Laptops, Desktops
  @media (min-width: 1025px) {
    .filter {

      .text {
        margin-right: 0.75rem;
        padding: 0.5rem 1.5rem;
        font-size: 0.875em;
      }
    }

    .order-container {

      .total {
        font-size: 0.875em;
      }

      .list {
        padding: 1rem 1.5rem;

        .headline {

          .md-only {
            display: block;
          }

          .title {
            font-size: 0.8125em;
          }

          .value {
            font-size: 0.9375em;
          }
        }

        .bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .status {
            padding: 0.625rem 1rem;
            font-size: 0.8125em;
          }

          .assessment {
            margin-top: 0;
            font-size: 0.875em;
          }

          .detail-order {
            margin-top: 0;

            span {
              font-size: 0.875em;
            }

            .chev-icon {
              font-size: 0.75em;
            }
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
    orders: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      activeText: '',
      show: false,
      filteredOrders: [],
    };
  },

  methods: {
    filterOrder(status) {
      this.transitionComponent();
      this.filteredOrders = this.filter(status);

      switch (status) {
        case 'Now':
          this.activeText = 'Now';
          break;

        case 'Selesai':
          this.activeText = 'Selesai';
          break;

        case 'Dibatalkan':
          this.activeText = 'Dibatalkan';
          break;

        default:
          break;
      }
    },

    filter(status) {
      if (this.orders.length > 0) {
        return this.orders.filter((val) => {
          if (status === 'Now') {
            return val.status.name !== 'Selesai' && val.status.name !== 'Dibatalkan';
          }

          return val.status.name === status;
        });
      }

      return [];
    },

    transitionComponent() {
      this.show = false;

      setTimeout(() => {
        this.show = true;
      }, 200);
    },
  },

  created() {
    this.filterOrder('Now');
  },

};

</script>
