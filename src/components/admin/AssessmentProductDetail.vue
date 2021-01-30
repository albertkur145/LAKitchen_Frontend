<template>
  <div>
    <TemplateContent>
      <template v-slot:title>
        <span>
          <router-link to="/admin/product/assessment"
          class="back">Penilaian Produk</router-link>
        </span>

        <span>
          <font-awesome-icon icon="chevron-right" class="chev-icon"/>
        </span>

        <span>{{ productName }}</span>
      </template>

      <template v-slot:content>
        <div class="container-la product-rating" v-if="assessment !== null">
          <div class="mr-4">
            <div class="rate" v-for="val in rateLoop" :key="val.name">
              <font-awesome-icon v-for="i in 5" :key="i" icon="star"
              :class="`star-icon${i <= val.value ? ' fill-color' : ''}`"/>

              <span class="text">({{ assessment.rate[val.name] }})</span>
            </div>

            <div class="mt-4">
              <div class="text-val">Total penilaian : {{ assessment.totalAssessment || 0 }}</div>
              <div class="text-val">Jumlah penilai : {{ assessment.evaluators }}</div>
            </div>
          </div>

          <div class="rating">Rating : {{ assessment.rating || 0 }}</div>
        </div>

        <div v-if="assessment !== null"
        class="container-la comment-container">
          <div class="title">Ulasan ({{ assessment.evaluators }})</div>

          <div class="mt-4" v-if="commentsProduct.length > 0">
            <b-row v-for="val in commentsProduct" :key="val.id"
            class="comment">
              <b-col md="1" cols="2" class="avatar">
                <span><font-awesome-icon icon="user-alt" class="user-icon"/></span>
              </b-col>

              <b-col md="11" cols="10">
                <b-row>
                  <b-col md="2" cols="12">
                    <div class="username">{{ getUsername(val.username) }}</div>
                    <div class="date">{{ val.date }}</div>
                  </b-col>

                  <b-col md="10" cols="12" class="assess">
                    <font-awesome-icon v-for="i in 5" :key="i" icon="star"
                    :class="`star-icon${i <= val.rate ? ' fill-color' : ''}`"/>

                    <div class="message" v-if="val.deletedAt == null">
                      {{ val.comment }}
                    </div>
                  </b-col>
                </b-row>
              </b-col>

              <div class="remove" @click="confirmDelete(val.id)">
                <font-awesome-icon icon="times"/>
              </div>
            </b-row>

            <div class="paging" v-if="paging !== null">
              <span v-for="i in paging" :key="i" @click="getAllComment(i)"
              :class="`page${i === activePage ? ' active-page' : ''}`">
                {{ i }}
              </span>
            </div>
          </div>
        </div>
      </template>
    </TemplateContent>

    <Loader :class="`${loader ? '' : 'd-none'}`"/>
  </div>
</template>

<style lang="scss" scoped>

  // global css
  .fill-color {
    color: #FF9900 !important;
  }

  .star-icon {
    color: #CCC;
    margin-right: 0.125rem;
  }

  .chev-icon {
    display: none;
    color: #AFAFAF;
    margin: 0 0.75rem 0.0625rem;
    font-size: 0.5em;
  }

  .back {
    display: none;
    font-weight: 400;
    color: #AFAFAF;
  }

  .container-la {
    border-radius: 0.5rem;
    background-color: #FFF;
    margin-bottom: 1rem;
    padding: 0.875rem 1.125rem;

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

  .product-rating {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    .rate {
      display: flex;
      align-items: center;
      margin-bottom: 0.75rem;
      font-size: 1em;

      .text {
        color: #666;
        margin-left: 1rem;
      }
    }

    .text-val {
      color: #2F2F2F;
      margin-bottom: 0.375rem;
      font-size: 0.9375em;
    }

    .rating {
      color: #9E00FF;
      font-weight: 600;
      text-align: center;
      margin: 1rem auto;
      font-size: 2em;
    }
  }

  .comment-container {

    .title {
      color: #373737;
      font-weight: 600;
      font-size: 1.0625em;
    }

    .comment {
      position: relative;
      border-radius: 0.5rem;
      border: 0.0625rem solid #CCC;
      margin: 0;
      margin-bottom: 1rem;
      padding: 0.75rem 0;

      .avatar {

        span {
          display: inline-block;
          border-radius: 100rem;
          background-color: #AAA;
          margin-top: 0.125rem;
          margin-bottom: 0.5rem;
          padding: 0 0.5rem 0.1875rem;

          .user-icon {
            color: #FFF;
            font-size: 0.625em;
          }
        }
      }

      .username {
        color: #444;
        font-weight: 600;
        font-size: 0.9375em;
      }

      .date {
        color: #888;
        font-size: 0.8125em;
      }

      .assess {

        .star-icon {
          margin-right: 0;
          margin-top: 0.5rem;
          font-size: 0.9375em;
        }

        .message {
          color: #444;
          margin-top: 0.5rem;
          font-size: 0.875em;
        }
      }

      .remove {
        color: #FFF;
        cursor: pointer;
        position: absolute;
        border-radius: 100rem;
        background-color: #FE808F;
        top: -0.375rem;
        right: -0.375rem;
        font-size: 0.75em;
        padding: 0.25rem 0.5875rem;
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
    .chev-icon {
      display: block;
    }

    .back {
      display: block;
    }

    .container-la {
      padding: 1rem 1.5rem;

      .is-empty {
        font-size: 0.9375em;
      }
    }

    .product-rating {

      .rate {
        font-size: 1.0625em;
      }

      .text-val {
        font-size: 1em;
      }

      .rating {
        font-size: 2.5em;
      }
    }

    .comment-container {

      .title {
        font-size: 1.125em;
      }

      .comment {
        padding: 1rem 0.5rem;

        .avatar {

          span {
            padding: 0.375rem 0.6875rem 0.4375rem;

            .user-icon {
              font-size: 0.875em;
            }
          }
        }

        .username {
          font-size: 1em;
        }

        .date {
          font-size: 0.875em;
        }

        .assess {

          .star-icon {
            font-size: 1em;
          }

          .message {
            font-size: 0.9375em;
          }
        }
      }
    }
  }
  // #Device = Low Resolution Tablets

  // #Device = Tablets, Ipads
  @media (min-width: 768px) and (max-width: 1024px) {
    .chev-icon {
      display: block;
    }

    .back {
      display: block;
    }

    .container-la {
      padding: 1.5rem 2rem;

      .is-empty {
        font-size: 1em;
      }

      .paging {

        .page {
          font-size: 0.9375em;
        }
      }
    }

    .product-rating {

      .rate {
        font-size: 1.125em;
      }

      .text-val {
        font-size: 1.0625em;
      }

      .rating {
        font-size: 3em;
      }
    }

    .comment-container {

      .title {
        font-size: 1.25em;
      }

      .comment {
        padding: 1.25rem 0.75rem;

        .avatar {

          span {
            padding: 0.5rem 0.75rem;

            .user-icon {
              font-size: 0.9375em;
            }
          }
        }

        .username {
          font-size: 1.0625em;
        }

        .date {
          font-size: 0.9375em;
        }

        .assess {

          .star-icon {
            margin-top: 0;
            font-size: 1.25em;
          }

          .message {
            font-size: 1em;
          }
        }
      }
    }
  }
  // #Device = Tablets, Ipads

  // #Device = Laptops, Desktops
  @media (min-width: 1025px) {
    .chev-icon {
      display: block;
    }

    .back {
      display: block;
    }

    .container-la {
      padding: 1.5rem 2rem;

      .is-empty {
        font-size: 1em;
      }

      .paging {

        .page {
          font-size: 0.9375em;
        }
      }
    }

    .product-rating {

      .rate {
        font-size: 1.125em;
      }

      .text-val {
        font-size: 1.0625em;
      }

      .rating {
        font-size: 3em;
      }
    }

    .comment-container {

      .title {
        font-size: 1.25em;
      }

      .comment {
        padding: 1.25rem 0.75rem;

        .avatar {

          span {
            padding: 0.5rem 0.75rem;

            .user-icon {
              font-size: 0.9375em;
            }
          }
        }

        .username {
          font-size: 1.0625em;
        }

        .date {
          font-size: 0.9375em;
        }

        .assess {

          .star-icon {
            margin-top: 0;
            font-size: 1.25em;
          }

          .message {
            font-size: 1em;
          }
        }
      }
    }
  }
  // #Device = Laptops, Desktops

</style>

<script>

import { mapActions, mapGetters } from 'vuex';
import Loader from '../Loader.vue';
import TemplateContent from './TemplateContent.vue';

export default {

  components: {
    Loader,
    TemplateContent,
  },

  data() {
    return {
      loader: false,
      windowWidth: null,
      paramId: null,

      paging: null,
      activePage: null,

      assessment: null,
      commentsProduct: [],

      rateLoop: [
        {
          name: 'five',
          value: 5,
        },
        {
          name: 'four',
          value: 4,
        },
        {
          name: 'three',
          value: 3,
        },
        {
          name: 'two',
          value: 2,
        },
        {
          name: 'one',
          value: 1,
        },
      ],
    };
  },

  computed: {
    ...mapGetters('adAssessment', [
      'assessmentProduct',
      'comments',
    ]),

    productName() {
      return this.assessmentProduct.product;
    },
  },

  mounted() {
    window.addEventListener('resize', this.getWindowWidth);
  },

  methods: {
    ...mapActions('adAssessment', [
      'getAssessment',
      'getComments',
      'deleteComment',
    ]),

    async getProductAssessment() {
      this.loader = true;

      const { code } = await this.$func.promiseAPI(this.getAssessment, {
        productId: parseInt(this.paramId, 10),
      });

      this.loader = false;

      if (code >= 200 && code < 300) {
        this.assessment = this.assessmentProduct;
      } else {
        this.$func.popupConnectionError(true);
      }
    },

    async getAllComment(page) {
      this.loader = true;

      const { code, paging } = await this.$func.promiseAPI(this.getComments, {
        productId: parseInt(this.paramId, 10),
        page,
      });

      this.loader = false;

      if (code >= 200 && code < 300) {
        this.commentsProduct = this.comments.comments;
        this.paging = Math.ceil(paging.count / paging.view);
        this.activePage = page;
      } else {
        this.$func.popupConnectionError(false);
      }
    },

    async delete(id) {
      this.loader = true;

      const { code } = await this.$func.promiseAPI(this.deleteComment, {
        id,
      });

      this.loader = false;

      if (code >= 200 && code < 300) {
        this.getAllComment(1);
        this.$func.popupSuccessNoRoute('Berhasil menghapus komentar');
      } else {
        this.$func.popupConnectionError(false);
      }
    },

    async confirmDelete(id) {
      const res = await this.$func.popupConfirmAction('Ingin menghapus komentar ini?', 'Ya', 'Tidak');

      if (res) {
        this.delete(id);
      }
    },

    getWindowWidth() {
      this.windowWidth = window.innerWidth;
    },

    getUsername(str) {
      const name = str.split(' ');

      if (name.length === 1) {
        return str;
      }

      let fullname = name[0];
      name.shift();
      fullname += ` ${name[0][0]}`;

      return fullname;
    },
  },

  created() {
    this.getWindowWidth();

    this.paramId = this.$route.params.id;
    this.getProductAssessment();
    this.getAllComment(1);
  },

};

</script>
