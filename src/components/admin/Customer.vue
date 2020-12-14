<template>
  <div>
    <TemplateContent>
      <template v-slot:title>
        <span>Customer</span>
      </template>

      <template v-slot:content>
        <div class="container-la">
          <div class="head">
            <div class="d-flex flex-wrap">
              <div class="position-relative">
                <select @change="getCustomer(1)" v-model="selectedStatus"
                class="select-la bg-white" v-if="status !== null">
                  <option value="">Semua Customer</option>
                  <option v-for="val in status"
                  :key="val.id" :value="val.id">
                    {{ val.name }}
                  </option>
                </select>

                <font-awesome-icon icon="chevron-down" class="chev-icon"/>
              </div>

              <div class="position-relative">
                <input type="text" v-model="searchText"
                @keyup="search(1)" @keyup.enter="getCustomerByName(1)"
                class="input-text" placeholder="Cari nama customer...">
                <font-awesome-icon icon="search" class="search-icon"/>
              </div>
            </div>
          </div>

          <b-table-simple responsive class="table-la">
            <b-thead>
              <b-tr>
                <b-th class="title">Nama customer</b-th>
                <b-th class="title">Email</b-th>
                <b-th class="title">Nomor HP</b-th>
                <b-th class="title">Kota</b-th>
                <b-th class="title">Terdaftar sejak</b-th>
                <b-th class="title">Status</b-th>
                <b-th></b-th>
              </b-tr>
            </b-thead>

            <b-tbody v-if="dataTable !== null">
              <b-tr v-for="val in dataTable" :key="val.id">
                <b-td class="value">{{ val.name }}</b-td>
                <b-td class="value">{{ val.email }}</b-td>
                <b-td class="value">{{ val.phoneNumber }}</b-td>
                <b-td class="value">{{ val.city }}</b-td>
                <b-td class="value">{{ val.registerAt }}</b-td>
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
            </b-tbody>
          </b-table-simple>

          <div v-if="dataTable === null" class="is-empty text-center">
            Data tidak ditemukan.
          </div>

          <div class="paging" v-if="isPageActive && paging !== null">
            <span v-for="i in paging" :key="i" @click="manageRequest(i)"
            :class="`page${i === activePage ? ' active-page' : ''}`">
              {{ i }}
            </span>
          </div>
        </div>
      </template>
    </TemplateContent>

    <b-modal id="modal-update-status" ref="modal"
    title="Akun customer" @ok="handleSubmit">
      <b-form-select v-model="selectedUpdateStatus">
        <option v-for="val in status"
        :key="val.id" :value="val.id">
          {{ val.name }}
        </option>
      </b-form-select>
    </b-modal>

    <b-modal id="modal-detail-user" ref="modal"
    title="Akun customer" ok-only v-if="userDetail !== null">
      <b-row>
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
  .container-la {
    border-radius: 0.5rem;
    background-color: #FFF;
    padding: 1.5rem 2rem;

    .head {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;

      .select-la, .input-text {
        outline: none;
        color: #3F3F3F;
        border-radius: 0.3125rem;
        border: 0.0625rem solid #AAA;
        margin-right: 1rem;
        margin-bottom: 1rem;
        padding-top: 0.4375rem;
        padding-bottom: 0.4375rem;
        font-size: 0.875em;

        &:focus {
          border: 0.0625rem solid #BF67E9;
          box-shadow: 0 0 0.0625rem 0.125rem rgba($color: #BF67E9, $alpha: 0.3)
        }
      }

      .chev-icon, .search-icon {
        color: #BFBFBF;
        position: absolute;
      }

      .chev-icon {
        top: 0.875rem;
        right: 0.875rem;
        font-size: 0.6875em;
      }

      .search-icon {
        top: 0.8125rem;
        left: 0.75rem;
        font-size: 0.8125em;
      }

      .select-la {
        width: 100%;
        -webkit-appearance: none;
        -moz-appearance: none;
        padding-left: 1rem;
        padding-right: 3.25rem;
      }

      .input-text {
        width: 100%;
        padding-left: 2.5rem;
        padding-right: 1rem;

        &::placeholder {
          color: #A0A0A0;
        }
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

  #modal-detail-user {

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
    .container-la {
      padding: 1.5rem 2rem;

      .head {

        .select-la, .input-text {
          font-size: 0.875em;
        }

        .chev-icon {
          top: 0.875rem;
          right: 1.75rem;
          font-size: 0.75em;
        }

        .search-icon {
          top: 0.75rem;
          left: 0.75rem;
          font-size: 0.875em;
        }

        .select-la {
          width: unset;
        }

        .input-text {
          width: 19rem;
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
      padding: 1.5rem 2rem;

      .head {

        .select-la, .input-text {
          font-size: 0.9375em;
        }

        .chev-icon {
          top: 0.875rem;
          right: 1.75rem;
          font-size: 0.75em;
        }

        .search-icon {
          top: 0.75rem;
          left: 0.75rem;
          font-size: 0.875em;
        }

        .select-la {
          width: unset;
        }

        .input-text {
          width: 19rem;
        }
      }

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

      .is-empty {
        font-size: 1em;
      }

      .paging {

        .page {
          font-size: 0.9375em;
        }
      }
    }
  }
  // #Device = Tablets, Ipads

  // #Device = Laptops, Desktops
  @media (min-width: 1025px) {
    .container-la {
      padding: 1.5rem 2rem;

      .head {

        .select-la, .input-text {
          font-size: 0.9375em;
        }

        .chev-icon {
          top: 0.875rem;
          right: 1.75rem;
          font-size: 0.75em;
        }

        .search-icon {
          top: 0.75rem;
          left: 0.75rem;
          font-size: 0.875em;
        }

        .select-la {
          width: unset;
        }

        .input-text {
          width: 19rem;
        }
      }

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

      .is-empty {
        font-size: 1em;
      }

      .paging {

        .page {
          font-size: 0.9375em;
        }
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
    ...mapActions('adCustomer', [
      'getAllCustomer',
      'getAllCustomerByStatus',
      'getAllCustomerByName',
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

    async getCustomer(page) {
      this.searchText = '';
      this.loader = true;

      let action;
      const params = { page };

      if (this.selectedStatus) {
        params.userStatusId = this.selectedStatus;
        action = this.getAllCustomerByStatus;
      } else {
        action = this.getAllCustomer;
      }

      const { code, data, paging } = await this.$func.promiseAPI(action, params);

      this.loader = false;
      this.setData(code, data, paging, page);
    },

    async getCustomerByName(page) {
      this.loader = true;

      const { code, data, paging } = await this.$func.promiseAPI(this.getAllCustomerByName, {
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
        this.getCustomer(this.activePage);
        this.$func.popupSuccessNoRoute('Berhasil mengubah status customer');
      } else {
        this.$func.popupConnectionError(false);
      }
    },

    setData(code, data, paging, page) {
      if (code >= 200 && code < 300) {
        this.dataTable = data.customers;
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
          this.getCustomerByName(page);
        } else {
          this.getCustomer(1);
        }
      }, 1000);
    },

    manageRequest(page) {
      if (this.searchText.length === 0) {
        this.getCustomer(page);
      } else {
        this.getCustomerByName(page);
      }
    },

    redirect(route) {
      this.$router.push(route);
    },
  },

  created() {
    this.getUserStatus();
    this.getCustomer(1);
  },

};

</script>
