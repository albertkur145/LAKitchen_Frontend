<template>
  <div>
    <div class="container-la">
      <div class="head">
        <div class="d-flex flex-wrap">
          <div class="position-relative" v-if="isShowStatus">
            <select @change="$emit('status-select', selectedStatus)"
            v-if="status" v-model="selectedStatus" class="select-la bg-white">
              <option value="">Semua Pesanan</option>
              <option v-for="val in status"
              :key="val.id" :value="val.id">
                {{ val.name }}
              </option>
            </select>

            <font-awesome-icon icon="chevron-down" class="chev-icon"/>
          </div>

          <div class="position-relative">
            <input type="text" v-model="searchText"
            @keyup="$emit('search-key-up', searchText)"
            class="input-text" placeholder="Cari nomor pesanan...">
            <font-awesome-icon icon="search" class="search-icon"/>
          </div>
        </div>
      </div>

      <b-table-simple responsive class="table-la">
        <b-thead>
          <slot name="thead"></slot>
        </b-thead>

        <b-tbody>
          <slot name="tbody"></slot>
        </b-tbody>
      </b-table-simple>

      <div v-if="dataTable.length === 0" class="is-empty text-center">
        Data tidak ditemukan.
      </div>

      <div class="paging" v-if="isPageActive && paging !== null">
        <span v-for="i in paging" :key="i" @click="$emit('paging-click', i)"
        :class="`page${i === activePage ? ' active-page' : ''}`">
          {{ i }}
        </span>
      </div>
    </div>
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

export default {

  props: [
    'status',
    'dataTable',
    'isPageActive',
    'paging',
    'activePage',
    'isShowStatus',
  ],

  watch: {
    selectedStatus() {
      this.searchText = '';
    },
  },

  data() {
    return {
      searchText: '',
      selectedStatus: '',
    };
  },

};

</script>
