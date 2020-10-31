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
    z-index: 1;
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

  // #Device = Mobiles
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
  // #Device = Mobiles

  // #Device = Low Resolution Tablets
  @media (min-width: 481px) and (max-width: 767px) {
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
  // #Device = Low Resolution Tablets

  // #Device = Tablets, Ipads
  @media (min-width: 768px) and (max-width: 1024px) {

  }
  // #Device = Tablets, Ipads

  // #Device = Laptops, Desktops
  @media (min-width: 1025px) {

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
      const subCategories = document.querySelector(`.sub-category-${id}`);
      subCategories.classList.toggle('d-none');
    },
  },

};

</script>
