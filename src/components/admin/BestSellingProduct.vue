<template>
  <div>
    <TemplateContent>
      <template v-slot:title>
        <span>Produk Terlaris</span>
      </template>

      <template v-slot:content>
        <div class="container-la graph-container">
          <div class="title">Produk Terlaris (TOP 10)</div>

          <div class="graph" v-if="chartOptions.series.data !== null">
            <apexchart class="chart" height="420"
            :options="chartOptions.options" :series="chartOptions.series"/>
          </div>
        </div>

        <div class="container-la table-container">
          <div class="head">
            <div class="position-relative">
              <select @change="getDataTable" v-model="selectedCategory"
              class="select-la bg-white" v-if="categories !== null">
                <option v-for="val in categories"
                :key="val.id" :value="val.id">
                  {{ val.name }}
                </option>
              </select>

              <font-awesome-icon icon="chevron-down" class="chev-icon"/>
            </div>
          </div>

          <b-table-simple responsive class="table-la">
            <b-thead>
              <b-tr>
                <b-th class="title">Produk</b-th>
                <b-th class="title">Kategori</b-th>
                <b-th class="title">Sub Kategori</b-th>
                <b-th class="title text-center">Total Penjualan</b-th>
                <b-th></b-th>
              </b-tr>
            </b-thead>

            <b-tbody v-if="dataTable !== null">
              <b-tr v-for="val in dataTable" :key="val.id">
                <b-td class="value">
                  <router-link :to="`/product/${val.id}`" target="_blank">
                    {{ val.name }}
                  </router-link>
                </b-td>
                <b-td class="value">{{ val.category }}</b-td>
                <b-td class="value">{{ val.subCategory }}</b-td>
                <b-td class="value text-center">{{ val.sold }}</b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>

          <div v-if="dataTable === null" class="is-empty text-center">
            Data tidak ditemukan.
          </div>
        </div>
      </template>
    </TemplateContent>

    <Loader :class="`${loader ? '' : 'd-none'}`"/>
  </div>
</template>

<style lang="scss" scoped>

  // global css
  .container-la {
    margin-bottom: 1rem;
    border-radius: 0.5rem;
    background-color: #FFF;
    padding: 0.875rem 1.125rem;
  }

  .graph-container {

    .title {
      color: #996BBC;
      font-weight: 600;
      text-align: center;
      font-size: 0.875em;
    }

    .graph {
      overflow: hidden;
      margin-top: 1rem;

      .chart {
        width: 99.9%;
        transition: all .5s;
      }
    }
  }

  .table-container {

    .head {
      display: flex;
      flex-wrap: wrap;

      .select-la {
        width: 100%;
        outline: none;
        color: #3F3F3F;
        -moz-appearance: none;
        -webkit-appearance: none;
        border-radius: 0.3125rem;
        border: 0.0625rem solid #AAA;
        padding: 0.4375rem 3.25rem 0.4375rem 1rem;
        font-size: 0.875em;

        &:focus {
          border: 0.0625rem solid #BF67E9;
          box-shadow: 0 0 0.0625rem 0.125rem rgba($color: #BF67E9, $alpha: 0.3)
        }
      }

      .chev-icon {
        color: #BFBFBF;
        position: absolute;
        top: 0.875rem;
        right: 0.875rem;
        font-size: 0.6875em;
      }
    }

    .table-la {
      margin-top: 1.25rem;

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
  }
  // global css

  // #Device = Mobiles
  @media (min-width: 320px) and (max-width: 480px) {
    .table-container {

      .head {

        .select-la {
          width: unset;
          font-size: 0.875em;
        }

        .chev-icon {
          right: 1rem;
          font-size: 0.75em;
        }
      }
    }
  }
  // #Device = Mobiles

  // #Device = Low Resolution Tablets
  @media (min-width: 481px) and (max-width: 767px) {
    .container-la {
      padding: 1rem 1.5rem;
    }

    .graph-container {

      .title {
        font-size: 0.9375em;
      }
    }

    .table-container {

      .head {

        .select-la {
          width: unset;
          font-size: 0.875em;
        }

        .chev-icon {
          right: 1rem;
          font-size: 0.75em;
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

      .is-empty {
        font-size: 0.9375em;
      }
    }
  }
  // #Device = Low Resolution Tablets

  // #Device = Tablets, Ipads
  @media (min-width: 768px) and (max-width: 1024px) {
    .container-la {
      padding: 1.25rem 1.75rem;
    }

    .graph-container {

      .title {
        font-size: 1em;
      }
    }

    .table-container {

      .head {

        .select-la {
          width: unset;
          font-size: 0.9375em;
        }

        .chev-icon {
          right: 1rem;
          font-size: 0.75em;
        }
      }

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
    }
  }
  // #Device = Tablets, Ipads

  // #Device = Laptops, Desktops
  @media (min-width: 1025px) {
    .container-la {
      padding: 1.25rem 1.75rem;
    }

    .graph-container {

      .title {
        font-size: 1.0625em;
      }
    }

    .table-container {

      .head {

        .select-la {
          width: unset;
          font-size: 0.9375em;
        }

        .chev-icon {
          right: 1rem;
          font-size: 0.75em;
        }
      }

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
      selectedCategory: null,

      dataGraph: null,
      dataTable: null,
      categories: null,

      chartOptions: {
        options: {
          theme: { palette: 'palette8' },
          chart: { type: 'bar' },
          dataLabels: { enabled: false },
          xaxis: { labels: { show: false } },
          plotOptions: { bar: { distributed: true } },
          noData: { text: 'Data tidak ditemukan' },
        },
        series: [],
      },
    };
  },

  computed: {
    ...mapGetters('categories', [
      'generalCategoryList',
    ]),
  },

  methods: {
    ...mapActions('categories', [
      'getGeneralCategory',
    ]),

    ...mapActions('adProduct', [
      'getAllBestSelling',
      'getBestSellingByCategory',
    ]),

    async getCategories() {
      this.loader = true;

      const { code } = await this.$func.promiseAPI(this.getGeneralCategory);

      this.loader = false;

      if (code >= 200 && code < 300) {
        this.categories = this.generalCategoryList.categories;
        this.selectedCategory = this.categories[0].id;
      } else {
        this.$func.popupConnectionError(false);
      }
    },

    async getDataGraph() {
      this.loader = true;

      const { code, data } = await this.$func.promiseAPI(this.getAllBestSelling);

      this.loader = false;

      if (code >= 200 && code < 300) {
        this.dataGraph = data.product;
        this.dataGraphFormat();
      } else {
        this.$func.popupConnectionError(false);
      }
    },

    async getDataTable() {
      this.loader = true;

      const { code, data } = await this.$func.promiseAPI(this.getBestSellingByCategory, {
        categoryId: this.selectedCategory,
      });

      this.loader = false;

      if (code >= 200 && code < 300) {
        this.dataTable = data.product;
      } else {
        this.$func.popupConnectionError(false);
      }
    },

    dataGraphFormat() {
      this.chartOptions.series = [
        {
          name: 'Terjual',
          data: this.dataGraph.map((val) => ({ x: val.name, y: val.sold })),
        },
      ];
    },
  },

  created() {
    this.getDataGraph();

    this.getCategories().then(() => {
      this.getDataTable();
    });
  },

};

</script>
