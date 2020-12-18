<template>
  <div>
    <TemplateContent>
      <template v-slot:title>
        <span>Pendapatan</span>
      </template>

      <template v-slot:content>
        <div class="report-container">
          <div class="title">Bulanan</div>

          <div class="d-inline-flex flex-wrap mt-4">
            <div class="position-relative">
              <select class="select-la bg-white" v-model="monthly.selectedMonth">
                <option value="" disabled>-- PILIH BULAN --</option>
                <option v-for="(val, i) in months" :key="i"
                :value="(i + 1)">{{ val }}</option>
              </select>

              <font-awesome-icon icon="chevron-down" class="chev-icon"/>
            </div>

            <div class="position-relative">
              <select class="select-la bg-white" v-model="monthly.selectedYear">
                <option value="" disabled>-- PILIH TAHUN --</option>
                <option v-for="val in years" :key="val"
                :value="val">{{ val }}</option>
              </select>

              <font-awesome-icon icon="chevron-down" class="chev-icon"/>
            </div>

            <div>
              <button class="btn-go" @click="validationMonthly">Go</button>
            </div>
          </div>

          <div class="report-body">
            <apexchart width="98.9%" height="420"
            :options="chartOptions.options" :series="chartOptions.seriesMonthly"/>
          </div>
        </div>

        <div class="report-container">
          <div class="title">Tahunan</div>

          <div class="d-inline-flex flex-wrap mt-4">
            <div class="position-relative">
              <select class="select-la bg-white" v-model="annual.selectedYear">
                <option value="" disabled>-- PILIH TAHUN --</option>
                <option v-for="val in years" :key="val"
                :value="val">{{ val }}</option>
              </select>

              <font-awesome-icon icon="chevron-down" class="chev-icon"/>
            </div>

            <div>
              <button class="btn-go" @click="validationAnnual">Go</button>
            </div>
          </div>

          <div class="report-body">
            <apexchart width="98.9%" height="420"
            :options="chartOptions.options" :series="chartOptions.seriesAnnual"/>
          </div>
        </div>
      </template>
    </TemplateContent>

    <Loader :class="`${loader ? '' : 'd-none'}`"/>
  </div>
</template>

<style lang="scss" scoped>

  // global css
  .zero-opacity {
    opacity: 0;
  }

  .report-container {
    border-radius: 0.5rem;
    background-color: #FFF;
    padding: 0.8125rem 1.25rem;
    margin-bottom: 1rem;

    .title {
      color: #996BBC;
      font-weight: 600;
      font-size: 0.9375em;
    }

    .label-la {
      color: #2F2F2F;
      margin-bottom: 0.25rem;
      font-size: 0.9375em;
    }

    .select-la {
      outline: none;
      color: #3F3F3F;
      margin-right: 1rem;
      margin-bottom: 1rem;
      -moz-appearance: none;
      -webkit-appearance: none;
      border-radius: 0.3125rem;
      border: 0.0625rem solid #AAA;
      padding: 0.4375rem 2.5rem 0.4375rem 1rem;
      min-width: 12rem;
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
      right: 1.875rem;
      font-size: 0.6875em;
    }

    .btn-go {
      color: #FFF;
      font-weight: 600;
      border-radius: 0.5rem;
      text-transform: uppercase;
      background-color: #BF67E9;
      transition: background-color .2s ease-out;
      width: 6rem;
      padding: 0.5rem 1.5rem;
      font-size: 0.875em;

      &:hover {
        background-color: #B556E2;
      }
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
      padding: 0.8125rem 1.25rem;

      .title {
        font-size: 1em;
      }

      .select-la {
        min-width: 8.5rem;
        font-size: 0.875em;
      }

      .chev-icon {
        top: 0.875rem;
        right: 1.75rem;
        font-size: 0.75em;
      }

      .btn-go {
        width: unset;
        font-size: 0.9375em;
      }
    }
  }
  // #Device = Low Resolution Tablets

  // #Device = Tablets, Ipads
  @media (min-width: 768px) and (max-width: 1024px) {
    .report-container {
      padding: 1rem 1.5rem;

      .title {
        font-size: 1.0625em;
      }

      .select-la {
        min-width: 13rem;
        font-size: 0.9375em;
      }

      .btn-go {
        width: unset;
        font-size: 0.9375em;
      }
    }
  }
  // #Device = Tablets, Ipads

  // #Device = Laptops, Desktops
  @media (min-width: 1025px) {
    .report-container {
      padding: 1.25rem 1.75rem;
      margin-bottom: 1.25rem;

      .title {
        font-size: 1.125em;
      }

      .select-la {
        min-width: 13rem;
        font-size: 0.9375em;
      }

      .btn-go {
        width: unset;
        font-size: 0.9375em;
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
      startYear: 2020,

      monthly: {
        selectedMonth: '',
        selectedYear: '',
      },

      annual: {
        selectedYear: '',
      },

      chartOptions: {
        options: {
          chart: {
            type: 'area',
            toolbar: { show: false },
            zoom: false,
          },

          markers: { size: 3 },
          dataLabels: { enabled: false },
          stroke: { curve: 'smooth', width: 2 },
          noData: { text: 'Data tidak ditemukan' },

          yaxis: {
            labels: {
              formatter: (val) => `Rp. ${this.formatPrice(val)}`,
            },
          },
        },

        seriesMonthly: [],
        seriesAnnual: [],
      },
    };
  },

  computed: {
    months() {
      return ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    },

    years() {
      const curYear = new Date().getFullYear();

      return Array.from({ length: (curYear - this.startYear) + 1 },
        (val, i) => this.startYear + i);
    },
  },

  methods: {
    ...mapActions('adReport', [
      'getMonthlyReport',
      'getAnnualReport',
    ]),

    async getMonthly() {
      this.loader = true;

      const { code, data } = await this.$func.promiseAPI(this.getMonthlyReport, {
        year: this.monthly.selectedYear,
        month: this.monthly.selectedMonth,
      });

      this.loader = false;

      if (code >= 200 && code < 300) {
        this.dataGraphFormat('seriesMonthly', data.report, 'date', 'income');
      } else {
        this.$func.popupConnectionError(false);
      }
    },

    async getAnnual() {
      this.loader = true;

      const { code, data } = await this.$func.promiseAPI(this.getAnnualReport, {
        year: this.annual.selectedYear,
      });

      this.loader = false;

      if (code >= 200 && code < 300) {
        this.dataGraphFormat('seriesAnnual', data.report, 'month', 'income');
      } else {
        this.$func.popupConnectionError(false);
      }
    },

    validationMonthly() {
      if (this.monthly.selectedYear.length !== 0
      && this.monthly.selectedMonth.length !== 0) {
        this.getMonthly();
      }
    },

    validationAnnual() {
      if (this.annual.selectedYear.length !== 0) {
        this.getAnnual();
      }
    },

    formatPrice(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    },

    dataGraphFormat(typeChart, series, x, y) {
      this.chartOptions[typeChart] = [
        {
          name: 'Pendapatan',
          data: series.map((val) => ({ x: val[x], y: val[y] })),
        },
      ];
    },
  },

  created() {

  },

};

</script>
