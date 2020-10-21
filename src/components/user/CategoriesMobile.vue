<template>
  <div class="menu-list-container">
    <div class="menu-list">
      <div v-for="(category) in categories" :key="category.id"
      :class="`category category-${category.id}`">
        <div class="category-text" @click="showSubCategories(category.id)">
          <span>{{ category.name }}</span>
          <font-awesome-icon icon="chevron-down" class="chev-icon"/>
        </div>

        <div :class="`d-none sub-category sub-category-${category.id}`">
          <div v-for="(sub) in category.subCategories" :key="sub.id"
          class="sub-category-text">
            <div>{{ sub.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">

  // global css
  .active-color {
    color: #FF6C2D !important;
  }

  @keyframes scaleDown {
    0% {
      transform: scaleY(0);
    }
    100% {
      transform: scaleY(1);
    }
  }

  .menu-list-container {
    width: 100%;
    position: absolute;
    overflow: hidden;
    transform: scaleY(0);
    transform-origin: top;
    background-color: #FFF;
    transition: transform .2s ease-out;
    top: 1.625rem;
    left: 0;
    padding-top: 0.75rem;
    font-size: 0.875em;

    .menu-list {
      max-height: 75vh;
      overflow-y: auto;
      border: 0.0625rem solid #DDD;

      .category {
        padding: 0.75rem 0.875rem;

        .category-text {
          position: relative;

          span {
            font-weight: 500;
          }

          .chev-icon {
            position: absolute;
            color: #999;
            font-weight: 500;
            top: 0.25rem;
            right: 0.25rem;
            font-size: 0.75em;
          }

          &:hover, &:hover .chev-icon {
            color: #FF6C2D;
          }
        }

        .sub-category {
          transform-origin: top;
          animation: scaleDown .2s ease-out;

          .sub-category-text {
            padding: 0.8125rem 0 0 0.8125rem;

            div {
              font-weight: 400;

              &:hover {
                color: #FF6C2D;
              }
            }
          }
        }
      }
    }
  }
  // global css

  // Mobile devices
  @media (min-width: 320px) and (max-width: 480px) {
    .menu-list-container {
      padding-top: 0.75rem;
      font-size: 0.875em;

      .menu-list {

        .category {
          padding: 0.75rem 1rem;

          .category-text {

            .chev-icon {
              top: 0.25rem;
              right: 0.25rem;
              font-size: 0.75em;
            }
          }

          .sub-category {

            .sub-category-text {
              padding: 0.8125rem 0 0 0.8125rem;
            }
          }
        }
      }
    }
  }
  // Mobile devices

  // iPads, Tablets
  @media (min-width: 481px) and (max-width: 768px) {
    .menu-list-container {
      padding-top: 0.875rem;
      font-size: 0.9375em;

      .menu-list {

        .category {
          padding: 0.75rem 1rem;

          .category-text {

            .chev-icon {
              top: 0.25rem;
              right: 0.25rem;
              font-size: 0.8125em;
            }
          }

          .sub-category {

            .sub-category-text {
              padding: 0.875rem 0 0 0.875rem;
            }
          }
        }
      }
    }
  }
  // iPads, Tablets

  // Small screen laptops
  @media (min-width: 769px) and (max-width: 1024px) {

  }
  // Small screen laptops

  // Desktops, Other large screens
  @media (min-width: 1025px) {

  }
  // Desktops, Other large screens

</style>

<script>

export default {

  data() {
    return {
      categories: [
        {
          id: 1,
          name: 'Bahan Kue',
          subCategories: [
            {
              id: 1,
              name: 'Bahan Puding & Agar - Agar',
            },
            {
              id: 2,
              name: 'Baking Powder',
            },
            {
              id: 3,
              name: 'Baking Soda',
            },
            {
              id: 4,
              name: 'Coklat Bubuk',
            },
            {
              id: 5,
              name: 'Coklat Masak',
            },
            {
              id: 6,
              name: 'Perisa Makanan',
            },
            {
              id: 7,
              name: 'Pewarna Makanan',
            },
            {
              id: 8,
              name: 'Ragi',
            },
            {
              id: 9,
              name: 'Topping & Penghias Kue',
            },
          ],
        },
        {
          id: 2,
          name: 'Beras',
          subCategories: [
            {
              id: 10,
              name: 'Beras Hitam',
            },
            {
              id: 11,
              name: 'Beras Ketan',
            },
            {
              id: 12,
              name: 'Beras Merah',
            },
            {
              id: 13,
              name: 'Beras Putih',
            },
          ],
        },
        {
          id: 3,
          name: 'Kopi',
          subCategories: [
            {
              id: 14,
              name: 'Biji Kopi',
            },
            {
              id: 15,
              name: 'Kopi Bubuk',
            },
            {
              id: 16,
              name: 'Kopi Kemasan',
            },
            {
              id: 17,
              name: 'Krimer',
            },
          ],
        },
        {
          id: 4,
          name: 'Kue',
          subCategories: [
            {
              id: 18,
              name: 'Kue Basah',
            },
            {
              id: 19,
              name: 'Kue Kering',
            },
            {
              id: 20,
              name: 'Kue Ulang Tahun',
            },
          ],
        },
        {
          id: 5,
          name: 'Makanan Beku',
          subCategories: [
            {
              id: 21,
              name: 'Bakso',
            },
            {
              id: 22,
              name: 'Buah Beku',
            },
            {
              id: 23,
              name: 'Camilan Beku',
            },
            {
              id: 24,
              name: 'Daging Olahan Lainnya',
            },
            {
              id: 25,
              name: 'Dessert',
            },
            {
              id: 26,
              name: 'Kentang Beku',
            },
            {
              id: 27,
              name: 'Nugget',
            },
            {
              id: 28,
              name: 'Pastry & Olahan Tepung',
            },
            {
              id: 29,
              name: 'Sayuran Beku',
            },
            {
              id: 30,
              name: 'Siomay',
            },
            {
              id: 31,
              name: 'Sosis',
            },
          ],
        },
      ],
    };
  },

  methods: {
    showSubCategories(id) {
      const subCategories = document.querySelector(`.sub-category-${id}`);
      subCategories.classList.toggle('d-none');
    },
  },

};

</script>
