<template>
  <div class="profile-path">
    <div class="profile">
      <div class="d-flex justify-content-between align-items-center">
        <b-avatar class="avatar">AK</b-avatar>

        <div class="user">
          <div class="username">Albert Kurniawan</div>
          <div class="register-at">Terdaftar sejak Okt 2016</div>
        </div>
      </div>

      <div>
        <font-awesome-icon class="chev-icon" icon="chevron-right"/>
      </div>
    </div>

    <div class="other-path">
      <div class="path">
        <b-row class="text-path">
          <b-col cols="1"><font-awesome-icon icon="shopping-cart"/></b-col>
          <b-col cols="9"><span class="ml-1">Keranjang</span></b-col>
          <font-awesome-icon class="chev-icon" icon="chevron-right"/>
        </b-row>
      </div>

      <div v-for="(value, index) in profilePath" :key="index"
      class="path" @click="redirect(value.route)">
        <b-row class="text-path">
          <b-col cols="1"><font-awesome-icon :icon="value.icon"/></b-col>
          <b-col cols="9"><span class="ml-1">{{ value.name }}</span></b-col>
          <font-awesome-icon class="chev-icon" icon="chevron-right"/>
        </b-row>
      </div>

      <div class="path">
        <b-row class="text-path" @click="logout">
          <b-col cols="1"><font-awesome-icon icon="sign-out-alt"/></b-col>
          <b-col cols="9"><span class="ml-1">Keluar</span></b-col>
          <font-awesome-icon class="chev-icon" icon="chevron-right"/>
        </b-row>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

  // global css
  .profile-path {

    .profile {
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      border-radius: 0.375rem;
      border: 0.0625rem solid #BBB;
      transition: .2s all ease-out;
      padding: 0.5rem;

      &:hover .chev-icon {
        color: #FF6C2D;
      }

      &:hover {
        border: 0.0625rem solid #FF6C2D;
      }

      .avatar {
        background-image: radial-gradient(#FF8541, #FF7222, #FF5C00);
        font-weight: 500;
        width: 2.25rem;
        height: 2.25rem;
        font-size: 0.5875rem;
      }

      .user {
        margin-left: 0.5rem;

        .username {
          font-weight: 500;
          color: #333;
          font-size: 0.75em;
        }

        .register-at {
          color: #AAA;
          font-size: 0.5875em;
        }
      }

      .chev-icon {
        color: #CCC;
        font-size: 0.5em;
      }
    }

    .other-path {
      border-radius: 0.375rem;
      border: 0.0625rem solid #BBB;
      margin-top: 1.25rem;
      padding: 0.25rem 0.5rem 1rem;

      .path {
        border-bottom: 0.0625rem solid #BBB;
        cursor: pointer;
        box-sizing: border-box;
        padding: 0.625rem 0 0.625rem 0.5rem;

        .text-path {
          position: relative;
          color: #3F3F3F;
          font-size: 0.75em;

          .chev-icon {
            position: absolute;
            top: 0.375rem;
            right: 2rem;
            color: #AAA;
            font-size: 0.5em;
          }

          &:hover, &:hover .chev-icon {
            color: #222;
          }
        }
      }
    }
  }
  // global css

  // #Device = Mobiles
  @media (min-width: 320px) and (max-width: 480px) {
    .profile-path {

      .profile {
        padding: 0.75rem;

        .avatar {
          width: 2.75rem;
          height: 2.75rem;
          font-size: 0.75rem;
        }

        .user {
          margin-left: 0.75rem;

          .username {
            font-size: 0.875em;
          }

          .register-at {
            font-size: 0.6875em;
          }
        }

        .chev-icon {
          font-size: 0.625em;
        }
      }

      .other-path {

        .path {
          padding: 0.6875rem 0 0.6875rem 0.75rem;

          .text-path {
            font-size: 0.8125em;

            .chev-icon {
              font-size: 0.625em;
            }
          }
        }
      }
    }
  }
  // #Device = Mobiles

  // #Device = Low Resolution Tablets
  @media (min-width: 481px) and (max-width: 767px) {
    .profile-path {

      .profile {
        padding: 1rem 1.25rem;

        .avatar {
          width: 3rem;
          height: 3rem;
          font-size: 1rem;
        }

        .user {
          margin-left: 1rem;

          .username {
            font-size: 1em;
          }

          .register-at {
            font-size: 0.8125em;
          }
        }

        .chev-icon {
          font-size: 0.8125em;
        }
      }

      .other-path {

        .path {
          padding: 0.75rem 0 0.75rem 1.25rem;

          .text-path {
            font-size: 0.875em;

            .chev-icon {
              font-size: 0.625em;
            }
          }
        }
      }
    }
  }
  // #Device = Low Resolution Tablets

  // #Device = Tablets, Ipads
  @media (min-width: 768px) and (max-width: 1024px) {
    .profile-path {

      .profile {
        padding: 1rem 1.25rem;

        .avatar {
          width: 3.75rem;
          height: 3.75rem;
          font-size: 1.375rem;
        }

        .user {
          margin-left: 1.5rem;

          .username {
            font-size: 1.125em;
          }

          .register-at {
            font-size: 0.875em;
          }
        }

        .chev-icon {
          font-size: 0.9375em;
        }
      }

      .other-path {

        .path {
          padding: 0.75rem 0 0.75rem 1.5rem;

          .text-path {
            font-size: 0.9375em;

            .chev-icon {
              font-size: 0.75em;
            }
          }
        }
      }
    }
  }
  // #Device = Tablets, Ipads

  // #Device = Laptops, Desktops
  @media (min-width: 1025px) {

  }
  // #Device = Laptops, Desktops

</style>

<script>

export default {

  computed: {
    profilePath() {
      return this.$func.pathUser();
    },
  },

  methods: {
    logout() {
      this.$cookies.remove('token');
      this.$cookies.remove('user');
      window.location.reload();
    },

    redirect(route) {
      this.$router.push(route);
    },
  },

};

</script>
