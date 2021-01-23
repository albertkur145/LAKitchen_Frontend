<template>
  <div>
    <TemplateContent>
      <template v-slot:title>
        <span>{{ headerTitle }}</span>
      </template>

      <template v-slot:content>
        <div class="container-la graph-container">
          <div class="title">{{ title }}</div>

          <div class="graph" v-if="chartOptions.series.data !== null">
            <apexchart width="98.9%" height="420"
            :options="chartOptions.options" :series="chartOptions.series"/>
          </div>
        </div>

        <div class="container-la table-container">
          <div class="head">
            <div class="position-relative">
              <select @change="selectChange" v-model="selectedCategory"
              class="select-la bg-white" v-if="categories.length > 0">
                <option v-for="val in categories"
                :key="val.id" :value="val.id">
                  {{ val.name }}
                </option>
              </select>

              <font-awesome-icon icon="chevron-down" class="chev-icon"/>
            </div>
          </div>

          <b-table-simple responsive class="mt-4">
            <b-thead>
              <slot name="thead"></slot>
            </b-thead>

            <b-tbody>
              <slot name="tbody"></slot>
            </b-tbody>
          </b-table-simple>

          <slot name="is-empty"></slot>
        </div>
      </template>
    </TemplateContent>
  </div>
</template>

<style lang="scss" scoped>

  // global css
  .container-la {
    margin-bottom: 1rem;
    border-radius: 0.5rem;
    background-color: #FFF;
    padding: 0.875rem 1.125rem;
  }

  .graph-container {

    .title {
      color: #996BBC;
      font-weight: 600;
      text-align: center;
      font-size: 0.875em;
    }

    .graph {
      overflow: hidden;
      margin-top: 1rem;
    }
  }

  .table-container {

    .head {
      display: flex;
      flex-wrap: wrap;

      .select-la {
        width: 100%;
        outline: none;
        color: #3F3F3F;
        -moz-appearance: none;
        -webkit-appearance: none;
        border-radius: 0.3125rem;
        border: 0.0625rem solid #AAA;
        padding: 0.4375rem 3.25rem 0.4375rem 1rem;
        font-size: 0.875em;

        &:focus {
          border: 0.0625rem solid #BF67E9;
          box-shadow: 0 0 0.0625rem 0.125rem rgba($color: #BF67E9, $alpha: 0.3)
        }
      }

      .chev-icon {
        color: #BFBFBF;
        position: absolute;
        top: 0.875rem;
        right: 0.875rem;
        font-size: 0.6875em;
      }
    }
  }
  // global css

  // #Device = Mobiles
  @media (min-width: 320px) and (max-width: 480px) {
    .table-container {

      .head {

        .select-la {
          width: unset;
          font-size: 0.875em;
        }

        .chev-icon {
          right: 1rem;
          font-size: 0.75em;
        }
      }
    }
  }
  // #Device = Mobiles

  // #Device = Low Resolution Tablets
  @media (min-width: 481px) and (max-width: 767px) {
    .container-la {
      padding: 1rem 1.5rem;
    }

    .graph-container {

      .title {
        font-size: 0.9375em;
      }
    }

    .table-container {

      .head {

        .select-la {
          width: unset;
          font-size: 0.875em;
        }

        .chev-icon {
          right: 1rem;
          font-size: 0.75em;
        }
      }
    }
  }
  // #Device = Low Resolution Tablets

  // #Device = Tablets, Ipads
  @media (min-width: 768px) and (max-width: 1024px) {
    .container-la {
      padding: 1.25rem 1.75rem;
    }

    .graph-container {

      .title {
        font-size: 1em;
      }
    }

    .table-container {

      .head {

        .select-la {
          width: unset;
          font-size: 0.9375em;
        }

        .chev-icon {
          right: 1rem;
          font-size: 0.75em;
        }
      }
    }
  }
  // #Device = Tablets, Ipads

  // #Device = Laptops, Desktops
  @media (min-width: 1025px) {
    .container-la {
      padding: 1.25rem 1.75rem;
    }

    .graph-container {

      .title {
        font-size: 1.0625em;
      }
    }

    .table-container {

      .head {

        .select-la {
          width: unset;
          font-size: 0.9375em;
        }

        .chev-icon {
          right: 1rem;
          font-size: 0.75em;
        }
      }
    }
  }
  // #Device = Laptops, Desktops

</style>

<script>

import TemplateContent from './TemplateContent.vue';

export default {

  props: {
    headerTitle: {
      required: true,
    },
    title: {
      required: true,
    },
    chartOptions: {
      required: true,
    },
    categories: {
      required: true,
    },
  },

  components: {
    TemplateContent,
  },

  data() {
    return {
      selectedCategory: '',
    };
  },

  methods: {
    selectChange() {
      this.$emit('changetrig', this.selectedCategory);
    },
  },

  created() {
    this.selectedCategory = this.categories[0].id;
  },

};

</script>
