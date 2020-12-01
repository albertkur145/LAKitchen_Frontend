<template>
  <div>
    <TemplateContent>
      <template v-slot:title>
        <span>
          <router-link to="/admin" class="back">Beranda</router-link>
        </span>

        <span>
          <font-awesome-icon icon="chevron-right" class="chev-icon"/>
        </span>

        <span>Penjualan Hari Ini</span>
      </template>

      <template v-slot:content>
        <div class="container-la">
          <b-table-simple responsive class="table-la">
            <b-thead>
              <b-tr>
                <b-th class="title">Produk</b-th>
                <b-th class="title">Harga</b-th>
                <b-th class="title text-center">Jumlah terjual</b-th>
                <b-th class="title">Pendapatan</b-th>
              </b-tr>
            </b-thead>

            <b-tbody v-if="dataTable !== null">
              <b-tr v-for="val in dataTable" :key="val.id">
                <b-td class="value">{{ val.name }}</b-td>
                <b-td class="value">{{ val.price | currency }}</b-td>
                <b-td class="value text-center">{{ val.sold }}</b-td>
                <b-td class="value">{{ (val.price * val.sold) | currency }}</b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>

          <div v-if="dataTable === null" class="is-empty text-center">
            Belum ada yang terjual hari ini. Semangat !!
          </div>

          <div class="paging" v-if="paging !== null">
            <span v-for="i in paging" :key="i" @click="getSales(i)"
            :class="`page${i === activePage ? ' active-page' : ''}`">
              {{ i }}
            </span>
          </div>
        </div>

        <div class="container-la report-container">
          <div class="title">Pendapatan</div>
          <div class="value">{{ totalSales | currency }}</div>

          <pie-chart :data="dataChart" prefix="Rp. " thousands="."
          :messages="{ empty: 'Belum ada pendapatan' }"
          :pieSliceText="`value`"/>
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
    padding: 0.875rem 1.125rem;

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

    .is-empty {
      font-weight: 600;
      color: #BF67E9;
      border-radius: 0.5rem;
      border: 0.0625rem dashed #BF67E9;
      padding: 0.75rem;
      font-size: 0.875em;
    }

    .paging {
      text-align: right;

      .page {
        color: #666;
        cursor: pointer;
        margin-left: 0.25rem;
        font-size: 0.875em;
      }

      .active-page {
        font-weight: 600;
        color: #0075FF;
      }
    }
  }

  .report-container {
    margin: 1rem 0;

    .title {
      color: #996BBC;
      font-weight: 600;
      font-size: 0.875em;
    }

    .value {
      color: #FF5C00;
      font-weight: 600;
      margin-bottom: 1rem;
      font-size: 1.25em;
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

      .table-la {

        .title {
          font-size: 0.9375em;
        }

        .value {
          font-size: 0.875em;
        }
      }

      .is-empty {
        font-size: 0.9375em;
      }
    }

    .report-container {

      .title {
        font-size: 0.9375em;
      }

      .value {
        font-size: 1.375em;
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
      padding: 1.5rem 2rem;

      .table-la {

        .title {
          font-size: 1em;
        }

        .value {
          font-size: 0.9375em;
        }
      }

      .is-empty {
        font-size: 1em;
      }

      .paging {

        .page {
          font-size: 0.9375em;
        }
      }
    }

    .report-container {

      .title {
        font-size: 1em;
      }

      .value {
        font-size: 1.5em;
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

      .table-la {

        .title {
          font-size: 1em;
        }

        .value {
          font-size: 0.9375em;
        }
      }

      .is-empty {
        font-size: 1em;
      }

      .paging {

        .page {
          font-size: 0.9375em;
        }
      }
    }

    .report-container {

      .title {
        font-size: 1em;
      }

      .value {
        font-size: 1.625em;
      }
    }
  }
  // #Device = Laptops, Desktops

</style>

<script>

import { mapActions } from 'vuex';
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

      paging: null,
      activePage: null,

      dataTable: null,
    };
  },

  computed: {
    totalSales() {
      if (this.dataTable !== null) {
        return this.dataTable.reduce((val, item) => val + (item.price * item.sold), 0);
      }

      return 0;
    },

    dataChart() {
      if (this.dataTable !== null) {
        return this.dataTable.reduce((arr, item) => {
          arr.push([item.name, (item.price * item.sold)]);
          return arr;
        }, []);
      }

      return null;
    },
  },

  methods: {
    ...mapActions('adReport', [
      'getSalesToday',
    ]),

    async getSales(page) {
      this.loader = true;

      const { code, data, paging } = await this.$func.promiseAPI(this.getSalesToday, {
        page,
      });

      this.loader = false;

      if (code >= 200 && code < 300) {
        this.dataTable = data.products;
        this.paging = Math.ceil(paging.count / paging.view);
        this.activePage = page;
      } else {
        this.$func.popupConnectionError(false);
      }
    },
  },

  created() {
    this.getSales(1);
  },

};

</script>
