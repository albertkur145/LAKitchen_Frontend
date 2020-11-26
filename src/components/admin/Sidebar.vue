<template>
  <div id="sidebar">
    <div class="header">
      <div class="title">LA' Kitchen</div>

      <div @click="$emit('close')">
        <font-awesome-icon icon="times" class="close-icon"/>
      </div>
    </div>

    <div class="content">
      <div class="path" v-for="(val, i) in path" :key="i">
        <div class="major" @click="majorAction(val.isHaveChild, i)">
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
              <div v-for="(valChild, i) in val.child" :key="i" class="text">
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
        font-size: 1.375em;
      }

      .close-icon {
        cursor: pointer;
        color: #9DCAFF;
        margin-top: 0.3125rem;
        font-size: 1.25em;
      }
    }

    .content {
      margin-top: 1.5rem;
      padding: 1rem 0;

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
            font-size: 0.9375em;
          }

          .text {
            color: #3F3F3F;
            transition: color .1s linear;
            padding-left: 0.25rem;
            font-size: 1em;
          }
        }

        .minor {
          margin-top: 1rem;

          .text {
            cursor: pointer;
            color: #727272;
            transition: color .1s linear;
            margin-bottom: 1rem;
            margin-left: 2.5rem;
            font-size: 0.9375em;

            &:hover {
              color: #333;
            }
          }
        }
      }

      .active {
        font-weight: 600;

        .path-icon, .text {
          color: #008AD8;
        }
      }
    }
  }
  // global css

</style>

<script>

export default {

  data() {
    return {
      path: [
        {
          icon: 'rocket',
          name: 'Beranda',
          isHaveChild: false,
          isShowChild: false,
        },
        {
          icon: 'hamburger',
          name: 'Produk',
          chevIc: 'chevron-up',
          isHaveChild: true,
          isShowChild: false,
          childIcon: 'chevron-up',
          child: [
            {
              name: 'Jual Produk',
            },
            {
              name: 'Produk Terlaris',
            },
            {
              name: 'Produk Favorit',
            },
            {
              name: 'Penilaian Produk',
            },
          ],
        },
        {
          icon: 'money-bill-wave',
          name: 'Pesanan',
          chevIc: 'chevron-up',
          isHaveChild: false,
          isShowChild: false,
          childIcon: 'chevron-up',
        },
        {
          icon: 'user',
          name: 'Pengguna',
          chevIc: 'chevron-up',
          isHaveChild: true,
          isShowChild: false,
          childIcon: 'chevron-up',
          child: [
            {
              name: 'Customer',
            },
            {
              name: 'Pegawai',
            },
          ],
        },
        {
          icon: 'chart-line',
          name: 'Laporan',
          chevIc: 'chevron-up',
          isHaveChild: true,
          isShowChild: false,
          childIcon: 'chevron-up',
          child: [
            {
              name: 'Pendapatan',
            },
          ],
        },
      ],
    };
  },

  methods: {
    majorAction(isHaveChild, index) {
      if (isHaveChild) {
        this.path[index].isShowChild = !this.path[index].isShowChild;

        if (this.path[index].isShowChild) {
          this.path[index].childIcon = 'chevron-down';
        } else {
          this.path[index].childIcon = 'chevron-up';
        }
      } else {
        alert('ga ada');
      }
    },
  },

};

</script>
