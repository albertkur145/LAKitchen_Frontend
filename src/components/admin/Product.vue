<template>
  <div>
    <TemplateContent>
      <template v-slot:title>
        <span>Jual Produk</span>
      </template>

      <template v-slot:content>
        halo
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
    };
  },

  computed: {
    ...mapGetters('adDashboard', [
      'dashboardData',
    ]),
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
  },

  created() {

  },

};

</script>
