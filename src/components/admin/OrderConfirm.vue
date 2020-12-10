<template>
  <div>
    <TemplateContent>
      <template v-slot:title>
        <span>Konfirmasi Pesanan</span>
      </template>

      <template v-slot:content>
        <OrderTable :isShowStatus="false"
        @search-key-up="searchKeyUp"
        @search-key-enter="getOrdersByNumber(1)"
        @paging-click="manageRequest"
        :dataTable="dataTable"
        :isPageActive="isPageActive"
        :paging="paging" :activePage="activePage">
          <template v-slot:thead>
            <b-tr>
              <b-th class="title">No pesanan</b-th>
              <b-th class="title">Tanggal</b-th>
              <b-th class="title">Total tagihan</b-th>
              <b-th class="title">Status</b-th>
              <b-th></b-th>
            </b-tr>
          </template>

          <template v-slot:tbody v-if="dataTable !== null">
            <b-tr v-for="(val, i) in dataTable" :key="i">
              <b-td class="value">{{ val.orderNumber }}</b-td>
              <b-td class="value">{{ val.date }}</b-td>
              <b-td class="value">{{ val.totalPayment | currency }}</b-td>

              <b-td class="value">
                {{ val.status.name }}
              </b-td>

              <b-td class="value">
                <font-awesome-icon @click="confirmAction(val.orderNumber)"
                icon="check-circle" class="check-icon"/>
                <font-awesome-icon @click="redirectDetail(val.orderNumber)"
                icon="eye" class="ml-1 ml-lg-2 see-icon"/>
              </b-td>
            </b-tr>
          </template>
        </OrderTable>
      </template>
    </TemplateContent>

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

  .check-icon, .see-icon {
    color: #888;
    cursor: pointer;
    font-size: 1.125em;
  }

  .check-icon {
    color: #34C66E;
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
  }
  // #Device = Tablets, Ipads

  // #Device = Laptops, Desktops
  @media (min-width: 1025px) {
    .title {
      font-size: 1em;
    }

    .value {
      font-size: 0.9375em;
    }
  }
  // #Device = Laptops, Desktops

</style>

<script>

import { mapGetters, mapActions } from 'vuex';
import Loader from '../Loader.vue';
import TemplateContent from './TemplateContent.vue';
import OrderTable from './OrderTable.vue';

export default {

  components: {
    Loader,
    TemplateContent,
    OrderTable,
  },

  data() {
    return {
      loader: false,

      paging: null,
      activePage: null,
      isPageActive: true,

      dataTable: null,
      searchText: '',

      timeout: null,
    };
  },

  computed: {
    ...mapGetters('adOrder', [
      'orderStatus',
    ]),
  },

  methods: {
    ...mapActions('adOrder', [
      'getAllOrderNotPay',
      'getAllByNumberNotPay',
      'confirmOrder',
    ]),

    async getOrders(page) {
      this.searchText = '';
      this.loader = true;

      const { code, data, paging } = await this.$func.promiseAPI(this.getAllOrderNotPay, {
        page,
      });

      this.loader = false;
      this.setData(code, data, paging, page);
    },

    async getOrdersByNumber(page) {
      this.loader = true;

      const { code, data, paging } = await this.$func.promiseAPI(this.getAllByNumberNotPay, {
        page,
        orderNumber: this.searchText,
      });

      this.loader = false;
      this.setData(code, data, paging, page);
    },

    async confirmationOrder(orderNumber) {
      this.loader = true;

      const { code } = await this.$func.promiseAPI(this.confirmOrder, {
        orderNumber,
      });

      this.loader = false;

      if (code >= 200 && code < 300) {
        this.getOrders(this.activePage);
        this.$func.popupSuccessNoRoute('Berhasil konfirmasi pesanan');
      } else {
        this.$func.popupConnectionError(false);
      }
    },

    async confirmAction(orderNumber) {
      const res = await this.$func.popupConfirmAction(
        'Yakin konfirmasi pesanan ini?',
        'Ya',
        'Tidak',
      );

      if (res) {
        this.confirmationOrder(orderNumber);
      }
    },

    setData(code, data, paging, page) {
      if (code >= 200 && code < 300) {
        this.dataTable = data.orders;
        this.paging = Math.ceil(paging.count / paging.view);
        this.activePage = page;
        this.isPageActive = true;
      } else if (code === 404) {
        this.isPageActive = false;
        this.dataTable = null;
      } else {
        this.$func.popupConnectionError(false);
      }
    },

    search(page) {
      clearTimeout(this.timeout);

      this.timeout = setTimeout(() => {
        if (this.searchText.length !== 0) {
          this.getOrdersByNumber(page);
        } else {
          this.getOrders(1);
        }
      }, 1000);
    },

    manageRequest(page) {
      if (this.searchText.length === 0) {
        this.getOrders(page);
      } else {
        this.getOrdersByNumber(page);
      }
    },

    searchKeyUp(keyword) {
      this.searchText = keyword;
      this.search(1);
    },

    redirectDetail(orderNumber) {
      this.$router.push({
        name: 'AdminOrderDetail',
        params: {
          orderNumber,
          title: {
            path: {
              name: 'AdminOrderConfirm',
            },
            name: 'Konfirmasi Pesanan',
          },
        },
      });
    },
  },

  created() {
    this.getOrders(1);
  },

};

</script>
