<template>
  <div>
    <div class="headline">
      <div class="mb-4 mr-sm-3 mr-5">
        <div class="title">No Pesanan</div>
        <div class="value order-number">{{ order.orderNumber }}</div>
      </div>

      <div class="mb-4 mr-sm-3 mr-5">
        <div class="title">Tanggal Transaksi</div>
        <div class="value">{{ order.date }}</div>
      </div>

      <div class="mb-4 mr-sm-3 mr-5">
        <div class="title">Total Pembayaran</div>
        <div class="value payment">{{ order.totalPayment | currency }}</div>
      </div>

      <div class="mb-4 mr-sm-3 mr-5">
        <div class="title">Status Pesanan</div>
        <div class="value">{{ order.status.name }}</div>
      </div>
    </div>

    <div class="list">
      <div class="product" v-for="val in products" :key="val.id">
        <div class="d-flex">
          <img :src="require(`@/assets/images/${val.photo_link}.webp`)">

          <div class="description">
            <div class="name">{{ val.name }}</div>
            <div class="quantity">Jumlah: {{ val.quantity }}</div>
            <div class="price">{{ val.price | currency }} / Unit</div>
          </div>
        </div>

        <div class="text-right">
          <button class="btn-giveass" @click="redirectAssessment(val.id)"
          v-if="val.isAssessment === 0">Beri Nilai</button>
          <div class="done" v-else>Sudah dinilai</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

  // global css
  .headline {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

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

  .list {

    .product {
      border-bottom: 0.0625rem solid #DDD;
      padding: 1.5rem 0;

      &:first-child {
        border-top: 0.0625rem solid #DDD;
      }

      img {
        border-radius: 0.5rem;
        width: 4rem;
        height: 4.25rem;
      }

      .description {
        padding: 0 0 0 1rem;

        .name {
          font-weight: 500;
          color: #3F3F3F;
          font-size: 0.875em;
        }

        .quantity {
          color: #777;
          margin-top: 0.125rem;
          font-size: 0.6875em;
        }

        .price {
          color: #FF5C00;
          font-weight: 500;
          margin-top: 0.625rem;
          font-size: 0.75em;
        }
      }

      .btn-giveass {
        color: #FFF;
        white-space: nowrap;
        font-weight: 500;
        border-radius: 0.5rem;
        background-color: #FFA800;
        transition: background-color .2s ease-out;
        margin-top: 2rem;
        padding: 0.5rem 1rem;
        font-size: 0.6875em;

        &:hover {
          background-color: #F19F00;
        }
      }

      .done {
        color: #009D52;
        white-space: nowrap;
        margin-top: 2rem;
        font-size: 0.8125em;
      }
    }
  }
  // global css

  // #Device = Mobiles
  @media (min-width: 320px) and (max-width: 480px) {
    .list {

      .product {
        padding: 1.25rem 0;

        img {
          width: 4.25rem;
          height: 4.5rem;
        }

        .description {
          padding: 0 0 0 0.75rem;

          .name {
            font-size: 0.9375em;
          }

          .quantity {
            margin-top: 0.125rem;
            font-size: 0.75em;
          }

          .price {
            margin-top: 0.625rem;
            font-size: 0.8125em;
          }
        }

        .btn-giveass {
          padding: 0.5rem 1rem;
          font-size: 0.75em;
        }

        .done {
          font-size: 0.875em;
        }
      }
    }
  }
  // #Device = Mobiles

  // #Device = Low Resolution Tablets
  @media (min-width: 481px) and (max-width: 767px) {
    .list {
      margin-top: 1.5rem;

      .product {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.25rem 0;

        img {
          width: 5rem;
          height: 5.25rem;
        }

        .description {
          padding: 0 1.5rem 0 1rem;

          .name {
            font-size: 0.9375em;
          }

          .quantity {
            margin-top: 0.25rem;
            font-size: 0.75em;
          }

          .price {
            margin-top: 1rem;
            font-size: 0.8125em;
          }
        }

        .btn-giveass {
          margin-top: 0;
          padding: 0.5rem 1rem;
          font-size: 0.75em;
        }

        .done {
          margin-top: 0;
          font-size: 0.875em;
        }
      }
    }
  }
  // #Device = Low Resolution Tablets

  // #Device = Tablets, Ipads
  @media (min-width: 768px) and (max-width: 1024px) {
    .list {
      margin-top: 1.5rem;

      .product {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem 0;

        img {
          width: 5.25rem;
          height: 5.5rem;
        }

        .description {
          padding: 0 1.5rem 0 1rem;

          .name {
            font-size: 1em;
          }

          .quantity {
            margin-top: 0.25rem;
            font-size: 0.8125em;
          }

          .price {
            margin-top: 1rem;
            font-size: 0.875em;
          }
        }

        .btn-giveass {
          margin-top: 0;
          padding: 0.5rem 1rem;
          font-size: 0.8125em;
        }

        .done {
          margin-top: 0;
          font-size: 0.9375em;
        }
      }
    }
  }
  // #Device = Tablets, Ipads

  // #Device = Laptops, Desktops
  @media (min-width: 1025px) {
    .headline {

      .title {
        font-size: 0.8125em;
      }

      .value {
        font-size: 0.9375em;
      }
    }

    .list {
      margin-top: 1.5rem;

      .product {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem 0;

        img {
          width: 5.25rem;
          height: 5.5rem;
        }

        .description {
          padding: 0 1.5rem 0 1rem;

          .name {
            font-size: 1em;
          }

          .quantity {
            margin-top: 0.25rem;
            font-size: 0.8125em;
          }

          .price {
            margin-top: 1rem;
            font-size: 0.875em;
          }
        }

        .btn-giveass {
          margin-top: 0;
          padding: 0.5rem 1rem;
          font-size: 0.8125em;
        }

        .done {
          margin-top: 0;
          font-size: 0.9375em;
        }
      }
    }
  }
  // #Device = Laptops, Desktops

</style>

<script>

export default {

  props: {
    order: {
      type: Object,
      required: true,
    },

    products: {
      type: Array,
      required: true,
    },
  },

  methods: {
    redirectAssessment(id) {
      this.$router.push({
        name: 'UserAssessment',
        params: {
          number: this.order.orderNumber,
          id,
        },
      });
    },
  },

};

</script>
