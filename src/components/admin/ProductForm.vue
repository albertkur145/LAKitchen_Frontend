<template>
  <div>
    <TemplateContent>
      <template v-slot:title>
        <span>
          <router-link to="/admin/product" class="back">Jual Produk</router-link>
        </span>

        <span>
          <font-awesome-icon icon="chevron-right" class="chev-icon"/>
        </span>

        <span>{{ title }}</span>
      </template>

      <template v-slot:content>
        <div class="container-la">
          <b-row>
            <b-col cols="12" md="5" lg="4">
              <b-row class="input-group-la">
                <b-col cols="12">
                  <label>Nama produk</label>
                </b-col>

                <b-col cols="12">
                  <input type="text" class="input-text" @keyup="validateName"
                  v-model="form.name" placeholder="Masukkan nama produk" autocomplete="off">

                  <b-form-text :class="`warning-text${validateForm.name ? ' d-none' : ''}`">
                    Nama tidak boleh kosong.
                  </b-form-text>
                </b-col>
              </b-row>

              <b-row class="input-group-la">
                <b-col cols="12">
                  <label>Harga</label>
                </b-col>

                <b-col cols="12">
                  <input type="text" class="input-text" @blur="rupiahFormat"
                  @focus="restore" v-model="form.price" @keyup="validatePrice"
                  placeholder="Masukkan harga" autocomplete="off">

                  <b-form-text :class="`warning-text${validateForm.price ? ' d-none' : ''}`">
                    Harga tidak valid (mis: 75000)
                  </b-form-text>
                </b-col>
              </b-row>

              <b-row class="input-group-la">
                <b-col cols="12">
                  <label>Kategori</label>
                </b-col>

                <b-col cols="12">
                  <select class="input-text bg-white"
                  v-model="form.category" @change="fillSubCategory">
                    <option value="" disabled>-- PILIH KATEGORI --</option>
                    <option v-for="val in categories" :value="val.id" :key="val.id">
                      {{ val.name }}
                    </option>
                  </select>

                  <b-form-text :class="`warning-text${validateForm.category ? ' d-none' : ''}`">
                    Pilih kategori produk.
                  </b-form-text>
                </b-col>
              </b-row>

              <b-row class="input-group-la">
                <b-col cols="12">
                  <label>Sub Kategori</label>
                </b-col>

                <b-col cols="12">
                  <select class="input-text bg-white"
                  v-model="form.subCategory" @change="validateSubCategory">
                    <option value="" disabled>-- PILIH SUB KATEGORI --</option>
                    <option v-for="val in subCategories" :value="val.id" :key="val.id">
                      {{ val.name }}
                    </option>
                  </select>

                  <b-form-text :class="`warning-text${validateForm.subCategory ? ' d-none' : ''}`">
                    Pilih sub kategori produk.
                  </b-form-text>
                </b-col>
              </b-row>
            </b-col>

            <b-col cols="12" md="7" lg="6">
              <b-row class="input-group-la">
                <b-col cols="12">
                  <label>Deskripsi produk</label>
                </b-col>

                <b-col cols="12">
                  <b-form-textarea class="input-text"
                  v-model="form.description" @keyup="validateDescription"
                  placeholder="Tulis deskripsi produk" rows="5" max-rows="7"/>

                  <b-form-text :class="`warning-text${validateForm.description ? ' d-none' : ''}`">
                    Karakter (min: 15 / max: 255)
                  </b-form-text>
                </b-col>
              </b-row>

              <b-row>
                <b-col cols="12">
                  <button class="btn-save" @click="validationForm">Simpan</button>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </div>
      </template>
    </TemplateContent>

    <Loader :class="`${loader ? '' : 'd-none'}`"/>
  </div>
</template>

<style lang="scss" scoped>

  // global css
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
    padding: 1rem 1.5rem;

    .input-group-la {
      margin-bottom: 1rem;

      label {
        color: #333;
        font-weight: 600;
        font-size: 0.8125em;
      }

      .input-text {
        width: 100%;
        outline: none;
        color: #222;
        box-shadow: 0 0;
        border-radius: 0.25rem;
        transition: border .1s linear;
        border: 0.0625rem solid #BBB;
        padding: 0.625rem 0.9375rem;
        font-size: 0.8125em;

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
        font-size: 0.8125em;
        color: #FF003D !important;
      }
    }

    .btn-save {
      color: #FFF;
      margin-top: 1rem;
      font-weight: 600;
      border-radius: 0.375rem;
      text-transform: uppercase;
      background-color: #BF67E9;
      transition: background-color .2s ease-out;
      padding: 0.6875rem 1.6875rem;
      font-size: 0.75em;

      &:hover {
        background-color: #B75BE2;
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
      padding: 1.25rem 1.75rem;

      .input-group-la {
        margin-bottom: 1.25rem;

        label {
          font-size: 0.875em;
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
        padding: 0.6875rem 1.6875rem;
        font-size: 0.8125em;
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

      .input-group-la {
        margin-bottom: 1.25rem;

        label {
          font-size: 0.9375em;
        }

        .input-text {
          padding: 0.625rem 1rem;
          font-size: 0.9375em;
        }

        .warning-text {
          font-size: 0.875em;
        }
      }

      .btn-save {
        padding: 0.75rem 1.75rem;
        font-size: 0.875em;
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

      .input-group-la {
        margin-bottom: 1.25rem;

        label {
          font-size: 0.9375em;
        }

        .input-text {
          padding: 0.625rem 1rem;
          font-size: 0.9375em;
        }

        .warning-text {
          font-size: 0.875em;
        }
      }

      .btn-save {
        padding: 0.75rem 1.75rem;
        font-size: 0.875em;
      }
    }
  }
  // #Device = Laptops, Desktops

</style>

<script>
import { mapGetters, mapActions } from 'vuex';
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
      paramsId: null,

      categories: null,
      subCategories: null,

      form: {
        name: '',
        price: 0,
        category: '',
        subCategory: '',
        description: '',
      },

      validateForm: {
        name: true,
        price: true,
        category: true,
        subCategory: true,
        description: true,
      },
    };
  },

  computed: {
    ...mapGetters('categories', [
      'categoryList',
    ]),

    ...mapGetters('adProduct', [
      'product',
    ]),

    title() {
      return this.paramsId ? 'Ubah Produk' : 'Tambah Produk';
    },
  },

  methods: {
    ...mapActions('categories', [
      'getCategories',
    ]),

    ...mapActions('adProduct', [
      'addProduct',
      'updateProduct',
      'getById',
    ]),

    async getAllCategories() {
      this.loader = true;

      const { code } = await this.$func.promiseAPI(this.getCategories);

      this.loader = false;

      if (code >= 200 && code < 300) {
        this.categories = this.categoryList.categories;
      } else {
        this.$func.popupConnectionError(false);
      }
    },

    async getProductDetail() {
      this.loader = true;

      const { code } = await this.$func.promiseAPI(this.getById, {
        id: parseInt(this.paramsId, 10),
      });

      this.loader = false;

      if (code >= 200 && code < 300) {
        this.setForm(this.product.product);
      } else {
        this.$func.popupConnectionError();
      }
    },

    async reqApi(params, action) {
      this.loader = true;

      const { code } = await this.$func.promiseAPI(action, params);

      this.loader = false;

      if (code >= 200 && code < 300) {
        this.$func.popupSuccess('Berhasil simpan produk', this.$router, '/admin/product');
      } else {
        this.$func.popupConnectionError(false);
      }
    },

    apiHandler() {
      let action = this.addProduct;
      const price = this.form.price.toString().split('.').join('');

      const params = {
        name: this.form.name,
        price: parseInt(price, 10),
        description: this.form.description,
        categoryId: this.form.category,
        subCategoryId: this.form.subCategory,
      };

      if (this.paramsId) {
        params.id = parseInt(this.paramsId, 10);
        action = this.updateProduct;
      }

      this.reqApi(params, action);
    },

    validationForm() {
      if (this.validateName() && this.validatePrice()
      && this.validateCategory() && this.validateSubCategory()
      && this.validateDescription()) {
        this.apiHandler();
      }
    },

    setForm(product) {
      this.fillSubCategory({ target: { value: product.categoryId } });

      this.form = {
        name: product.name,
        price: product.price,
        category: product.categoryId,
        subCategory: product.subCategoryId,
        description: product.description,
      };
    },

    fillSubCategory({ target }) {
      this.resetValidateSelect();

      const category = this.categories.find((val) => val.id === parseInt(target.value, 10));
      this.subCategories = category.subCategories;
    },

    resetValidateSelect() {
      this.form.subCategory = '';
      this.validateForm.subCategory = true;
      this.validateForm.category = true;
    },

    validateName() {
      if (this.form.name.length === 0) {
        this.validateForm.name = false;
        return 0;
      }

      this.validateForm.name = true;
      return 1;
    },

    validatePrice() {
      const temp = parseInt(this.form.price, 10);
      if (temp <= 0) {
        this.validateForm.price = false;
        return 0;
      }

      this.validateForm.price = true;
      return 1;
    },

    validateCategory() {
      if (this.form.category.length === 0) {
        this.validateForm.category = false;
        return 0;
      }

      this.validateForm.category = true;
      return 1;
    },

    validateSubCategory() {
      if (this.form.subCategory.length === 0) {
        this.validateForm.subCategory = false;
        return 0;
      }

      this.validateForm.subCategory = true;
      return 1;
    },

    validateDescription() {
      if (this.form.description.length < 15 || this.form.description.length > 255) {
        this.validateForm.description = false;
        return 0;
      }

      this.validateForm.description = true;
      return 1;
    },

    rupiahFormat() {
      this.restore();
      this.form.price = parseInt(this.form.price, 10);

      if (this.form.price > 0 && this.form.price[0] !== 0) {
        const price = this.form.price.toString();

        const rest = price.length % 3;
        let rupiah = price.substring(0, rest);
        const thousand = price.substring(rest).match(/\d{3}/g);
        const separator = rest ? '.' : '';

        if (thousand) {
          rupiah += separator + thousand.join('.');
        }

        this.form.price = rupiah;
        return;
      }

      this.form.price = 0;
    },

    restore() {
      if (this.form.price.length > 0) {
        this.form.price = this.form.price.toString().split('.').join('');
      }
    },
  },

  async created() {
    this.paramsId = this.$route.params.id;
    await this.getAllCategories();

    if (this.paramsId) {
      this.getProductDetail();
    }
  },

};

</script>
