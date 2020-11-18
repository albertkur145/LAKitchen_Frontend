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

    <b-table-simple responsive class="table-la">
      <b-thead>
        <b-tr>
          <b-th class="title">Produk</b-th>
          <b-th class="title">Harga</b-th>
          <b-th class="title">Jumlah</b-th>
          <b-th class="title">Subtotal</b-th>
          <b-th class="title">Catatan</b-th>
        </b-tr>
      </b-thead>

      <b-tbody>
        <b-tr v-for="val in order.products" :key="val.id">
          <b-td class="value">
            <router-link :to="`/product/${val.id}`">{{ val.name }}</router-link>
          </b-td>
          <b-td class="value">{{ val.price | currency }}</b-td>
          <b-td class="value">{{ val.quantity }}</b-td>
          <b-td class="value">{{ val.subTotal | currency }}</b-td>
          <b-td class="value">{{ val.note }}</b-td>
        </b-tr>

        <b-tr>
          <b-td class="value">Ongkos Kirim</b-td>
          <b-td class="value">Rp. 15.000</b-td>
          <b-td class="value">-</b-td>
          <b-td class="value">-</b-td>
          <b-td class="value">-</b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>

    <div class="text-right mt-5" v-if="order.status.id === 1">
      <button class="btn-cancel" @click="confirmAction">Batalkan pesanan</button>
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

  .table-la {
    margin-top: 1.5rem;

    .title {
      color: #3F3F3F;
      font-weight: 500;
      text-transform: uppercase;
      font-size: 0.875em;
    }

    .value {
      white-space: nowrap;
      font-size: 0.8125em;
    }

    td:first-child a {
      color: #0075FF;
    }
  }

  .btn-cancel {
    color: #FFF;
    font-weight: 500;
    border-radius: 0.25rem;
    background-color: #AAA;
    transition: background-color .2s ease-out;
    padding: 0.5rem 1.5rem;
    font-size: 0.8125em;

    &:hover {
      background-color: #A0A0A0;
    }
  }
  // global css

  // #Device = Mobiles
  @media (min-width: 320px) and (max-width: 480px) {

  }
  // #Device = Mobiles

  // #Device = Low Resolution Tablets
  @media (min-width: 481px) and (max-width: 767px) {

  }
  // #Device = Low Resolution Tablets

  // #Device = Tablets, Ipads
  @media (min-width: 768px) and (max-width: 1024px) {

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

    .table-la {

      .title {
        font-size: 0.9375em;
      }

      .value {
        font-size: 0.875em;
      }
    }

    .btn-cancel {
      font-size: 0.875em;
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
  },

  methods: {
    async confirmAction() {
      const result = await this.$func.popupConfirmAction(
        'Ingin membatalkan pesanan?<br><b>Jangan tinggalkan aku :(</b>',
        'Ya',
        'Tidak',
      );

      if (result) {
        this.$emit('cancel');
      }
    },
  },

};

</script>
