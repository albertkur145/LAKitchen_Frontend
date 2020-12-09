<template>
  <div>
    <TemplateContent>
      <template v-slot:title>
        <span>Riwayat Pesanan</span>
      </template>

      <template v-slot:content>
        <OrderTable :isShowStatus="true"
        @status-select="statusSelectChanged"
        @search-key-up="searchKeyUp"
        @search-key-enter="getOrdersByNumber(1)"
        @paging-click="manageRequest"
        :status="status" :dataTable="dataTable"
        :isPageActive="isPageActive" :paging="paging"
        :activePage="activePage">
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
                <span :class="`${val.status.name === 'Selesai'}
								? ' bg-danger' : ''`">
									{{ val.status.name }}
								</span>
              </b-td>

              <b-td class="value">
                <div class="btn-more">Lihat</div>
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

  .edit-icon {
    outline: none;
    cursor: pointer;
    color: #24DB83;
  }

  .btn-more {
    cursor: pointer;
    font-weight: 600;
    color: #373737;
    text-align: center;
    border-radius: 100rem;
    background-color: #C6BAE7;
    transition: background-color .2s ease-out;
    padding: 0.375rem 0.875rem;
    font-size: 0.75em;

    &:hover {
      color: #272727;
      background-color: #C1B5E1;
    }
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

    .btn-more {
      padding: 0.375rem 0.125rem;
      font-size: 0.8125em;
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

    .btn-more {
      padding: 0.375rem 0.125rem;
      font-size: 0.8125em;
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
      status: null,

      searchText: '',
      selectedStatus: '',

      timeout: null,
    };
  },

  computed: {
    ...mapGetters('adOrder', [
      'orderStatusHistory',
    ]),
  },

  methods: {
    ...mapActions('adOrder', [
      'getStatusHistory',
      'getAllOrderHistory',
      'getAllOrderByStatus',
      'getAllByNumberHistory',
      'updateStatus',
    ]),

    async getAllStatus() {
      this.loader = true;

      const { code } = await this.$func.promiseAPI(this.getStatusHistory);

      this.loader = false;

      if (code >= 200 && code < 300) {
        this.status = this.orderStatusHistory.status;
      } else {
        this.$func.popupConnectionError(false);
      }
    },

    async getOrders(page) {
      this.searchText = '';
      this.loader = true;

      let action;
      const params = { page };

      if (this.selectedStatus) {
        params.orderStatusId = this.selectedStatus;
        action = this.getAllOrderByStatus;
      } else {
        action = this.getAllOrderHistory;
      }

      const { code, data, paging } = await this.$func.promiseAPI(action, params);

      this.loader = false;
      this.setData(code, data, paging, page);
    },

    async getOrdersByNumber(page) {
      this.loader = true;

      const { code, data, paging } = await this.$func.promiseAPI(this.getAllByNumberHistory, {
        page,
        orderNumber: this.searchText,
      });

      this.loader = false;
      this.setData(code, data, paging, page);
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

    statusSelectChanged(statusId) {
      this.selectedStatus = statusId;
      this.getOrders(1);
    },

    searchKeyUp(keyword) {
      this.searchText = keyword;
      this.search(1);
    },
  },

  created() {
    this.getAllStatus();
    this.getOrders(1);
  },

};

</script>
