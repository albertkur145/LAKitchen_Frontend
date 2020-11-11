<template>
  <div id="app">
    <Header @show="showBackground" @hide="hideBackground"/>
    <div class="bg-all"></div>

    <div class="content">
      <span @click="back" class="path-back">Kembali</span>
      <b-row class="assessment">
        <b-col class="head" cols="12">
          <span class="title">Penilaian Produk ({{ assessment.length }})</span>
        </b-col>

        <b-col cols="12">
          <UserAssessment :assessment="val" v-for="val in assessment" :key="val.id"/>
        </b-col>
      </b-row>
    </div>

    <Loader :class="`${loader ? '' : 'd-none'}`"/>
    <Footer/>
  </div>
</template>

<style lang="scss" scoped>

  // global css
  #app {

    .bg-all {
      position: fixed;
      height: 0;
      background-color: rgba($color: #000000, $alpha: 0.5);
      z-index: 2;
      opacity: 0;
      transition: opacity .3s ease-in-out;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }

    .content {
      padding: 7.25rem 0.875rem;

      .path-back {
        display: inline-block;
        cursor: pointer;
        color: #0047FF;
        padding: 0.25rem 0 0.5rem;
        font-size: 0.75em;
      }

      .assessment {
        margin: 0;
        border-radius: 0.5rem;
        background-color: #FFF;
        box-shadow: 0 0 0.125rem rgba($color: #000000, $alpha: 0.6);
        padding: 0.9375rem 0;

        .head {

          .title {
            color: #333;
            font-weight: 500;
            font-size: 0.8125em;
          }
        }
      }
    }
  }
  // global css

  // #Device = Mobiles
  @media (min-width: 320px) and (max-width: 480px) {
    #app {

      .content {
        padding: 7.5rem 1rem;

        .path-back {
          padding: 0.25rem 0 0.5rem;
          font-size: 0.8125em;
        }

        .assessment {
          padding: 0.9375rem 0;

          .head {

            .title {
              font-size: 0.875em;
            }
          }
        }
      }
    }
  }
  // #Device = Mobiles

  // #Device = Low Resolution Tablets
  @media (min-width: 481px) and (max-width: 767px) {
    #app {

      .content {
        padding: 7.5rem 1rem;

        .path-back {
          padding: 0 0 0.5rem;
          font-size: 0.875em;
        }

        .assessment {
          padding: 1.75rem 1.5rem;

          .head {

            .title {
              font-size: 1.125em;
            }
          }
        }
      }
    }
  }
  // #Device = Low Resolution Tablets

  // #Device = Tablets, Ipads
  @media (min-width: 768px) and (max-width: 1024px) {
    #app {

      .content {
        padding: 7.75rem 1.5rem;

        .path-back {
          padding: 0 0 0.5rem;
          font-size: 0.9375em;
        }

        .assessment {
          padding: 1.5rem 0.75rem;

          .head {

            .title {
              font-size: 1.25em;
            }
          }
        }
      }
    }
  }
  // #Device = Tablets, Ipads

  // #Device = Laptops, Desktops
  @media (min-width: 1025px) {
    #app {

      .content {
        padding: 8rem 1.875rem;

        .path-back {
          padding: 0 0 0.5rem;
          font-size: 1em;
        }

        .assessment {
          padding: 2rem 1.25rem;

          .head {

            .title {
              font-size: 1.3125em;
            }
          }
        }
      }
    }
  }
  // #Device = Laptops, Desktops

</style>

<script>

import Loader from '@/components/Loader.vue';
import Header from '@/components/user/Header.vue';
import Footer from '@/components/user/Footer.vue';
import { mapGetters, mapActions } from 'vuex';
import UserAssessment from '@/components/user/UserAssessment.vue';

export default {

  components: {
    Header,
    Footer,
    UserAssessment,
    Loader,
  },

  data() {
    return {
      paramId: null,
      assessment: [],
      loader: false,
    };
  },

  computed: {
    ...mapGetters('assessment', [
      'assessmentList',
    ]),
  },

  methods: {
    ...mapActions('assessment', [
      'getAssessment',
    ]),

    async getAssessmentList() {
      this.loader = true;

      const { code } = await this.$func.promiseAPI(this.getAssessment, {
        productId: this.paramId,
      });

      this.loader = false;

      if (code >= 200 && code < 300) {
        this.assessment = this.assessmentList.assessment;
      } else {
        this.$func.popupConnectionError();
      }
    },

    showBackground() {
      const el = document.querySelector('.bg-all');
      el.style.opacity = '1';
      el.style.height = 'inherit';
    },

    hideBackground() {
      const el = document.querySelector('.bg-all');
      el.style.opacity = '0';
      el.style.height = '0';
    },

    back() {
      this.$router.replace({
        name: 'DetailProduct',
        params: {
          id: this.paramId,
        },
      });
    },
  },

  created() {
    this.paramId = parseInt(this.$route.params.id, 10);
    this.getAssessmentList();
  },

};

</script>
