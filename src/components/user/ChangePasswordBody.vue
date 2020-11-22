<template>
  <div>
    <b-row v-for="(val, i) in inputGroup" :key="i"
    class="input-group-la">
      <b-col cols="12" md="7">
        <label>{{ val.label }}</label>
      </b-col>

      <b-col cols="12" md="7">
        <input type="password" class="input-text" v-model="form[val.form]"
        @keyup="val.keyup" :placeholder="val.placeholder" autocomplete="off">

        <b-form-text :class="`warning-text${validate[val.validate] ? ' d-none' : ''}`">
          {{ val.warning }}
        </b-form-text>
      </b-col>
    </b-row>

    <button class="btn-save" @click="validationForm">Simpan</button>
  </div>
</template>

<style lang="scss" scoped>

  // global css
  .input-group-la {
    margin-bottom: 1rem;

    label {
      color: #333;
      font-weight: 500;
      font-size: 0.75em;
    }

    .input-text {
      margin-top: -0.125rem;
      width: 100%;
      outline: none;
      color: #222;
      border-radius: 0.25rem;
      transition: border .1s linear;
      border: 0.0625rem solid #BBB;
      padding: 0.5875rem 0.875rem;
      font-size: 0.75em;

      &::placeholder {
        color: #888;
      }

      &:focus {
        border: 0.0625rem solid #777;
      }

      &:focus::placeholder {
        color: #555;
      }
    }

    .warning-text {
      font-size: 0.75em;
      color: #FF003D !important;
    }
  }

  .btn-save {
    width: 100%;
    color: #FFF;
    margin-top: 0.5rem;
    font-weight: 500;
    border-radius: 0.375rem;
    text-transform: uppercase;
    background-color: #43A3E9;
    transition: background-color .2s ease-out;
    padding: 0.625rem;
    font-size: 0.75em;

    &:hover {
      background-color: #3698DF;
    }
  }
  // global css

  // #Device = Mobiles
  @media (min-width: 320px) and (max-width: 480px) {
    .input-group-la {
      margin-bottom: 1rem;

      label {
        font-size: 0.8125em;
      }

      .input-text {
        padding: 0.625rem 1rem;
        font-size: 0.8125em;
      }

      .warning-text {
        font-size: 0.8125em;
      }
    }

    .btn-save {
      padding: 0.6875rem;
      font-size: 0.8125em;
    }
  }
  // #Device = Mobiles

  // #Device = Low Resolution Tablets
  @media (min-width: 481px) and (max-width: 767px) {
    .input-group-la {
      margin-bottom: 1.25rem;

      label {
        font-size: 0.8125em;
      }

      .input-text {
        padding: 0.625rem 1rem;
        font-size: 0.875em;
      }

      .warning-text {
        font-size: 0.8125em;
      }
    }

    .btn-save {
      padding: 0.75rem;
      font-size: 0.875em;
    }
  }
  // #Device = Low Resolution Tablets

  // #Device = Tablets, Ipads
  @media (min-width: 768px) and (max-width: 1024px) {
    .input-group-la {
      margin-bottom: 1.25rem;

      label {
        font-size: 0.8125em;
      }

      .input-text {
        padding: 0.625rem 1rem;
        font-size: 0.875em;
      }

      .warning-text {
        font-size: 0.8125em;
      }
    }

    .btn-save {
      width: unset;
      padding: 0.75rem;
      font-size: 0.875em;
    }
  }
  // #Device = Tablets, Ipads

  // #Device = Laptops, Desktops
  @media (min-width: 1025px) {
    .input-group-la {
      margin-bottom: 1.25rem;

      label {
        font-size: 0.8125em;
      }

      .input-text {
        padding: 0.625rem 1rem;
        font-size: 0.875em;
      }

      .warning-text {
        font-size: 0.8125em;
      }
    }

    .btn-save {
      width: unset;
      padding: 0.75rem 1.75rem;
      font-size: 0.875em;
    }
  }
  // #Device = Laptops, Desktops

</style>

<script>

export default {

  data() {
    return {
      form: {
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      },

      validate: {
        oldPassword: true,
        newPassword: true,
        confirmNewPassword: true,
      },

      inputGroup: [
        {
          label: 'Kata Sandi Lama',
          placeholder: 'Masukkan kata sandi saat ini',
          form: 'oldPassword',
          validate: 'oldPassword',
          warning: 'Kata sandi harus diisi.',
          keyup: () => { this.validateOldPassword(); },
        },
        {
          label: 'Kata Sandi Baru',
          placeholder: 'Masukkan kata sandi baru',
          form: 'newPassword',
          validate: 'newPassword',
          warning: 'Kata sandi baru harus diisi.',
          keyup: () => { this.validateNewPassword(); },
        },
        {
          label: 'Konfirmasi Kata Sandi Baru',
          placeholder: 'Konfirmasi kata sandi baru',
          form: 'confirmNewPassword',
          validate: 'confirmNewPassword',
          warning: 'Konfirmasi kata sandi tidak sama.',
          keyup: () => { this.validateConfirmPassword(); },
        },
      ],
    };
  },

  methods: {
    async validationForm() {
      if (this.validateOldPassword() && this.validateNewPassword()
      && this.validateConfirmPassword()) {
        const res = await this.$func.popupConfirmAction(
          'Yakin ingin mengubah kata sandi?',
          'Yakin',
          'Tidak',
        );

        if (res) {
          this.$emit('changepassword', this.form);
        }
      }
    },

    validateOldPassword() {
      if (this.form.oldPassword.length === 0) {
        this.validate.oldPassword = false;
        return 0;
      }

      this.validate.oldPassword = true;
      return 1;
    },

    validateNewPassword() {
      if (this.form.newPassword.length === 0) {
        this.validate.newPassword = false;
        return 0;
      }

      this.validate.newPassword = true;
      return this.validateConfirmPassword();
    },

    validateConfirmPassword() {
      if (this.form.confirmNewPassword !== this.form.newPassword) {
        this.validate.confirmNewPassword = false;
        return 0;
      }

      this.validate.confirmNewPassword = true;
      return 1;
    },
  },

};

</script>
