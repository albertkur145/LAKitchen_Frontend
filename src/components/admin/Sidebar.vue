<template>
  <div id="sidebar">
    <div class="header">
      <div class="title">LA' Kitchen</div>

      <div @click="$emit('close')">
        <font-awesome-icon icon="times" class="close-icon"/>
      </div>
    </div>

    <div class="content">
      <div v-for="(val, i) in path" :key="i" class="path">
        <div @click="majorAction(val.isHaveChild, i)"
        :class="`major${currentParentRoute === val.route.name ? ' active' : ''}`">
          <b-row>
            <b-col cols="1">
              <font-awesome-icon :icon="val.icon" class="path-icon"/>
            </b-col>

            <b-col cols="9">
              <span class="text">{{ val.name }}</span>
            </b-col>
          </b-row>

          <div v-if="val.isHaveChild">
            <font-awesome-icon :icon="val.childIcon" class="path-icon"/>
          </div>
        </div>

        <transition name="stairs">
          <div class="minor" v-if="val.isHaveChild && val.isShowChild">
              <div v-for="(valChild, j) in val.child" :key="j"
              @click="routerSelection(true, i, j)"
              :class="`text${currentChildRoute === valChild.route.name ? ' active' : ''}`">
                {{ valChild.name }}
              </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

  // global css
  #sidebar {
    padding: 0.75rem 1rem;

    .stairs-enter-active {
      animation: stairs .2s linear;
      transform-origin: top;
    }

    .stairs-leave-active {
      transform-origin: top;
      animation: stairs .2s linear reverse;
    }

    @keyframes stairs {
      0% {
        transform: scaleY(0);
      }
      100% {
        transform: scaleY(1);
      }
    }

    .header {
      display: flex;
      font-weight: 700;
      font-style: italic;
      align-items: center;
      justify-content: space-between;

      .title {
        color: #4B4B4B;
        font-size: 1.25em;
      }

      .close-icon {
        cursor: pointer;
        color: #9DCAFF;
        margin-top: 0.3125rem;
        font-size: 1.125em;
      }
    }

    .content {
      margin-top: 1.5rem;
      padding: 0.75rem 0;

      .path {
        margin-bottom: 1.5rem;

        &:last-child {
          margin-bottom: 0;
        }

        .major {
          display: flex;
          cursor: pointer;
          align-items: center;
          justify-content: space-between;

          &:hover .path-icon {
            color: #A4A4A4;
          }

          &:hover .text {
            color: #222;
          }

          .path-icon {
            color: #CCC;
            transition: color .1s linear;
            font-size: 0.875em;
          }

          .text {
            color: #3F3F3F;
            transition: color .1s linear;
            padding-left: 0.25rem;
            font-size: 0.9375em;
          }
        }

        .minor {
          margin-top: 0.75rem;

          .text {
            cursor: pointer;
            color: #727272;
            transition: color .1s linear;
            margin-bottom: 0.75rem;
            margin-left: 2.5rem;
            font-size: 0.875em;

            &:hover {
              color: #333;
            }
          }
        }
      }

      .active {
        font-weight: 600;
        color: #008AD8 !important;

        .path-icon, .text {
          font-weight: 600;
          color: #008AD8 !important;
        }

        &:hover .path-icon {
          color: #009EF6 !important;
        }

        &:hover .text {
          color: #009EF6 !important;
        }

        &:hover {
          color: #009EF6 !important;
        }
      }
    }
  }
  // global css

  // #Device = Laptops, Desktops
  @media (min-width: 1025px) {
    #sidebar {

      .header {

        .title {
          font-size: 1.375em;
        }

        .close-icon {
          font-size: 1.25em;
        }
      }

      .content {
        padding: 1rem 0;

        .path {

          .major {

            .path-icon {
              font-size: 0.9375em;
            }

            .text {
              font-size: 1em;
            }
          }

          .minor {
            margin-top: 1rem;

            .text {
              margin-bottom: 1rem;
              font-size: 0.9375em;
            }
          }
        }
      }
    }
  }
  // #Device = Laptops, Desktops

</style>

<script>

export default {

  data() {
    return {
      windowWidth: null,
      parentRoute: null,
      childRoute: null,

      path: [
        {
          icon: 'rocket',
          name: 'Beranda',
          route: {
            name: 'AdminDashboard',
            path: '/admin',
          },
          isHaveChild: false,
          isShowChild: false,
        },
        {
          icon: 'hamburger',
          name: 'Produk',
          route: {
            name: 'AdminProduct',
            path: '',
          },
          chevIc: 'chevron-up',
          isHaveChild: true,
          isShowChild: false,
          childIcon: 'chevron-up',
          child: [
            {
              name: 'Jual Produk',
              route: {
                name: 'AdminProduct',
                path: '/admin/product',
              },
            },
            {
              name: 'Produk Terlaris',
              route: {
                name: 'AdminProductBestSelling',
                path: '/admin/product/bestselling',
              },
            },
            {
              name: 'Produk Favorit',
              route: {
                name: 'AdminProductFavorite',
                path: '/admin/product/favorite',
              },
            },
            {
              name: 'Penilaian Produk',
              route: {
                name: 'AdminProductAssessment',
                path: '/admin/product/assessment',
              },
            },
          ],
        },
        {
          icon: 'money-bill-wave',
          name: 'Transaksi',
          route: {
            name: 'AdminOrder',
            path: '',
          },
          chevIc: 'chevron-up',
          isHaveChild: true,
          isShowChild: false,
          childIcon: 'chevron-up',
          child: [
            {
              name: 'Konfirmasi Pesanan',
              route: {
                name: 'AdminOrderConfirm',
                path: '/admin/order/confirm',
              },
            },
            {
              name: 'Pesanan Aktif',
              route: {
                name: 'AdminOrder',
                path: '/admin/order',
              },
            },
            {
              name: 'Riwayat Pesanan',
              route: {
                name: 'AdminOrderHistory',
                path: '/admin/order/history',
              },
            },
          ],
        },
        {
          icon: 'user',
          name: 'Pengguna',
          route: {
            name: 'AdminCustomer',
            path: '',
          },
          chevIc: 'chevron-up',
          isHaveChild: true,
          isShowChild: false,
          childIcon: 'chevron-up',
          child: [
            {
              name: 'Customer',
              route: {
                name: 'AdminCustomer',
                path: '/admin/customer',
              },
            },
            {
              name: 'Pegawai',
              route: {
                name: 'AdminEmployee',
                path: '/admin/employee',
              },
            },
          ],
        },
        {
          icon: 'chart-line',
          name: 'Laporan',
          route: {
            name: 'AdminReport',
            path: '',
          },
          chevIc: 'chevron-up',
          isHaveChild: true,
          isShowChild: false,
          childIcon: 'chevron-up',
          child: [
            {
              name: 'Pendapatan',
              route: {
                name: 'AdminReportIncome',
                path: '/admin/report/income',
              },
            },
          ],
        },
      ],
    };
  },

  computed: {
    currentParentRoute() {
      return this.parentRoute;
    },

    currentChildRoute() {
      return this.childRoute;
    },
  },

  watch: {
    $route: {
      handler({ name }) {
        this.childRoute = name;

        switch (name) {
          case 'AdminSalesToday':
            this.parentRoute = 'AdminDashboard';
            break;

          case 'AdminProductForm':
            this.parentRoute = 'AdminProduct';
            break;

          case 'AdminProductBestSelling':
            this.parentRoute = 'AdminProduct';
            break;

          case 'AdminProductFavorite':
            this.parentRoute = 'AdminProduct';
            break;

          case 'AdminProductAssessment':
            this.parentRoute = 'AdminProduct';
            break;

          case 'AdminProductAssessmentDetail':
            this.parentRoute = 'AdminProduct';
            break;

          case 'AdminOrderConfirm':
            this.parentRoute = 'AdminOrder';
            break;

          case 'AdminOrderHistory':
            this.parentRoute = 'AdminOrder';
            break;

          case 'AdminOrderDetail':
            this.parentRoute = 'AdminOrder';
            break;

          case 'AdminEmployee':
            this.parentRoute = 'AdminCustomer';
            break;

          case 'AdminReportIncome':
            this.parentRoute = 'AdminReport';
            break;

          default:
            this.parentRoute = name;
            break;
        }
      },
      immediate: true,
    },
  },

  mounted() {
    window.addEventListener('resize', this.getWindowWidth);
  },

  methods: {
    majorAction(isHaveChild, index) {
      if (isHaveChild) {
        this.toggleChild(index);
      } else {
        this.routerSelection(false, index);
      }
    },

    toggleChild(index) {
      this.path[index].isShowChild = !this.path[index].isShowChild;

      if (this.path[index].isShowChild) {
        this.path[index].childIcon = 'chevron-down';
      } else {
        this.path[index].childIcon = 'chevron-up';
      }
    },

    routerSelection(child, i, j = null) {
      if (!child) {
        this.routerParent(i);
      } else {
        this.routerChild(i, j);
      }
    },

    routerParent(i) {
      this.$router.push(this.path[i].route.path).catch(() => {});

      if (this.windowWidth < 1025) {
        this.$emit('close');
      }
    },

    routerChild(i, j) {
      this.$router.push(this.path[i].child[j].route.path).catch(() => {});

      if (this.windowWidth < 1025) {
        this.$emit('close');
      }
    },

    getWindowWidth() {
      this.windowWidth = window.innerWidth;
    },
  },

  created() {
    this.getWindowWidth();
  },

};

</script>
