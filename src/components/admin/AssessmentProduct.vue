<template>
  <div>
    <Template v-if="categories !== null"
    headerTitle="Penilaian Produk"
    title="Produk Terbaik (TOP 10)"
    :chartOptions="chartOptions"
    :categories="categories"
    @changetrig="getDataTable">
      <template v-slot:thead>
        <b-tr>
          <b-th class="title">Produk</b-th>
          <b-th class="title">Kategori</b-th>
          <b-th class="title">Sub kategori</b-th>
          <b-th class="title text-center">Jumlah penilai</b-th>
          <b-th class="title text-center">Jumlah komentar</b-th>
          <b-th class="title text-center">Rating</b-th>
          <b-th class="title"></b-th>
        </b-tr>
      </template>

      <template v-slot:tbody v-if="dataTable !== null">
        <b-tr v-for="val in dataTable" :key="val.id">
          <b-td class="value">
            <router-link :to="`/product/${val.id}`" target="_blank">
              {{ val.name }}
            </router-link>
          </b-td>
          <b-td class="value">{{ val.category }}</b-td>
          <b-td class="value">{{ val.subCategory }}</b-td>
          <b-td class="value text-center">{{ val.evaluators }}</b-td>
          <b-td class="value text-center">{{ val.comments }}</b-td>
          <b-td class="value text-center">{{ val.rating }}</b-td>
          <b-td><div class="btn-more" @click="redirectDetail(val.id)">Lihat</div></b-td>
        </b-tr>
      </template>

      <template v-slot:is-empty>
        <div v-if="dataTable === null" class="is-empty text-center">
          Data tidak ditemukan.
        </div>
      </template>
    </Template>

    <Loader :class="`${loader ? '' : 'd-none'}`"/>
  </div>
</template>

<style lang="scss" scoped>

  // global css
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

  .btn-more {
    cursor: pointer;
    font-weight: 600;
    color: #373737;
    text-align: center;
    border-radius: 100rem;
    background-color: #C6BAE7;
    transition: background-color .2s ease-out;
    padding: 0.3125rem 0.5rem;
    font-size: 0.75em;

    &:hover {
      color: #272727;
      background-color: #C1B5E1;
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
  // global css

  // #Device = Mobiles
  @media (min-width: 320px) and (max-width: 480px) {

  }
  // #Device = Mobiles

  // #Device = Low Resolution Tablets
  @media (min-width: 481px) and (max-width: 767px) {
    .title {
      font-size: 0.9375em;
    }

    .value {
      font-size: 0.875em;
    }

    .is-empty {
      font-size: 0.9375em;
    }
  }
  // #Device = Low Resolution Tablets

  // #Device = Tablets, Ipads
  @media (min-width: 768px) and (max-width: 1024px) {
    .title {
      font-size: 1em;
    }

    .value {
      font-size: 0.9375em;
    }

    .is-empty {
      font-size: 1em;
    }
  }
  // #Device = Tablets, Ipads

  // #Device = Laptops, Desktops
  @media (min-width: 1025px) {
    .title {
      white-space: unset;
      font-size: 1em;
    }

    .value {
      white-space: unset;
      font-size: 0.9375em;
    }

    .is-empty {
      font-size: 1em;
    }
  }
  // #Device = Laptops, Desktops

</style>

<script>

import { mapGetters, mapActions } from 'vuex';
import Loader from '../Loader.vue';
import Template from './TemplateProductReport.vue';

export default {

  components: {
    Loader,
    Template,
  },

  data() {
    return {
      loader: false,

      dataGraph: null,
      dataTable: null,
      categories: null,

      selectedCategory: null,

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
      'getAllBestRating',
      'getBestRatingByCategory',
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

      const { code, data } = await this.$func.promiseAPI(this.getAllBestRating);

      this.loader = false;

      if (code >= 200 && code < 300) {
        this.dataGraph = data.product;
        this.dataGraphFormat();
      } else {
        this.$func.popupConnectionError(false);
      }
    },

    async getDataTable(categoryId) {
      this.loader = true;

      const { code, data } = await this.$func.promiseAPI(this.getBestRatingByCategory, {
        categoryId,
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
          name: 'Rating',
          data: this.dataGraph.map((val) => ({ x: val.name, y: val.rating })),
        },
      ];
    },

    redirectDetail(id) {
      this.$router.push({
        name: 'AdminProductAssessmentDetail',
        params: {
          id,
        },
      });
    },
  },

  created() {
    this.getDataGraph();

    this.getCategories().then(() => {
      this.getDataTable(this.selectedCategory);
    });
  },

};

</script>
