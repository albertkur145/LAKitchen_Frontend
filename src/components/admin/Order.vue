<template>
  <div>
    <TemplateContent>
      <template v-slot:title>
        <span>Pesanan Aktif</span>
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

          <template v-slot:tbody v-if="dataTable.length > 0">
            <b-tr v-for="(val, i) in dataTable" :key="i">
              <b-td class="value">{{ val.orderNumber }}</b-td>
              <b-td class="value">{{ val.date }}</b-td>
              <b-td class="value">{{ val.totalPayment + 15000 | currency }}</b-td>

              <b-td class="value">
                {{ val.status.name }}
              </b-td>

              <b-td class="value">
                <b-dropdown size="xs" variant="link"
                toggle-class="p-0 text-decoration-none" no-caret>
                  <template #button-content>
                    <div class="point">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </template>

                  <b-dropdown-item @click="setParamUpdate(val.status.id, val.orderNumber)"
                  v-b-modal.modal-update-status>
                    Perbarui Status
                  </b-dropdown-item>

                  <b-dropdown-item @click="redirectDetail(val.orderNumber)">
                    Lihat
                  </b-dropdown-item>
                </b-dropdown>
              </b-td>
            </b-tr>
          </template>
        </OrderTable>
      </template>
    </TemplateContent>

    <b-modal id="modal-update-status" ref="modal"
    title="Perbarui status pesanan" @ok="handleSubmit">
      <b-form-select v-model="selectedUpdateStatus">
        <option v-for="val in statusFilter"
        :key="val.id" :value="val.id">
          {{ val.name }}
        </option>

        <template v-if="lastStatus">
          <option :value="finishedStatus.id"
          v-if="selectedUpdateStatusOri === lastStatus.id">
            {{ finishedStatus.name }}
          </option>
        </template>
      </b-form-select>
    </b-modal>

    <Loader :class="`${loader ? '' : 'd-none'}`"/>
  </div>
</template>

<style lang="scss" scoped>

  // global css
  .point {
    display: flex;
    flex-direction: column;

    span {
      width: 0.1875rem;
      height: 0.1875rem;
      border-radius: 100rem;
      background-color: #444;
      margin-bottom: 0.125rem;
    }
  }

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
      white-space: unset;
      font-size: 1em;
    }

    .value {
      white-space: unset;
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

      dataTable: [],
      status: [],

      searchText: '',
      selectedStatus: '',

      paramOrderNumber: '',
      selectedUpdateStatus: null,
      selectedUpdateStatusOri: null,

      timeout: null,
    };
  },

  computed: {
    ...mapGetters('adOrder', [
      'orderStatusActive',
    ]),

    statusFilter() {
      if (this.selectedUpdateStatus) {
        return this.status.filter((val) => val.id >= this.selectedUpdateStatusOri
        && val.id <= this.selectedUpdateStatusOri + 1);
      }

      return null;
    },

    lastStatus() {
      if (this.status !== null) {
        return this.status.find((val) => val.name === 'Dalam Pengiriman');
      }

      return null;
    },

    finishedStatus() {
      return {
        id: 5,
        name: 'Selesai',
      };
    },
  },

  methods: {
    ...mapActions('adOrder', [
      'getStatusActive',
      'getAllOrder',
      'getAllOrderByStatus',
      'getAllByNumber',
      'updateStatus',
    ]),

    async getAllStatus() {
      this.loader = true;

      const { code } = await this.$func.promiseAPI(this.getStatusActive);

      this.loader = false;

      if (code >= 200 && code < 300) {
        this.status = this.orderStatusActive.status;
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
        action = this.getAllOrder;
      }

      const { code, data, paging } = await this.$func.promiseAPI(action, params);

      this.loader = false;
      this.setData(code, data, paging, page);
    },

    async getOrdersByNumber(page) {
      this.loader = true;

      const { code, data, paging } = await this.$func.promiseAPI(this.getAllByNumber, {
        page,
        orderNumber: this.searchText,
      });

      this.loader = false;
      this.setData(code, data, paging, page);
    },

    async updateStatusOrder() {
      this.loader = true;

      const { code } = await this.$func.promiseAPI(this.updateStatus, {
        orderNumber: this.paramOrderNumber,
        orderStatusId: this.selectedUpdateStatus,
      });

      this.loader = false;

      if (code >= 200 && code < 300) {
        this.manageRequest(this.activePage);
        this.$func.popupSuccessNoRoute('Berhasil perbarui status');
      } else {
        this.$func.popupConnectionError(false);
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
        this.manageRequest(page);
      }, 1000);
    },

    manageRequest(page) {
      if (this.searchText.length === 0) {
        this.getOrders(page);
      } else {
        this.getOrdersByNumber(page);
      }
    },

    handleSubmit() {
      if (this.selectedUpdateStatus !== this.selectedUpdateStatusOri) {
        this.updateStatusOrder();
      }
    },

    setParamUpdate(id, orderNumber) {
      this.selectedUpdateStatus = id;
      this.selectedUpdateStatusOri = id;
      this.paramOrderNumber = orderNumber;
    },

    statusSelectChanged(statusId) {
      this.selectedStatus = statusId;
      this.getOrders(1);
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
              name: 'AdminOrder',
            },
            name: 'Pesanan Aktif',
          },
        },
      });
    },
  },

  created() {
    this.getAllStatus();
    this.getOrders(1);
  },

};

</script>
