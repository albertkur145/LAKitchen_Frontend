<template>
  <b-row class="user-rating">
    <b-col md="1" cols="2" class="avatar">
      <span><font-awesome-icon icon="user-alt" class="user-icon"/></span>
    </b-col>

    <b-col md="11" cols="10" class="desc-assest">
      <b-row>
        <b-col md="2" cols="12">
          <div class="username">{{ getUsername(assessment.user.name) }}</div>
          <div class="date">{{ assessment.date }}</div>
        </b-col>

        <b-col md="10" cols="12">
          <div class="rate">
            <font-awesome-icon v-for="i in 5" :key="i" icon="star"
            :class="`star-icon${ i <= assessment.rate ? ' fill-color' : '' }`"/>
          </div>

          <div class="comment">{{ assessment.comment }}</div>
        </b-col>
      </b-row>
    </b-col>

    <b-col cols="12" class="line"></b-col>
  </b-row>
</template>

<style lang="scss" scoped>

  // global css
  .user-rating {
    padding: 0;

    .avatar {
      margin-top: 1.25rem;

      span {
        display: inline-block;
        border-radius: 100rem;
        background-color: #AAA;
        padding: 0 0.4375rem 0.0625rem;

        .user-icon {
          color: #FFF;
          font-size: 0.625em;
        }
      }
    }

    .desc-assest {
      margin-top: 1.25rem;

      .username {
        color: #444;
        font-weight: 500;
        font-size: 0.8125em;
      }

      .date {
        color: #888;
        margin-top: 0;
        margin-top: 0.125rem;
        font-size: 0.6875em;
      }

      .rate {
        color: #BBB;
        margin-top: 0.25rem;
        font-size: 0.75em;
      }

      .comment {
        color: #333;
        margin-top: 0.75rem;
        font-size: 0.6875em;
      }
    }

    .line {
      border-top: 0.0625rem solid #CCC;
      margin-top: 1.25rem;
    }

    .fill-color {
      color: #F07300 !important;
    }
  }
  // global css

  // #Device = Mobiles
  @media (min-width: 320px) and (max-width: 480px) {
    .user-rating {
      padding: 0;

      .avatar {
        margin-top: 1.25rem;

        span {
          padding: 0 0.4375rem 0.0625rem;

          .user-icon {
            font-size: 0.625em;
          }
        }
      }

      .desc-assest {
        margin-top: 1.25rem;

        .username {
          font-size: 0.875em;
        }

        .date {
          font-size: 0.75em;
        }

        .rate {
          font-size: 0.8125em;
        }

        .comment {
          font-size: 0.75em;
        }
      }

      .line {
        margin-top: 1.25rem;
      }
    }
  }
  // #Device = Mobiles

  // #Device = Low Resolution Tablets
  @media (min-width: 481px) and (max-width: 767px) {
    .user-rating {
      padding: 0;

      .avatar {
        margin-top: 1.5rem;

        span {
          padding: 0.3125rem 0.625rem;

          .user-icon {
            font-size: 0.8125em;
          }
        }
      }

      .desc-assest {
        margin-top: 1.5rem;

        .username {
          font-size: 0.9375em;
        }

        .date {
          font-size: 0.8125em;
        }

        .rate {
          margin-top: 0.25rem;
          font-size: 0.875em;
        }

        .comment {
          margin-top: 0.75rem;
          font-size: 0.8125em;
        }
      }

      .line {
        margin-top: 1.5rem;
      }
    }
  }
  // #Device = Low Resolution Tablets

  // #Device = Tablets, Ipads
  @media (min-width: 768px) and (max-width: 1024px) {
    .user-rating {
      padding: 0;

      .avatar {
        margin-top: 2rem;

        span {
          padding: 0.5rem 0.75rem;

          .user-icon {
            font-size: 0.875em;
          }
        }
      }

      .desc-assest {
        margin-top: 2rem;

        .username {
          font-size: 1em;
        }

        .date {
          font-size: 0.8125em;
        }

        .rate {
          margin-top: 0;
          font-size: 0.9375em;
        }

        .comment {
          margin-top: 0.75rem;
          font-size: 0.9375em;
        }
      }

      .line {
        margin-top: 2rem;
      }
    }
  }
  // #Device = Tablets, Ipads

  // #Device = Laptops, Desktops
  @media (min-width: 1025px) {
    .user-rating {
      padding: 0.5rem 0;

      .avatar {
        margin-top: 2rem;

        span {
          padding: 0.625rem 0.875rem;

          .user-icon {
            font-size: 1em;
          }
        }
      }

      .desc-assest {
        margin-top: 2rem;

        .username {
          font-size: 1.0625em;
        }

        .date {
          font-size: 0.875em;
          margin-top: 0.125rem;
        }

        .rate {
          margin-top: 0;
          font-size: 1em;
        }

        .comment {
          margin-top: 0.75rem;
          font-size: 1em;
        }
      }

      .line {
        margin-top: 2rem;
      }
    }
  }
  // #Device = Laptops, Desktops

</style>

<script>

export default {

  props: {
    assessment: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      windowWidth: null,
    };
  },

  mounted() {
    window.addEventListener('resize', this.getWindowWidth);
  },

  methods: {
    getWindowWidth() {
      this.windowWidth = window.innerWidth;
    },

    getUsername(str) {
      if (this.windowWidth >= 768) {
        const name = str.split(' ');
        let fullname = name[0];

        name.shift();
        name.forEach((val) => {
          fullname += ` ${val[0]}`;
        });

        return fullname;
      }

      return str;
    },
  },

  created() {
    this.getWindowWidth();
  },

};

</script>
