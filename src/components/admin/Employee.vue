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
        :status="statusFiltered"
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
                <span :class="`chip-la ${val.status.id === 1 ? 'primary-la' : 'danger-la'}`">
                  {{ val.status.name }}
                </span>
              </b-td>
              <b-td class="value">
                <b-dropdown size="xs" variant="link"
                toggle-class="px-0 text-decoration-none" no-caret>
                  <template #button-content>
                    <div class="point">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </template>

                  <b-dropdown-item @click="userModal(val.id)" v-b-modal.modal-detail-user>
                    Lihat
                  </b-dropdown-item>

                  <b-dropdown-item @click="redirect({ name: 'AdminUserForm',
                  params: { id: val.id } })">
                    Ubah Data
                  </b-dropdown-item>

                  <b-dropdown-item @click="confirmReset(val.id)">
                    Reset Password
                  </b-dropdown-item>

                  <b-dropdown-item v-if="val.status.id !== 1"
                  @click="confirmAction(val.id, 1, 'mengaktifkan')">
                    Aktifkan Akun
                  </b-dropdown-item>

                  <b-dropdown-item v-else @click="confirmAction(val.id, 2, 'memblokir')">
                    Blokir Akun
                  </b-dropdown-item>
                </b-dropdown>
              </b-td>
            </b-tr>
          </template>
        </TemplateUserTable>
      </template>
    </TemplateContent>

    <b-modal id="modal-detail-user" ref="modal"
    title="Akun customer" ok-only v-if="userDetail !== null">
      <b-row class="modal-detail">
        <b-col cols="12" md="6" class="mb-4">
          <div class="title">Nama lengkap</div>
          <div class="value">{{ userDetail.name }}</div>
        </b-col>

        <b-col cols="12" md="6" class="mb-4">
          <div class="title">Status</div>
          <div class="value">
            <span :class="`chip-la ${userDetail.status.id === 1 ? 'primary-la' : 'danger-la'}`">
              {{ userDetail.status.name }}
            </span>
          </div>
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
  .chip-la {
    border-radius: 0.25rem !important;
    padding: 0.125rem 0.375rem !important;
    color: #FFF !important;
  }

  .danger-la {
    background-color: #EF525B !important;
  }

  .primary-la {
    background-color: #53ABEB !important;
  }

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
        padding: 0.375rem 0.125rem;
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
        padding: 0.375rem 0.125rem;
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
      dataTable: [],
      status: [],

      searchText: '',

      selectedStatus: '',

      timeout: null,
    };
  },

  computed: {
    ...mapGetters('adUserStatus', [
      'userStatus',
    ]),

    statusFiltered() {
      return this.status.filter((item) => item.name !== 'Tidak Aktif');
    },
  },

  methods: {
    ...mapActions('adUser', [
      'getAllEmployee',
      'getAllEmployeeByStatus',
      'getAllEmployeeByName',
      'activationAccount',
      'resetPassword',
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

    async updateStatusUser(userId, statusId) {
      this.loader = true;

      const { code } = await this.$func.promiseAPI(this.activationAccount, {
        id: userId,
        userStatusId: statusId,
      });

      this.loader = false;

      if (code >= 200 && code < 300) {
        this.manageRequest(this.activePage);
        this.$func.popupSuccessNoRoute('Berhasil mengubah status pegawai');
      } else {
        this.$func.popupConnectionError(false);
      }
    },

    async resetPasswordUser(userId) {
      this.loader = true;

      const { code } = await this.$func.promiseAPI(this.resetPassword, {
        id: userId,
      });

      this.loader = false;

      if (code >= 200 && code < 300) {
        this.$func.popupSuccessNoRoute('Password di reset menjadi 12345');
      } else {
        this.$func.popupConnectionError(false);
      }
    },

    async confirmReset(userId) {
      const res = await this.$func.popupConfirmAction(
        'Yakin ingin mereset password akun ini?',
        'Ya',
        'Tidak',
      );

      if (res) {
        this.resetPasswordUser(userId);
      }
    },

    async confirmAction(userId, statusId, action) {
      const res = await this.$func.popupConfirmAction(
        `Ingin ${action} akun ini?`,
        'Ya',
        'Tidak',
      );

      if (res) {
        this.updateStatusUser(userId, statusId);
      }
    },

    setData(code, data, paging, page) {
      if (code >= 200 && code < 300) {
        this.dataTable = data.users;
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

    userModal(id) {
      this.userDetail = this.dataTable.find((val) => val.id === id);
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
