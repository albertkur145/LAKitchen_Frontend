<template>
  <div>
    <TemplateContent>
      <template v-slot:title>
        <span>
          <router-link to="/admin/employee" class="back">Pegawai</router-link>
        </span>

        <span>
          <font-awesome-icon icon="chevron-right" class="chev-icon"/>
        </span>

        <span>{{ title }}</span>
      </template>

      <template v-slot:content>
        <div class="container-la">
          <b-row>
            <b-col cols="12" md="5">
              <b-row class="input-group-la">
                <b-col cols="12">
                  <label>Nama lengkap</label>
                </b-col>

                <b-col cols="12">
                  <input type="text" class="input-text" @keyup="validateName"
                  v-model="form.name" placeholder="Masukkan nama lengkap" autocomplete="off">

                  <b-form-text :class="`warning-text${validateForm.name ? ' d-none' : ''}`">
                    Nama tidak boleh kosong.
                  </b-form-text>
                </b-col>
              </b-row>

              <b-row class="input-group-la">
                <b-col cols="12">
                  <label>Email</label>
                </b-col>

                <b-col cols="12">
                  <input type="text" class="input-text" @keyup="validateEmail"
                  v-model="form.email" placeholder="Masukkan email" autocomplete="off"
                  :disabled="paramId">

                  <b-form-text :class="`warning-text${validateForm.email ? ' d-none' : ''}`">
                    Email tidak valid.
                  </b-form-text>
                </b-col>
              </b-row>

              <b-row class="input-group-la">
                <b-col cols="12">
                  <label>No. HP</label>
                </b-col>

                <b-col cols="12">
                  <input type="text" class="input-text" @keyup="validatePhoneNumber"
                  v-model="form.phoneNumber" placeholder="Masukkan nomor hp" autocomplete="off">

                  <b-form-text :class="`warning-text${validateForm.phoneNumber ? ' d-none' : ''}`">
                    Contoh: 0813xxxxxxxx
                  </b-form-text>
                </b-col>
              </b-row>

              <b-row class="input-group-la" v-if="!paramId">
                <b-col cols="12">
                  <label>Alamat</label>
                </b-col>

                <b-col cols="12">
                  <b-form-textarea class="input-text" @keyup="validateAddress"
                  v-model="form.address" placeholder="Tulis alamat lengkap" rows="5" max-rows="7"/>

                  <b-form-text :class="`warning-text${validateForm.address ? ' d-none' : ''}`">
                    Karakter (min: 15 / max: 255)
                  </b-form-text>
                </b-col>
              </b-row>
            </b-col>

            <b-col cols="12" md="5">
              <b-row class="input-group-la" v-if="paramId">
                <b-col cols="12">
                  <label>Alamat</label>
                </b-col>

                <b-col cols="12">
                  <b-form-textarea class="input-text" @keyup="validateAddress"
                  v-model="form.address" placeholder="Tulis alamat lengkap" rows="5" max-rows="7"/>

                  <b-form-text :class="`warning-text${validateForm.address ? ' d-none' : ''}`">
                    Karakter (min: 15 / max: 255)
                  </b-form-text>
                </b-col>
              </b-row>

              <b-row class="input-group-la">
                <b-col cols="12">
                  <label>Provinsi</label>
                </b-col>

                <b-col cols="12">
                  <select v-model="form.province" @change="fillCity"
                  class="input-text bg-white">
                    <option value="" disabled>-- PILIH PROVINSI --</option>
                    <option v-for="val in provinceList"
                    :key="val" :value="val">
                      {{ val }}
                    </option>
                  </select>

                  <b-form-text :class="`warning-text${validateForm.province ? ' d-none' : ''}`">
                    Pilih provinsi.
                  </b-form-text>
                </b-col>
              </b-row>

              <b-row class="input-group-la">
                <b-col cols="12">
                  <label>Kota</label>
                </b-col>

                <b-col cols="12">
                  <select class="input-text bg-white" v-model="form.city">
                    <option value="" disabled>-- PILIH KOTA --</option>
                    <option v-for="val in cityList"
                    :key="val" :value="val">
                      {{ val }}
                    </option>
                  </select>

                  <b-form-text :class="`warning-text${validateForm.city ? ' d-none' : ''}`">
                    Pilih kota.
                  </b-form-text>
                </b-col>
              </b-row>

              <b-row class="input-group-la" v-if="!paramId">
                <b-col cols="12">
                  <label>Kata sandi</label>
                </b-col>

                <b-col cols="12">
                  <input :type="typePassword" class="input-text"
                  v-model="form.password" @keyup="validatePassword"
                  placeholder="Masukkan kata sandi" autocomplete="off">

                  <font-awesome-icon :icon="typeIcon"
                  class="show-icon" @click="toggleType"/>

                  <b-form-text :class="`warning-text${validateForm.password ? ' d-none' : ''}`">
                    Kata sandi harus diisi.
                  </b-form-text>
                </b-col>
              </b-row>

              <b-row class="input-group-la" v-if="!paramId">
                <b-col cols="12">
                  <label>Konfirmasi kata sandi</label>
                </b-col>

                <b-col cols="12">
                  <input :type="typeConfirmPassword" class="input-text"
                  v-model="confirmPassword" @keyup="validateConfirmPassword"
                  placeholder="Konfirmasi kata sandi" autocomplete="off">

                  <font-awesome-icon :icon="typeConfirmIcon"
                  class="show-icon" @click="toggleConfirmType"/>

                  <b-form-text :class="`warning-text${validateForm.confirmPassword
                  ? ' d-none' : ''}`">
                    Kata sandi tidak sama.
                  </b-form-text>
                </b-col>
              </b-row>

              <div class="d-flex flex-wrap">
                <button class="btn-save" @click="validationForm">Simpan</button>
              </div>
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

      .show-icon {
        color: #777;
        cursor: pointer;
        position: absolute;
        top: 0.875rem;
        right: 1.75rem;
        font-size: 1em;
      }
    }

    .btn-save {
      color: #FFF;
      font-weight: 600;
      border-radius: 0.375rem;
      text-transform: uppercase;
      background-color: #BF67E9;
      transition: background-color .2s ease-out;
      margin-right: 0.75rem;
      margin-bottom: 0.75rem;
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
      paramId: null,
      confirmPassword: '',

      typePassword: 'password',
      typeIcon: 'eye',

      typeConfirmPassword: 'password',
      typeConfirmIcon: 'eye',

      form: {
        name: '',
        email: '',
        phoneNumber: '',
        address: '',
        province: '',
        city: '',
        password: '',
      },

      validateForm: {
        name: true,
        email: true,
        phoneNumber: true,
        address: true,
        province: true,
        city: true,
        password: true,
        confirmPassword: true,
      },

      provinceList: [
        'Bali', 'Bangka Belitung', 'Banten', 'Bengkulu', 'DI Yogyakarta',
        'DKI Jakarta', 'Gorontalo', 'Jambi', 'Jawa Barat', 'Jawa Tengah',
        'Jawa Timur', 'Kalimantan Barat', 'Kalimantan Tengah', 'Kalimantan Timur',
        'Kalimantan Utara', 'Kepulauan Riau', 'Lampung', 'Maluku',
        'Maluku Utara', 'Nanggroe Aceh Darussalam (NAD)', 'Nusa Tenggara Barat (NTB)',
        'Nusa Tenggara Timur (NTT)', 'Papua', 'Papua Barat', 'Riau',
        'Sulawesi Barat', 'Sulawesi Selatan', 'Sulawesi Tengah',
        'Sulawesi Tenggara', 'Sulawesi Utara', 'Sumatra Barat',
        'Sumatra Selatan', 'Sumatra Utara',
      ],

      cityList: [],
    };
  },

  computed: {
    ...mapGetters('adUser', [
      'employeeDetail',
    ]),

    title() {
      return this.paramId ? 'Ubah Pegawai' : 'Tambah Pegawai';
    },
  },

  methods: {
    ...mapActions('adUser', [
      'createEmployee',
      'updateEmployee',
      'getEmployeeById',
    ]),

    fillCity({ target }) {
      this.form.city = '';

      switch (target.value) {
        case 'Bali':
          this.cityList = [
            'Kab. Badung', 'Kab. Bangli', 'Kab. Buleleng',
            'Kab. Gianyar', 'Kab. Jembrana', 'Kab. Karangasem',
            'Kab. Klungkung', 'Kab. Tabanan', 'Kota Denpasar',
          ];
          break;

        case 'Bangka Belitung':
          this.cityList = [
            'Kab. Bangka', 'Kab. Bangka Barat', 'Kab. Selatan',
            'Kab. Bangka Tengah', 'Kab. Belitung',
            'Kab. Belitung Timur', 'Kota Pangkal Pinang',
          ];
          break;

        case 'Banten':
          this.cityList = [
            'Kab. Lebak', 'Kab. Pandeglang', 'Kab. Serang',
            'Kab. Tangerang', 'Kota Cilegon', 'Kota Serang',
            'Kota Tangerang', 'Kota Tangerang Selatan',
          ];
          break;

        case 'Bengkulu':
          this.cityList = [
            'Kab. Bengkulu Selatan', 'Kab. Bengkulu Tengah',
            'Kab. Bengkulu Utara', 'Kab. Kaur',
            'Kab. Kapahiang', 'Kab. Lebong', 'Kab. Muko Muko',
            'Kab. Rejang Lebong', 'Kab. Seluma', 'Kota Bengkulu',
          ];
          break;

        case 'DI Yogyakarta':
          this.cityList = [
            'Kab. Bantul', 'Kab. Gunung Kidul',
            'Kab. Kulon Progo', 'Kab. Sleman', 'Yogyakarta',
          ];
          break;

        case 'DKI Jakarta':
          this.cityList = [
            'Kab. Kepulauan Seribu', 'Kota Jakarta Barat',
            'Kota Jakarta Pusat', 'Kota Jakarta Selatan',
            'Kota Jakarta Timur', 'Kota Jakarta Utara',
          ];
          break;

        case 'Gorontalo':
          this.cityList = [
            'Kab. Boalemo', 'Kab. Bone Bolango', 'Kab. Gorontalo',
            'Kab. Gorotanlo Utara', 'Kab. Pohuwato', 'Kota Gorontalo',
          ];
          break;

        case 'Jambi':
          this.cityList = [
            'Kab. Batang Hari', 'Kab. Bungo', 'Kab. Kerinci',
            'Kab. Merangin', 'Kab. Muaro Jambi', 'Kab. Sarolangun',
            'Kab. Tanjung Jabung Barat', 'Kab. Tanjung Jabung Timur',
            'Kab. Tebo', 'Kota Jambi', 'Kota Sungaipenuh',
          ];
          break;

        case 'Jawa Barat':
          this.cityList = [
            'Kab. Bandung', 'Kab. Bandung Barat', 'Kab. Bekasi',
            'Kab. Bogor', 'Kab. Ciamis', 'Kab. Cianjur', 'Kab. Cirebon',
            'Kab. Garut', 'Kab. Indramayu', 'Kab. Karawang', 'Kab. Kuningan',
            'Kab. Majalengka', 'Kab. Purwakarta', 'Kab. Subang', 'Kab. Sukabumi',
            'Kab. Sumedang', 'Kab. Tasikmalaya', 'Kota Bandung', 'Kota Banjar',
            'Kota Bekasi', 'Kota Bogor', 'Kota Cimahi', 'Kota Cirebon',
            'Kota Depok', 'Kota Sukabumi', 'Kota Tasikmalaya',
          ];
          break;

        case 'Jawa Tengah':
          this.cityList = [
            'Kab. Banjarnegara', 'Kab. Banyumas', 'Kab. Batang',
            'Kab. Blora', 'Kab. Boyolali', 'Kab. Brebes', 'Kab. Cilacap',
            'Kab. Demak', 'Kab. Grobogan', 'Kab. Jepara', 'Kab. Karanganyar',
            'Kab. Kebumen', 'Kab. Kendal', 'Kab. Klaten', 'Kab. Kudus',
            'Kab. Magelang', 'Kab. Pati', 'Kab. Pekalongan', 'Kab. Pemalang',
            'Kab. Purbalingga', 'Kab. Purworejo', 'Kab. Rembang',
            'Kab. Semarang', 'Kab. Sragen', 'Kab. Sukoharjo', 'Kab. Tegal',
            'Kab. Temanggung', 'Kab. Wonogiri', 'Kab. Wonosobo',
            'Kota Magelang', 'Kota Pekalongan', 'Kota Salatiga',
            'Kota Semarang', 'Kota Surakarta (Solo)', 'Kota Tegal',
          ];
          break;

        case 'Jawa Timur':
          this.cityList = [
            'Kab. Bangkalan', 'Kab. Banyuwangi', 'Kab. Blitar',
            'Kab. Bojonegoro', 'Kab. Bondowoso', 'Kab. Gresik',
            'Kab. Jember', 'Kab. Jombang', 'Kab. Kediri',
            'Kab. Lamongan', 'Kab. Lumajang', 'Kab. Madiun',
            'Kab. Magetan', 'Kab. Malang', 'Kab. Mojokerto',
            'Kab. Nganjuk', 'Kab. Ngawi', 'Kab. Pacitan',
            'Kab. Pamekasan', 'Kab. Pasuruan', 'Kab. Ponogoro',
            'Kab. Probolinggo', 'Kab. Sampang', 'Kab. Sidoarjo',
            'Kab. Situbondo', 'Kab. Sumenep', 'Kab. Trenggalek',
            'Kab. Tuban', 'Kab. Tulungagung', 'Kota Batu',
            'Kota Blitar', 'Kota Kediri', 'Kota Madiun',
            'Kota Malang', 'Kota Mojokerto', 'Kota Pasuruan',
            'Kota Probolinggo', 'Kota Surabaya',
          ];
          break;

        case 'Kalimantan Barat':
          this.cityList = [
            'Kab. Bengkayang', 'Kab. Kapuas Hulu', 'Kab. Kayong Utara',
            'Kab. Ketapang', 'Kab. Kubu Raya', 'Kab. Landak',
            'Kab. Melawi', 'Kab. Pontianak', 'Kab. Sambas', 'Kab. Sanggau',
            'Kab. Sekadau', 'Kab. Sintang', 'Kota Pontianak', 'Kota Singkawang',
          ];
          break;

        case 'Kalimantan Selatan':
          this.cityList = [
            'Kab. Balangan', 'Kab. Banjar', 'Kab. Barito Kuala',
            'Kab. Hulu Sungai Selatan', 'Kab. Hulu Sungai Tengah',
            'Kab. Hulu Sungai Utara', 'Kab. Kotabaru', 'Kab. Tabalong',
            'Kab. Tanah Bumbu', 'Kab. Tanah Laut', 'Kab. Tapin',
            'Kota Banjarbaru', 'Kota Banjarmasin',
          ];
          break;

        case 'Kalimantan Tengah':
          this.cityList = [
            'Kab. Barito Selatan', 'Kab. Barito Timur',
            'Kab. Barito Utara', 'Kab. Gunung Mas', 'Kab. Kapuas',
            'Kab. Katingan', 'Kab. Kotawaringin Barat',
            'Kab. Kotawaringin Timur', 'Kab. Lamandau', 'Kab. Murung Raya',
            'Kab. Pulang Pisau', 'Kab. Seruyan', 'Kab. Sukamara', 'Kota Palangka Raya',
          ];
          break;

        case 'Kalimantan Timur':
          this.cityList = [
            'Kab. Berau', 'Kab. Kutai Barat', 'Kab. Kutai Kartanegara',
            'Kab. Kutai Timur', 'Kab. Paser', 'Kab. Penajam Paser Utara',
            'Kota Balikpapan', 'Kota Bontang', 'Kota Samarinda',
          ];
          break;

        case 'Kalimantan Utara':
          this.cityList = [
            'Kab. Bulungan (Bulongan)', 'Kab. Malinau', 'Kab. Nunukan',
            'Kab. Tana Kidung', 'Kota Tarakan',
          ];
          break;

        case 'Kepulauan Riau':
          this.cityList = [
            'Kab. Bintang', 'Kab. Karimun', 'Kab. Kepulauan Anambas',
            'Kab. Lingga', 'Kab. Natuna', 'Kota Batam', 'Kota Tanjung Pinang',
          ];
          break;

        case 'Lampung':
          this.cityList = [
            'Kab. Lampung Barat', 'Kab. Lampung Selatan',
            'Kab. Lampung Tengah', 'Kab. Lampung Timur',
            'Kab. Lampung Utara', 'Kab. Mesuji', 'Kab. Pesawaran',
            'Kab. Pringsewu', 'Kab. Tanggamus', 'Kab. Tulang Bawang',
            'Kab. Tulang Bawang Barat', 'Kab. Way Kanan',
            'Kota Bandar Lampung', 'Kota Metro',
          ];
          break;

        case 'Maluku':
          this.cityList = [
            'Kab. Buru', 'Kab. Buru Selatan', 'Kab. Kepulauan Aru',
            'Kab. Maluku Barat Daya', 'Kab. Maluku Tengah',
            'Kab. Maluku Tenggara', 'Kab. Maluku Tenggara Barat',
            'Kab. Seram Bagian Barat', 'Kab. Seram Bagian Timur',
            'Kota Ambon', 'Kota Tual',
          ];
          break;

        case 'Maluku Utara':
          this.cityList = [
            'Kab. Halmahera Barat', 'Kab. Halmahera Selatan',
            'Kab. Halmahera Tengah', 'Kab. Halmahera Timur',
            'Kab. Halmahera Utara', 'Kab. Kepulauan Sula',
            'Kab. Pulau Morotai', 'Kota Ternate', 'Kota Tidore Kepulauan',
          ];
          break;

        case 'Nanggroe Aceh Darussalam (NAD)':
          this.cityList = [
            'Kab. Aceh Barat', 'Kab. Aceh Barat Daya',
            'Kab. Aceh Besar', 'Kab. Aceh Jaya', 'Kab. Aceh Selatan',
            'Kab. Aceh Singkil', 'Kab. Aceh Tamiang', 'Kab. Aceh Tengah',
            'Kab. Aceh Tenggara', 'Kab. Aceh Timur', 'Kab. Aceh Utara',
            'Kab. Bener Meriah', 'Kab. Bireuen', 'Kab. Gayo Lues',
            'Kab. Nagan Raya', 'Kab. Pidie', 'Kab. Pidie Jaya',
            'Kab. Simeulue', 'Kota Banda Aceh', 'Kota Langsa',
            'Kota Lhokseumawe', 'Kota Sabang', 'Kota Subulussalam',
          ];
          break;

        case 'Nusa Tenggara Barat (NTB)':
          this.cityList = [
            'Kab. Bima', 'Kab. Dompu', 'Kab. Lombok Barat',
            'Kab. Lombok Tengah', 'Kab. Lombok Timur', 'Kab. Lombok Utara',
            'Kab. Sumbawa', 'Kab. Sumbawa Barat', 'Kota Bima', 'Kota Mataram',
          ];
          break;

        case 'Nusa Tenggara Timur (NTT)':
          this.cityList = [
            'Kab. Alor', 'Kab. Belu', 'Kab. Ende', 'Kab. Flores Timur',
            'Kab. Kupang', 'Kab. Lembata', 'Kab. Manggarai',
            'Kab. Manggarai Barat', 'Kab. Timur', 'Kab. Nageseko',
            'Kab. Ngada', 'Kab. Rote Ndao', 'Kab. Sabu Raijua',
            'Kab. Sikka', 'Kab. Sumba Barat', 'Kab. Sumba Barat Daya',
            'Kab. Sumba Tengah', 'Kab. Tengah Timur',
            'Kab. Timor Tengah Selatan', 'Kota Kupang',
          ];
          break;

        case 'Papua':
          this.cityList = [
            'Kab. Asmat', 'Kab. Biak Numfor', 'Kab. Boven Digoel',
            'Kab. Deiyai (Deliyai)', 'Kab. Dogiyai', 'Kab. Intan Jaya',
            'Kab. Jayapura', 'Kab. Jayawijaya', 'Kab. Keerom',
            'Kab. Kepulauan Yapen (Yapen Waropen)', 'Kab. Lanny Jaya',
            'Kab. Mamberamo Raya', 'Kab. Mamberamo Tengah', 'Kab. Mappi',
            'Kab. Merauke', 'Kab. Mimika', 'Kab. Nabire', 'Kab. Nduga',
            'Kab. Paniai', 'Kab. Pegunungan Bintang', 'Kab. Puncak',
            'Kab. Puncak Jaya', 'Kab. Sarmi', 'Kab. Supiori', 'Kab. Tolikara',
            'Kab. Waropen', 'Kab. Yahukimo', 'Kab. Yalimo', 'Kota Jayapura',
          ];
          break;

        case 'Papua Barat':
          this.cityList = [
            'Kab. Fakfak', 'Kab. Kaimana', 'Kab. Manokwari',
            'Kab. Maybrat', 'Kab. Raja Ampat', 'Kab. Sorong',
            'Kab. Sorong Selatan', 'Kab. Tambrauw', 'Kab. Teluk Bintuni',
            'Kab. Teluk Wondama', 'Kota Sorong',
          ];
          break;

        case 'Riau':
          this.cityList = [
            'Kab. Bengkalis', 'Kab. Indragiri Hilir', 'Kab. Indragiri Hulu',
            'Kab. Kampar', 'Kab. Kepulauan Meranti', 'Kab. Kuantan Singingi',
            'Kab. Pelalawan', 'Kab. Rokan Hilir', 'Kab. Rokan Hulu',
            'Kab. Siak', 'Kota Dumai', 'Kota Pekanbaru',
          ];
          break;

        case 'Sulawesi Barat':
          this.cityList = [
            'Kab. Majene', 'Kab. Mamasa', 'Kab. Mamuju',
            'Kab. Mamuju Utara', 'Kab. Polewali Mandar',
          ];
          break;

        case 'Sulawesi Selatan':
          this.cityList = [
            'Kab. Bantaeng', 'Kab. Barru', 'Kab. Bone',
            'Kab. Bulukumba', 'Kab. Enrekang', 'Kab. Gowa',
            'Kab. Jeneponto', 'Kab. Luwu', 'Kab. Luwu Timur',
            'Kab. Luwu Utara', 'Kab. Maros', 'Kab. Pangkajene Kepulauan',
            'Kab. Pinrang', 'Kab. Selayar (Kepulauan Selayar)',
            'Kab. Sidenreng Rappang/Rapang', 'Kab. Sinjai',
            'Kab. Soppeng', 'Kab. Takalar', 'Kab. Tana Toraja',
            'Kab. Toraja Utara', 'Kab. Wajo', 'Kota Makassar',
            'Kota Palopo', 'Kota Parepare',
          ];
          break;

        case 'Sulawesi Tengah':
          this.cityList = [
            'Kab. Banggai', 'Kab. Banggai Kepulauan', 'Kab. Buol',
            'Kab. Donggala', 'Kab. Morowali', 'Kab. Parigi Muotong',
            'Kab. Poso', 'Kab. Sigi', 'Kab. Tojo Una-Una',
            'Kab. Toli Toli', 'Kota Palu',
          ];
          break;

        case 'Sulawesi Tenggara':
          this.cityList = [
            'Kab. Bombana', 'Kab. Buton', 'Kab. Buton Utara', 'Kab. Kolaka',
            'Kab. Kolaka Utara', 'Kab. Konawe', 'Kab. Konawe Selatan',
            'Kab. Konawe Utara', 'Kab. Muna', 'Kab. Wakatobi',
            'Kota Bau-Bau', 'Kota Kendari',
          ];
          break;

        case 'Sulawesi Utara':
          this.cityList = [
            'Kab. Bolaang Mongondow (Bolmong)', 'Kab. Bolaang Mongondow Selatan',
            'Kab. Bolaang Mongondow Timur', 'Kab. Bolaang Mongondow Utara',
            'Kab. Kepulauan Sangihe', 'Kab. Kepulauan Siau Tagulandang Biaro (Sitaro)',
            'Kab. Kepulauan Talaud', 'Kab. Minahasa', 'Kab. Minahasa Selatan',
            'Kab. Minahasa Tenggara', 'Kab. Minahasa Utara', 'Kota Bitung',
            'Kota Kotamobagu', 'Kota Manado', 'Kota Tomohon',
          ];
          break;

        case 'Sumatra Barat':
          this.cityList = [
            'Kab. Agam', 'Kab. Dharmasraya', 'Kab. Kepulauan Mentawai',
            'Kab. Lima Puluh Koto/Kota', 'Kab. Padang Pariaman',
            'Kab. Pasaman', 'Kab. Pasaman Barat', 'Kab. Pesisir Selatan',
            'Kab. Sijunjung (Sawah Lunto Sijunjung)', 'Kab. Solok',
            'Kab. Solok Selatan', 'Kab. Tanah Datar', 'Kota Bukittinggi',
            'Kota Padang', 'Kota Padang Panjang', 'Kota Pariaman',
            'Kota Payakumbuh', 'Kota Sawah Lunto', 'Kota Solok',
          ];
          break;

        case 'Sumatra Selatan':
          this.cityList = [
            'Kab. Banyuasin', 'Kab. Empat Lawang', 'Kab. Lahat',
            'Kab. Muara Enim', 'Kab. Musi Banyuasin', 'Kab. Musi Rawas',
            'Kab. Ogan Ilir', 'Kab. Ogan Komering Ilir',
            'Kab. Ogan Komering Ulu', 'Kab. Ogan Komering Ulu Selatan',
            'Kab. Ogan Komering Timur', 'Kota Lubuk Linggau',
            'Kota Pagar Alam', 'Kota Palembang', 'Kota Prabumulih',
          ];
          break;

        case 'Sumatra Utara':
          this.cityList = [
            'Kab. Asahan', 'Kab. Batu Bara', 'Kab. Dairi',
            'Kab. Deli Serdang', 'Kab. Humbang Hasundutan',
            'Kab. Karo', 'Kab. Labuhan Batu', 'Kab. Labuhan Batu Selatan',
            'Kab. Labuhan Batu Utara', 'Kab. Langkat',
            'Kab. Mandailing Natal', 'Kab. Nias', 'Kab. Nias Barat',
            'Kab. Nias Selatan', 'Kab. Utara', 'Kab. Padang Lawas',
            'Kab. Padang Lawas Utara', 'Kab. Pakpak Bharat',
            'Kab. Samosir', 'Kab. Serdang Bedagai', 'Kab. Simalungun',
            'Kab. Tapanuli Selatan', 'Kab. Tapanuli Tengah',
            'Kab. Tapanuli Utara', 'Kab. Toba Samosir', 'Kota Binjai',
            'Kota Gunungsitoli', 'Kota Medan', 'Kota Padang Sidempuan',
            'Kota Pematang Siantar', 'Kota Sibolga', 'Kota Tanjung Balai',
            'Kota Tebing Tinggi',
          ];
          break;

        default:
          this.cityList = [];
          break;
      }
    },

    async getEmployeeDetail() {
      this.loader = true;

      const { code } = await this.$func.promiseAPI(this.getEmployeeById, {
        id: parseInt(this.paramId, 10),
      });

      this.loader = false;

      if (code >= 200 && code < 300) {
        this.setForm(this.employeeDetail.user);
      } else {
        this.$func.popupConnectionError();
      }
    },

    async reqApi(action) {
      this.loader = true;

      const { code } = await this.$func.promiseAPI(action, this.form);

      this.loader = false;

      if (code >= 200 && code < 300) {
        this.$func.popupSuccess('Berhasil simpan data', this.$router, '/admin/employee');
      } else {
        this.$func.popupConnectionError(false);
      }
    },

    setForm(data) {
      this.fillCity({ target: { value: data.province } });

      this.form = {
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        address: data.address,
        province: data.province,
        city: data.city,
      };
    },

    apiHandler() {
      let action = this.createEmployee;

      if (this.paramId) {
        delete this.form.password;
        this.form.id = parseInt(this.paramId, 10);

        action = this.updateEmployee;
      }

      this.reqApi(action);
    },

    validationForm() {
      if (this.validateName() && this.validateEmail()
      && this.validatePhoneNumber() && this.validateAddress()
      && this.validateProvince() && this.validateCity()) {
        if (this.paramId) {
          this.apiHandler();
        } else if (this.validatePassword() && this.validateConfirmPassword()) {
          this.apiHandler();
        }
      }
    },

    validateName() {
      if (this.form.name.length === 0) {
        this.validateForm.name = false;
        return 0;
      }

      this.validateForm.name = true;
      return 1;
    },

    validateEmail() {
      const regEmail = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;

      if (!regEmail.test(this.form.email)) {
        this.validateForm.email = false;
        return 0;
      }

      this.validateForm.email = true;
      return 1;
    },

    validatePhoneNumber() {
      const regHp = /^08[0-9]{8,11}$/;

      if (!regHp.test(this.form.phoneNumber)) {
        this.validateForm.phoneNumber = false;
        return 0;
      }

      this.validateForm.phoneNumber = true;
      return 1;
    },

    validateAddress() {
      if (this.form.address.length < 15 || this.form.address.length > 255) {
        this.validateForm.address = false;
        return 0;
      }

      this.validateForm.address = true;
      return 1;
    },

    validateProvince() {
      if (this.form.province.length === 0) {
        this.validateForm.province = false;
        return 0;
      }

      this.validateForm.province = true;
      return 1;
    },

    validateCity() {
      if (this.form.city.length === 0) {
        this.validateForm.city = false;
        return 0;
      }

      this.validateForm.city = true;
      return 1;
    },

    validatePassword() {
      if (this.form.password.length === 0) {
        this.validateForm.password = false;
        return 0;
      }

      this.validateForm.password = true;
      return this.validateConfirmPassword();
    },

    validateConfirmPassword() {
      if (this.form.password !== this.confirmPassword) {
        this.validateForm.confirmPassword = false;
        return 0;
      }

      this.validateForm.confirmPassword = true;
      return 1;
    },

    checkPasswordType(password) {
      if (password === 'password') {
        return {
          typePassword: 'text',
          typeIcon: 'eye-slash',
        };
      }

      return {
        typePassword: 'password',
        typeIcon: 'eye',
      };
    },

    toggleType() {
      const type = this.checkPasswordType(this.typePassword);

      this.typePassword = type.typePassword;
      this.typeIcon = type.typeIcon;
    },

    toggleConfirmType() {
      const type = this.checkPasswordType(this.typeConfirmPassword);

      this.typeConfirmPassword = type.typePassword;
      this.typeConfirmIcon = type.typeIcon;
    },
  },

  created() {
    this.paramId = this.$route.params.id;

    if (this.paramId) {
      this.getEmployeeDetail();
    }
  },

};

</script>
