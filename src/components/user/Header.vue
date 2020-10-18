<template>
  <div id="app">
    <div class="top">
      <div class="brand">
        <img src="@/assets/images/logo.png" alt="Logo LA' Kitchen">
      </div>

      <div class="search">
        <font-awesome-icon icon="search" class="search-icon"/>
        <input type="text" placeholder="Kamu sedang cari apa...">
        <button class="btn-search">Cari</button>
      </div>

      <div class="info">
        <div class="cart">
          <font-awesome-icon icon="shopping-cart"/>
        </div>

        <div class="sign">
          <button class="btn-login">Masuk</button>
          <button class="btn-register">Daftar</button>
        </div>
      </div>
    </div>

    <div class="bottom">
      <div class="left">
        <div class="categories">
          <font-awesome-icon icon="bars" class="bars-icon"/>
          <span class="text">Kategori</span>
          <font-awesome-icon icon="chevron-down" class="chevdown-icon"/>

          <div class="menu-list-container">
            <div class="menu-list">
              <b-row>
                <b-col lg="3" class="left d-block">
                  <div v-for="(category) in categories" :key="category.id"
                  :class="`category-text category-${category.id}
                  ${category.id == 1 ? 'active-color' : ''}`"
                  @mouseover="showSubCategories(`${category.id}`)">
                    <span>{{ category.name }}</span>
                    <font-awesome-icon icon="chevron-right"
                    :class="`chev-icon ${category.id == 1 ? 'active-color active-icon' : ''}`"/>
                  </div>
                </b-col>

                <b-col lg="9" class="right">
                  <div v-for="(category) in categories" :key="category.id"
                  :class="`sub-category category-${category.id}
                  ${category.id == 1 ? '' : 'd-none'}`">
                    <div class="title">{{ category.name }}</div>
                    <b-row class="sub-category-text">
                      <b-col v-for="(sub, index) in category.subCategories" :key="sub.id"
                      lg="3" :class="`text${index < 3 ? '' : ' mt-4'}`">
                        <font-awesome-icon icon="chevron-right" class="chev-icon mr-2"/>
                        {{ sub.name }}
                      </b-col>
                    </b-row>
                  </div>
                </b-col>
              </b-row>
            </div>
          </div>
        </div>

        <div class="line-spacer">|</div>

        <div class="sort-text">Rating Teratas</div>
        <div class="sort-text">Harga Terendah</div>
        <div class="sort-text">Harga Tertinggi</div>
      </div>

      <div class="right">
        <div class="help">
          <font-awesome-icon icon="question-circle"/>
          <span class="ml-1">Bantuan</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

  #app {

    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #FFF;
      border-bottom: 0.0625rem solid #FF6C2D;
      padding: 0.875rem 1.875rem;

      .brand {
        max-width: 7rem;

        img {
          width: 100%;
        }
      }

      .search {
        position: relative;
        min-width: 42rem;
        border: 0.125rem solid #FF6C2D;
        border-radius: 100rem;
        margin-left: 3rem;
        padding: 0.375rem 1rem;

        .search-icon {
          position: absolute;
          color: #999;
          top: 0.5875rem;
          left: 1rem;
          font-size: 1.0625em;
        }

        input {
          width: 100%;
          outline: 0;
          border: 0;
          color: #555;
          padding-left: 2.75rem;
          font-size: 0.875em;

          &::placeholder {
            color: #999;
          }
        }

        .btn-search {
          position: absolute;
          border-radius: 100rem;
          background-color: #FF6C2D;
          color: #FFF;
          font-weight: 500;
          top: 0.125rem;
          right: 0.1875rem;
          padding: 0.3125rem 1.5rem;
          font-size: 0.9375em;
        }
      }

      .info {
        display: flex;
        align-items: center;

        .cart {
          cursor: pointer;
          color: #777;
          border-radius: 0.5rem;
          margin-left: 1.75rem;
          font-size: 1.25em;
          padding: 0.25rem 0.625rem;

          &:hover {
            background-color: #F6F6F6;
          }
        }

        .sign {
          margin-left: 1.75rem;

          .btn-login, .btn-register {
            font-weight: 500;
            border-radius: 0.5rem;
            padding: 0.5rem 2rem;
            margin-left: 1.5rem;
            font-size: 0.8125em;
          }

          .btn-login {
            background-color: #FFF;
            color: #FF6C2D;
            border: 0.0625rem solid #FF6C2D;
          }

          .btn-register {
            background-color: #FF6C2D;
            color: #FFF;
            transition: background-color .2s linear;

            &:hover {
              background-color: #F56527;
            }
          }
        }
      }
    }

    .bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #FFF;
      color: #555;
      position: relative;
      font-size: 0.875em;
      box-shadow: 0 0.25rem 0.25rem rgba($color: #333, $alpha: 0.1);
      padding: 0.5rem 1.875rem;

      .left {
        display: flex;

        .categories {
          display: flex;
          align-items: center;
          cursor: pointer;
          margin-right: 1.75rem;

          .bars-icon, .chevdown-icon {
            margin-right: 0.875rem;
            font-size: 0.9375em;
          }

          .chevdown-icon {
            color: #999;
            font-size: 0.8125em;
          }

          .text {
            margin-right: 0.875rem;
            font-size: 1em;
          }

          &:hover, &:hover .chevdown-icon {
            color: #333;
          }

          &:hover .menu-list-container {
            transform: scaleY(1);
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
                max-height: 60vh;
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
                max-height: 60vh;
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
                    margin-top: 1rem;

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
        }

        .line-spacer {
          color: #BDBDBD;
          margin-right: 1.75rem;
        }

        .sort-text {
          cursor: pointer;
          margin-right: 1.75rem;

          &:hover {
            color: #333;
          }
        }
      }

      .right {
        display: flex;

        .help {
          cursor: pointer;

          &:hover {
            color: #333;
          }
        }
      }
    }

    .active-color {
      color: #FF6C2D !important;
    }

    .active-icon {
      margin-right: 0 !important;
    }
  }

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
