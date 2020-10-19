<template>
  <div class="menu-list-container">
    <div class="menu-list">
      <b-row>
        <b-col lg="3" md="4" class="left d-block">
          <div v-for="(category) in categories" :key="category.id"
          :class="`category-text category-${category.id}
          ${category.id == 1 ? 'active-color' : ''}`"
          @mouseover="showSubCategories(`${category.id}`)">
            <span>{{ category.name }}</span>
            <font-awesome-icon icon="chevron-right"
            :class="`chev-icon ${category.id == 1 ? 'active-color active-icon' : ''}`"/>
          </div>
        </b-col>

        <b-col lg="9" md="8" class="right">
          <div v-for="(category) in categories" :key="category.id"
          :class="`sub-category category-${category.id}
          ${category.id == 1 ? '' : 'd-none'}`">
            <div class="title">{{ category.name }}</div>
            <b-row class="sub-category-text mt-0">
              <b-col v-for="(sub) in category.subCategories" :key="sub.id"
              lg="4" md="6" class="text mt-4">
                <font-awesome-icon icon="chevron-right" class="chev-icon mr-2"/>
                {{ sub.name }}
              </b-col>
            </b-row>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<style lang="scss">

  // global css
  .active-color {
    color: #FF6C2D !important;
  }

  .active-icon {
    margin-right: 0 !important;
  }

  .menu-list-container {
    width: 100%;
    position: absolute;
    overflow: hidden;
    transform: scaleY(0);
    transform-origin: top;
    background-color: #FFF;
    transition: transform .2s ease-out;
    top: 1.75rem;
    left: 0;
    padding-top: 1rem;
    font-size: 0.9375em;

    .menu-list {
      border: 0.0625rem solid #DDD;

      .left {
        max-height: 75vh;
        overflow-y: auto;

        .category-text {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.875rem;

          span {
            font-weight: 500;
          }

          .chev-icon {
            color: #999;
            font-weight: 500;
            transition: margin-right .1s linear;
            margin-right: 0.25rem;
            font-size: 0.8125em;
          }
        }
      }

      .right {
        max-height: 75vh;
        overflow-y: auto;

        .sub-category {
          width: 100%;
          padding: 1.5rem 0 1.5rem 4rem;
          margin-left: -2rem;

          .title {
            font-weight: 500;
            border-bottom: 0.0625rem solid #CCC;
            padding-bottom: 1rem;
            font-size: 1.75em;

            &:hover {
              color: #FF6C2D;
            }
          }

          .sub-category-text {
            .text {
              .chev-icon {
                font-size: 0.8125em;
              }

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

  // Small screen laptops
  @media (min-width: 769px) and (max-width: 1024px) {
    .menu-list-container {
      .menu-list {
        .left {
          .category-text {
            padding: 1rem 1.5rem;
          }
        }

        .right {
          .sub-category {
            padding: 1.25rem 0 1.25rem 3.5rem;
          }
        }
      }
    }
  }
  // Small screen laptops

  // Desktops, Other large screens
  @media (min-width: 1025px) {
    .menu-list-container {
      .menu-list {
        .left {
          .category-text {
            padding: 1rem 1.875rem;
          }
        }

        .right {
          .sub-category {
            padding: 1.5rem 0 1.5rem 4rem;
          }
        }
      }
    }
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
      // reset display sub categories
      this.resetActiveElement();

      // reset active path color
      this.resetActivePath();

      // set active category and display sub category
      this.setActiveElement(id);
    },

    resetActiveElement() {
      const allSubCategory = Array.from(document.querySelectorAll('.sub-category'));
      const activeSub = allSubCategory.find((e) => !e.classList.contains('d-none'));

      activeSub.classList.add('d-none');
    },

    resetActivePath() {
      const allCategory = Array.from(document.querySelectorAll('.category-text'));
      const activeColor = allCategory.find((e) => e.classList.contains('active-color'));
      const activeIcon = activeColor.querySelector('.chev-icon');

      activeColor.classList.remove('active-color');
      activeIcon.classList.remove('active-color');
      activeIcon.classList.remove('active-icon');
    },

    setActiveElement(id) {
      const category = document.querySelector(`.category-text.category-${id}`);
      const chevIcon = category.querySelector('.chev-icon');

      category.classList.add('active-color');
      chevIcon.classList.add('active-color');
      chevIcon.classList.add('active-icon');

      const subCategory = document.querySelector(`.sub-category.category-${id}`);
      subCategory.classList.remove('d-none');
    },
  },

};

</script>
