<template>
  <b-row>
    <b-col lg="3" class="path">
      <SidePath/>
    </b-col>

    <b-col cols="12" lg="9" class="body-frame">
      <div class="title">{{ title }}</div>

      <div class="body">
        <slot name="content"></slot>
      </div>
    </b-col>
  </b-row>
</template>

<style lang="scss" scoped>

  // global css
  .path {
    display: none;
  }

  .body-frame {

    .title {
      color: #FF6B00;
      font-weight: 500;
      font-size: 1.125em;
    }

    .body {
      background-color: #FFF;
      box-shadow: 0 0 0.0625rem 0.0625rem rgba($color: #000000, $alpha: 0.2);
      margin-top: 0.5rem;
      padding: 1rem 1.5rem;
    }
  }
  // global css

  // #Device = Mobiles
  @media (min-width: 320px) and (max-width: 480px) {
    .body-frame {

      .title {
        font-size: 1.25em;
      }

      .body {
        padding: 1.25rem 1.75rem;
      }
    }
  }
  // #Device = Mobiles

  // #Device = Low Resolution Tablets
  @media (min-width: 481px) and (max-width: 767px) {
    .body-frame {

      .title {
        font-size: 1.3125em;
      }

      .body {
        padding: 1.5rem 2rem;
      }
    }
  }
  // #Device = Low Resolution Tablets

  // #Device = Tablets, Ipads
  @media (min-width: 768px) and (max-width: 1024px) {
    .body-frame {

      .title {
        font-size: 1.375em;
      }

      .body {
        padding: 1.75rem 2.25rem;
      }
    }
  }
  // #Device = Tablets, Ipads

  // #Device = Laptops, Desktops
  @media (min-width: 1025px) {
    .path {
      display: block;
      padding-right: 1.75rem;
    }

    .body-frame {
      padding-left: 1.75rem;

      .title {
        font-size: 1.375em;
      }

      .body {
        padding: 2rem 2.5rem;
      }
    }
  }
  // #Device = Laptops, Desktops

</style>

<script>

import SidePath from '@/components/user/SidePath.vue';

export default {

  props: {
    title: {
      required: true,
    },
  },

  components: {
    SidePath,
  },

};

</script>
