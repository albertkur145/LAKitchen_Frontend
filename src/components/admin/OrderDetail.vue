<template>
  <div>
    <TemplateContent>
      <template v-slot:title>
        <span v-if="title">
          <router-link :to="title.path"
          class="back">{{ title.name }}</router-link>
        </span>

        <span>
          <font-awesome-icon icon="chevron-right" class="chev-icon"/>
        </span>

        <span>Detail Pesanan</span>
      </template>

      <template v-slot:content>
        <div class="container-la">
          <b-row>
            <b-col cols="12" md="6">
              <div class="title-data">Data Customer</div>

              <b-row class="data">
                <b-col cols="5" sm="3" md="4">
                  <div class="title text-size">Nama</div>
                </b-col>

                <b-col cols="7" sm="9" md="8">
                  <div class="value text-size">
                    {{ customer.name }}
                  </div>
                </b-col>
              </b-row>

              <b-row class="data">
                <b-col cols="5" sm="3" md="4">
                  <div class="title text-size">Email</div>
                </b-col>

                <b-col cols="7" sm="9" md="8">
                  <div class="value text-size">
                    {{ customer.email }}
                  </div>
                </b-col>
              </b-row>

              <b-row class="data">
                <b-col cols="5" sm="3" md="4">
                  <div class="title text-size">No. HP</div>
                </b-col>

                <b-col cols="7" sm="9" md="8">
                  <div class="value text-size">
                    {{ customer.phoneNumber }}
                  </div>
                </b-col>
              </b-row>

              <b-row class="data">
                <b-col cols="5" sm="3" md="4">
                  <div class="title text-size">Alamat</div>
                </b-col>

                <b-col cols="7" sm="9" md="8">
                  <div class="value text-size">
                    {{ customer.address }}
                  </div>
                </b-col>
              </b-row>

              <b-row class="data">
                <b-col cols="5" sm="3" md="4">
                  <div class="title text-size">Provinsi</div>
                </b-col>

                <b-col cols="7" sm="9" md="8">
                  <div class="value text-size">
                    {{ customer.province }}
                  </div>
                </b-col>
              </b-row>

              <b-row class="data">
                <b-col cols="5" sm="3" md="4">
                  <div class="title text-size">Kota</div>
                </b-col>

                <b-col cols="7" sm="9" md="8">
                  <div class="value text-size">
                    {{ customer.city }}
                  </div>
                </b-col>
              </b-row>
            </b-col>

            <b-col cols="12" md="6" class="mt-4 mt-md-0 pl-md-4">
              <div class="title-data">Data Pesanan</div>

              <b-row class="data">
                <b-col cols="5" sm="3" md="4">
                  <div class="title text-size">No pesanan</div>
                </b-col>

                <b-col cols="7" sm="9" md="8">
                  <div class="value text-size">
                    {{ order.orderNumber }}
                  </div>
                </b-col>
              </b-row>

              <b-row class="data">
                <b-col cols="5" sm="3" md="4">
                  <div class="title text-size">Tanggal</div>
                </b-col>

                <b-col cols="7" sm="9" md="8">
                  <div class="value text-size">
                    {{ order.date }}
                  </div>
                </b-col>
              </b-row>

              <b-row class="data">
                <b-col cols="5" sm="3" md="4">
                  <div class="title text-size">Pembayaran</div>
                </b-col>

                <b-col cols="7" sm="9" md="8">
                  <div class="value text-size">
                    {{ order.paymentMethod }}
                  </div>
                </b-col>
              </b-row>

              <b-row class="data">
                <b-col cols="5" sm="3" md="4">
                  <div class="title text-size">Total tagihan</div>
                </b-col>

                <b-col cols="7" sm="9" md="8">
                  <div class="value text-size">
                    {{ order.totalPayment + 15000 | currency }}
                  </div>
                </b-col>
              </b-row>

              <b-row class="data">
                <b-col cols="5" sm="3" md="4">
                  <div class="title text-size">Status</div>
                </b-col>

                <b-col cols="7" sm="9" md="8">
                  <div class="value text-size">
                    {{ order.status }}
                  </div>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </div>

        <div class="container-la table-la">
          <div class="title-data">Pembelian Produk</div>

          <b-table-simple responsive>
            <b-thead>
              <b-tr>
                <b-th class="title">Produk</b-th>
                <b-th class="title">Harga</b-th>
                <b-th class="title">Jumlah beli</b-th>
                <b-th class="title">Sub total</b-th>
                <b-th class="title">Catatan</b-th>
              </b-tr>
            </b-thead>

            <b-tbody>
              <b-tr v-for="val in products" :key="val.id">
                <td class="value">{{ val.name }}</td>
                <td class="value">{{ val.price | currency }}</td>
                <td class="value">{{ val.quantity }}</td>
                <td class="value">{{ val.subTotal | currency }}</td>
                <td class="value">{{ val.note === null ? '-' : val.note }}</td>
              </b-tr>

              <b-tr>
                <td class="value">Ongkos kirim</td>
                <td class="value">{{ 15000 | currency }}</td>
                <td class="value">{{ 1 }}</td>
                <td class="value">{{ 15000 | currency }}</td>
                <td class="value">-</td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </div>
      </template>
    </TemplateContent>

    <Loader :class="`${loader ? '' : 'd-none'}`"/>
  </div>
</template>

<style lang="scss" scoped>

  // global css
  .chev-icon {
    display: none;
    color: #AFAFAF;
    margin: 0 0.75rem 0.0625rem;
    font-size: 0.5em;
  }

  .back {
    display: none;
    font-weight: 400;
    color: #AFAFAF;
  }

  .container-la {
    border-radius: 0.5rem;
    background-color: #FFF;
    margin-bottom: 1rem;
    padding: 0.875rem 1.125rem;
  }

  .title-data {
    color: #AF52E8;
    font-weight: 600;
    font-size: 1.0625em;
    margin-bottom: 1rem;
  }

  .data {
    margin-bottom: 0.625rem;

    .text-size {
      font-size: 0.875em;
    }

    .title {
      white-space: nowrap;
      color: #555;
    }

    .value {
      word-wrap: break-word;
      color: #000;
    }
  }

  .table-la {

    .title {
      color: #444;
      font-weight: 600;
      white-space: nowrap;
      font-size: 0.875em;
    }

    .value {
      color: #555;
      white-space: nowrap;
      font-size: 0.875em;
    }
  }
  // global css

  // #Device = Mobiles
  @media (min-width: 320px) and (max-width: 480px) {

  }
  // #Device = Mobiles

  // #Device = Low Resolution Tablets
  @media (min-width: 481px) and (max-width: 767px) {
    .chev-icon {
      display: block;
    }

    .back {
      display: block;
    }

    .container-la {
      padding: 1rem 1.5rem;
    }

    .title-data {
      font-size: 1.125em;
    }

    .data {

      .text-size {
        font-size: 0.9375em;
      }
    }
  }
  // #Device = Low Resolution Tablets

  // #Device = Tablets, Ipads
  @media (min-width: 768px) and (max-width: 1024px) {
    .chev-icon {
      display: block;
    }

    .back {
      display: block;
    }

    .container-la {
      padding: 1.25rem 1.75rem;
    }

    .title-data {
      font-size: 1.125em;
      margin-bottom: 1.25rem;
    }

    .data {
      margin-bottom: 0.75rem;

      .text-size {
        font-size: 0.9375em;
      }
    }
  }
  // #Device = Tablets, Ipads

  // #Device = Laptops, Desktops
  @media (min-width: 1025px) {
    .chev-icon {
      display: block;
    }

    .back {
      display: block;
    }

    .container-la {
      padding: 1.5rem 2rem;
    }

    .title-data {
      font-size: 1.1875em;
      margin-bottom: 1.25rem;
    }

    .data {
      margin-bottom: 0.75rem;

      .text-size {
        font-size: 0.9375em;
      }
    }

    .table-la {

      .title {
        font-size: 0.9375em;
      }

      .value {
        font-size: 0.9375em;
      }
    }
  }
  // #Device = Laptops, Desktops

</style>

<script>

import { mapActions, mapGetters } from 'vuex';
import Loader from '../Loader.vue';
import TemplateContent from './TemplateContent.vue';

export default {

  props: {
    title: {
      default() {
        return {
          path: {
            name: 'AdminOrder',
          },
          name: 'Pesanan',
        };
      },
      type: Object,
    },
  },

  components: {
    Loader,
    TemplateContent,
  },

  data() {
    return {
      loader: false,
      orderNum: null,

      customer: null,
      order: null,
      products: null,
    };
  },

  computed: {
    ...mapGetters('adOrder', [
      'orderDetail',
    ]),
  },

  methods: {
    ...mapActions('adOrder', [
      'getDetail',
    ]),

    async getOrderDetail() {
      this.loader = true;

      const { code } = await this.$func.promiseAPI(this.getDetail, {
        orderNumber: this.orderNum,
      });

      this.loader = false;

      if (code >= 200 && code < 300) {
        this.customer = this.orderDetail.customer;
        this.order = this.orderDetail.order;
        this.products = this.orderDetail.products;
      } else {
        this.$func.popupConnectionError(true);
      }
    },
  },

  created() {
    this.orderNum = this.$route.params.orderNumber;
    this.getOrderDetail();
  },

};

</script>
