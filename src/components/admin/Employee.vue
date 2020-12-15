<template>
  <div>
    <TemplateContent>
      <template v-slot:title>
        <span>Pegawai</span>
      </template>

      <template v-slot:content>
        <TemplateUserTable class="table-la"
        :showBtnCreate="true"
        statusOptionGeneral="Semua Pegawai"
        :status="status"
        :dataTable="dataTable"
        :paging="paging"
        :activePage="activePage"
        :isPageActive="isPageActive"
        @search-key-up="searchKeyUp"
        @search-key-enter="getEmployeeByName(1)"
        @status-select="statusSelectChanged"
        @paging-click="manageRequest">
          <template v-slot:thead>
            <b-tr>
              <b-th class="title">Nama pegawai</b-th>
              <b-th class="title">Email</b-th>
              <b-th class="title">Nomor HP</b-th>
              <b-th class="title">Status</b-th>
              <b-th></b-th>
            </b-tr>
          </template>

          <template v-slot:tbody>
            <b-tr v-for="val in dataTable" :key="val.id">
              <b-td class="value">{{ val.name }}</b-td>
              <b-td class="value">{{ val.email }}</b-td>
              <b-td class="value">{{ val.phoneNumber }}</b-td>
              <b-td class="value">
                {{ val.status.name }}
                <font-awesome-icon icon="pen" class="ml-2 edit-icon"
                @click="setParamSelected(val.id, val.status.id)" v-b-modal.modal-update-status/>
              </b-td>
              <b-td class="value">
                <div class="btn-more" @click="userModal(val.id)" v-b-modal.modal-detail-user>
                  Lihat
                </div>
              </b-td>
            </b-tr>
          </template>
        </TemplateUserTable>
      </template>
    </TemplateContent>

    <b-modal id="modal-update-status" ref="modal"
    title="Akun pegawai" @ok="handleSubmit">
      <b-form-select v-model="selectedUpdateStatus">
        <option v-for="val in status"
        :key="val.id" :value="val.id">
          {{ val.name }}
        </option>
      </b-form-select>
    </b-modal>

    <b-modal id="modal-detail-user" ref="modal"
    title="Akun pegawai" ok-only v-if="userDetail !== null">
      <b-row class="modal-detail">
        <b-col cols="12" md="6" class="mb-4">
          <div class="title">Nama lengkap</div>
          <div class="value">{{ userDetail.name }}</div>
        </b-col>

        <b-col cols="12" md="6" class="mb-4">
          <div class="title">Status</div>
          <div class="value">{{ userDetail.status.name }}</div>
        </b-col>

        <b-col cols="12" md="6" class="mb-4">
          <div class="title">Email</div>
          <div class="value">{{ userDetail.email }}</div>
        </b-col>

        <b-col cols="12" md="6" class="mb-4">
          <div class="title">Terdaftar sejak</div>
          <div class="value">{{ userDetail.registerAt }}</div>
        </b-col>

        <b-col cols="12" md="6" class="mb-4">
          <div class="title">Nomor HP</div>
          <div class="value">{{ userDetail.phoneNumber }}</div>
        </b-col>

        <b-col cols="12" md="6" class="mb-4">
          <div class="title">Provinsi</div>
          <div class="value">{{ userDetail.province }}</div>
        </b-col>

        <b-col cols="12" md="6" class="mb-4">
          <div class="title">Kota</div>
          <div class="value">{{ userDetail.city }}</div>
        </b-col>

        <b-col cols="12" md="6" class="mb-4">
          <div class="title">Alamat</div>
          <div class="value">{{ userDetail.address }}</div>
        </b-col>
      </b-row>
    </b-modal>

    <Loader :class="`${loader ? '' : 'd-none'}`"/>
  </div>
</template>

<style lang="scss" scoped>

  // global css
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

    .edit-icon {
      outline: none;
      cursor: pointer;
      color: #24DB83;
    }

    .btn-more {
      outline: none;
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
  }

  .modal-detail {

    .title {
      color: #666;
      word-wrap: break-word;
      font-size: 0.875em;
    }

    .value {
      font-weight: 600;
      color: #3F3F3F;
      word-wrap: break-word;
      margin-top: 0.0625rem;
      font-size: 1em;
    }
  }
  // global css

  // #Device = Mobiles
  @media (min-width: 320px) and (max-width: 480px) {

  }
  // #Device = Mobiles

  // #Device = Low Resolution Tablets
  @media (min-width: 481px) and (max-width: 767px) {
    .table-la {

      .title {
        font-size: 0.9375em;
      }

      .value {
        font-size: 0.875em;
      }
    }
  }
  // #Device = Low Resolution Tablets

  // #Device = Tablets, Ipads
  @media (min-width: 768px) and (max-width: 1024px) {
    .table-la {

      .title {
        font-size: 1em;
      }

      .value {
        font-size: 0.9375em;
      }

      .btn-more {
        font-size: 0.8125em;
      }
    }
  }
  // #Device = Tablets, Ipads

  // #Device = Laptops, Desktops
  @media (min-width: 1025px) {
    .table-la {

      .title {
        white-space: unset;
        font-size: 1em;
      }

      .value {
        white-space: unset;
        font-size: 0.9375em;
      }

      .btn-more {
        font-size: 0.8125em;
      }
    }
  }
  // #Device = Laptops, Desktops

</style>

<script>

import { mapGetters, mapActions } from 'vuex';
import Loader from '../Loader.vue';
import TemplateContent from './TemplateContent.vue';
import TemplateUserTable from './TemplateUserTable.vue';

export default {

  components: {
    Loader,
    TemplateContent,
    TemplateUserTable,
  },

  data() {
    return {
      loader: false,

      paging: null,
      activePage: null,
      isPageActive: true,

      userDetail: null,
      dataTable: null,
      status: null,

      searchText: '',

      selectedStatus: '',
      selectedUpdateStatus: null,
      selectedUpdateStatusOri: null,

      timeout: null,
    };
  },

  computed: {
    ...mapGetters('adUserStatus', [
      'userStatus',
    ]),
  },

  methods: {
    ...mapActions('adUser', [
      'getAllEmployee',
      'getAllEmployeeByStatus',
      'getAllEmployeeByName',
      'activationAccount',
    ]),

    ...mapActions('adUserStatus', [
      'getAllUserStatus',
    ]),

    async getUserStatus() {
      this.loader = true;

      const { code } = await this.$func.promiseAPI(this.getAllUserStatus);

      this.loader = false;

      if (code >= 200 && code < 300) {
        this.status = this.userStatus.status;
      } else {
        this.$func.popupConnectionError(false);
      }
    },

    async getEmployee(page) {
      this.searchText = '';
      this.loader = true;

      let action;
      const params = { page };

      if (this.selectedStatus) {
        params.userStatusId = this.selectedStatus;
        action = this.getAllEmployeeByStatus;
      } else {
        action = this.getAllEmployee;
      }

      const { code, data, paging } = await this.$func.promiseAPI(action, params);

      this.loader = false;
      this.setData(code, data, paging, page);
    },

    async getEmployeeByName(page) {
      this.loader = true;

      const { code, data, paging } = await this.$func.promiseAPI(this.getAllEmployeeByName, {
        page,
        name: this.searchText,
      });

      this.loader = false;
      this.setData(code, data, paging, page);
    },

    async updateStatusUser() {
      this.loader = true;

      const { code } = await this.$func.promiseAPI(this.activationAccount, {
        id: this.selectedUpdateStatusOri.userId,
        userStatusId: this.selectedUpdateStatus,
      });

      this.loader = false;

      if (code >= 200 && code < 300) {
        this.getEmployee(this.activePage);
        this.$func.popupSuccessNoRoute('Berhasil mengubah status pegawai');
      } else {
        this.$func.popupConnectionError(false);
      }
    },

    setData(code, data, paging, page) {
      if (code >= 200 && code < 300) {
        this.dataTable = data.employees;
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

    setParamSelected(id, statusId) {
      this.selectedUpdateStatus = statusId;
      this.selectedUpdateStatusOri = {
        userId: id,
        userStatusId: statusId,
      };
    },

    handleSubmit() {
      if (this.selectedUpdateStatus !== this.selectedUpdateStatusOri.userStatusId) {
        this.updateStatusUser();
      }
    },

    userModal(id) {
      this.userDetail = this.dataTable.find((val) => val.id === id);
    },

    search(page) {
      clearTimeout(this.timeout);

      this.timeout = setTimeout(() => {
        if (this.searchText.length !== 0) {
          this.getEmployeeByName(page);
        } else {
          this.getEmployee(1);
        }
      }, 1000);
    },

    searchKeyUp(keyword) {
      this.searchText = keyword;
      this.search(1);
    },

    statusSelectChanged(statusId) {
      this.selectedStatus = statusId;
      this.getEmployee(1);
    },

    manageRequest(page) {
      if (this.searchText.length === 0) {
        this.getEmployee(page);
      } else {
        this.getEmployeeByName(page);
      }
    },

    redirect(route) {
      this.$router.push(route);
    },
  },

  created() {
    this.getUserStatus();
    this.getEmployee(1);
  },

};

</script>
