<template>
  <div class="d-flex flex-wrap">
    <img :src="require(`@/assets/images/${data.product.photo_link}.webp`)" alt="image">

    <div class="description">
      <div class="order d-flex flex-wrap">
        <span class="mr-1">{{ data.date }} |</span>
        <span>No Pesanan: {{ data.orderNumber }}</span>
      </div>

      <div class="product-name">{{ data.product.name }}</div>

      <div class="form">
        <b-form-rating size="lg" v-model="form.rate" variant="warning"></b-form-rating>

        <b-row class="mt-4">
          <b-col cols="12">
            <label>Punya komentar?</label>
          </b-col>

          <b-col cols="12">
            <b-form-textarea v-model="form.comment" class="input-text"
            placeholder="Beri komentar..." rows="5" max-rows="8"/>
          </b-col>
        </b-row>

        <button class="btn-send" @click="confirmSend">Kirim</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

  // global css
  img {
    border-radius: 0.5rem;
    width: 100%;
    margin-bottom: 1rem;
    margin-right: 1.5rem;
  }

  .description {
    margin-top: 0;

    .order {
      color: #888;
      font-size: 0.875em;
    }

    .product-name {
      color: #333;
      font-weight: 500;
      margin-top: 0.5rem;
      font-size: 1.1875em;
    }

    .form {
      margin-top: 1rem;

      label {
        color: #666;
        font-size: 0.9375em;
      }

      .input-text {
        color: #333;
        font-size: 1em;
      }

      .btn-send {
        color: #FFF;
        font-weight: 500;
        border-radius: 0.25rem;
        text-transform: uppercase;
        background-color: #209EE4;
        transition: background-color .2s ease-out;
        margin-top: 1.5rem;
        padding: 0.625rem 2rem;
        font-size: 0.75em;

        &:hover {
          background-color: #1597DF;
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
    img {
      width: 8rem;
      height: 8.25rem;
    }

    .description {
      margin-top: 0;

      .order {
        font-size: 0.8125em;
      }

      .product-name {
        font-size: 1.125em;
      }

      .form {

        label {
          font-size: 0.9375em;
        }

        .input-text {
          font-size: 1em;
        }

        .btn-send {
          padding: 0.625rem 2rem;
          font-size: 0.875em;
        }
      }
    }
  }
  // #Device = Low Resolution Tablets

  // #Device = Tablets, Ipads
  @media (min-width: 768px) and (max-width: 1024px) {
    img {
      width: 7rem;
      height: 7.25rem;
    }

    .description {
      margin-top: 0;

      .order {
        font-size: 0.8125em;
      }

      .product-name {
        font-size: 1.125em;
      }

      .form {

        label {
          font-size: 0.9375em;
        }

        .input-text {
          font-size: 1em;
        }

        .btn-send {
          padding: 0.625rem 2rem;
          font-size: 0.875em;
        }
      }
    }
  }
  // #Device = Tablets, Ipads

  // #Device = Laptops, Desktops
  @media (min-width: 1025px) {
    img {
      width: 7rem;
      height: 7.25rem;
    }

    .description {
      margin-top: 0;

      .order {
        font-size: 0.8125em;
      }

      .product-name {
        font-size: 1.125em;
      }

      .form {

        label {
          font-size: 0.9375em;
        }

        .input-text {
          font-size: 1em;
        }

        .btn-send {
          padding: 0.625rem 2rem;
          font-size: 0.875em;
        }
      }
    }
  }
  // #Device = Laptops, Desktops

</style>

<script>

export default {

  props: {
    data: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      form: {
        rate: 5,
        comment: '',
      },
    };
  },

  methods: {
    async confirmSend() {
      if (this.form.rate < 3 || this.form.comment.length === 0) {
        let text = '';

        if (this.form.rate < 3) {
          text = 'Kamu memberi bintang dibawah 3<br>Tetap mengirim?';
        } else if (this.form.comment.length === 0) {
          text = 'Kamu belum memberikan komentar<br>Tetap mengirim?';
        }

        const result = await this.$func.popupConfirmAction(text, 'Ya', 'Batalkan');
        if (result) {
          this.$emit('send', this.form);
        }
      } else {
        this.$emit('send', this.form);
      }
    },
  },

};

</script>
