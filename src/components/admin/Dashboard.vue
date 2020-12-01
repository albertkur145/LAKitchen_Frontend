<template>
  <div>
    <TemplateContent>
      <template v-slot:title>
        <span>Beranda</span>
      </template>

      <template v-slot:content>
        <div class="report-container">
          <div class="title">Pesanan</div>

          <div class="report-body" v-if="orders !== undefined">
            <div class="item" v-for="(val, i) in orderItems" :key="i">
              <div class="item-title">{{ val.title }}</div>
              <div class="item-value">{{ val.value }}</div>
              <button class="btn-more">Lihat</button>
            </div>
          </div>
        </div>

        <b-row>
          <b-col cols="12" md="6">
            <div class="report-container">
              <div class="title">Penjualan hari ini</div>

              <div class="report-body" v-if="sales !== undefined">
                <div class="item" v-for="(val, i) in salesItems" :key="i">
                  <div class="item-title">{{ val.title }}</div>

                  <div v-if="val.title === 'Pendapatan'"
                  class="item-value income">
                    {{ val.value | currency }}
                  </div>

                  <div class="item-value" v-else>{{ val.value }}</div>

                  <button class="btn-more" @click="redirect(val.route)">Lihat</button>
                </div>
              </div>
            </div>
          </b-col>

          <b-col cols="12" md="6">
            <div class="report-container">
              <div class="title">Lainnya</div>

              <div class="report-body" v-if="others !== undefined">
                <div class="item" v-for="(val, i) in otherItems" :key="i">
                  <div class="item-title">{{ val.title }}</div>
                  <div class="item-value">{{ val.value }}</div>
                  <button class="btn-more">Lihat</button>
                </div>
              </div>
            </div>
          </b-col>
        </b-row>

        <div class="report-container weekly-income">
          <div class="title">Pendapatan (1 minggu terakhir)</div>

          <div class="report-body" v-if="sales !== undefined">
            <div class="item">
              <div class="item-value income">{{ sales.weekIncome | currency }}</div>
            </div>
          </div>

          <div class="graph" v-if="weeklyReport !== undefined">
            <line-chart prefix="Rp. " thousands="." :data="weeklyReport"
            :messages="{ empty: 'Belum ada pendapatan' }"/>
          </div>
        </div>
      </template>
    </TemplateContent>

    <Loader :class="`${loader ? '' : 'd-none'}`"/>
  </div>
</template>

<style lang="scss" scoped>

  // global css
  .report-container {
    border-radius: 0.5rem;
    background-color: #FFF;
    margin-bottom: 1rem;

    .title {
      color: #996BBC;
      font-weight: 600;
      border-bottom: 0.125rem solid #EEEEEE;
      padding: 0.8125rem 1.25rem;
      font-size: 0.875em;
    }

    .report-body {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      padding: 0.875rem 1.25rem;

      .item {
        margin: 0.5rem 0;

        .item-title {
          color: #444;
          margin-bottom: 0.25rem;
          font-size: 0.75em;
        }

        .item-value {
          color: #333;
          font-weight: 600;
          margin-bottom: 0.25rem;
          font-size: 1.1875em;
        }

        .income {
          color: #FF5C00;
        }

        .btn-more {
          color: #858585;
          font-weight: 600;
          border-radius: 0.375rem;
          background-color: #EEE;
          transition: background-color .2s ease-out;
          margin-bottom: 0.25rem;
          padding: 0.375rem;
          width: 8rem;
          font-size: 0.75em;

          &:hover {
            color: #757575;
            background-color: #EAEAEA;
          }
        }
      }
    }
  }

  .weekly-income {

    .title {
      border-bottom: 0 !important;
      padding-bottom: 0 !important;
    }

    .report-body {
      padding-top: 0 !important;
      padding-bottom: 0 !important;
    }

    .graph {
      padding: 1rem 1.25rem 1.25rem;
    }
  }
  // global css

  // #Device = Mobiles
  @media (min-width: 320px) and (max-width: 480px) {

  }
  // #Device = Mobiles

  // #Device = Low Resolution Tablets
  @media (min-width: 481px) and (max-width: 767px) {
    .report-container {

      .title {
        padding: 0.8125rem 1.25rem;
        font-size: 0.9375em;
      }

      .report-body {
        padding: 0.875rem 1.25rem;

        .item {
          margin: 0.5rem 0;

          .item-title {
            font-size: 0.8125em;
          }

          .item-value {
            font-size: 1.375em;
          }

          .btn-more {
            width: 8rem;
            font-size: 0.75em;
          }
        }
      }
    }

    .weekly-income {

      .graph {
        padding: 1rem 1.25rem 1.25rem;
      }
    }
  }
  // #Device = Low Resolution Tablets

  // #Device = Tablets, Ipads
  @media (min-width: 768px) and (max-width: 1024px) {
    .report-container {

      .title {
        padding: 1rem 1.5rem;
        font-size: 1em;
      }

      .report-body {
        padding: 1rem 1.5rem;

        .item {
          margin: 0.25rem 0 0.5rem 0;

          .item-title {
            font-size: 0.875em;
          }

          .item-value {
            font-size: 1.5em;
          }

          .btn-more {
            width: 9rem;
            font-size: 0.8125em;
          }
        }
      }
    }

    .weekly-income {

      .graph {
        padding: 1rem 1.5rem 1.5rem;
      }
    }
  }
  // #Device = Tablets, Ipads

  // #Device = Laptops, Desktops
  @media (min-width: 1025px) {
    .report-container {
      margin-bottom: 1.25rem;

      .title {
        padding: 1.25rem 1.75rem;
        font-size: 1.0625em;
      }

      .report-body {
        padding: 1.25rem 1.75rem;

        .item {
          margin: 0.5rem 1rem 0.75rem 0;

          &:last-child {
            margin-right: 0;
          }

          .item-title {
            font-size: 0.9375em;
          }

          .item-value {
            font-size: 1.75em;
          }

          .btn-more {
            width: 12rem;
            font-size: 0.875em;
          }
        }
      }
    }

    .weekly-income {

      .graph {
        padding: 1.25rem 1.75rem;
      }
    }
  }
  // #Device = Laptops, Desktops

</style>

<script>

import { mapGetters, mapActions } from 'vuex';
import Loader from '../Loader.vue';
import TemplateContent from './TemplateContent.vue';

export default {

  components: {
    Loader,
    TemplateContent,
  },

  data() {
    return {
      loader: false,
      orders: undefined,
      sales: undefined,
      others: undefined,
      weeklyReport: undefined,
    };
  },

  computed: {
    ...mapGetters('adDashboard', [
      'dashboardData',
    ]),

    orderItems() {
      return [
        {
          title: 'Pesanan hari ini',
          value: this.orders.today,
          route: '',
        },
        {
          title: 'Sedang dipersiapkan',
          value: this.orders.prepared,
          route: '',
        },
        {
          title: 'Siap dikirim',
          value: this.orders.readyToShip,
          route: '',
        },
        {
          title: 'Dalam pengiriman',
          value: this.orders.inDelivery,
          route: '',
        },
      ];
    },

    salesItems() {
      return [
        {
          title: 'Pendapatan',
          value: this.sales.todayIncome,
          route: {
            name: 'AdminSalesToday',
          },
        },
        {
          title: 'Jumlah produk terjual',
          value: this.sales.soldToday,
          route: {
            name: 'AdminSalesToday',
          },
        },
      ];
    },

    otherItems() {
      return [
        {
          title: 'Pengguna baru',
          value: this.others.newUsers,
          route: '',
        },
        {
          title: 'Total pengguna',
          value: this.others.users,
          route: '',
        },
      ];
    },
  },

  methods: {
    ...mapActions('adDashboard', [
      'getAll',
    ]),

    async getAllData() {
      this.loader = true;

      const { code } = await this.$func.promiseAPI(this.getAll);

      this.loader = false;

      if (code >= 200 && code < 300) {
        const { orders, sales, others } = this.dashboardData;
        this.orders = orders;
        this.sales = sales;
        this.others = others;
        this.weeklyReport = this.dashboardData.weeklyReport;
      } else {
        this.$func.popupConnectionError(false);
      }
    },

    redirect(route) {
      this.$router.push(route);
    },
  },

  created() {
    this.getAllData();
  },

};

</script>
