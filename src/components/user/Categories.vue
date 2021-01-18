<template>
  <div class="menu-list-container">
    <div class="menu-list">
      <b-row>
        <b-col lg="3" md="4" class="left d-block">
          <div v-for="(category, i) in categories" :key="category.id"
          :class="`category-text category-${category.id}
          ${i == 0 ? 'active-color' : ''}`"
          @mouseover="showSubCategories(`${category.id}`)">
            <span>{{ category.name }}</span>
            <font-awesome-icon icon="chevron-right"
            :class="`chev-icon ${i == 0 ? 'active-color active-icon' : ''}`"/>
          </div>
        </b-col>

        <b-col lg="9" md="8" class="right">
          <div v-for="(category, i) in categories" :key="category.id"
          :class="`sub-category category-${category.id}
          ${i == 0 ? '' : 'd-none'}`">
            <div class="title" @click="redirectProductSearch('category', category.id)">
              {{ category.name }}
            </div>
            <b-row class="sub-category-text mt-0">
              <b-col v-for="(sub) in category.subCategories" :key="sub.id"
              lg="4" md="6" class="text mt-4" @click="redirectProductSearch('subCategory', sub.id)">
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
    transition: transform .2s ease-out;
    top: 1.75rem;
    left: 0;
    padding-top: 1rem;
    font-size: 0.9375em;

    .menu-list {
      overflow-x: hidden;
      background-color: #FFF;
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
              font-size: 1.0625em;

              .chev-icon {
                color: #999;
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

  // #Device = Mobiles
  @media (min-width: 320px) and (max-width: 480px) {

  }
  // #Device = Mobiles

  // #Device = Low Resolution Tablets
  @media (min-width: 481px) and (max-width: 767px) {

  }
  // #Device = Low Resolution Tablets

  // #Device = Tablets, Ipads
  @media (min-width: 768px) and (max-width: 1024px) {
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
  // #Device = Tablets, Ipads

  // #Device = Laptops, Desktops
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
  // #Device = Laptops, Desktops

</style>

<script>

export default {

  props: {
    categories: {
      type: Array,
      required: true,
    },
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
      const menu = document.querySelector('.menu-list');
      const category = menu.querySelector(`.category-text.category-${id}`);
      const chevIcon = category.querySelector('.chev-icon');

      category.classList.add('active-color');
      chevIcon.classList.add('active-color');
      chevIcon.classList.add('active-icon');

      const subCategory = menu.querySelector(`.sub-category.category-${id}`);
      subCategory.classList.remove('d-none');
    },

    redirectProductSearch(type, value) {
      this.$router.push({
        name: 'ProductSearch',
        params: {
          type,
          value,
        },
      });
    },
  },

};

</script>
